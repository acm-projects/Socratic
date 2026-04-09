const syllabusService = require('../backend/services/syllabusService');
require('dotenv').config({ path: './backend/.env' });

async function testExtraction() {
  const mockText = `
    Course: CS 3377 - Systems Programming in Unix
    Instructor: Dr. John Doe
    
    Grading:
    Quizzes: 20%
    Midterm: 30%
    Final Exam: 50%
    
    Schedule:
    Quiz 1: 2026-04-15
    Midterm Exam: 2026-05-10
    Final Project: 2026-06-05
    
    Topics:
    Unix Architecture
    Process Management
    Shell Scripting
  `;

  try {
    console.log("Testing Extraction...");
    const extractedData = await syllabusService.extractSyllabusData(null, mockText);
    console.log("Extracted Data:", JSON.stringify(extractedData, null, 2));

    console.log("\nTesting Save...");
    const savedResult = await syllabusService.saveSyllabusData(extractedData);
    console.log("Saved Result:", JSON.stringify(savedResult, null, 2));

  } catch (err) {
    console.error("Test failed:", err);
  }
}

testExtraction();
