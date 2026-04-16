/**
 * Test: Syllabus user_id propagation fix
 *
 * This script calls POST /api/syllabus/save with a user_id and verifies
 * the resulting class row in the DB has the correct user_id set.
 *
 * Usage: node scratch/test_syllabus_userid.js
 */

require('dotenv').config({ path: './backend/.env' });
const http = require('http');
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

const HOST    = 'localhost';
const PORT    = 5000;
const TEST_USER_ID   = 'test-fix-userid-check';
const TEST_CLASS_CODE = 'FIX-TEST-CS-9999';

const payload = JSON.stringify({
  courseCode:   TEST_CLASS_CODE,
  courseName:   'Debug Fix Verification Course',
  user_id:      TEST_USER_ID,
  topics:       ['Topic A', 'Topic B'],
  importantDates: [{ eventName: 'Test Exam', date: '2026-05-01' }],
  gradingPolicy: [{ category: 'Exams', weightPercentage: 100 }],
  instructor:   { name: 'Debug Prof', email: null, officeHours: null }
});

function postSave() {
  return new Promise((resolve, reject) => {
    const req = http.request({
      hostname: HOST, port: PORT,
      path: '/api/syllabus/save',
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Content-Length': payload.length }
    }, res => {
      let body = '';
      res.on('data', c => body += c);
      res.on('end', () => resolve({ status: res.statusCode, body: JSON.parse(body) }));
    });
    req.on('error', reject);
    req.write(payload);
    req.end();
  });
}

async function run() {
  // Clean up first
  await pool.query('DELETE FROM classes WHERE class_code = $1', [TEST_CLASS_CODE]).catch(() => {});

  console.log(`\n📤 POST /api/syllabus/save`);
  console.log(`   user_id    = ${TEST_USER_ID}`);
  console.log(`   class_code = ${TEST_CLASS_CODE}\n`);

  const result = await postSave();
  console.log('HTTP Status:', result.status);

  if (result.status !== 200) {
    console.error('❌ POST failed:', result.body);
    await pool.end(); process.exit(1);
  }

  // Verify DB directly
  const row = await pool.query('SELECT class_code, user_id, name FROM classes WHERE class_code = $1', [TEST_CLASS_CODE]);
  const cls = row.rows[0];

  console.log('─'.repeat(50));
  let pass = true;
  if (!cls) {
    console.error('❌ Class row not found in DB'); pass = false;
  } else if (cls.user_id !== TEST_USER_ID) {
    console.error(`❌ user_id mismatch: expected "${TEST_USER_ID}", got "${cls.user_id}"`); pass = false;
  } else {
    console.log(`✅ class_code: ${cls.class_code}`);
    console.log(`✅ user_id correctly persisted: ${cls.user_id}`);
    console.log(`✅ name: ${cls.name}`);
  }
  console.log('─'.repeat(50));
  console.log(pass ? '\n🎉 FIX VERIFIED — user_id is now persisted correctly\n' : '\n💥 FIX FAILED\n');

  // Clean up test data
  await pool.query('DELETE FROM topics WHERE class_code = $1', [TEST_CLASS_CODE]).catch(() => {});
  await pool.query('DELETE FROM class_tasks WHERE class_code = $1', [TEST_CLASS_CODE]).catch(() => {});
  await pool.query('DELETE FROM classes WHERE class_code = $1', [TEST_CLASS_CODE]).catch(() => {});
  console.log('🧹 Test data cleaned up.\n');

  await pool.end();
  process.exit(pass ? 0 : 1);
}

run().catch(err => { console.error(err); process.exit(1); });
