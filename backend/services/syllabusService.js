const { PDFParse } = require("pdf-parse");
const { GoogleGenAI } = require("@google/genai");
const { syllabusSchema } = require("../utils/syllabusSchema");
const crypto = require("crypto");
const classModel = require("../models/classModel");
const topicModel = require("../models/topicModel");
const extractSyllabusData = async (fileBuffer, rawTextFallback) => {
  let pdfText = "";

  if (fileBuffer) {
    const parser = new PDFParse({ data: fileBuffer });
    const pdfData = await parser.getText();
    pdfText = pdfData.text;
    await parser.destroy();
  } else if (rawTextFallback) {
    pdfText = rawTextFallback;
  } else {
    throw new Error("No PDF file or pdfText provided.");
  }

  if (!process.env.GEMINI_API_KEY) {
    throw new Error("Missing GEMINI_API_KEY in backend/.env file. Please add it and restart the server!");
  }

  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  
  const prompt = `Extract the syllabus constraints and structure exactly from the following syllabus document text.
Return ONLY valid JSON data that rigidly matches this exact schema:
{
  "courseName": "The full name of the course",
  "courseCode": "The course identifier identifier (e.g. CS101)",
  "instructor": { 
    "name": "Full name", 
    "email": "email address if found", 
    "officeHours": "office hours if found" 
  },
  "gradingPolicy": [ 
    { "category": "e.g. Homework, Midterm, Final", "weightPercentage": 20 } 
  ],
  "importantDates": [ 
    { "eventName": "Name of exam or deadline", "date": "YYYY-MM-DD" } 
  ],
  "topics": [
    "Topic 1 (e.g. Intro to Arrays)",
    "Topic 2"
  ]
}

CRITICAL INSTRUCTIONS:
- For "topics", ONLY include actual academic course material and subjects to be learned. 
- STRICTLY EXCLUDE Exams, Midterms, Finals, Spring Break, Holidays, and "Course Review" from the topics array.

Document Text to Extract From:
${pdfText}`;

  const generateResponse = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      temperature: 0.1
    }
  });

  const aiGeneratedJsonData = JSON.parse(generateResponse.text);
  const validatedData = syllabusSchema.parse(aiGeneratedJsonData);
  
  return validatedData;
};

const saveSyllabusData = async (payload) => {
  const { courseName, courseCode, topics } = payload;
  
  // Sanitize courseCode to be URL-safe (e.g. "STAT/CS/SE 3341.501" -> "STAT-CS-SE-3341-501")
  const safeCourseCode = courseCode.replace(/[^a-zA-Z0-9]+/g, '-').replace(/^-|-$/g, '');
  
  // Extract subject from courseCode (letters only), default to the first word of courseName if no letters found
  const subjectMatch = courseCode.match(/[a-zA-Z]+/);
  const subject = subjectMatch ? subjectMatch[0].toUpperCase() : courseName.split(' ')[0];

  // Store Class - truncating to fit strict Postgres VARCHAR limits
  // classes.name is varchar(30), class_code is varchar(50)
  const classData = {
    class_code: safeCourseCode.substring(0, 50),
    subject: subject,
    name: courseName.substring(0, 30)
  };
  const newClass = await classModel.createClass(classData);

  // Store Topics
  const savedTopics = [];
  if (Array.isArray(topics)) {
    for (const topicStr of topics) {
      // topics.name is varchar(50)
      const topicData = {
        id: crypto.randomUUID(),
        class_code: safeCourseCode.substring(0, 50),
        name: topicStr.substring(0, 50)
      };
      const newTopic = await topicModel.createTopic(topicData);
      savedTopics.push(newTopic);
    }
  }

  return {
    savedClass: newClass,
    savedTopics: savedTopics
  };
};

module.exports = {
  extractSyllabusData,
  saveSyllabusData
};
