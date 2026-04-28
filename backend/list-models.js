const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config({ path: __dirname + '/.env' });

async function listModels() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error("❌ GEMINI_API_KEY not found in backend/.env");
    return;
  }

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
    const data = await response.json();
    
    if (data.error) {
      console.error("❌ API Error:", data.error.message);
      return;
    }

    console.log("\n=== Available Models ===");
    data.models.forEach(m => {
      const name = m.name.replace('models/', '');
      const methods = m.supportedGenerationMethods.join(', ');
      console.log(`- ${name.padEnd(25)} | Methods: ${methods}`);
    });
    console.log("========================\n");
  } catch (error) {
    console.error("❌ Failed to list models:", error.message);
  }
}

listModels();
