const { Pool } = require('pg');
const sharedClassModel = require('../backend/models/sharedClassModel');
const { randomUUID } = require('crypto');
require('dotenv').config({ path: 'backend/.env' });

async function verifySharedClassesPersistence() {
  const userId = "cmn9fnpv60000gox6sumckr25"; // Snigdha
  const friendId = "cmndnfpv4000ekbuaopj8a773"; // Friend
  const testClassCode = "TEST101";

  console.log(`\n🚀 Verifying Shared Classes Persistence & Sync...`);

  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });

  try {
    // 1. Manually insert a class for the user (Owner)
    console.log(`Step 1: Inserting test class ${testClassCode} for user...`);
    await pool.query(
      "INSERT INTO classes (class_code, name, subject, user_id) VALUES ($1, $2, $3, $4) ON CONFLICT DO NOTHING",
      [testClassCode, "Automated Testing Class", "Test Subject", userId]
    );

    // 2. Manually insert an enrollment for the friend (Student)
    console.log(`Step 2: Enrolling friend in the same class...`);
    await pool.query(
      "INSERT INTO user_classes (user_id, class_code) VALUES ($1, $2) ON CONFLICT DO NOTHING",
      [friendId, testClassCode]
    );

    // 3. Trigger Sync
    console.log(`Step 3: Triggering Sync via Model...`);
    await sharedClassModel.syncSharedClasses(userId);

    // 4. Verify table content
    console.log(`Step 4: Verifying shared_classes table...`);
    const result = await pool.query(
      "SELECT * FROM shared_classes WHERE user_id = $1 AND friend_id = $2 AND class_code = $3",
      [userId, friendId, testClassCode]
    );

    if (result.rows.length > 0) {
      console.log(`✅ Success! Found persisted record:`, result.rows[0]);
    } else {
      console.error(`❌ Failure! No record found in shared_classes for ${testClassCode}`);
    }

    // Cleanup
    console.log(`\nCleaning up...`);
    await pool.query("DELETE FROM shared_classes WHERE class_code = $1", [testClassCode]);
    await pool.query("DELETE FROM classes WHERE class_code = $1", [testClassCode]);

  } catch (error) {
    console.error(`❌ Test Error:`, error.message);
  } finally {
    await pool.end();
  }
}

verifySharedClassesPersistence();
