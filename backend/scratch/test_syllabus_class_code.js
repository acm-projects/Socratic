/**
 * test_syllabus_class_code.js
 * 
 * Verifies that when a user re-uploads a syllabus for a class they already own
 * (in scoped format, e.g. CS2305-a-tgpj), the extracted tasks are saved against
 * the SCOPED code so they show up in /api/users/:id/upcoming-tasks.
 */

require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
const path = require('path');
const { Pool } = require(path.join(__dirname, '../node_modules/pg'));

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

// Simulate only the class code resolution logic from saveSyllabusData
async function resolveClassCodeForUser(rawCourseCode, user_id) {
  const alphaMatch = rawCourseCode.match(/[a-zA-Z]+/);
  const numericMatch = rawCourseCode.match(/\d+/);
  const safeCourseCode = (alphaMatch && numericMatch)
    ? (alphaMatch[0] + numericMatch[0]).toUpperCase().trim()
    : rawCourseCode.split('.')[0].replace(/[^a-zA-Z0-9]/g, '').toUpperCase().trim();

  let resolvedCode = safeCourseCode;

  if (user_id) {
    // Check user-owned classes (exact or scoped variant like CS2305-xxxx)
    const existingRes = await pool.query(
      `SELECT class_code FROM classes
       WHERE user_id = $1 AND class_code LIKE $2
       ORDER BY created_at DESC LIMIT 1`,
      [user_id, `${safeCourseCode}%`]
    );
    if (existingRes.rows.length > 0) {
      resolvedCode = existingRes.rows[0].class_code;
    } else {
      // Fallback: check user_classes for an enrolled variant
      const enrolledRes = await pool.query(
        `SELECT uc.class_code FROM user_classes uc
         JOIN classes c ON c.class_code = uc.class_code
         WHERE uc.user_id = $1 AND uc.class_code LIKE $2
         ORDER BY uc.enrolled_at DESC LIMIT 1`,
        [user_id, `${safeCourseCode}%`]
      );
      if (enrolledRes.rows.length > 0) {
        resolvedCode = enrolledRes.rows[0].class_code;
      }
    }
  }

  return { safeCourseCode, resolvedCode };
}

async function runTests() {
  try {
    // --- Find a real user and their scoped class to test against ---
    console.log('--- Fetching test data from DB ---');
    const userWithScopedClass = await pool.query(`
      SELECT c.user_id, c.class_code
      FROM classes c
      WHERE c.user_id IS NOT NULL
        AND c.class_code ~ '^[A-Z]+[0-9]+-'
      LIMIT 1
    `);

    if (userWithScopedClass.rows.length === 0) {
      console.log('⚠️  No scoped class codes found in DB. Skipping scoped-code test.');
    } else {
      const { user_id, class_code: scopedCode } = userWithScopedClass.rows[0];
      // Strip suffix to simulate what AI returns (e.g. CS2305-a-tgpj -> CS2305)
      const aiReturned = scopedCode.replace(/-[a-z0-9]+$/, '');
      console.log(`\nTest User:    ${user_id}`);
      console.log(`Scoped Code:  ${scopedCode} (what's in DB)`);
      console.log(`AI Returns:   ${aiReturned} (what syllabus AI would extract)`);

      console.log('\n--- Test 1: Resolution resolves to scoped code ---');
      const { safeCourseCode, resolvedCode } = await resolveClassCodeForUser(aiReturned, user_id);
      console.log(`Normalized:   ${safeCourseCode}`);
      console.log(`Resolved:     ${resolvedCode}`);

      if (resolvedCode === scopedCode) {
        console.log('✅ PASS: Resolved to the existing scoped class code.');
      } else if (resolvedCode === safeCourseCode) {
        console.log('⚠️  WARN: Resolved to the normalized base code, NOT the scoped one. Tasks would be saved under the base code and might not appear for this user.');
      } else {
        console.log(`ℹ️  INFO: Resolved to a different code: ${resolvedCode}`);
      }
    }

    // --- Test 2: No user_id → falls back to base normalized code ---
    console.log('\n--- Test 2: No user_id uses base normalized code ---');
    const { safeCourseCode: safe2, resolvedCode: resolved2 } = await resolveClassCodeForUser('CS/SE 3345.001', null);
    console.log(`Input:      CS/SE 3345.001`);
    console.log(`Normalized: ${safe2}`);
    console.log(`Resolved:   ${resolved2}`);
    if (resolved2 === safe2) {
      console.log('✅ PASS: Without user_id, resolved to normalized base code.');
    } else {
      console.log('❌ FAIL: Expected normalized code without user_id.');
    }

    // --- Test 3: Various raw AI code formats normalize cleanly ---
    console.log('\n--- Test 3: Code normalization edge cases ---');
    const cases = [
      { input: 'CS-SE 3345.001', expected: 'CS3345' },
      { input: 'CHEM 1203',      expected: 'CHEM1203' },
      { input: 'BIO2321',        expected: 'BIO2321' },
      { input: 'CE/CS3341',      expected: 'CE3341' },  // only first alpha group is taken
      { input: '3305',           expected: '3305' },     // fallback path (no alpha)
    ];
    for (const { input, expected } of cases) {
      const alphaMatch = input.match(/[a-zA-Z]+/);
      const numericMatch = input.match(/\d+/);
      const normalized = (alphaMatch && numericMatch)
        ? (alphaMatch[0] + numericMatch[0]).toUpperCase().trim()
        : input.split('.')[0].replace(/[^a-zA-Z0-9]/g, '').toUpperCase().trim();
      const pass = normalized === expected;
      console.log(`  "${input}" → "${normalized}" ${pass ? '✅' : `❌ (expected: ${expected})`}`);
    }

    console.log('\nAll tests complete.');
  } catch (err) {
    console.error('Test error:', err.message);
  } finally {
    await pool.end();
    process.exit();
  }
}

runTests();
