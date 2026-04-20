
const { Pool } = require('pg');
require('dotenv').config({ path: __dirname + '/../.env' });

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

async function findTable() {
  try {
    console.log("--- TABLE DISCOVERY ---");
    const tablesResult = await pool.query("SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'");
    const tables = tablesResult.rows.map(r => r.table_name);
    console.log("Tables found:", tables);

    const targetTable = 'daily_topic_metrics';
    if (!tables.includes(targetTable)) {
      console.log(`\n❌ Table '${targetTable}' IS MISSING from public schema!`);
      // check for similar names
      const similar = tables.filter(t => t.includes('metric') || t.includes('topic') || t.includes('heatmap'));
      console.log("Similar tables:", similar);
    } else {
      console.log(`\n✅ Table '${targetTable}' exists.`);
      console.log("\n--- COLUMNS ---");
      const columns = await pool.query(`
        SELECT column_name, data_type 
        FROM information_schema.columns 
        WHERE table_name = '${targetTable}'
      `);
      console.table(columns.rows);
      
      const sample = await pool.query(`SELECT COUNT(*) FROM ${targetTable}`);
      console.log(`Row count: ${sample.rows[0].count}`);
    }

  } catch (err) {
    console.error(err);
  } finally {
    await pool.end();
  }
}

findTable();
