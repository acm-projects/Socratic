/**
 * Tests for user-scoped class creation and syllabus save.
 * Cleans up all TEST-* rows before and after.
 */
const { Pool } = require('pg');
require('dotenv').config({ path: '../.env' });
const classModel = require('../models/classModel');
const syllabusService = require('../services/syllabusService');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

let pass = 0;
let fail = 0;

function assert(label, condition) {
  if (condition) {
    console.log(`  ✅ ${label}`);
    pass++;
  } else {
    console.log(`  ❌ FAIL: ${label}`);
    fail++;
  }
}

async function cleanup() {
  await pool.query("DELETE FROM class_tasks    WHERE class_code LIKE 'TEST-%'");
  await pool.query("DELETE FROM topics         WHERE class_code LIKE 'TEST-%'");
  await pool.query("DELETE FROM syllabus_info  WHERE class_code LIKE 'TEST-%'");
  await pool.query("DELETE FROM chat_sessions  WHERE class_code LIKE 'TEST-%'");
  await pool.query("DELETE FROM classes        WHERE class_code LIKE 'TEST-%'");
}

async function run() {
  await cleanup();
  console.log('\n🧹 Cleaned up TEST-* rows\n');

  // ──────────────────────────────────────────────
  // TEST 1: Brand new class, no conflict
  // ──────────────────────────────────────────────
  console.log('TEST 1: New class, no conflict');
  const t1 = await classModel.createClass({
    class_code: 'TEST-NEW',
    subject: 'TEST',
    name: 'New Class',
    user_id: 'user-aaaa-0001'
  });
  assert('class_code is TEST-NEW (no suffix)', t1.class_code === 'TEST-NEW');
  assert('user_id is user-aaaa-0001', t1.user_id === 'user-aaaa-0001');

  // ──────────────────────────────────────────────
  // TEST 2: Same user re-creates existing class → return existing
  // ──────────────────────────────────────────────
  console.log('\nTEST 2: Same user re-creates existing class');
  const t2 = await classModel.createClass({
    class_code: 'TEST-NEW',
    subject: 'TEST',
    name: 'Updated Name',
    user_id: 'user-aaaa-0001'
  });
  assert('Returns same class_code', t2.class_code === 'TEST-NEW');
  assert('Same user_id returned', t2.user_id === 'user-aaaa-0001');

  const dupCheck = await pool.query("SELECT COUNT(*) FROM classes WHERE class_code LIKE 'TEST-NEW%'");
  assert('Only one row in DB (no duplicates)', dupCheck.rows[0].count === '1');

  // ──────────────────────────────────────────────
  // TEST 3: Different user uploads same class code → scoped
  // ──────────────────────────────────────────────
  console.log('\nTEST 3: Different user uploads same class code');
  const t3 = await classModel.createClass({
    class_code: 'TEST-NEW',
    subject: 'TEST',
    name: 'User B Class',
    user_id: 'user-bbbb-2222'
  });
  assert('User B gets a different code (scoped)', t3.class_code !== 'TEST-NEW');
  assert('Scoped code ends with -2222', t3.class_code === 'TEST-NEW-2222');
  assert('user_id is user-bbbb-2222', t3.user_id === 'user-bbbb-2222');

  const rowCheck = await pool.query("SELECT class_code FROM classes WHERE class_code LIKE 'TEST-NEW%' ORDER BY class_code");
  assert('Two separate rows exist in DB', rowCheck.rowCount === 2);
  console.log('  DB rows:', rowCheck.rows.map(r => r.class_code));

  // ──────────────────────────────────────────────
  // TEST 4: saveSyllabusData — no conflict, child records under correct code
  // ──────────────────────────────────────────────
  console.log('\nTEST 4: saveSyllabusData — no conflict');
  const r1 = await syllabusService.saveSyllabusData({
    courseCode: 'TEST-SYL',
    courseName: 'Test Syllabus Class',
    user_id: 'user-cccc-3333',
    topics: ['Binary Trees', 'Sorting'],
    importantDates: [{ eventName: 'Exam 1', date: '2026-12-01' }],
    instructor: null, ta: null, gradingPolicy: null
  });
  assert('savedClass.class_code is TEST-SYL', r1.savedClass.class_code === 'TEST-SYL');
  const topics1 = await pool.query("SELECT class_code FROM topics WHERE class_code = 'TEST-SYL'");
  const tasks1  = await pool.query("SELECT class_code FROM class_tasks WHERE class_code = 'TEST-SYL'");
  assert('Topics saved under TEST-SYL', topics1.rowCount === 2);
  assert('Tasks saved under TEST-SYL', tasks1.rowCount === 1);

  // ──────────────────────────────────────────────
  // TEST 5: saveSyllabusData — conflict: child records under SCOPED code
  // ──────────────────────────────────────────────
  console.log('\nTEST 5: saveSyllabusData — conflict, child records under scoped code');
  const r2 = await syllabusService.saveSyllabusData({
    courseCode: 'TEST-SYL',
    courseName: 'Test Syllabus Class',
    user_id: 'user-dddd-4444',
    topics: ['Graphs'],
    importantDates: [{ eventName: 'Quiz 1', date: '2026-12-05' }],
    instructor: null, ta: null, gradingPolicy: null
  });
  const scopedCode = r2.savedClass.class_code;
  console.log('  Scoped code for user-dddd-4444:', scopedCode);
  assert('Conflict: class_code is scoped (not TEST-SYL)', scopedCode !== 'TEST-SYL');
  assert('Scoped code is TEST-SYL-4444', scopedCode === 'TEST-SYL-4444');

  const topics2 = await pool.query("SELECT class_code FROM topics WHERE class_code = $1", [scopedCode]);
  const tasks2  = await pool.query("SELECT class_code FROM class_tasks WHERE class_code = $1", [scopedCode]);
  assert('Topics saved under scoped code', topics2.rowCount === 1);
  assert('Tasks saved under scoped code', tasks2.rowCount === 1);

  const topics1again = await pool.query("SELECT class_code FROM topics WHERE class_code = 'TEST-SYL'");
  assert("Original user's topics still intact under TEST-SYL", topics1again.rowCount === 2);

  // ──────────────────────────────────────────────
  // CLEANUP
  // ──────────────────────────────────────────────
  await cleanup();
  console.log('\n🧹 Cleaned up TEST-* rows\n');

  console.log('══════════════════════════════════');
  console.log(`Results: ${pass} passed, ${fail} failed`);
  console.log(fail === 0 ? '🟢 ALL TESTS PASSED — safe to push' : '🔴 FAILURES — do NOT push');
  console.log('══════════════════════════════════');

  await pool.end();
  process.exit(fail > 0 ? 1 : 0);
}

run().catch(err => {
  console.error('Test runner crashed:', err.message);
  process.exit(1);
});
