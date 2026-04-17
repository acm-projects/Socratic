const { Pool } = require('pg');
const taskModel = require('../backend/models/taskModel');
const friendModel = require('../backend/models/friendModel');
const { randomUUID } = require('crypto');
require('dotenv').config({ path: 'backend/.env' });

async function verifyFiltersAndProfiles() {
  const userId = "cmn9fnpv60000gox6sumckr25"; // Snigdha
  const testClass = "VERIFY_101";

  console.log(`\n🚀 Verifying Task Filtering & Profile Pictures...`);

  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });

  try {
    // 1. Setup Test Tasks
    console.log(`Step 1: Setting up past and future tasks for ${testClass}...`);
    const today = new Date();
    const yesterday = new Date(today); yesterday.setDate(today.getDate() - 1);
    const tomorrow = new Date(today); tomorrow.setDate(today.getDate() + 1);

    await pool.query("INSERT INTO classes (class_code, name, subject, user_id) VALUES ($1, $2, $3, $4) ON CONFLICT DO NOTHING", [testClass, "Verify Class", "TST", userId]);

    await pool.query("INSERT INTO class_tasks (id, class_code, task_name, due_date) VALUES ($1, $2, $3, $4), ($5, $6, $7, $8)", [
      randomUUID(), testClass, "Past Task", yesterday.toISOString().split('T')[0],
      randomUUID(), testClass, "Future Task", tomorrow.toISOString().split('T')[0]
    ]);

    // 2. Verify Task Model Filtering
    console.log(`Step 2: Checking Upcoming Tasks (Model)...`);
    const modelTasks = await taskModel.getUpcomingTasksByUserId(userId);
    const hasPast = modelTasks.some(t => t.task_name === "Past Task");
    const hasFuture = modelTasks.some(t => t.task_name === "Future Task");

    if (!hasPast && hasFuture) {
      console.log(`✅ Task Model filtering works! (Found Future, Ignored Past)`);
    } else {
      console.error(`❌ Task Model filtering failed. Past: ${hasPast}, Future: ${hasFuture}`);
    }

    // 3. Verify Profile Picture Field
    console.log(`Step 3: Checking Friend Profile Pictures...`);
    const friends = await friendModel.getFriendsByUserId(userId);
    if (friends.length > 0) {
      const friend = friends[0];
      if ('profile_pic' in friend) {
        console.log(`✅ 'profile_pic' field found in friends response: ${friend.profile_pic}`);
      } else {
        console.error(`❌ 'profile_pic' field missing from friends response.`);
      }
    } else {
      console.warn(`⚠️ No friends found for user to verify profile_pic.`);
    }

    // Cleanup
    console.log(`\nCleaning up...`);
    await pool.query("DELETE FROM class_tasks WHERE class_code = $1", [testClass]);
    await pool.query("DELETE FROM classes WHERE class_code = $1", [testClass]);

  } catch (error) {
    console.error(`❌ Verification Error:`, error.message);
  } finally {
    await pool.end();
  }
}

verifyFiltersAndProfiles();
