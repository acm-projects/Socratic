const { getAllClasses, createClass } = require('../models/classModel');
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

  // -------------------------------------------------------
  // Test 1: getAllClasses with no filter returns all classes
  // -------------------------------------------------------
  await test("getAllClasses() with no userId returns all classes", async () => {
    const all = await getAllClasses();
    if (!Array.isArray(all) || all.length === 0) throw new Error("Expected array with classes");
    console.log(`   (Total: ${all.length})`);
  });

  // -------------------------------------------------------
  // Test 2: getAllClasses with userId filters correctly
  // -------------------------------------------------------
  await test("getAllClasses(userId) returns only that user's classes", async () => {
    const userId = 'cmn9fnpv60000gox6sumckr25';
    const filtered = await getAllClasses(userId);
    const wrong = filtered.filter(c => c.user_id !== userId);
    if (wrong.length > 0) throw new Error(`Found ${wrong.length} classes NOT belonging to user`);
    console.log(`   (User has ${filtered.length} classes, all correct)`);
  });

  // -------------------------------------------------------
  // Test 3: getAllClasses with unknown userId returns empty
  // -------------------------------------------------------
  await test("getAllClasses('nonexistent-user') returns empty array", async () => {
    const filtered = await getAllClasses('nonexistent-user-xyz');
    if (filtered.length !== 0) throw new Error(`Expected 0, got ${filtered.length}`);
  });

  // -------------------------------------------------------
  // Test 4: createClass is idempotent for same user
  // -------------------------------------------------------
  await db.query("DELETE FROM classes WHERE class_code LIKE 'IDEMPOTENT_TEST%'");
  await test("createClass() is idempotent for same user (no duplicates)", async () => {
    const data = { class_code: 'IDEMPOTENT_TEST', subject: 'TEST', name: 'Test', user_id: 'test-user-fix' };
    const r1 = await createClass(data);
    const r2 = await createClass(data);
    const r3 = await createClass(data);
    if (r1.class_code !== r2.class_code || r2.class_code !== r3.class_code) {
      throw new Error(`Got different codes: ${r1.class_code}, ${r2.class_code}, ${r3.class_code}`);
    }
    console.log(`   (All 3 calls returned: ${r1.class_code})`);
  });

  // -------------------------------------------------------
  // Test 5: createClass with conflict creates stable scoped code
  // -------------------------------------------------------
  await db.query("DELETE FROM classes WHERE class_code LIKE 'SCOPE_FIX_TEST%'");
  await test("createClass() conflict creates stable scoped code (no new random on retry)", async () => {
    // First: create for user-a
    await createClass({ class_code: 'SCOPE_FIX_TEST', subject: 'TEST', name: 'User A', user_id: 'user-a-fix' });
    // Then: create for user-b (conflict → scoped)
    const r1 = await createClass({ class_code: 'SCOPE_FIX_TEST', subject: 'TEST', name: 'User B', user_id: 'user-b-fix' });
    // Retry for user-b — must return the SAME scoped code
    const r2 = await createClass({ class_code: 'SCOPE_FIX_TEST', subject: 'TEST', name: 'User B', user_id: 'user-b-fix' });
    if (r1.class_code !== r2.class_code) {
      throw new Error(`Suffix changed! Call 1: ${r1.class_code}, Call 2: ${r2.class_code}`);
    }
    console.log(`   (Stable scoped code: ${r1.class_code})`);
  });

  // -------------------------------------------------------
  // Test 6: createClass with null user_id conflict — stable
  // -------------------------------------------------------
  await db.query("DELETE FROM classes WHERE class_code LIKE 'NULL_USER_TEST%'");
  await test("createClass() null user_id conflict creates stable scoped code", async () => {
    // Create for a real user first to force conflict
    await createClass({ class_code: 'NULL_USER_TEST', subject: 'TEST', name: 'Real User', user_id: 'real-user-fix' });
    const r1 = await createClass({ class_code: 'NULL_USER_TEST', subject: 'TEST', name: 'Guest', user_id: null });
    const r2 = await createClass({ class_code: 'NULL_USER_TEST', subject: 'TEST', name: 'Guest', user_id: null });
    if (r1.class_code !== r2.class_code) {
      throw new Error(`Null user suffix changed! Call 1: ${r1.class_code}, Call 2: ${r2.class_code}`);
    }
    console.log(`   (Stable null-user scoped code: ${r1.class_code})`);
  });

  console.log(`\n--- Results: ${passed} passed, ${failed} failed ---`);
  process.exit(failed > 0 ? 1 : 0);
}

run();
