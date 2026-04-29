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
    // Parse PDF to text first — text payloads are ~10x smaller than binary blobs
    // and are far less likely to be throttled by the Gemini API under high load.
    if (PDFParse) {
      try {
        console.log("[Syllabus] 📄 Parsing PDF to text for lighter Gemini payload...");
        const parsed = await PDFParse(fileBuffer);
        const extractedText = parsed.text?.trim();
        if (extractedText && extractedText.length > 100) {
          contentParts.push({ text: `Syllabus Text:\n${extractedText}` });
          console.log(`[Syllabus] 📄 PDF parsed to text (${extractedText.length} chars). Sending as text.`);
        } else {
          throw new Error("Parsed text too short, falling back to binary.");
        }
      } catch (parseErr) {
        console.warn("[Syllabus] ⚠️ PDF text parse failed, falling back to binary blob:", parseErr.message);
        contentParts.push({
          inlineData: {
            data: Buffer.from(fileBuffer).toString("base64"),
            mimeType: "application/pdf"
          }
        });
      }
    } else {
      // pdf-parse not available, send binary blob directly
      console.log("[Syllabus] 📄 Preparing raw PDF for Gemini (pdf-parse unavailable)...");
      contentParts.push({
        inlineData: {
          data: Buffer.from(fileBuffer).toString("base64"),
          mimeType: "application/pdf"
        }
      });
    }
  } else if (rawTextFallback) {
    contentParts.push({ text: `Syllabus Text:\n${rawTextFallback}` });
  } else {
    throw new Error("No PDF file or pdfText provided.");
  }

  const prompt = `Extract all relevant course information into the requested JSON format.

TOPIC EXTRACTION RULES (apply in strict order):
1. NEVER use the "+" symbol in any topic entry, under any circumstances.
2. ONE CONCEPT PER ENTRY: If a source document lists two concepts together (joined by "+", "and", ",", or any conjunction), split them into two separate topic entries UNLESS the combined phrase is an inseparable named concept (e.g. "Mean and Variance" is fine because they are always taught together, but "Bayes Theorem + Monty Hall Problem" must become two entries: "Bayes Theorem" and "Monty Hall Problem").
3. LOWERCASE CONJUNCTIONS: When the word "and" appears inside a topic name, it must always be fully lowercase (e.g. "Poisson, Exponential, and Gamma Distributions" — not "And").
4. STRIP FILLER OPENERS: Remove vague academic prefixes that add no meaning. Strip phrases like "Introduction to", "Basics of", "Overview of", "Typical Questions", "Course Review", "An Introduction To", or any variant. Extract only the core noun phrase (e.g. "Discrete Random Variables" not "Introduction to Discrete Random Variables", "Distributions" not "An Introduction To Distributions").
5. BE SPECIFIC: Prefer the precise mathematical or statistical concept over broad headings. "Binary Search Trees" not "Data Structures". "Bayes Theorem" not "Probability Concepts".
6. SEPARATE WHEN POSSIBLE: If trimming a compound phrase yields two valid standalone topics (each ≥ 2 words), emit them as two entries. Only merge if the concepts are truly inseparable and always co-taught.
7. Every topic entry must be at least 2 words — never extract single-word topics.
8. Do NOT include exams, quizzes, midterms, labs, or any assessment events as topics.
9. Scan ALL sections — weekly schedule, learning outcomes, module list, course description — and deduplicate.
10. A well-structured course should yield 15–40 distinct topic entries.
11. Capitalize all topic entries in Title Case. The word "and" inside a topic remains lowercase per rule 3.
12. The Greek letter χ² must be preserved as-is, not converted to x².
13. When extracting from learning outcomes, extract only the topic noun phrase — not the full sentence. "Construct confidence intervals" → "Confidence Intervals".
14. When a schedule entry ends with "+ practice questions", "+ examples", or similar, omit that trailing portion.
15. Do not include vague or redundant-only entries like "Course Overview", "Probability Basics", "Typical Questions", or "Course Review" — these are not teachable concepts.
16. CONTEXT-BARE TOPICS: If a topic is a single mathematical or statistical term that sounds incomplete on its own, add the minimal necessary qualifier. Examples: "Correlation" → "Statistical Correlation", "Independence" → "Statistical Independence", "Expectation" → "Expected Value", "Regression" → "Linear Regression". Only do this when the word alone is ambiguous — do NOT add qualifiers to already-clear compound phrases.

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
  "topics": ["Apply all topic extraction rules above. Each entry is one clean, specific concept in Title Case. The word 'and' inside a topic is always lowercase. Never use '+'. Split compound entries unless inseparable. Strip filler openers. Minimum 15 entries for a full course."]
}`;

  contentParts.unshift({ text: prompt });

  const payloadType = contentParts.some(p => p.inlineData) ? 'binary PDF blob' : 'parsed text';
  console.log(`[Syllabus] 📦 Payload type: ${payloadType}`);
  console.log(`[Syllabus] 📦 Content parts count: ${contentParts.length}`);
  console.log("[Syllabus] 🤖 Starting Gemini extraction loop...");

  const modelsToTry = ["gemini-2.5-flash", "gemini-3-flash-preview", "gemini-2.5-pro"];
  let lastError;
  let totalAttempts = 0;

  for (const modelId of modelsToTry) {
    console.log(`[Syllabus] 🔄 Switching to model: ${modelId}`);
    const model = genAI.getGenerativeModel({
      model: modelId,
      generationConfig: { responseMimeType: "application/json" }
    });

    const maxRetriesPerModel = 2;
    for (let attempt = 1; attempt <= maxRetriesPerModel; attempt++) {
      totalAttempts++;
      console.log(`[Syllabus] 🚀 [${modelId}] Attempt ${attempt}/${maxRetriesPerModel} (global attempt #${totalAttempts}) — calling Gemini API...`);
      try {
        const callStart = Date.now();
        const result = await model.generateContent(contentParts);
        const response = await result.response;
        const elapsed = Date.now() - callStart;
        console.log(`[Syllabus] ⏱️  [${modelId}] Gemini responded in ${elapsed}ms`);
        const aiResponseText = response.text();
        console.log(`[Syllabus] 📝 [${modelId}] Raw response length: ${aiResponseText.length} chars`);
        const aiGeneratedData = JSON.parse(aiResponseText);

        console.log(`[Syllabus] 📄 Raw AI Output received from ${modelId}:`, JSON.stringify(aiGeneratedData, null, 2));

        // Validate with Zod
        console.log("[Syllabus] 🔍 Validating against schema...");
        try {
          const validatedData = syllabusSchema.parse(aiGeneratedData);
          console.log(`[Syllabus] ✅ Validation successful using ${modelId} (attempt #${totalAttempts}).`);
          return validatedData;
        } catch (zodErr) {
          console.error(`[Syllabus] ❌ Schema Validation FAILED for ${modelId}.`);
          console.error(`[Syllabus] ❌ Zod errors:`, JSON.stringify(zodErr.errors, null, 2));
          zodErr.rawData = aiGeneratedData;
          throw zodErr;
        }
      } catch (error) {
        lastError = error;
        const is503 = error.message?.includes("503") || error.message?.includes("Service Unavailable");
        const is429 = error.message?.includes("429");
        const isExhausted = error.message?.includes("RESOURCE_EXHAUSTED") || error.message?.includes("quota");
        const isRetryable = is503 || is429 || isExhausted;

        console.error(`[Syllabus] ❌ [${modelId}] Attempt ${attempt} FAILED:`);
        console.error(`[Syllabus]    Error type : ${error.name || 'Unknown'}`);
        console.error(`[Syllabus]    Message    : ${error.message}`);
        console.error(`[Syllabus]    Is 503     : ${is503}`);
        console.error(`[Syllabus]    Is 429     : ${is429}`);
        console.error(`[Syllabus]    Is EXHAUSTED: ${isExhausted}`);
        console.error(`[Syllabus]    Is retryable: ${isRetryable}`);

        if (isRetryable && attempt < maxRetriesPerModel) {
          const waitTime = attempt === 1 ? 5000 : 10000;
          console.warn(`[Syllabus] ⏳ [${modelId}] Retryable error. Waiting ${waitTime / 1000}s before retry...`);
          await new Promise(resolve => setTimeout(resolve, waitTime));
          continue;
        }

        console.error(`[Syllabus] ⏭️  [${modelId}] No more retries (attempt=${attempt}, maxRetries=${maxRetriesPerModel}, retryable=${isRetryable}). Moving to next model.`);
        break;

      }
    }
  }

  // If we reach here, all models failed
  console.error("[Syllabus] 🛑 All models failed to extract syllabus data.");
  throw lastError || new Error("Failed to extract syllabus data after trying multiple models.");
};

