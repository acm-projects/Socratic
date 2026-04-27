/**
 * Test + Cleanup: Chemistry appearing in Mariam's engagement chart
 *
 * Root cause: A stale user_classes row links Mariam (cmndnfpv4000ekbuaopj8a773)
 * to CHEM1203 (Chemistry), which is owned by Snigdha (cmn9fnpv60000gox6sumckr25).
 * This caused:
 *   1. Chemistry to appear in Mariam's enrolled class list
 *   2. Chemistry engagement records to persist in the chart
 *
 * This script:
 *   A. Verifies the problem exists (BEFORE state)
 *   B. Removes the stale user_classes row
 *   C. Removes the stale class_engagement row
 *   D. Verifies Chemistry is gone from the chart (AFTER state)
 *   E. Verifies Mariam's legitimate classes are untouched
 */

const { Pool } = require('pg');
require('dotenv').config({ path: 'backend/.env', override: true });
const cs = process.env.DATABASE_URL || process.env.POSTGRES_URL || process.env.POSTGRES_PRISMA_URL;
const pool = new Pool({ connectionString: cs, ssl: { rejectUnauthorized: false } });

const MARIAM_ID  = 'cmndnfpv4000ekbuaopj8a773';
const SNIGDHA_ID = 'cmn9fnpv60000gox6sumckr25';
const CHEM_CODE  = 'CHEM1203';
const CHEM_NAME  = 'Chemistry';

// Expected legitimate classes for Mariam (from classes table with her user_id)
const LEGIT_CODES = ['MATH2418', 'CS2336', 'CS3377', 'CS2305', 'CS3341', 'CS3354'];

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

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

