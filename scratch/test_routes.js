/**
 * Route Test Script
 * Tests: Tutor Chat, Syllabus, Google Calendar routes
 * Run: node scratch/test_routes.js
 */
require('dotenv').config({ path: './backend/.env' });

const BASE = 'http://localhost:5000';

const colors = {
  green: (s) => `\x1b[32m${s}\x1b[0m`,
  red: (s) => `\x1b[31m${s}\x1b[0m`,
  yellow: (s) => `\x1b[33m${s}\x1b[0m`,
  cyan: (s) => `\x1b[36m${s}\x1b[0m`,
  bold: (s) => `\x1b[1m${s}\x1b[0m`,
};

let passed = 0;
let failed = 0;
let sessionId = null; // Will be set after first chat message

async function req(method, path, body = null, headers = {}) {
  const opts = {
    method,
    headers: { 'Content-Type': 'application/json', ...headers },
  };
  if (body) opts.body = JSON.stringify(body);
  const res = await fetch(`${BASE}${path}`, opts);
  let json;
  try { json = await res.json(); } catch { json = null; }
  return { status: res.status, json };
}

function check(name, condition, detail = '') {
  if (condition) {
    console.log(colors.green(`  ✅ PASS`) + ` ${name}`);
    passed++;
  } else {
    console.log(colors.red(`  ❌ FAIL`) + ` ${name}` + (detail ? colors.yellow(` — ${detail}`) : ''));
    failed++;
  }
}

