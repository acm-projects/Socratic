async function testStreamingSpeed() {
  const url = 'http://localhost:5000/api/tutor/chat/stream';
  const payload = {
    message: "What is a chemical bond? Explain it simply.",
    userId: "cmndnfpv4000ekbuaopj8a773", // Mariam's ID
    classCode: "CHEM1203",
    topic: "General Discussion",
    chatId: "test-speed-" + Date.now()
  };

  console.log("🚀 Testing streaming speed (Node v25 Native Fetch)...");
  const start = Date.now();
  let firstPacketTime = null;
  let firstTokenTime = null;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunkStr = decoder.decode(value, { stream: true });
      
      if (!firstPacketTime && chunkStr.includes('data:')) {
        firstPacketTime = Date.now() - start;
        console.log(`⏱️  TIME TO FIRST PACKET (Metadata): ${firstPacketTime}ms`);
      }
      
      if (!firstTokenTime && chunkStr.includes('"type":"chunk"')) {
        firstTokenTime = Date.now() - start;
        console.log(`✨ TIME TO FIRST AI TOKEN: ${firstTokenTime}ms`);
        // We got the first token, we can stop now
        break;
      }

      // If we see "done", stop
      if (chunkStr.includes('"type":"done"')) break;
    }

    return { firstPacketTime, firstTokenTime };

  } catch (err) {
    console.error("❌ Test failed:", err.message);
  }
}

testStreamingSpeed().then(res => {
    if (res) {
        console.log("\n📊 Final Results:");
        console.log(`Initial Metadata (incl. Score): ${res.firstPacketTime}ms`);
        console.log(`First AI Word Streamed:       ${res.firstTokenTime}ms`);
        console.log("\n(Previous benchmark was ~1300-1500ms)");
    }
    process.exit(0);
});
