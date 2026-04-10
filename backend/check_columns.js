const db = require('./db');
async function checkColumns() {
  try {
    const res = await db.query(`
      SELECT column_name, data_type 
      FROM information_schema.columns 
      WHERE table_name = 'chat_history'
    `);
    console.log(JSON.stringify(res.rows, null, 2));
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}
checkColumns();
