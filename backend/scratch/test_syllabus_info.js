/**
 * Verifies that syllabus_info (professor, grading, TA) is correctly
 * saved and retrievable after extraction — specifically checking what
 * the class page "Course Info" section shows.
 */
const { createClass } = require('../models/classModel');
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

  const TEST_CODE = 'INFOTEST101';
  const TEST_USER = 'info-test-user-1234';

  // Cleanup
  await db.query("DELETE FROM topics WHERE class_code LIKE $1", [`${TEST_CODE}%`]);
  await db.query("DELETE FROM syllabus_info WHERE class_code LIKE $1", [`${TEST_CODE}%`]);
  await db.query("DELETE FROM class_tasks WHERE class_code LIKE $1", [`${TEST_CODE}%`]);
  await db.query("DELETE FROM classes WHERE class_code LIKE $1", [`${TEST_CODE}%`]);

  // Step 1: Create the class (simulates what AddCourseModal does)
  await createClass({ class_code: TEST_CODE, subject: 'MATH', name: 'Test Calculus', user_id: TEST_USER });

  // Step 2: Run saveSyllabusData without user_id (simulates /upload)
  const fakeData = {
    courseName: 'Test Calculus',
    courseCode: TEST_CODE,
    instructor: {
      name: 'Dr. Jane Smith',
      email: 'jane.smith@university.edu',
      officeHours: 'Tues/Thurs 2-4pm',
      officeLocation: 'ECSS 4.201'
    },
    ta: {
      name: 'John Doe',
      email: 'jdoe@university.edu',
      officeHours: 'Mon 10am-12pm'
    },
    gradingPolicy: [
      { category: 'Homework', weightPercentage: 20 },
      { category: 'Midterm', weightPercentage: 30 },
      { category: 'Final', weightPercentage: 50 }
    ],
    topics: ['Limits', 'Derivatives', 'Integrals', 'Taylor Series'],
    importantDates: [
      { eventName: 'Midterm Exam', date: '2026-03-10' },
      { eventName: 'Final Exam', date: '2026-05-08' }
    ],
    user_id: null  // frontend /upload doesn't send user_id
  };

  await saveSyllabusData(fakeData);

  // --- Now verify everything was saved correctly ---

  await test("syllabus_info row exists for class", async () => {
    const r = await db.query("SELECT * FROM syllabus_info WHERE class_code = $1", [TEST_CODE]);
    if (r.rows.length === 0) throw new Error("No syllabus_info row found!");
    console.log(`   → Row found for ${TEST_CODE}`);
  });

  await test("Professor name is saved", async () => {
    const r = await db.query("SELECT professor_name FROM syllabus_info WHERE class_code = $1", [TEST_CODE]);
    const name = r.rows[0]?.professor_name;
    if (name !== 'Dr. Jane Smith') throw new Error(`Got: "${name}"`);
    console.log(`   → Professor: ${name}`);
  });

  await test("Professor email is saved", async () => {
    const r = await db.query("SELECT professor_email FROM syllabus_info WHERE class_code = $1", [TEST_CODE]);
    const email = r.rows[0]?.professor_email;
    if (email !== 'jane.smith@university.edu') throw new Error(`Got: "${email}"`);
    console.log(`   → Email: ${email}`);
  });

  await test("Office hours are saved", async () => {
    const r = await db.query("SELECT office_hours FROM syllabus_info WHERE class_code = $1", [TEST_CODE]);
    const hours = r.rows[0]?.office_hours;
    if (!hours) throw new Error(`Office hours is null/empty`);
    console.log(`   → Office hours: ${hours}`);
  });

  await test("TA info is saved", async () => {
    const r = await db.query("SELECT ta_name, ta_email FROM syllabus_info WHERE class_code = $1", [TEST_CODE]);
    const { ta_name, ta_email } = r.rows[0] || {};
    if (ta_name !== 'John Doe') throw new Error(`TA name got: "${ta_name}"`);
    if (ta_email !== 'jdoe@university.edu') throw new Error(`TA email got: "${ta_email}"`);
    console.log(`   → TA: ${ta_name} (${ta_email})`);
  });

  await test("Grading policy is saved as JSON", async () => {
    const r = await db.query("SELECT grading_policy FROM syllabus_info WHERE class_code = $1", [TEST_CODE]);
    const policy = r.rows[0]?.grading_policy;
    if (!policy) throw new Error("grading_policy is null");
    const parsed = typeof policy === 'string' ? JSON.parse(policy) : policy;
    if (!Array.isArray(parsed) || parsed.length !== 3) throw new Error(`Expected 3 items, got: ${JSON.stringify(parsed)}`);
    console.log(`   → Grading: ${parsed.map(p => `${p.category}(${p.weightPercentage}%)`).join(', ')}`);
  });

  await test("Topics are saved (shown in Topics tab)", async () => {
    const r = await db.query("SELECT name FROM topics WHERE class_code = $1 ORDER BY name", [TEST_CODE]);
    if (r.rows.length !== 4) throw new Error(`Expected 4, got ${r.rows.length}`);
    console.log(`   → Topics: ${r.rows.map(t => t.name).join(', ')}`);
  });

  await test("Important dates (tasks) are saved", async () => {
    const r = await db.query("SELECT task_name, due_date FROM class_tasks WHERE class_code = $1 ORDER BY due_date", [TEST_CODE]);
    if (r.rows.length !== 2) throw new Error(`Expected 2 tasks, got ${r.rows.length}`);
    console.log(`   → Tasks: ${r.rows.map(t => `${t.task_name} (${t.due_date.toISOString().split('T')[0]})`).join(', ')}`);
  });

  await test("GET /api/syllabus/info/:class_code returns populated data (API layer)", async () => {
    const res = await fetch(`http://localhost:5000/api/syllabus/info/${TEST_CODE}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}: ${await res.text()}`);
    const data = await res.json();
    if (!data.professor_name) throw new Error(`professor_name missing in API response`);
    if (!data.grading_policy) throw new Error(`grading_policy missing in API response`);
    console.log(`   → API returned professor: "${data.professor_name}", ${data.grading_policy?.length} grading items`);
  });

  await test("GET /api/syllabus/data/:class_code returns topics (class page API)", async () => {
    const res = await fetch(`http://localhost:5000/api/syllabus/data/${TEST_CODE}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}: ${await res.text()}`);
    const data = await res.json();
    if (!data.topics || data.topics.length === 0) throw new Error(`No topics in data response`);
    console.log(`   → data endpoint returned ${data.topics.length} topics`);
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