const saveSyllabusData = async (payload) => {
  const { courseName, courseCode, topics, importantDates, instructor, ta, gradingPolicy, user_id } = payload;

  // Priority-ordered subject prefixes — CS beats STAT/SE when multiple appear (e.g. "STAT/CS/SE 385")
  const SUBJECT_PRIORITY = ['CS', 'SE', 'ECE', 'EE', 'CE', 'IE', 'MATH', 'STAT', 'PHYS', 'CHEM'];

  // Extract the numeric portion from the raw course code string
  const numericMatch = courseCode.match(/\d+/);

  // Split on '/' or whitespace to find all candidate subject prefixes
  const candidatePrefixes = courseCode
    .split(/[\/\s]+/)
    .map(p => p.replace(/[^a-zA-Z]/g, '').toUpperCase())
    .filter(p => p.length > 0 && /^[a-zA-Z]+$/.test(p)); // letters-only segments

  // Pick the highest-priority prefix by iterating SUBJECT_PRIORITY order (not candidate order).
  // e.g. for ["STAT","CS","SE"], SUBJECT_PRIORITY.find(...) returns "CS" because CS comes first in the list.
  let chosenPrefix = SUBJECT_PRIORITY.find(p => candidatePrefixes.includes(p))
    || candidatePrefixes[0]
    || courseCode.match(/[a-zA-Z]+/)?.[0]?.toUpperCase()
    || '';

  const safeCourseCode = (chosenPrefix && numericMatch)
    ? (chosenPrefix + numericMatch[0]).toUpperCase().trim()
    : courseCode.split('.')[0].replace(/[^a-zA-Z0-9]/g, '').toUpperCase().trim();

  const subject = chosenPrefix || courseName.split(' ')[0].toUpperCase();

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
