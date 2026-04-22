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

const cleanAndParse = (text) => {
  let cleaned = text
    .replace(/```json|```/g, '')
    .replace(/[\u0000-\u001F\u007F-\u009F]/g, '') // strip control characters
    .trim();
  const start = cleaned.indexOf('{');
  const end = cleaned.lastIndexOf('}');
  if (start === -1 || end === -1) throw new Error('No JSON object found in AI response');
  const jsonStr = cleaned.slice(start, end + 1);
  try {
    return JSON.parse(jsonStr);
  } catch (e) {
    // Try fixing common JSON issues
    const fixed = jsonStr.replace(/'/g, '"');
    return JSON.parse(fixed);
  }
};

const extractSyllabusData = async (fileBuffer, rawTextFallback) => {
  console.log(`[Syllabus] 🛠️  Processing extraction... (Direct PDF: ${!!fileBuffer})`);

  if (!process.env.GEMINI_API_KEY) {
    throw new Error("Missing GEMINI_API_KEY in backend/.env file.");
  }

  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const prompt = `You are a concise academic assistant. Extract the bare essential syllabus details from the attached content.
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
}

TOPIC EXTRACTION RULES for topics:
- Extract ONLY specific academic concepts, algorithms, data structures, theorems, or techniques that a student would actually study and be tested on.
- Each topic must be a concrete, teachable unit — not a course section header or administrative description.
- VALID examples: "Binary Search Trees", "Dijkstra's Algorithm", "Central Limit Theorem", "Recursion", "Hash Tables", "Newton's Second Law", "Linked Lists", "Merge Sort", "Bayes' Theorem"
- INVALID examples: "Course Overview", "Introduction", "Syllabus Review", "Course Policies", "courseCode", "courseName", "Week 1", "Module 1", "Getting Started", "Review", "Exam Preparation", "TBD", any topic that is just the course name or code
- If a topic is vague (e.g. "Data Structures") but more specific subtopics are listed in the syllabus, extract the subtopics instead.
- Aim for 5–15 specific topics. Do not include filler or placeholder topics.`;

  const MODELS = ["gemini-2.5-flash-lite", "gemini-2.5-flash", "gemini-2.5-pro", "gemini-3.0-flash"];
  // i want to go in order from this list, if one fails, try the next one, and if all fail, throw an error


  // Strategy 1: Attempt Direct PDF Multimodal Extraction
  if (fileBuffer) {
    console.log("[Syllabus] 📄 Strategy 1: Direct PDF Multimodal Extraction...");
    for (const modelId of MODELS) {
      try {
        console.log(`[Syllabus] 🔍 Attempting with ${modelId}...`);
        const model = genAI.getGenerativeModel({ model: modelId, generationConfig: { responseMimeType: "application/json" } });
        const result = await model.generateContent([
          { text: prompt },
          { inlineData: { data: Buffer.from(fileBuffer).toString("base64"), mimeType: "application/pdf" } }
        ]);
        const data = cleanAndParse(result.response.text());
        const validated = syllabusSchema.parse(data);
        console.log(`[Syllabus] ✅ Multimodal extraction successful with ${modelId}`);
        return validated;
      } catch (err) {
        console.warn(`[Syllabus] ⚠️  Multimodal ${modelId} failed:`, err.message);
      }
    }
  }

  // Strategy 2: Fallback to Text-Based Extraction
  console.log("[Syllabus] 📄 Strategy 2: Fallback to Text-Based Extraction...");
  let textContent = rawTextFallback || "";
  if (!textContent && fileBuffer && PDFParse) {
    try {
      console.log("[Syllabus] 📑 Extracting text from PDF via pdf-parse...");
      const pdfData = await PDFParse(fileBuffer);
      textContent = pdfData.text;
    } catch (pdfErr) {
      console.error("[Syllabus] ❌ pdf-parse failed:", pdfErr.message);
    }
  }

  if (textContent) {
    for (const modelId of MODELS) {
      try {
        console.log(`[Syllabus] 🔍 Attempting text extraction with ${modelId}...`);
        const model = genAI.getGenerativeModel({ model: modelId, generationConfig: { responseMimeType: "application/json" } });
        const result = await model.generateContent([
          { text: prompt },
          { text: `Syllabus Content:\n${textContent}` }
        ]);
        const data = cleanAndParse(result.response.text());
        const validated = syllabusSchema.parse(data);
        console.log(`[Syllabus] ✅ Text extraction successful with ${modelId}`);
        return validated;
      } catch (err) {
        console.warn(`[Syllabus] ⚠️  Text extraction ${modelId} failed:`, err.message);
      }
    }
  }

  throw new Error("Syllabus extraction failed across all models and strategies.");
};

/**
 * Normalize a raw AI-extracted course code to a clean CS3341-style format.
 * Examples:
 *   "CS/CE/SE 3345.007" → "CS3345"
 *   "CS 3341"           → "CS3341"
 *   "MATH 2413"         → "MATH2413"
 *   "PHYS 2305"         → "PHYS2305"
 */
const normalizeCourseCode = (raw = '') => {
  if (!raw) return '';
  const deptMatch = raw.match(/[A-Za-z]+/);
  const numMatch = raw.match(/\d{4}/);
  if (deptMatch && numMatch) {
    return `${deptMatch[0].toUpperCase()}${numMatch[0]}`;
  }
  // Fallback: strip everything non-alphanumeric
  return raw.replace(/[^A-Za-z0-9]/g, '').toUpperCase();
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
    savedTasks: savedTasks,
    normalizedCourseCode: normalizeCourseCode(courseCode)
  };
};

module.exports = {
  extractSyllabusData,
  saveSyllabusData,
  normalizeCourseCode
};
