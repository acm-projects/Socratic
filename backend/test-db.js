const db = require('./db');
async function test() {
  try {
    const res = await db.query(`
      SELECT conname, contype 
      FROM pg_constraint 
      WHERE conrelid = 'topics'::regclass;
    `);
    console.log(res.rows);
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}
test();
