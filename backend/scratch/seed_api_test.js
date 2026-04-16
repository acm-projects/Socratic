const db = require('../db');
const crypto = require('crypto');

async function seedTestTasks() {
  const userId = 'user_test_api_v1';
  const classCode = 'CS_API_101';
  
  console.log(`[Test] Seeding data for User: ${userId}, Class: ${classCode}...`);
  
  try {
    // Cleanup
    await db.query('DELETE FROM class_tasks WHERE class_code = $1', [classCode]);
    await db.query('DELETE FROM user_classes WHERE user_id = $1', [userId]);
    await db.query('DELETE FROM classes WHERE class_code = $1', [classCode]);
    await db.query('DELETE FROM "User" WHERE id = $1', [userId]);

    // Insert User
    await db.query('INSERT INTO "User" (id, email) VALUES ($1, $2)', [userId, `api_test@example.com`]);
    
    // Insert Class
    await db.query('INSERT INTO classes (class_code, name, subject) VALUES ($1, $2, $3)', [classCode, 'API Test Course', 'CS']);
    
    // Enroll User
    await db.query('INSERT INTO user_classes (user_id, class_code) VALUES ($1, $2)', [userId, classCode]);
    
    // Insert Upcoming Task (Tomorrow)
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowStr = tomorrow.toISOString().split('T')[0];
    
    await db.query('INSERT INTO class_tasks (id, class_code, task_name, due_date) VALUES ($1, $2, $3, $4)', 
      [crypto.randomUUID(), classCode, 'Upcoming Assignment', tomorrowStr]);

    // Insert Another Upcoming Task (Next Week)
    const nextWeek = new Date();
    nextWeek.setDate(nextWeek.getDate() + 7);
    const nextWeekStr = nextWeek.toISOString().split('T')[0];
    
    await db.query('INSERT INTO class_tasks (id, class_code, task_name, due_date) VALUES ($1, $2, $3, $4)', 
      [crypto.randomUUID(), classCode, 'Term Project', nextWeekStr]);

    console.log('[Test] ✅ Seeded 2 upcoming tasks.');
    
  } catch (err) {
    console.error('[Test] ❌ Seeding failed:', err.message);
  } finally {
    process.exit();
  }
}

seedTestTasks();
