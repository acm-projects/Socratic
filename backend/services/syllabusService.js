let PDFParse;
try {
  const pdfModule = require("pdf-parse");
  // Some environments require .default, others export the function directly
  PDFParse = typeof pdfModule === 'function' ? pdfModule : (pdfModule.default || pdfModule.PDFParse);
} catch (error) {
  console.warn("pdf-parse failed to load:", error.message);
}

const { GoogleGenerativeAI } = require("@google/generative-ai");
const { syllabusSchema } = require("../utils/syllabusSchema");
const crypto = require("crypto");
const classModel = require("../models/classModel");
const topicModel = require("../models/topicModel");
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || process.env.POSTGRES_URL,
  ssl: { rejectUnauthorized: false }
});

const extractSyllabusData = async (fileBuffer, rawTextFallback) => {
  console.log(`[Syllabus] 🛠️  Processing extraction... (Direct PDF: ${!!fileBuffer})`);

  if (!process.env.GEMINI_API_KEY) {
    throw new Error("Missing GEMINI_API_KEY in backend/.env file.");
  }

  // NATIVE GOOGLE SDK EXTRACTION (Optimized for speed/efficiency)
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
    generationConfig: { responseMimeType: "application/json" }
  });

  // PREPARE CONTENT (Direct PDF if available, otherwise text)
  let contentParts = [];

  if (fileBuffer) {
    console.log("[Syllabus] 📄 Preparing raw PDF for Gemini...");
    contentParts.push({
      inlineData: {
        data: Buffer.from(fileBuffer).toString("base64"),
        mimeType: "application/pdf"
      }
    });
  } else if (rawTextFallback) {
    contentParts.push({ text: `Syllabus Text:\n${rawTextFallback}` });
  } else {
    throw new Error("No PDF file or pdfText provided.");
  }

  const prompt = `You are a concise academic assistant. Extract the bare essential syllabus details from the attached PDF.
Use null for missing data (e.g. email, office hours). DO NOT use placeholders like "TBA".
IMPORTANT: For weightPercentage, return ONLY the raw number (no '%' signs).

TASK EXTRACTION RULES for importantDates:
Only extract items that have a specific due date AND are one of: Homework, Assignment, Quiz, Exam, Final.
STRICT NAMING FORMAT:
- Use ONLY these prefixes: "Homework", "Assignment", "Quiz", "Exam", "Final Exam"
- Never combine prefixes: "Test Exam" → "Exam", "HW" → "Homework"
- Remove leading zeros: "06" → "6", "02" → "2"
- Never append "Due" to task names — the date field handles that
- Capitalize first letter only: "Homework 7" not "HOMEWORK 7"

EXCLUDE these completely — do not add them to importantDates:
- Grade visibility dates ("grades viewable", "posted on Blackboard")
- Makeup exam windows or availability windows
- Office hours, readings, lectures, class sessions
- Anything without a specific calendar due date
- Administrative deadlines (drop date, withdrawal date)

VALID examples: "Homework 7", "Exam 2", "Quiz 3", "Final Exam", "Assignment 4"
INVALID examples: "Homework 7 Due", "Test Exam 2", "Assignment 06", "Exam 2 availability window start", "Grade posted online"

Return ONLY JSON matching this schema:
{
  "courseName": "Full name",
  "courseCode": "ID (e.g. CS101)",
  "instructor": { "name": "Name", "email": "email", "officeHours": "hours", "officeLocation": "room/building" },
  "ta": { "name": "TA Name", "email": "ta@email.edu", "officeHours": "hours" },
  "gradingPolicy": [ { "category": "category", "weightPercentage": 20 } ],
  "importantDates": [ { "eventName": "Name", "date": "YYYY-MM-DD" } ],
  "topics": ["Topic Name"]
}`;

  contentParts.unshift({ text: prompt });

  console.log("[Syllabus] 🤖 Sending direct PDF to Native Google SDK...");

  const modelsToTry = ["gemini-2.5-flash", "gemini-2.5-pro"];
  let lastError;

  for (const modelId of modelsToTry) {
    console.log(`[Syllabus] 🤖 Attempting extraction with model: ${modelId}...`);
    const model = genAI.getGenerativeModel({
      model: modelId,
      generationConfig: { responseMimeType: "application/json" }
    });

    const maxRetriesPerModel = 2;
    for (let attempt = 1; attempt <= maxRetriesPerModel; attempt++) {
      try {
        const result = await model.generateContent(contentParts);
        const response = await result.response;
        const aiResponseText = response.text();
        const aiGeneratedData = JSON.parse(aiResponseText);

        console.log(`[Syllabus] 📄 Raw AI Output received from ${modelId}:`, JSON.stringify(aiGeneratedData, null, 2));

        // Validate with Zod
        console.log("[Syllabus] 🔍 Validating against schema...");
        try {
          const validatedData = syllabusSchema.parse(aiGeneratedData);
          console.log(`[Syllabus] ✅ Validation successful using ${modelId}.`);
          return validatedData;
        } catch (zodErr) {
          console.error(`[Syllabus] ❌ Schema Validation FAILED for ${modelId}.`);
          zodErr.rawData = aiGeneratedData;
          throw zodErr;
        }
      } catch (error) {
        lastError = error;
        // Handle 503 (Service Unavailable) or 429 (Rate Limit) with wait and retry
        const isRetryable = error.message && (error.message.includes("503") || error.message.includes("Service Unavailable") || error.message.includes("429"));

        if (isRetryable && attempt < maxRetriesPerModel) {
          const waitTime = Math.pow(2, attempt) * 1000;
          console.warn(`[Syllabus] ⚠️  Retryable Error (${modelId}, attempt ${attempt}). Retrying in ${waitTime / 1000}s...`);
          await new Promise(resolve => setTimeout(resolve, waitTime));
          continue; // Try same model again
        }

        console.error(`[Syllabus] ❌ Extraction failed for ${modelId} (Attempt ${attempt}):`, error.message);
        break; // Break retry loop, try next model
      }
    }
  }

  // If we reach here, all models failed
  console.error("[Syllabus] 🛑 All models failed to extract syllabus data.");
  throw lastError || new Error("Failed to extract syllabus data after trying multiple models.");
};

