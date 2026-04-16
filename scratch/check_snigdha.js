const { Pool } = require('pg');
require('dotenv').config({ path: 'backend/.env' });
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

async function test() {
  try {
    const res = await pool.query(`SELECT id, email FROM "User" WHERE email ILIKE '%snigdha%' OR first_name ILIKE '%snigdha%'`);
    console.log("Users:", res.rows);
    
    if (res.rows.length > 0) {
      for (const u of res.rows) {
        // Find if they have any classes in classes table directly
        const classes1 = await pool.query(`SELECT * FROM classes WHERE user_id = $1`, [u.id]);
        console.log(`Classes owned by ${u.email} (${u.id}):`, classes1.rows);
      }
    } else {
        console.log("No snigdha found");
    }
  } catch (err) {
    console.error(err);
  } finally {
    pool.end();
  }
}
test();
