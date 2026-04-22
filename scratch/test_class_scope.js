const classModel = require('../backend/models/classModel');
require('dotenv').config({ path: './backend/.env' });

// Must run sequentially — in real usage, requests are not simultaneous
async function test() {
  // Clean up first
  const { Pool } = require('pg');
  const pool = new Pool({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });
  await pool.query("DELETE FROM classes WHERE class_code LIKE 'TEST3341%'");
  console.log('Cleaned up TEST3341* rows');

  const a = await classModel.createClass({ class_code: 'TEST3341', subject: 'Test', name: 'Test Class', user_id: 'user-aaaa-1111' });
  console.log('User A class_code:', a.class_code);

  const b = await classModel.createClass({ class_code: 'TEST3341', subject: 'Test', name: 'Test Class', user_id: 'user-bbbb-2222' });
  console.log('User B class_code:', b.class_code);

  console.log('Different codes:', a.class_code !== b.class_code ? '✅ YES FIXED' : '❌ STILL BROKEN');

  // Cleanup
  await pool.query("DELETE FROM classes WHERE class_code LIKE 'TEST3341%'");
  await pool.end();
  process.exit();
}

test().catch(err => { console.error(err.message); process.exit(1); });
