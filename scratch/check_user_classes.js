const { Pool } = require('pg');
require('dotenv').config({ path: 'backend/.env' });
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

async function test() {
  try {
    const res = await pool.query(`SELECT id, email FROM "User" WHERE email ILIKE '%snigdha%' OR first_name ILIKE '%snigdha%'`);
    if (res.rows.length > 0) {
      for (const u of res.rows) {
        const classes = await pool.query(`SELECT * FROM user_classes WHERE user_id = $1`, [u.id]);
        console.log(`user_classes for ${u.email} (${u.id}):`, classes.rows);
      }
    }
  } catch (err) {
    console.error(err);
  } finally {
    pool.end();
  }
}
test();
