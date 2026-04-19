const db = require('../backend/db');

async function fixDatabase() {
  try {
    console.log('[DB-Fix] Creating unique index for daily_topic_metrics...');
    await db.query(`
      CREATE UNIQUE INDEX IF NOT EXISTS uq_daily_topic_metrics 
      ON daily_topic_metrics (user_id, class_code, topic_id, metric_date);
    `);
    console.log('[DB-Fix] ✅ Unique index created successfully.');
  } catch (err) {
    console.error('[DB-Fix] ❌ Failed to create index:', err.message);
  } finally {
    process.exit();
  }
}

fixDatabase();
