const db = require('../db');

/**
 * Ensures that the User table has all the necessary columns for tracking stats.
 * This function is called on server startup to handle schema updates automatically.
 */
const runMigrations = async () => {
  console.log('[Migration] 🛠️ Checking database schema...');
  try {
    // We use a single transaction or multiple safe ALTER TABLE commands
    const queries = [
      'ALTER TABLE "User" ADD COLUMN IF NOT EXISTS ai_messages INTEGER NOT NULL DEFAULT 0',
      'ALTER TABLE "User" ADD COLUMN IF NOT EXISTS quizzes_taken INTEGER NOT NULL DEFAULT 0',
      'ALTER TABLE "User" ADD COLUMN IF NOT EXISTS retakes_taken INTEGER NOT NULL DEFAULT 0',
      'ALTER TABLE "User" ADD COLUMN IF NOT EXISTS last_active_date DATE',
      // Ensure existing rows are handled if columns were just added
      'UPDATE "User" SET streak = 0 WHERE streak IS NULL'
    ];

    for (const query of queries) {
      await db.query(query);
    }
    
    console.log('[Migration] ✅ Database schema is up to date.');
  } catch (error) {
    console.error('[Migration] ❌ Schema update failed:', error.message);
  }
};

module.exports = { runMigrations };
