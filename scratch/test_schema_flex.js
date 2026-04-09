const { syllabusSchema } = require('../backend/utils/syllabusSchema');

async function testUltraRobustSchema() {
  const messyData = {
    courseName: "Ultra Robust Course",
    courseCode: "ROBUST101",
    instructor: {
      name: null, // Should pass because name is now nullable
      email: "not-an-email",
      officeHours: null
    },
    gradingPolicy: [
      { category: "Participation", weightPercentage: "15%" }, // Should pass because of preprocess stripping '%'
      { category: "Exams", weightPercentage: "85 percent" }   // Should also pass!
    ],
    importantDates: [
      { eventName: "Midterm", date: "2026-04-15" }
    ],
    topics: ["Basics"]
  };

  try {
    console.log("Testing ultra-robust schema with very messy data...");
    const validated = syllabusSchema.parse(messyData);
    console.log("Validation Successful!", JSON.stringify(validated, null, 2));
  } catch (err) {
    console.error("Validation Failed:", JSON.stringify(err.errors, null, 2));
  }
}

testUltraRobustSchema();
