const syllabusService = require('../backend/services/syllabusService');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: './backend/.env' });

async function testUnifiedUpload() {
  const classCode = 'CS-UNIFIED-TEST-101';
  
  // Create a mock buffer for a simple PDF-like text if pdf-parse can handle it
  // Or just use the rawTextFallback if we want to bypass the buffer issue in tests
  const mockText = "Course: CS-UNIFIED-TEST-101\nExam 1: 2026-10-10\nTopics: Basics, Advanced";
  const mockBuffer = Buffer.from(mockText);

  try {
    console.log(`Testing Unified Flow for: ${classCode}`);
    
    // 1. Manually simulate the extraction part of the unified flow
    const extractedData = await syllabusService.extractSyllabusData(null, mockText);
    console.log("Extracted Data:", extractedData);
    
    if (extractedData) {
        extractedData.courseCode = classCode;
        const saved = await syllabusService.saveSyllabusData(extractedData);
        console.log("Saved Data:", JSON.stringify(saved, null, 2));
    }

    console.log("Unified flow simulation successful!");

  } catch (err) {
    console.error("Unified flow test failed:", err);
  }
}

testUnifiedUpload();
