/**
 * End-to-end simulation of the ORIGINAL frontend Addcoursemodal flow.
 * Tests that topics are saved to the class_code the user navigates to.
 * Frontend sends: class_code only (no user_id) to /upload
 */
const http = require('http');
const { getAllClasses, createClass, getClassByCode } = require('../models/classModel');
const { saveSyllabusData } = require('../services/syllabusService');
const db = require('../db');

async function run() {
  let passed = 0;
  let failed = 0;

  async function test(label, fn) {
    try {
      await fn();
      console.log(`✅ PASS: ${label}`);
      passed++;
    } catch (e) {
      console.error(`❌ FAIL: ${label}\n   → ${e.message}`);
      failed++;
    }
  }

  // Cleanup test data
  const TEST_CODE = 'E2ETEST101';
  const TEST_USER = 'e2e-test-user-9999';
  await db.query("DELETE FROM topics WHERE class_code LIKE $1", [`${TEST_CODE}%`]);
  await db.query("DELETE FROM syllabus_info WHERE class_code LIKE $1", [`${TEST_CODE}%`]);
  await db.query("DELETE FROM class_tasks WHERE class_code LIKE $1", [`${TEST_CODE}%`]);
  await db.query("DELETE FROM classes WHERE class_code LIKE $1", [`${TEST_CODE}%`]);

  // -----------------------------------------------------------------------
  // STEP 1 (Frontend): POST /classes with class_code + user_id
  // -----------------------------------------------------------------------
  let step1ClassCode;
  await test("Step 1: Frontend creates class with user_id", async () => {
    const created = await createClass({
      class_code: TEST_CODE,
      subject: 'TEST',
      name: 'E2E Test Class',
      user_id: TEST_USER
    });
    step1ClassCode = created.class_code;
    if (step1ClassCode !== TEST_CODE) throw new Error(`Expected ${TEST_CODE}, got ${step1ClassCode}`);
    console.log(`   → Created: ${step1ClassCode} (user: ${TEST_USER})`);
  });

  // -----------------------------------------------------------------------
  // STEP 2 (Frontend): POST /api/syllabus/upload — NO user_id sent
  // Simulates upload calling saveSyllabusData with class_code but no user_id
  // -----------------------------------------------------------------------
  await test("Step 2: /upload calls saveSyllabusData WITHOUT user_id → topics land on correct class", async () => {
    const fakeExtractedData = {
      courseName: 'E2E Test Class',
      courseCode: TEST_CODE,  // original class_code, no user_id
      instructor: { name: 'Prof Test', email: 'test@test.com', officeHours: 'Mon 2pm' },
      topics: ['Binary Search Trees', 'Dijkstra Algorithm', 'Dynamic Programming'],
      importantDates: [{ eventName: 'Midterm', date: '2026-03-15' }],
      gradingPolicy: [{ category: 'Midterm', weightPercentage: 30 }],
      user_id: null  // NO user_id — this is what the original frontend sends!
    };

    const result = await saveSyllabusData(fakeExtractedData);
    console.log(`   → Topics saved to: ${result.savedClass.class_code}`);
    console.log(`   → Topics count: ${result.savedTopics.length}`);

    // The CRITICAL check: topics must be on the SAME class the user navigates to
    if (result.savedClass.class_code !== TEST_CODE) {
      throw new Error(`Topics saved to ${result.savedClass.class_code}, but frontend navigates to ${TEST_CODE}!`);
    }
    if (result.savedTopics.length !== 3) {
      throw new Error(`Expected 3 topics, got ${result.savedTopics.length}`);
    }
  });

  // -----------------------------------------------------------------------
  // STEP 3: Verify topics are actually queryable at the original class_code
  // (This is what the class page does when it renders)
  // -----------------------------------------------------------------------
  await test("Step 3: Topics are accessible at the original class_code (what frontend navigates to)", async () => {
    const result = await db.query("SELECT * FROM topics WHERE class_code = $1", [TEST_CODE]);
    if (result.rows.length === 0) throw new Error(`No topics found at ${TEST_CODE}!`);
    console.log(`   → Found ${result.rows.length} topics at ${TEST_CODE}: ${result.rows.map(r => r.name).join(', ')}`);
  });

  // -----------------------------------------------------------------------
  // STEP 4: Verify NO phantom scoped class was created
  // -----------------------------------------------------------------------
  await test("Step 4: No phantom scoped class created (only original class exists)", async () => {
    const result = await db.query("SELECT class_code FROM classes WHERE class_code LIKE $1", [`${TEST_CODE}-%`]);
    if (result.rows.length > 0) {
      throw new Error(`Phantom scoped class created: ${result.rows.map(r => r.class_code).join(', ')}`);
    }
    console.log(`   → No phantom classes created ✓`);
  });

  // -----------------------------------------------------------------------
  // STEP 5: Idempotency — calling saveSyllabusData again for same class
  // (happens if the user re-uploads the syllabus)
  // -----------------------------------------------------------------------
  await test("Step 5: saveSyllabusData is idempotent (re-upload same syllabus doesn't duplicate)", async () => {
    const fakeData = {
      courseName: 'E2E Test Class',
      courseCode: TEST_CODE,
      instructor: { name: 'Prof Test', email: 'test@test.com', officeHours: 'Mon 2pm' },
      topics: ['Recursion', 'Merge Sort'],
      importantDates: [],
      gradingPolicy: [],
      user_id: null
    };
    const result = await saveSyllabusData(fakeData);
    if (result.savedClass.class_code !== TEST_CODE) {
      throw new Error(`Second upload went to: ${result.savedClass.class_code}`);
    }
    const classCount = await db.query("SELECT COUNT(*) FROM classes WHERE class_code LIKE $1", [`${TEST_CODE}%`]);
    if (parseInt(classCount.rows[0].count) > 1) {
      throw new Error(`Multiple class records created: ${classCount.rows[0].count}`);
    }
    console.log(`   → Re-upload still goes to ${TEST_CODE}, no duplicates ✓`);
  });
  
  // Cleanup
  await db.query("DELETE FROM topics WHERE class_code LIKE $1", [`${TEST_CODE}%`]);
  await db.query("DELETE FROM syllabus_info WHERE class_code LIKE $1", [`${TEST_CODE}%`]);
  await db.query("DELETE FROM class_tasks WHERE class_code LIKE $1", [`${TEST_CODE}%`]);
  await db.query("DELETE FROM classes WHERE class_code LIKE $1", [`${TEST_CODE}%`]);

  console.log(`\n--- Results: ${passed} passed, ${failed} failed ---`);
  process.exit(failed > 0 ? 1 : 0);
}

run();
