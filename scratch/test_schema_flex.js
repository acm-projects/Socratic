const { syllabusSchema } = require('../backend/utils/syllabusSchema');

async function testSchemaFlexibility() {
  const messyData = {
    courseName: "Flexible Course",
    courseCode: "FLEX101",
    instructor: {
      name: "Prof. Flex",
      email: "Not an emailAddress!", // Should pass now because .email() is removed
      officeHours: "By appointment only"
    },
    gradingPolicy: [
      { category: "Participation", weightPercentage: "15" }, // Should pass because of .coerce.number()
      { category: "Exams", weightPercentage: 85 }
    ],
    importantDates: [
      { eventName: "Midterm", date: "2026-04-15" }
    ],
    topics: ["Basics"]
  };

  try {
    console.log("Testing schema with messy data...");
    const validated = syllabusSchema.parse(messyData);
    console.log("Validation Successful!", JSON.stringify(validated, null, 2));
  } catch (err) {
    console.error("Validation Failed:", err.errors);
  }
}

testSchemaFlexibility();
