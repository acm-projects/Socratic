const axios = require('axios');
const { Pool } = require('pg');
require('dotenv').config({ path: 'backend/.env' });

async function verifyStatsIncrement() {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });

  const userId = "STAT_TEST_" + Date.now();
  const classCode = "CS101";
  const topicId = "TOPIC_TEST_" + Date.now();
  const today = new Date().toISOString().split('T')[0];

  console.log(`\n🚀 Verifying Stat & Heatmap Increments...`);

  try {
    // 0. Setup: Create a user with NULL stats (simulating a fresh user)
    console.log(`Step 0: Creating fresh user and topic...`);
    await pool.query('INSERT INTO "User" (id, email) VALUES ($1, $2)', [userId, `${userId}@test.com`]);
    // Ensure the class exists so heatmap doesn't fail on FK
    await pool.query('INSERT INTO classes (class_code, name, subject) VALUES ($1, $2, $3) ON CONFLICT DO NOTHING', [classCode, "Intro to CS", "CS"]);
    await pool.query('INSERT INTO topics (id, class_code, name) VALUES ($1, $2, $3)', [topicId, classCode, "Verification Topic"]);

    // 1. Simulate Chat
    console.log(`Step 1: Simulating AI Chat...`);
    const chatPayload = {
      userId,
      classCode,
      topic: "Verification Topic",
      message: "Explain the concept of loops."
    };

    // We call the local server (assuming it's running) OR we call the model directly.
    // Calling the model directly is safer for background testing without port conflicts.
    const userStatsModel = require('../backend/models/userStatsModel');
    
    // Simulate what tutorRoutes does
    await userStatsModel.incrementAiMessages(userId);
    await userStatsModel.updateHeatmap(userId, topicId, classCode, 4.5);

    // 2. Verify AI Messages
    console.log(`Step 2: Verifying AI Messages increment...`);
    const { rows: userRows } = await pool.query('SELECT ai_messages FROM "User" WHERE id = $1', [userId]);
    const aiMessages = userRows[0].ai_messages;
    console.log(`   -> ai_messages: ${aiMessages}`);
    
    if (aiMessages === 1) {
      console.log(`✅ PASS: AI Messages incremented from NULL/0 to 1.`);
    } else {
      console.error(`❌ FAIL: AI Messages is ${aiMessages}, expected 1.`);
    }

    // 3. Verify Heatmap
    console.log(`Step 3: Verifying Heatmap (daily_topic_metrics)...`);
    const { rows: metricRows } = await pool.query(
      'SELECT questions_asked, avg_score FROM daily_topic_metrics WHERE user_id = $1 AND topic_id = $2 AND metric_date = $3',
      [userId, topicId, today]
    );

    if (metricRows.length > 0) {
      const metric = metricRows[0];
      console.log(`   -> questions_asked: ${metric.questions_asked}`);
      console.log(`   -> avg_score: ${metric.avg_score}`);
      
      if (parseInt(metric.questions_asked) === 1) {
        console.log(`✅ PASS: Heatmap correctly recorded the first question.`);
      } else {
        console.error(`❌ FAIL: questions_asked is ${metric.questions_asked}, expected 1.`);
      }
    } else {
      console.error(`❌ FAIL: No heatmap record found for today!`);
    }

    // 4. Verify double increment
    console.log(`Step 4: Testing second increment...`);
    await userStatsModel.updateHeatmap(userId, topicId, classCode, 5.0);
    const { rows: metricRows2 } = await pool.query(
      'SELECT questions_asked, avg_score FROM daily_topic_metrics WHERE user_id = $1 AND topic_id = $2 AND metric_date = $3',
      [userId, topicId, today]
    );
    
    if (parseInt(metricRows2[0].questions_asked) === 2) {
      console.log(`✅ PASS: Heatmap correctly incremented to 2 questions.`);
    } else {
      console.error(`❌ FAIL: questions_asked is ${metricRows2[0].questions_asked}, expected 2.`);
    }

    // Cleanup
    await pool.query('DELETE FROM daily_topic_metrics WHERE user_id = $1', [userId]);
    await pool.query('DELETE FROM topics WHERE id = $1', [topicId]);
    await pool.query('DELETE FROM "User" WHERE id = $1', [userId]);

  } catch (error) {
    console.error(`❌ Test Error:`, error.message);
  } finally {
    await pool.end();
  }
}

verifyStatsIncrement();
