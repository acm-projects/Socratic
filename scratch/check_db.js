
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

async function checkSchema() {
  try {
    console.log("Checking tables...");
    const tables = await pool.query("SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'");
    console.log("Tables:", tables.rows.map(r => r.table_name));

    const queries = [
      "daily_topic_metrics",
      "class_engagement",
      "quizzes",
      "quiz_questions",
      "classes"
    ];

    for (const table of queries) {
      console.log(`\n--- Schema for ${table} ---`);
      const schema = await pool.query(`
        SELECT column_name, data_type, is_nullable
        FROM information_schema.columns
        WHERE table_name = '${table}'
      `);
      console.table(schema.rows);

      const constraints = await pool.query(`
        SELECT conname, pg_get_constraintdef(c.oid)
        FROM pg_constraint c
        JOIN pg_namespace n ON n.oid = c.connamespace
        WHERE contype IN ('p', 'u') AND conrelid = '${table}'::regclass
      `);
      console.log(`Constraints for ${table}:`, constraints.rows);

      const count = await pool.query(`SELECT COUNT(*) FROM ${table}`);
      console.log(`Row count for ${table}:`, count.rows[0].count);
    }

  } catch (err) {
    console.error(err);
  } finally {
    await pool.end();
  }
}

checkSchema();
