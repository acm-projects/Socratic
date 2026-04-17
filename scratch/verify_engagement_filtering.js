const { Pool } = require('pg');
const { randomUUID } = require('crypto');
require('dotenv').config({ path: 'backend/.env' });

async function verifyEngagementFiltering() {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });

  const userId = "ENGAGE_TEST_" + Date.now();
  const classCode = "GHOST_CLASS_101";
  const className = "Ghost Biology";

  console.log(`\n🚀 Verifying Engagement Chart Filtering & Cleanup...`);

  try {
    // 0. Setup mock data
    console.log(`Step 0: Creating user, class, and engagement...`);
    await pool.query('INSERT INTO "User" (id, email) VALUES ($1, $2)', [userId, `${userId}@test.com`]);
    await pool.query('INSERT INTO classes (class_code, name, subject, user_id) VALUES ($1, $2, $3, $4)', [
      classCode, className, "Science", userId
    ]);
    await pool.query(
      "INSERT INTO class_engagement (id, user_id, class_name, question_count, week_start) VALUES ($1, $2, $3, $4, $5)",
      [randomUUID(), userId, className, 10, new Date()]
    );

    // 1. Verify it shows up currently
    const { rows: initial } = await pool.query(
      `SELECT ce.class_name FROM class_engagement ce WHERE ce.user_id = $1 AND ce.class_name IN (
         SELECT c.name FROM classes c WHERE c.user_id = $1
       )`,
      [userId]
    );

    if (initial.some(r => r.class_name === className)) {
      console.log(`✅ Initial State: Engagement shows up for active class.`);
    } else {
      throw new Error("Initial state failed: engagement record missing.");
    }

    // 2. Test Filtering: Change the "ownership" so it's not active for our user
    console.log(`Step 1: Testing filtering by making class inactive...`);
    await pool.query('UPDATE classes SET user_id = $1 WHERE class_code = $2', ['ANOTHER_USER', classCode]);

    const { rows: filtered } = await pool.query(
      `SELECT ce.class_name FROM class_engagement ce WHERE ce.user_id = $1 AND ce.class_name IN (
         SELECT c.name FROM classes c WHERE c.user_id = $1
       )`,
      [userId]
    );

    if (filtered.length === 0) {
      console.log(`✅ PASS: Engagement chart HIDES data for inactive/un-enrolled classes.`);
    } else {
      console.error(`❌ FAIL: Engagement record still visible for inactive class!`);
    }

    // 3. Test Cleanup: Restore ownership then simulate the DELETE logic from server.js
    console.log(`Step 2: Testing cleanup on DELETE...`);
    await pool.query('UPDATE classes SET user_id = $1 WHERE class_code = $2', [userId, classCode]);
    
    // Simulate DELETE route logic
    const { rows: deleted } = await pool.query(
      "DELETE FROM classes WHERE class_code = $1 AND user_id = $2 RETURNING *",
      [classCode, userId]
    );
    const deletedClass = deleted[0];
    await pool.query(
      "DELETE FROM class_engagement WHERE user_id = $1 AND class_name = $2",
      [userId, deletedClass.name]
    );

    const { rows: finalCheck } = await pool.query("SELECT * FROM class_engagement WHERE user_id = $1", [userId]);
    if (finalCheck.length === 0) {
      console.log(`✅ PASS: Engagement records successfully purged on class deletion.`);
    } else {
      console.error(`❌ FAIL: Engagement records remained after class was deleted!`);
    }

    // Final Cleanup
    await pool.query('DELETE FROM "User" WHERE id = $1', [userId]);

  } catch (error) {
    console.error(`❌ Test Error:`, error.message);
  } finally {
    await pool.end();
  }
}

verifyEngagementFiltering();
