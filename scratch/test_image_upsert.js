const { Pool } = require('pg');
require('dotenv').config({ path: 'backend/.env' });
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

async function test() {
  try {
    const email = 'test_image@example.com';
    const id = '12345'; // dummy
    // Insert without image
    await pool.query(
      `INSERT INTO "User" (id, email) VALUES ($1, $2) ON CONFLICT(email) DO NOTHING`,
      [id, email]
    );
    
    // Simulate google login with image
    const image = 'google-image-url.com/a.png';
    const res = await pool.query(
      `INSERT INTO "User" (id, email, total_xp, weekly_xp, image, first_name, last_name, school, major, class_status, streak) 
       VALUES ($1, $2, 0, 0, $3, 'A', 'B', 'C', 'D', 'E', 0)
       ON CONFLICT (email) DO UPDATE SET 
         image = COALESCE(EXCLUDED.image, "User".image),
         first_name = COALESCE(EXCLUDED.first_name, "User".first_name),
         last_name = COALESCE(EXCLUDED.last_name, "User".last_name)
       RETURNING image`,
      [id, email, image]
    );
    console.log("Upsert result:", res.rows[0]);
    
    // Simulate login without image
    const res2 = await pool.query(
      `INSERT INTO "User" (id, email, total_xp, weekly_xp, image, first_name, last_name, school, major, class_status, streak) 
       VALUES ($1, $2, 0, 0, $3, 'A', 'B', 'C', 'D', 'E', 0)
       ON CONFLICT (email) DO UPDATE SET 
         image = COALESCE(EXCLUDED.image, "User".image),
         first_name = COALESCE(EXCLUDED.first_name, "User".first_name),
         last_name = COALESCE(EXCLUDED.last_name, "User".last_name)
       RETURNING image`,
      [id, email, null]
    );
    console.log("Upsert with null image result:", res2.rows[0]);
  } catch (err) {
    console.error(err);
  } finally {
    pool.end();
  }
}
test();