async function run() {
  console.log(colors.bold(colors.cyan('\n🧪 Route Test Suite\n')));

  // ─────────────────────────────────────────────────────
  // 1. HEALTH CHECK
  // ─────────────────────────────────────────────────────
  console.log(colors.bold('── Health Check'));
  const health = await req('GET', '/');
  check('GET / returns 200', health.status === 200);

  // ─────────────────────────────────────────────────────
  // 2. TUTOR CHAT — NEW SESSION
  // ─────────────────────────────────────────────────────
  console.log(colors.bold('\n── Tutor Chat: New Session'));
  const chat1 = await req('POST', '/api/tutor/chat', {
    userId: 'aakash',
    classCode: 'CS3345',
    topic: 'Binary Search Trees',
    message: 'What is a binary search tree?',
  });
  check('POST /api/tutor/chat returns 200', chat1.status === 200, `Got ${chat1.status}`);
  check('Response has reply field', !!chat1.json?.response || !!chat1.json?.reply, JSON.stringify(chat1.json)?.slice(0, 120));
  check('Response has sessionId', !!chat1.json?.sessionId, JSON.stringify(chat1.json)?.slice(0, 100));
  check('Response has isNewSession=true', chat1.json?.isNewSession === true, `isNewSession=${chat1.json?.isNewSession}`);
  sessionId = chat1.json?.sessionId;
  console.log(colors.yellow(`  ℹ️  Session ID: ${sessionId}`));

  // ─────────────────────────────────────────────────────
  // 3. TUTOR CHAT — CONTINUE SESSION
  // ─────────────────────────────────────────────────────
  console.log(colors.bold('\n── Tutor Chat: Continue Session'));
  if (sessionId) {
    const chat2 = await req('POST', '/api/tutor/chat', {
      userId: 'aakash',
      classCode: 'CS3345',
      topic: 'Binary Search Trees',
      message: 'Can you give me an example?',
      sessionId,
    });
    check('POST /api/tutor/chat with sessionId returns 200', chat2.status === 200, `Got ${chat2.status}`);
    check('Response has reply', !!chat2.json?.response || !!chat2.json?.reply);
    check('Response has same sessionId', chat2.json?.sessionId === sessionId, `Got ${chat2.json?.sessionId}`);
    check('Response has isNewSession=false', chat2.json?.isNewSession === false, `isNewSession=${chat2.json?.isNewSession}`);
  } else {
    check('SKIP — no sessionId from previous step', false, 'Previous test failed');
  }

  // ─────────────────────────────────────────────────────
  // 4. SYLLABUS — GET INFO (Existing class that has been uploaded)
  // ─────────────────────────────────────────────────────
  console.log(colors.bold('\n── Syllabus: GET Info'));
  const sylInfo = await req('GET', '/api/syllabus/info/CS3345');
  // Could be 200 with data OR 404 if never uploaded for this class_code — both are valid
  check(
    'GET /api/syllabus/info/:class_code responds (200 or 404)',
    sylInfo.status === 200 || sylInfo.status === 404,
    `Got ${sylInfo.status}: ${JSON.stringify(sylInfo.json)?.slice(0, 100)}`
  );
  if (sylInfo.status === 200) {
    check('Syllabus info has class_code field', !!sylInfo.json?.class_code);
    console.log(colors.yellow(`  ℹ️  Professor: ${sylInfo.json?.professor_name || 'N/A'}`));
  } else {
    console.log(colors.yellow('  ℹ️  No syllabus uploaded for CS3345 yet — that is OK'));
  }

  // ─────────────────────────────────────────────────────
  // 5. SYLLABUS — GET Tasks
  // ─────────────────────────────────────────────────────
  console.log(colors.bold('\n── Syllabus: GET Tasks'));
  const sylTasks = await req('GET', '/api/syllabus/tasks/CS3345');
  check(
    'GET /api/syllabus/tasks/:class_code responds (200 or 404)',
    sylTasks.status === 200 || sylTasks.status === 404,
    `Got ${sylTasks.status}`
  );

  // ─────────────────────────────────────────────────────
  // 6. SYLLABUS — GET Syllabus Data
  // ─────────────────────────────────────────────────────
  console.log(colors.bold('\n── Syllabus: GET Data'));
  const sylData = await req('GET', '/api/syllabus/CS3345');
  check(
    'GET /api/syllabus/:class_code responds (200 or 404)',
    sylData.status === 200 || sylData.status === 404,
    `Got ${sylData.status}`
  );

  // ─────────────────────────────────────────────────────
  // 7. CALENDAR — Events (Expects auth error without real tokens)
  // ─────────────────────────────────────────────────────
  console.log(colors.bold('\n── Calendar: GET Events'));
  const calEvents = await req('GET', '/api/calendar/events', null, { 'x-user-id': 'fake-user-for-test' });
  // We expect a structured error (401 or 400), NOT a 500 crash
  check(
    'GET /api/calendar/events returns structured auth error (not 500)',
    calEvents.status !== 500,
    `Got ${calEvents.status}: ${JSON.stringify(calEvents.json)?.slice(0, 100)}`
  );
  if (calEvents.status === 401) {
    check('401 response has error field', !!calEvents.json?.error);
  }

  // ─────────────────────────────────────────────────────
  // 8. CALENDAR — Create Tokens (Bad code, expect 400 not 500)
  // ─────────────────────────────────────────────────────
  console.log(colors.bold('\n── Calendar: Create Tokens'));
  const calToken = await req('POST', '/api/calendar/create-tokens', { code: 'invalid_test_code' });
  check(
    'POST /api/calendar/create-tokens with bad code returns structured error (not 500)',
    calToken.status !== 500,
    `Got ${calToken.status}: ${JSON.stringify(calToken.json)?.slice(0, 100)}`
  );

  // ─────────────────────────────────────────────────────
  // 9. CLASSES — CRUD
  // ─────────────────────────────────────────────────────
  console.log(colors.bold('\n── Classes: CRUD'));
  const getAllClasses = await req('GET', '/api/classes');
  check('GET /api/classes returns 200', getAllClasses.status === 200, `Got ${getAllClasses.status}`);
  check('GET /api/classes returns array', Array.isArray(getAllClasses.json), typeof getAllClasses.json);

  const getClass = await req('GET', '/api/classes/CS3345');
  check(
    'GET /api/classes/CS3345 responds (200 or 404)',
    getClass.status === 200 || getClass.status === 404,
    `Got ${getClass.status}`
  );

  // ─────────────────────────────────────────────────────
  // SUMMARY
  // ─────────────────────────────────────────────────────
  const total = passed + failed;
  console.log(colors.bold(`\n── Results: ${colors.green(`${passed} passed`)}, ${failed > 0 ? colors.red(`${failed} failed`) : colors.green(`${failed} failed`)} / ${total} total\n`));
  process.exit(failed > 0 ? 1 : 0);
}

run().catch((e) => {
  console.error(colors.red('\n💥 Test runner crashed:'), e.message);
  process.exit(1);
});
