const { Pool } = require('pg');
require('dotenv').config({ path: './backend/.env' });

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

async function testUploadUpsert() {
  const classCode = 'CS-TEST-UPSERT-101';
  const syllabusUrl = 'https://example.com/mock-syllabus.pdf';
  
  try {
    console.log(`Testing UPSERT for class: ${classCode}`);
    
    const subjectMatch = classCode.match(/[a-zA-Z]+/);
    const subject = subjectMatch ? subjectMatch[0].toUpperCase() : "GEN";
    const placeholderName = `Course ${classCode}`;

    await pool.query(
      `INSERT INTO classes (class_code, subject, name, syllabus_url) 
       VALUES ($1, $2, $3, $4) 
       ON CONFLICT (class_code) 
       DO UPDATE SET syllabus_url = EXCLUDED.syllabus_url`,
      [classCode, subject, placeholderName, syllabusUrl]
    );

    console.log("UPSERT successful!");

    const res = await pool.query("SELECT * FROM classes WHERE class_code = $1", [classCode]);
    console.log("Verified Record in DB:", res.rows);

  } catch (err) {
    console.error("UPSERT test failed:", err);
  } finally {
    await pool.end();
  }
}

testUploadUpsert();
