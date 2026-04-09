const syllabusService = require('../backend/services/syllabusService');
require('dotenv').config({ path: './backend/.env' });

async function testSave() {
  const mockPayload = {
    courseName: "Systems Programming in Unix",
    courseCode: "CS-SE-3377-0W1",
    instructor: {
      name: "Dr. John Doe",
      email: "john.doe@example.com",
      officeHours: "MW 2pm-4pm"
    },
    gradingPolicy: [
      { category: "Quizzes", weightPercentage: 20 },
      { category: "Midterm", weightPercentage: 30 }
    ],
    importantDates: [
      { eventName: "Quiz 1", date: "2026-04-15" },
      { eventName: "Midterm Exam", date: "2026-05-10" }
    ],
    topics: [
      "Introduction",
      "Memory Management"
    ]
  };

  try {
    console.log("Testing Save with mock payload...");
    const savedResult = await syllabusService.saveSyllabusData(mockPayload);
    console.log("Saved Result:", JSON.stringify(savedResult, null, 2));

  } catch (err) {
    console.error("Save test failed:", err);
  }
}

testSave();
