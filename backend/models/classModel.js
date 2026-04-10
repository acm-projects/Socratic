const db = require('../db');

const getAllClasses = async () => {
  const result = await db.query("SELECT * FROM classes");
  return result.rows;
};

const getClassByCode = async (code) => {
  const result = await db.query("SELECT * FROM classes WHERE class_code = $1", [code]);
  return result.rows[0];
};

const createClass = async (data) => {
  const { class_code, subject, name, user_id } = data;
  const result = await db.query(
    `INSERT INTO classes (class_code, subject, name, user_id) 
     VALUES ($1, $2, $3, $4) 
     ON CONFLICT (class_code) 
     DO UPDATE SET subject = EXCLUDED.subject, name = EXCLUDED.name, user_id = EXCLUDED.user_id 
     RETURNING *`,
    [class_code, subject, name || class_code, user_id || null]
  );
  return result.rows[0];
};

/**
 * Ensures a class exists in the database.
 * If it doesn't, creates a placeholder record.
 */
const ensureClassExists = async (classCode, userId = null) => {
  const existing = await getClassByCode(classCode);
  if (existing) return existing;

  console.log(`[ClassModel] 🛠️ Auto-provisioning placeholder class: ${classCode}`);
  return await createClass({
    class_code: classCode,
    subject: 'General Study',
    name: classCode,
    user_id: userId
  });
};

const deleteAllClasses = async () => {
  await db.query("DELETE FROM topics");
  await db.query("DELETE FROM classes");
};

module.exports = {
  getAllClasses,
  getClassByCode,
  createClass,
  ensureClassExists,
  deleteAllClasses
};
