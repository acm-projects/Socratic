const { Pool } = require('pg');
require('dotenv').config({ path: './backend/.env' });

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

async function checkTasks() {
  try {
    const classCode = 'CS-SE-3377-0W1';
    
    console.log(`\n--- Checking Class: ${classCode} ---`);
    const resClass = await pool.query("SELECT * FROM classes WHERE class_code = $1", [classCode]);
    console.log("Class in classes table:", resClass.rows);
    
    const resTopics = await pool.query("SELECT * FROM topics WHERE class_code = $1", [classCode]);
    console.log("Topics for this class:", resTopics.rows);

    const resTasks = await pool.query("SELECT * FROM class_tasks WHERE class_code = $1", [classCode]);
    console.log("Tasks for this class:", resTasks.rows);
    
    console.log("\n--- Global Stats ---");
    const resTotalTasks = await pool.query("SELECT COUNT(*) FROM class_tasks");
    console.log("Total tasks in system:", resTotalTasks.rows[0].count);

    const resTotalTopics = await pool.query("SELECT COUNT(*) FROM topics");
    console.log("Total topics in system:", resTotalTopics.rows[0].count);

    const resClasses = await pool.query("SELECT class_code, syllabus_url FROM classes WHERE syllabus_url IS NOT NULL");
    console.log("Classes with syllabus uploaded:", resClasses.rows);

  } catch (err) {
    console.error(err);
  } finally {
    await pool.end();
  }
}

checkTasks();
