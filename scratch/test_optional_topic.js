const axios = require('axios');

async function testTutorChatWithoutTopic() {
  const url = 'http://localhost:5000/api/tutor/chat';
  const payload = {
    userId: "cmn9fnpv60000gox6sumckr25", // Valid userId (Snigdha)
    classCode: "CS3341", 
    message: "What is a variable? Please explain in simple terms."
  };

  console.log(`\n🚀 Testing POST /api/tutor/chat WITHOUT topic parameter...`);
  console.log(`Payload:`, JSON.stringify(payload, null, 2));

  try {
    const response = await axios.post(url, payload);
    console.log(`✅ Status: ${response.status} ${response.statusText}`);
    console.log(`✅ Response Body Snapshot:`, {
        sessionId: response.data.sessionId,
        reply: response.data.reply.substring(0, 50) + "...",
        score: response.data.score
    });
    
    const sessionId = response.data.sessionId;

    // Test session persistence
    console.log(`\n🔄 Testing Session Persistence with sessionId: ${sessionId}...`);
    const secondPayload = {
      userId: "cmn9fnpv60000gox6sumckr25",
      classCode: "CS3341",
      sessionId: sessionId,
      message: "Explain it with a fruit analogy."
    };

    const secondResponse = await axios.post(url, secondPayload);
    console.log(`✅ Status: ${secondResponse.status} ${secondResponse.statusText}`);
    console.log(`✅ Response Body Snapshot:`, {
        reply: secondResponse.data.reply.substring(0, 50) + "..."
    });

  } catch (error) {
    if (error.response) {
      console.error(`❌ Request Failed with status ${error.response.status}:`, error.response.data);
    } else {
      console.error(`❌ Request Error:`, error.message);
    }
  }
}

testTutorChatWithoutTopic();
