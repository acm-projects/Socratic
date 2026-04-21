const { Pool } = require('pg');
require('dotenv').config({ path: './backend/.env' });
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

async function checkXP() {
  try {
    const res = await pool.query('SELECT total_xp FROM "User" WHERE id = $1', ['cmn9fnpv60000gox6sumckr25']);
    console.log('User XP:', res.rows[0]?.total_xp);
  } catch (err) {
    console.error(err);
  } finally {
    await pool.end();
  }
}

checkXP();
