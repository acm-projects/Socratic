const db = require('./backend/db');

async function debugSchema() {
  try {
    const res = await db.query(`
      SELECT tc.constraint_name, tc.table_name, kcu.column_name, 
             ccu.table_name AS foreign_table_name, ccu.column_name AS foreign_column_name,
             rc.delete_rule
      FROM information_schema.table_constraints AS tc 
      JOIN information_schema.key_column_usage AS kcu
        ON tc.constraint_name = kcu.constraint_name
      JOIN information_schema.constraint_column_usage AS ccu
        ON ccu.constraint_name = tc.constraint_name
      JOIN information_schema.referential_constraints AS rc
        ON rc.constraint_name = tc.constraint_name
      WHERE ccu.table_name = 'classes';
    `);
    console.log("Foreign keys referencing classes:");
    console.table(res.rows);
  } catch (e) {
    console.error(e);
  } finally {
    process.exit(0);
  }
}
debugSchema();
