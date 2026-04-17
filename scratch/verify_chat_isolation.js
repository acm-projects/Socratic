const { Pool } = require('pg');
const { randomUUID } = require('crypto');
require('dotenv').config({ path: 'backend/.env' });

async function verifyChatIsolation() {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });

  const userA = "USER_A_" + Date.now();
  const userB = "USER_B_" + Date.now();
  const classCode = "CS101";

  console.log(`\n🚀 Verifying Chat History Data Isolation...`);

  try {
    // 0. Ensure users exist (Foreign Key constraint)
    console.log(`Step 0: Creating mock users...`);
    await pool.query('INSERT INTO "User" (id, email) VALUES ($1, $2), ($3, $4) ON CONFLICT DO NOTHING', [
      userA, `${userA}@test.com`,
      userB, `${userB}@test.com`
    ]);

    // 1. Create a session for User A
    console.log(`Step 1: Creating session for ${userA}...`);
    const sessionA = randomUUID();
    const topicId = randomUUID();
    await pool.query(
      "INSERT INTO topics (id, class_code, name) VALUES ($1, $2, $3) ON CONFLICT DO NOTHING",
      [topicId, classCode, "Test Topic"]
    );
    await pool.query(
      "INSERT INTO chat_sessions (session_id, class_code, user_id, topic_id, title) VALUES ($1, $2, $3, $4, $5)",
      [sessionA, classCode, userA, topicId, "User A Session"]
    );

    // 2. Create a session for User B
    console.log(`Step 2: Creating session for ${userB}...`);
    const sessionB = randomUUID();
    await pool.query(
      "INSERT INTO chat_sessions (session_id, class_code, user_id, topic_id, title) VALUES ($1, $2, $3, $4, $5)",
      [sessionB, classCode, userB, topicId, "User B Session"]
    );

    // 3. Import the route or just simulate the query (since we already updated the route)
    // We'll simulate the SQL that the route now uses
    const sessionModel = require('../backend/models/chatSessionModel');
    
    console.log(`Step 3: Fetching history for ${userA}...`);
    const historyA = await sessionModel.getSessionsByUserId(userA);
    const hasA = historyA.some(s => s.session_id === sessionA);
    const hasB = historyA.some(s => s.session_id === sessionB);

    if (hasA && !hasB) {
      console.log(`✅ Isolation works! User A only sees their own session.`);
    } else {
      console.error(`❌ Isolation FAILED! User A sees: ${historyA.map(s => s.title).join(', ')}`);
    }

    // 4. Verify that missing userId returns nothing in our logic (if implemented)
    // The route actually returns 400 now, which I won't test here, but I'll check model behavior.
    console.log(`Step 4: Fetching with non-existent ID...`);
    const emptyHistory = await sessionModel.getSessionsByUserId("non-existent");
    if (emptyHistory.length === 0) {
      console.log(`✅ Security check: Non-existent ID returns empty list.`);
    }

    // Cleanup
    console.log(`Cleaning up...`);
    await pool.query("DELETE FROM chat_sessions WHERE user_id IN ($1, $2)", [userA, userB]);

  } catch (error) {
    console.error(`❌ Isolation Test Error:`, error.message);
  } finally {
    await pool.end();
  }
}

verifyChatIsolation();
