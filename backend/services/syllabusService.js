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

  const prompt = `Extract all relevant course information into the requested JSON format. For topics, be exhaustive — scan every section of the document including weekly schedules, learning outcomes, and module breakdowns. Prefer specific concept names over broad category headings. When a schedule table is present, treat it as the authoritative topic source — read each row verbatim before consulting other sections. Never split a single schedule cell into multiple topic entries. Do NOT include exams, quizzes, midterms, or any assessment events as topics. After extracting all schedule rows, you MUST also extract every distinct topic from the course description and learning outcomes sections, even if conceptually similar entries exist from the schedule. If a topic appears in the course description or learning outcomes as a standalone item, extract it separately even if a similar phrase already exists as part of a compound schedule entry — e.g. 'Parameter estimation' and 'Hypothesis testing' should appear on their own if listed independently elsewhere. When learning outcomes list items as separate bullet points, keep them as separate entries — do not merge them into one string (e.g. 'Common discrete probability distributions' and 'Common continuous probability distributions' are two entries, not one). Capitalize all topic entries consistently — use title case for every entry regardless of source section. When extracting from learning outcomes, extract the topic noun phrase only — not the full sentence or verb phrase. For example, 'Construct confidence intervals' should be extracted as 'Confidence intervals', not the full instructional phrase. When a schedule entry ends with '+ practice questions' or similar variants, omit that portion — extract only the core topic name (e.g. 'Expectations and Variance', not 'Expectations and Variance + practice questions'). Every topic entry must be at least 2 words — never extract single-word topics. If trimming a phrase would result in a single word (e.g. 'Calculus', 'Concepts'), keep enough context to make it meaningful (e.g. 'Calculus in Probability', 'Fundamental Probability Concepts').
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
  "importantDates": [ { "eventName": "Task Name", "date": "YYYY-MM-DD" } ],
  "topics": ["every distinct topic, concept, unit, module, and subtopic covered in this course. Extract from ALL sections — course schedule, week-by-week outline, learning objectives, module list, and any numbered or bulleted content lists. Do NOT summarize or merge related items. A well-structured course should yield 15–40 topics minimum. Include specific concepts (e.g. 'Binary search trees') not vague headings (e.g. 'Data structures'). ADDITIONALLY: When a course schedule table exists, scan it row by row and preserve compound entries exactly as written — do not split entries joined by '+', 'and', or ','. Prefer the schedule's exact phrasing over paraphrased versions from the course description. The Greek letter χ² should be preserved as-is, not converted to x². Do NOT include exams, quizzes, midterms, or any assessment events as topics. After extracting all schedule rows, you MUST also extract every distinct topic from the course description and learning outcomes sections, even if conceptually similar entries exist from the schedule. If a topic appears in the course description or learning outcomes as a standalone item, extract it separately even if a similar phrase already exists as part of a compound schedule entry — e.g. 'Parameter estimation' and 'Hypothesis testing' should appear on their own if listed independently elsewhere. When learning outcomes list items as separate bullet points, keep them as separate entries — do not merge them into one string (e.g. 'Common discrete probability distributions' and 'Common continuous probability distributions' are two entries, not one). Capitalize all topic entries consistently — use title case for every entry regardless of source section. When extracting from learning outcomes, extract the topic noun phrase only — not the full sentence or verb phrase. For example, 'Construct confidence intervals' should be extracted as 'Confidence intervals', not the full instructional phrase. When a schedule entry ends with '+ practice questions' or similar variants, omit that portion — extract only the core topic name (e.g. 'Expectations and Variance', not 'Expectations and Variance + practice questions'). Every topic entry must be at least 2 words — never extract single-word topics. If trimming a phrase would result in a single word (e.g. 'Calculus', 'Concepts'), keep enough context to make it meaningful (e.g. 'Calculus in Probability', 'Fundamental Probability Concepts')."]
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

  const alphaMatch = courseCode.match(/[a-zA-Z]+/);
  const numericMatch = courseCode.match(/\d+/);
  const safeCourseCode = (alphaMatch && numericMatch) 
    ? (alphaMatch[0] + numericMatch[0]).toUpperCase().trim()
    : courseCode.split('.')[0].replace(/[^a-zA-Z0-9]/g, '').toUpperCase().trim();

  const subjectMatch = safeCourseCode.match(/[a-zA-Z]+/);
  const subject = subjectMatch ? subjectMatch[0].toUpperCase() : courseName.split(' ')[0];

  // 1. Resolve the canonical class_code for this user.
  // If the user already has a scoped variant of this class (e.g. CS2305-a-tgpj),
  // we must save tasks/topics against THAT code so the upcoming-tasks JOIN works.
  let resolvedCode = safeCourseCode.substring(0, 50);
  if (user_id) {
    try {
      // Check user-owned classes first (exact or scoped variant)
      const existingRes = await pool.query(
        `SELECT class_code FROM classes
         WHERE user_id = $1 AND class_code LIKE $2
         ORDER BY created_at DESC LIMIT 1`,
        [user_id, `${safeCourseCode}%`]
      );
      if (existingRes.rows.length > 0) {
        resolvedCode = existingRes.rows[0].class_code;
        console.log(`[Syllabus] 🔗 Using existing scoped class code: ${resolvedCode} (user: ${user_id})`);
      } else {
        // Fall back: check user_classes for an enrolled variant
        const enrolledRes = await pool.query(
          `SELECT uc.class_code FROM user_classes uc
           JOIN classes c ON c.class_code = uc.class_code
           WHERE uc.user_id = $1 AND uc.class_code LIKE $2
           ORDER BY uc.enrolled_at DESC LIMIT 1`,
          [user_id, `${safeCourseCode}%`]
        );
        if (enrolledRes.rows.length > 0) {
          resolvedCode = enrolledRes.rows[0].class_code;
          console.log(`[Syllabus] 🔗 Using enrolled scoped class code: ${resolvedCode} (user: ${user_id})`);
        }
      }
    } catch (err) {
      console.warn(`[Syllabus] ⚠️ Could not resolve scoped class code, falling back to ${resolvedCode}:`, err.message);
    }
  }

  // Store/update the class row with the resolved code
  const classData = {
    class_code: resolvedCode,
    subject: subject,
    name: courseName.substring(0, 30),
    user_id: user_id || null
  };
  const newClass = await classModel.createClass(classData);
  // storedCode is what was actually persisted (resolvedCode confirmed by DB RETURNING)
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
         professor_name    = COALESCE(EXCLUDED.professor_name, syllabus_info.professor_name),
         professor_email   = COALESCE(EXCLUDED.professor_email, syllabus_info.professor_email),
         office_hours      = COALESCE(EXCLUDED.office_hours, syllabus_info.office_hours),
         office_location   = COALESCE(EXCLUDED.office_location, syllabus_info.office_location),
         ta_name           = COALESCE(EXCLUDED.ta_name, syllabus_info.ta_name),
         ta_email          = COALESCE(EXCLUDED.ta_email, syllabus_info.ta_email),
         ta_office_hours   = COALESCE(EXCLUDED.ta_office_hours, syllabus_info.ta_office_hours),
         grading_policy    = COALESCE(EXCLUDED.grading_policy, syllabus_info.grading_policy),
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
