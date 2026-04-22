/**
 * Full API smoke test — verifies all recently changed routes
 * work correctly with frontend-compatible parameters.
 * Run with server on: node server.js
 */
const BASE = 'http://localhost:5000';

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

  // ---- [1] GET /api/classes — no userId (backward compat) ----
  await test("GET /api/classes (no filter) returns array", async () => {
    const r = await fetch(`${BASE}/api/classes`);
    if (!r.ok) throw new Error(`HTTP ${r.status}`);
    const d = await r.json();
    if (!Array.isArray(d) || d.length === 0) throw new Error(`Expected array, got ${JSON.stringify(d).slice(0, 100)}`);
    console.log(`   → ${d.length} total classes returned`);
  });

  // ---- [2] GET /api/classes?userId=xxx — filters to user ----
  await test("GET /api/classes?userId=cmn9fnpv60000gox6sumckr25 returns filtered classes", async () => {
    const userId = 'cmn9fnpv60000gox6sumckr25';
    const r = await fetch(`${BASE}/api/classes?userId=${userId}`);
    if (!r.ok) throw new Error(`HTTP ${r.status}`);
    const d = await r.json();
    if (!Array.isArray(d)) throw new Error("Not an array");
    const wrong = d.filter(c => c.user_id !== userId);
    if (wrong.length > 0) throw new Error(`${wrong.length} classes belong to wrong user`);
    console.log(`   → ${d.length} classes for user, all correct`);
  });

  // ---- [3] GET /api/classes?userId=nonexistent — returns empty ----
  await test("GET /api/classes?userId=nonexistent returns empty array", async () => {
    const r = await fetch(`${BASE}/api/classes?userId=nonexistent-xyz`);
    if (!r.ok) throw new Error(`HTTP ${r.status}`);
    const d = await r.json();
    if (!Array.isArray(d) || d.length !== 0) throw new Error(`Expected [], got ${d.length} items`);
  });

  // ---- [4] GET /classes (legacy route without /api) still works ----
  await test("GET /classes (legacy no-prefix route) still works", async () => {
    const r = await fetch(`${BASE}/classes`);
    if (!r.ok) throw new Error(`HTTP ${r.status}`);
    const d = await r.json();
    if (!Array.isArray(d)) throw new Error("Not an array");
    console.log(`   → Legacy route returns ${d.length} classes`);
  });

  // ---- [4b] GET /classes?user_id=xxx (legacy filter param) ----
  await test("GET /classes?user_id=xxx (legacy filter) returns correct classes", async () => {
    const userId = 'cmn9fnpv60000gox6sumckr25';
    const r = await fetch(`${BASE}/classes?user_id=${userId}`);
    if (!r.ok) throw new Error(`HTTP ${r.status}`);
    const d = await r.json();
    if (!Array.isArray(d)) throw new Error("Not an array");
    const wrong = d.filter(c => c.user_id !== userId);
    if (wrong.length > 0) throw new Error(`${wrong.length} classes belong to wrong user`);
    console.log(`   → Legacy filter returns ${d.length} user classes, all correct`);
  });

  // ---- [5] POST /api/syllabus/extract — returns extracted data ----
  // (doesn't save, so safe to call without real PDF — will fail gracefully)
  await test("POST /api/syllabus/extract with no file returns 400 (correct validation)", async () => {
    const r = await fetch(`${BASE}/api/syllabus/extract`, { method: 'POST', body: new FormData() });
    if (r.status !== 400) throw new Error(`Expected 400, got ${r.status}`);
  });

  // ---- [6] GET /api/syllabus/info/:class_code — returns populated data ----
  await test("GET /api/syllabus/info/CS3341 returns syllabus info", async () => {
    const r = await fetch(`${BASE}/api/syllabus/info/CS3341`);
    // 200 if info exists, 404 if not — both are valid
    if (r.status !== 200 && r.status !== 404) throw new Error(`Unexpected HTTP ${r.status}`);
    const d = await r.json();
    console.log(`   → Status ${r.status}: ${r.status === 200 ? `professor: "${d.professor_name}"` : d.error}`);
  });

  // ---- [7] GET /api/syllabus/data/:class_code — class page endpoint ----
  await test("GET /api/syllabus/data/CS3341 returns class data structure", async () => {
    const r = await fetch(`${BASE}/api/syllabus/data/CS3341`);
    if (r.status !== 200 && r.status !== 404) throw new Error(`Unexpected HTTP ${r.status}`);
    if (r.status === 200) {
      const d = await r.json();
      if (!d.classInfo || !Array.isArray(d.topics) || !Array.isArray(d.tasks)) {
        throw new Error(`Missing fields: ${JSON.stringify(Object.keys(d))}`);
      }
      console.log(`   → topics: ${d.topics.length}, tasks: ${d.tasks.length}`);
    } else {
      console.log(`   → Class CS3341 not found (404), endpoint works`);
    }
  });

  // ---- [8] POST /api/tutor/chat — requires userId, classCode, message ----
  await test("POST /api/tutor/chat with missing fields returns 400", async () => {
    const r = await fetch(`${BASE}/api/tutor/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: 'test' })  // missing classCode + message
    });
    if (r.status !== 400) throw new Error(`Expected 400, got ${r.status}`);
  });

  // ---- [9] POST /api/tutor/chat — returns chatId in response ----
  // Use a real user from the DB to avoid FK constraint errors
  await test("POST /api/tutor/chat returns chatId in response (legacy compat)", async () => {
    const r = await fetch(`${BASE}/api/tutor/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: 'cmn9fnpv60000gox6sumckr25',  // real user in DB
        classCode: 'CS3341',
        message: 'What is a binary search tree?',
        topic: 'Binary Search Trees'
      })
    });
    if (!r.ok) throw new Error(`HTTP ${r.status}: ${await r.text()}`);
    const d = await r.json();
    if (!d.chatId && !d.sessionId) throw new Error(`No chatId or sessionId in response`);
    if (!d.reply) throw new Error(`No reply in response`);
    console.log(`   → chatId: ${d.chatId || d.sessionId}, reply length: ${d.reply?.length}`);
  });

  // ---- [10] GET /api/classes/:code — fetch single class ----
  await test("GET /classes/CS3341 returns class object", async () => {
    const r = await fetch(`${BASE}/classes/CS3341`);
    if (!r.ok) throw new Error(`HTTP ${r.status}`);
    const d = await r.json();
    if (!d || d.class_code !== 'CS3341') throw new Error(`Unexpected response: ${JSON.stringify(d).slice(0, 100)}`);
    console.log(`   → class_code: ${d.class_code}, name: ${d.name}`);
  });

  console.log(`\n--- Results: ${passed} passed, ${failed} failed ---`);
  process.exit(failed > 0 ? 1 : 0);
}

run();
