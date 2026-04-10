const fetch = require('node-fetch');

async function testQuizDifficulty() {
  const url = 'http://localhost:5000/api/quizzes/generate';
  const payload = {
    classCode: "STAT-CS-SE-3341-501",
    topic: "Probability",
    numQuestions: 3,
    easy: false,
    medium: false,
    hard: true // Set only HARD to verify the AI pushes the depth
  };

  console.log(`Testing Quiz Generation (HARD MODE)...`);
  
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const data = await response.json();
    
    if (data.success) {
      console.log('✅ Quiz Generated successfully!');
      console.log('--- Questions ---');
      data.data.questions.forEach((q, i) => {
        console.log(`${i+1}. [Score: ${q.depth_score}] ${q.question}`);
      });
    } else {
      console.error('❌ Generation Failed:', data.error);
    }
  } catch (err) {
    console.error('❌ Error calling API:', err.message);
  }
}

testQuizDifficulty();
