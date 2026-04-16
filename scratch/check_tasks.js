const { Pool } = require('pg');
require('dotenv').config({ path: 'backend/.env' });
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

async function test() {
  try {
    const taskModel = require('../backend/models/taskModel');
    const tasks = await taskModel.getUpcomingTasksByUserId('cmn9fnpv60000gox6sumckr25');
    console.log("Tasks:", tasks);
  } catch (err) {
    console.error(err);
  } finally {
    pool.end();
  }
}
test();
