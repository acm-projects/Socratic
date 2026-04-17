const { Pool } = require('pg');
const { randomUUID } = require('crypto');
require('dotenv').config({ path: 'backend/.env' });

async function verifySessionsIsolation() {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });

  const userA = "SECURE_A_" + Date.now();
  const userB = "SECURE_B_" + Date.now();
  const classCode = "SECURE_ISOLATION_TEST";

  console.log(`\n🚀 Final Lockdown Verification: Session Isolation...`);

  try {
    // 0. Setup mock users and class
    console.log(`Step 0: Creating mock users and class...`);
    await pool.query('INSERT INTO "User" (id, email) VALUES ($1, $2), ($3, $4) ON CONFLICT DO NOTHING', [
      userA, `${userA}@test.com`,
      userB, `${userB}@test.com`
    ]);
    await pool.query('INSERT INTO classes (class_code, name, subject, user_id) VALUES ($1, $2, $3, $4) ON CONFLICT DO NOTHING', [
      classCode, "Isolation Test Class", "Privacy", userA
    ]);

    // 1. Setup mock topic
    const topicId = randomUUID();
    await pool.query(
      "INSERT INTO topics (id, class_code, name) VALUES ($1, $2, $3) ON CONFLICT DO NOTHING",
      [topicId, classCode, "Isolation Topic"]
    );

    // 2. Insert sessions
    console.log(`Step 1: Inserting sessions for both users...`);
    const sessionA = randomUUID();
    const sessionB = randomUUID();
    
    await pool.query(
      "INSERT INTO chat_sessions (session_id, class_code, user_id, topic_id, title) VALUES ($1, $2, $3, $4, $5)",
      [sessionA, classCode, userA, topicId, "User A Secret Session"]
    );
    await pool.query(
      "INSERT INTO chat_sessions (session_id, class_code, user_id, topic_id, title) VALUES ($1, $2, $3, $4, $5)",
      [sessionB, classCode, userB, topicId, "User B Secret Session"]
    );

    // 3. Test Model directly (getSessionsByUserId)
    const chatSessionModel = require('../backend/models/chatSessionModel');
    
    console.log(`Step 2: Testing Model filtering for User A...`);
    const resultsA = await chatSessionModel.getSessionsByUserId(userA);
    const hasA = resultsA.some(s => s.session_id === sessionA);
    const hasB = resultsA.some(s => s.session_id === sessionB);

    if (hasA && !hasB) {
      console.log(`✅ Model PASS: User A only sees their own session.`);
    } else {
      console.error(`❌ Model FAIL: Isolation breach! Found B: ${hasB}, Found A: ${hasA}`);
    }

    // 4. Test Model specifically for the "Missing" getAllSessions
    if (chatSessionModel.getAllSessions === undefined) {
      console.log(`✅ Security PASS: 'getAllSessions' method has been successfully deleted.`);
    } else {
      console.error(`❌ Security FAIL: 'getAllSessions' still exists!`);
    }

    // Cleanup
    console.log(`Cleaning up...`);
    await pool.query("DELETE FROM chat_sessions WHERE user_id IN ($1, $2)", [userA, userB]);
    await pool.query('DELETE FROM "User" WHERE id IN ($1, $2)', [userA, userB]);

  } catch (error) {
    console.error(`❌ Test Error:`, error.message);
  } finally {
    await pool.end();
  }
}

verifySessionsIsolation();