async function run() {
  console.log('\n═══ PHASE 1: VERIFY THE PROBLEM EXISTS (Before State) ═══\n');

  await test('CHEM1203 exists in classes table and belongs to Snigdha, NOT Mariam', async () => {
    const { rows } = await pool.query(
      'SELECT user_id FROM classes WHERE class_code = $1',
      [CHEM_CODE]
    );
    assert(rows.length > 0, 'CHEM1203 not found in classes table at all');
    assert(rows[0].user_id === SNIGDHA_ID,
      `Expected Snigdha (${SNIGDHA_ID}) to own CHEM1203, got ${rows[0].user_id}`);
    console.log(`   → CHEM1203 owner confirmed: Snigdha (${SNIGDHA_ID})`);
  });

  await test('Stale user_classes row exists: Mariam → CHEM1203', async () => {
    const { rows } = await pool.query(
      'SELECT * FROM user_classes WHERE user_id = $1 AND class_code = $2',
      [MARIAM_ID, CHEM_CODE]
    );
    assert(rows.length === 1,
      `Expected 1 stale row, found ${rows.length}. ` +
      (rows.length === 0 ? 'Row may have already been cleaned up.' : 'Multiple stale rows!'));
    console.log(`   → Stale row confirmed: ${JSON.stringify(rows[0])}`);
  });

  await test('Stale class_engagement row exists: Mariam × Chemistry', async () => {
    const { rows } = await pool.query(
      'SELECT * FROM class_engagement WHERE user_id = $1 AND class_name = $2',
      [MARIAM_ID, CHEM_NAME]
    );
    assert(rows.length > 0,
      `No engagement row found for Mariam+Chemistry. May already be cleaned.`);
    const total = rows.reduce((s, r) => s + parseInt(r.question_count), 0);
    console.log(`   → ${rows.length} engagement row(s) confirmed, total question_count: ${total}`);
  });

  await test('Chemistry incorrectly appears in Mariam enrolled class list (API)', async () => {
    const r = await fetch(`http://localhost:5000/api/users/${MARIAM_ID}/classes`);
    const classes = await r.json();
    const chemClass = classes.find(c => c.class_code === CHEM_CODE);
    assert(chemClass !== undefined,
      `Chemistry (CHEM1203) not found in API response — may already be cleaned.`);
    console.log(`   → Chemistry found in enrolled list: ${JSON.stringify(chemClass)}`);
  });

  await test('Chemistry appears in Mariam engagement chart (API)', async () => {
    const r = await fetch(`http://localhost:5000/users/${MARIAM_ID}/engagement/class-distribution`);
    const data = await r.json();
    const chemEntry = data.find(e => e.class_name === CHEM_NAME);
    assert(chemEntry !== undefined,
      `Chemistry not found in engagement chart — may already be cleaned.`);
    console.log(`   → Chemistry in chart with question_count: ${chemEntry.question_count}`);
  });

  console.log('\n═══ PHASE 2: CLEANUP ═══\n');

  // ── Remove stale user_classes row ────────────────────────────────────────
  await test('Remove stale user_classes row (Mariam → CHEM1203)', async () => {
    const { rowCount } = await pool.query(
      'DELETE FROM user_classes WHERE user_id = $1 AND class_code = $2',
      [MARIAM_ID, CHEM_CODE]
    );
    assert(rowCount >= 0, `DELETE failed unexpectedly`);
    console.log(`   → Deleted ${rowCount} user_classes row(s)`);
  });

  // ── Remove stale class_engagement row ────────────────────────────────────
  await test('Remove stale class_engagement row (Mariam × Chemistry)', async () => {
    const { rowCount } = await pool.query(
      'DELETE FROM class_engagement WHERE user_id = $1 AND class_name = $2',
      [MARIAM_ID, CHEM_NAME]
    );
    assert(rowCount >= 0, `DELETE failed unexpectedly`);
    console.log(`   → Deleted ${rowCount} engagement row(s)`);
  });

  console.log('\n═══ PHASE 3: VERIFY THE FIX (After State) ═══\n');

  await test('CHEM1203 no longer in Mariam user_classes', async () => {
    const { rows } = await pool.query(
      'SELECT * FROM user_classes WHERE user_id = $1 AND class_code = $2',
      [MARIAM_ID, CHEM_CODE]
    );
    assert(rows.length === 0,
      `Expected 0 rows after cleanup, found ${rows.length}`);
    console.log(`   → Confirmed: no user_classes row for Mariam+CHEM1203`);
  });

  await test('No Chemistry engagement rows remain for Mariam', async () => {
    const { rows } = await pool.query(
      'SELECT * FROM class_engagement WHERE user_id = $1 AND class_name = $2',
      [MARIAM_ID, CHEM_NAME]
    );
    assert(rows.length === 0,
      `Expected 0 rows after cleanup, found ${rows.length}`);
    console.log(`   → Confirmed: no Chemistry engagement rows for Mariam`);
  });

  await test('Chemistry no longer appears in Mariam enrolled class list (API)', async () => {
    const r = await fetch(`http://localhost:5000/api/users/${MARIAM_ID}/classes`);
    const classes = await r.json();
    const chemClass = classes.find(c => c.class_code === CHEM_CODE);
    assert(chemClass === undefined,
      `Chemistry still appears in enrolled list after cleanup: ${JSON.stringify(chemClass)}`);
    console.log(`   → Chemistry absent from enrolled list. ${classes.length} classes remain.`);
  });

  await test('Chemistry no longer appears in Mariam engagement chart (API)', async () => {
    const r = await fetch(`http://localhost:5000/users/${MARIAM_ID}/engagement/class-distribution`);
    const data = await r.json();
    const chemEntry = data.find(e => e.class_name === CHEM_NAME);
    assert(chemEntry === undefined,
      `Chemistry still in engagement chart after cleanup: ${JSON.stringify(chemEntry)}`);
    console.log(`   → Chemistry absent from engagement chart. ${data.length} classes shown.`);
    console.log(`   → Remaining classes: ${data.map(e => e.class_name).join(', ')}`);
  });

  await test("Mariam's legitimate classes are all still present", async () => {
    const r = await fetch(`http://localhost:5000/api/users/${MARIAM_ID}/classes`);
    const classes = await r.json();
    const codes = classes.map(c => c.class_code);
    for (const code of LEGIT_CODES) {
      assert(codes.includes(code),
        `Legitimate class ${code} missing from Mariam's class list after cleanup`);
    }
    console.log(`   → All ${LEGIT_CODES.length} legitimate classes verified present`);
  });

  await test("Snigdha's Chemistry (CHEM1203) is unaffected", async () => {
    const { rows } = await pool.query(
      'SELECT user_id, name FROM classes WHERE class_code = $1',
      [CHEM_CODE]
    );
    assert(rows.length === 1 && rows[0].user_id === SNIGDHA_ID,
      `Snigdha's Chemistry class was modified! Got: ${JSON.stringify(rows[0])}`);
    console.log(`   → Snigdha's CHEM1203 unchanged. Owner: ${rows[0].user_id}`);
  });

  console.log(`\n${'─'.repeat(60)}`);
  console.log(`Results: ${passed} passed, ${failed} failed`);
  console.log(`${'─'.repeat(60)}\n`);

  await pool.end();
  process.exit(failed > 0 ? 1 : 0);
}

run().catch(async e => {
  console.error('Fatal error:', e.message);
  await pool.end();
  process.exit(1);
});
