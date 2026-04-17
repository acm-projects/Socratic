const { Pool } = require('pg');
require('dotenv').config({ path: 'backend/.env' });

const db = {
  pool: new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  }),
  query: async (text, params) => {
    return await db.pool.query(text, params);
  }
};

async function getUpcomingTasksByUserId(userId) {
  const query = `
    SELECT DISTINCT
      ct.id,
      ct.class_code,
      c.name AS class_name,
      ct.task_name,
      ct.due_date,
      ct.completed,
      ct.completed AS is_completed,
      ct.created_at
    FROM class_tasks ct
    JOIN classes c ON c.class_code = ct.class_code
    LEFT JOIN user_classes uc ON uc.class_code = c.class_code AND uc.user_id = $1
    WHERE (c.user_id = $1 OR uc.user_id = $1)
      AND ct.due_date >= CURRENT_DATE - INTERVAL '1 day'
    ORDER BY ct.due_date ASC;
  `;
  const result = await db.query(query, [userId]);
  return result.rows;
}

async function runTest() {
  try {
    const userId = "cmn9fnpv60000gox6sumckr25"; // Testing with Snigdha's ID
    console.log(`\n🔍 Fetching upcoming tasks from PostgreSQL for User ID: ${userId}...\n`);
    
    const tasks = await getUpcomingTasksByUserId(userId);
    
    if (tasks.length === 0) {
      console.log("No upcoming tasks found in the database. (But the query executed successfully!)");
    } else {
      console.log(`✅ Success! Retrieved ${tasks.length} tasks from the database:\n`);
      console.table(tasks.map(t => ({
        "Task Name": t.task_name,
        "Class": t.class_name,
        "Due Date": new Date(t.due_date).toLocaleDateString(),
        "Completed": t.is_completed
      })));
    }
  } catch (error) {
    console.error("❌ Database query failed:", error);
  } finally {
    db.pool.end();
  }
}

runTest();
