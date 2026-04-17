const axios = require('axios');

async function testRagImprovement() {
  const url = 'http://localhost:5000/api/tutor/chat';
  const payload = {
    userId: "cmn9fnpv60000gox6sumckr25", 
    classCode: "CS3341", 
    message: "Based on Lecture 15, what are some common examples of discrete random variables?"
  };

  console.log(`\n🚀 Testing RAG Improvement for 'Lecture 15' WITHOUT explicit topic...`);
  console.log(`Payload:`, JSON.stringify(payload, null, 2));

  try {
    const response = await axios.post(url, payload);
    console.log(`✅ Status: ${response.status} ${response.statusText}`);
    console.log(`✅ AI Response Summary:`, response.data.reply.substring(0, 500));
    
    // Check if the AI acknowledges lecture content
    if (response.data.reply.toLowerCase().includes("lecture 15") || response.data.reply.toLowerCase().includes("discrete")) {
        console.log(`\n🎉 Success! The AI seems to have found the relevant lecture context.`);
    } else {
        console.log(`\n⚠️ Warning: The response might still be missing specific lecture context.`);
    }

  } catch (error) {
    if (error.response) {
      console.error(`❌ Request Failed:`, error.response.data);
    } else {
      console.error(`❌ Request Error:`, error.message);
    }
  }
}

testRagImprovement();