const saveSyllabusData = async (payload) => {
  const { courseName, courseCode, topics, importantDates, instructor, ta, gradingPolicy, user_id } = payload;

  const safeCourseCode = courseCode.replace(/[^a-zA-Z0-9]+/g, '-').replace(/^-|-$/g, '');
  const subjectMatch = courseCode.match(/[a-zA-Z]+/);
  const subject = subjectMatch ? subjectMatch[0].toUpperCase() : courseName.split(' ')[0];

  // 1. Store Class (include user_id so the class is tied to the user)
  const classData = {
    class_code: safeCourseCode.substring(0, 50),
    subject: subject,
    name: courseName.substring(0, 30),
    user_id: user_id || null
  };
  const newClass = await classModel.createClass(classData);
  // Use the actual stored class_code (may be scoped e.g. CS3341-XXXX) for all child records
  const storedCode = newClass.class_code;
  console.log(`[Syllabus] 🏫 Class verified/updated: ${storedCode}${user_id ? ` (user: ${user_id})` : ' (no user_id)'}`);

  // 2. Upsert syllabus_info (professor, TA, grading)
  try {
    await pool.query(
      `INSERT INTO syllabus_info
         (class_code, professor_name, professor_email, office_hours, office_location,
          ta_name, ta_email, ta_office_hours, grading_policy, updated_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, NOW())
       ON CONFLICT (class_code)
       DO UPDATE SET
         professor_name    = EXCLUDED.professor_name,
         professor_email   = EXCLUDED.professor_email,
         office_hours      = EXCLUDED.office_hours,
         office_location   = EXCLUDED.office_location,
         ta_name           = EXCLUDED.ta_name,
         ta_email          = EXCLUDED.ta_email,
         ta_office_hours   = EXCLUDED.ta_office_hours,
         grading_policy    = EXCLUDED.grading_policy,
         updated_at        = NOW()`,
      [
        storedCode,
        instructor?.name || null,
        instructor?.email || null,
        instructor?.officeHours || null,
        instructor?.officeLocation || null,
        ta?.name || null,
        ta?.email || null,
        ta?.officeHours || null,
        gradingPolicy ? JSON.stringify(gradingPolicy) : null
      ]
    );
    console.log(`[Syllabus] 📋 syllabus_info upserted for ${storedCode}`);
  } catch (err) {
    console.warn(`[Syllabus] ⚠️ Failed to save syllabus_info:`, err.message);
  }

  // 2. Store Topics
  const savedTopics = [];
  if (Array.isArray(topics)) {
    for (const topicStr of topics) {
      const topicData = {
        id: crypto.randomUUID(),
        class_code: storedCode,
        name: topicStr.substring(0, 50)
      };
      const newTopic = await topicModel.createTopic(topicData);
      savedTopics.push(newTopic);
    }
  }

  // 3. Store Syllabus Tasks (New Logic)
  const savedTasks = [];

  // Clear existing tasks for this class first to avoid duplicates
  try {
    const deleteResult = await pool.query("DELETE FROM class_tasks WHERE class_code = $1", [storedCode]);
    console.log(`[Syllabus] 🧹 Cleared ${deleteResult.rowCount} existing tasks for ${storedCode}`);
  } catch (err) {
    console.warn(`[Syllabus] ⚠️ Failed to clear existing tasks:`, err.message);
  }

  if (Array.isArray(importantDates)) {
    console.log(`[Syllabus] 📅 Saving ${importantDates.length} extracted tasks...`);
    for (const dateObj of importantDates) {
      const taskId = crypto.randomUUID();
      try {
        const result = await pool.query(
          "INSERT INTO class_tasks (id, class_code, task_name, due_date) VALUES ($1, $2, $3, $4) RETURNING *",
          [taskId, storedCode, dateObj.eventName, dateObj.date]
        );
        savedTasks.push(result.rows[0]);
      } catch (err) {
        console.warn(`[Syllabus] ⚠️ Failed to save task: ${dateObj.eventName}`, err.message);
      }
    }
  }

  return {
    savedClass: newClass,
    savedTopics: savedTopics,
    savedTasks: savedTasks
  };
};

module.exports = {
  extractSyllabusData,
  saveSyllabusData
};
