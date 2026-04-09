let PDFParse;
try {
  const pdfModule = require("pdf-parse");
  // Some environments require .default, others export the function directly
  PDFParse = typeof pdfModule === 'function' ? pdfModule : (pdfModule.default || pdfModule.PDFParse);
} catch (error) {
  console.warn("pdf-parse failed to load:", error.message);
}

const { ChatGoogleGenerativeAI } = require("@langchain/google-genai");
const { ChatPromptTemplate } = require("@langchain/core/prompts");
const { JsonOutputParser } = require("@langchain/core/output_parsers");

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
  console.log(`[Syllabus] 🛠️  Processing extraction... (Buffer: ${!!fileBuffer}, Fallback: ${!!rawTextFallback})`);
  let pdfText = "";

  if (fileBuffer) {
    console.log("[Syllabus] 📄 Extracting text from PDF buffer...");
    if (!PDFParse) {
      throw new Error("PDF parsing is currently unavailable on this server.");
    }
    
    let pdfData;
    try {
      // Try as a normal function call (standard for most versions)
      pdfData = await PDFParse(fileBuffer);
    } catch (err) {
      // Handle the case where PDFParse is a class constructor (modern/forked versions)
      if (err.message.includes("Class constructors cannot be invoked without 'new'")) {
        console.log("[Syllabus] 🔄 PDFParse used as class constructor.");
        pdfData = await new PDFParse(fileBuffer);
      } else {
        throw err;
      }
    }
    pdfText = pdfData.text;
    console.log(`[Syllabus] ✅ Text extracted (${pdfText.length} chars)`);
  } else if (rawTextFallback) {
    console.log("[Syllabus] 📝 Using provided pdfText fallback.");
    pdfText = rawTextFallback;
  } else {
    throw new Error("No PDF file or pdfText provided.");
  }

  if (!process.env.GEMINI_API_KEY) {
    throw new Error("Missing GEMINI_API_KEY in backend/.env file.");
  }

  // 1. Initialize LangChain Google AI model
  const model = new ChatGoogleGenerativeAI({
    model: "gemini-2.5-flash",
    apiKey: process.env.GEMINI_API_KEY,
    temperature: 0.1,
    maxRetries: 3,
  });

  // 2. Define the extraction prompt using ChatPromptTemplate
  const promptTemplate = ChatPromptTemplate.fromMessages([
    ["system", `You are an expert academic assistant specialized in syllabus parsing. 
Extract the syllabus constraints and structure exactly. 
CRITICAL: You must identify all major course deadlines including Quizzes, Tests, Exams, and Assignments from the calendar/schedule section.
If any specific detail (like email or office hours) is not found, use null instead of guessing or providing placeholders like "TBA".`],
    ["human", `Extract syllabus data from the following text. 
Return ONLY valid JSON data that matches this schema:
{{
  "courseName": "The full name of the course",
  "courseCode": "The course identifier (e.g. CS101)",
  "instructor": {{ 
    "name": "Full name", 
    "email": "email address if found", 
    "officeHours": "office hours if found" 
  }},
  "gradingPolicy": [ 
    {{ "category": "e.g. Homework, Midterm, Final", "weightPercentage": 20 }} 
  ],
  "//": "IMPORTANT: For weightPercentage, return ONLY the raw number. DO NOT include '%' signs (e.g. return 20, not '20%').",
  "importantDates": [ 
    {{ "eventName": "Name of quiz, exam, or assignment", "date": "YYYY-MM-DD" }} 
  ],
  "topics": [
    "Academic Topic (e.g. Intro to Arrays). EXCLUDE exams/holidays."
  ]
}}

Syllabus Text:
{text}`]
  ]);

  // 3. Create the LangChain sequence (Chain)
  const jsonParser = new JsonOutputParser();
  const chain = promptTemplate.pipe(model).pipe(jsonParser);

  console.log("[Syllabus] 🤖 Invoking LangChain extraction chain...");
  
  try {
    const aiGeneratedData = await chain.invoke({ text: pdfText });
    console.log("[Syllabus] 📄 Raw AI Output received:", JSON.stringify(aiGeneratedData, null, 2));
    
    // Validate with Zod
    console.log("[Syllabus] 🔍 Validating against schema...");
    try {
      const validatedData = syllabusSchema.parse(aiGeneratedData);
      console.log("[Syllabus] ✅ Validation successful.");
      return validatedData;
    } catch (zodErr) {
      console.error("[Syllabus] ❌ Schema Validation FAILED.");
      // Attach the raw data to the error so routes can return it
      zodErr.rawData = aiGeneratedData;
      throw zodErr;
    }
  } catch (error) {
    if (error.name !== "ZodError") {
      console.error("[Syllabus] ❌ LangChain Extraction failed:", error.message);
    }
    throw error;
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
