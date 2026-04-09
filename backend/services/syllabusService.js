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
CRITICAL: Identify course deadlines (Quizzes, Exams, Assignments) from the calendar.
Use null for missing data (e.g. email, office hours). DO NOT use placeholders like "TBA".
IMPORTANT: For weightPercentage, return ONLY the raw number (no '%' signs).

Return ONLY JSON matching this schema:
{
  "courseName": "Full name",
  "courseCode": "ID (e.g. CS101)",
  "instructor": { "name": "Name", "email": "email", "officeHours": "hours" },
  "gradingPolicy": [ { "category": "category", "weightPercentage": 20 } ],
  "importantDates": [ { "eventName": "Name", "date": "YYYY-MM-DD" } ],
  "topics": ["Topic Name"]
}`;

  contentParts.unshift({ text: prompt });

  console.log("[Syllabus] 🤖 Sending direct PDF to Native Google SDK...");
  
  let lastError;
  const maxRetries = 5;
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const result = await model.generateContent(contentParts);
      const response = await result.response;
      const aiResponseText = response.text();
      const aiGeneratedData = JSON.parse(aiResponseText);
      
      console.log("[Syllabus] 📄 Raw AI Output received:", JSON.stringify(aiGeneratedData, null, 2));
      
      // Validate with Zod
      console.log("[Syllabus] 🔍 Validating against schema...");
      try {
        const validatedData = syllabusSchema.parse(aiGeneratedData);
        console.log("[Syllabus] ✅ Validation successful.");
        return validatedData;
      } catch (zodErr) {
        console.error("[Syllabus] ❌ Schema Validation FAILED.");
        zodErr.rawData = aiGeneratedData;
        throw zodErr;
      }
    } catch (error) {
      lastError = error;
      // Handle 503 (Service Unavailable) with wait and retry
      if (error.message && (error.message.includes("503") || error.message.includes("Service Unavailable"))) {
        const waitTime = Math.pow(2, attempt) * 1000; // 2s, 4s, 8s, 16s, 32s
        console.warn(`[Syllabus] ⚠️  503 Error (Attempt ${attempt}/${maxRetries}). Retrying in ${waitTime/1000}s...`);
        await new Promise(resolve => setTimeout(resolve, waitTime));
        continue;
      }
      // If it's a Zod error, don't retry, just throw
      if (error.name === "ZodError") throw error;
      
      // Otherwise, log and throw
      console.error(`[Syllabus] ❌ Native Extraction failed (Attempt ${attempt}):`, error.message);
      if (attempt === maxRetries) throw error;
      
      // Small delay for other non-503 errors
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  }
};

const saveSyllabusData = async (payload) => {
  const { courseName, courseCode, topics, importantDates } = payload;

  const safeCourseCode = courseCode.replace(/[^a-zA-Z0-9]+/g, '-').replace(/^-|-$/g, '');
  const subjectMatch = courseCode.match(/[a-zA-Z]+/);
  const subject = subjectMatch ? subjectMatch[0].toUpperCase() : courseName.split(' ')[0];

  // 1. Store Class
  const classData = {
    class_code: safeCourseCode.substring(0, 50),
    subject: subject,
    name: courseName.substring(0, 30)
  };
  const newClass = await classModel.createClass(classData);
  console.log(`[Syllabus] 🏫 Class verified/updated: ${classData.class_code}`);

  // 2. Store Topics
  const savedTopics = [];
  if (Array.isArray(topics)) {
    for (const topicStr of topics) {
      const topicData = {
        id: crypto.randomUUID(),
        class_code: safeCourseCode.substring(0, 50),
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
    const deleteResult = await pool.query("DELETE FROM class_tasks WHERE class_code = $1", [safeCourseCode.substring(0, 50)]);
    console.log(`[Syllabus] 🧹 Cleared ${deleteResult.rowCount} existing tasks for ${safeCourseCode}`);
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
          [taskId, safeCourseCode.substring(0, 50), dateObj.eventName, dateObj.date]
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
