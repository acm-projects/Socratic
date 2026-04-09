const syllabusService = require('../backend/services/syllabusService');
require('dotenv').config({ path: './backend/.env' });

async function testDetailedError() {
  console.log("Testing detailed error reporting...");
  
  // This text will confuse the AI into potentially missing required fields
  // if we don't provide a proper syllabus.
  // Or I can mock the AI response in a real test?
  // Let's just use the service with a text that might cause ambiguity.
  const badText = "This is not a syllabus. It just has some words about a dog.";

  try {
    const result = await syllabusService.extractSyllabusData(null, badText);
    console.log("SUCCESS (Unexpected):", result);
  } catch (error) {
    if (error.name === "ZodError") {
      console.log("Validation Failed as expected.");
      console.log("Step: Validation");
      console.log("Raw Data Found:", !!error.rawData);
      if (error.rawData) {
        console.log("Raw Data Snippet:", JSON.stringify(error.rawData).substring(0, 100));
      }
      console.log("Errors:", error.errors.length);
    } else {
      console.error("Unknown Error:", error);
    }
  }
}

testDetailedError();
