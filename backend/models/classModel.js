const db = require('../db');

const getAllClasses = async (userId = null) => {
  const result = userId
    ? await db.query("SELECT * FROM classes WHERE user_id = $1", [userId])
    : await db.query("SELECT * FROM classes");
  return result.rows;
};
const getClassByCode = async (code) => {
  const result = await db.query("SELECT * FROM classes WHERE class_code = $1", [code]);
  return result.rows[0];
};

const createClass = async (data) => {
  const { class_code, subject, name, user_id } = data;
  // Simple UPSERT — no user scoping, no phantom classes.
  // If the class_code already exists, update name/subject but preserve existing user_id.
  const result = await db.query(
    `INSERT INTO classes (class_code, subject, name, user_id)
     VALUES ($1, $2, $3, $4)
     ON CONFLICT (class_code)
     DO UPDATE SET subject = EXCLUDED.subject,
                   name = EXCLUDED.name,
                   user_id = COALESCE(EXCLUDED.user_id, classes.user_id)
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
  const decoded = decodeURIComponent(classCode || '');
  const sanitized = decoded.trim().replace(/\s+/g, '-');
  const existing = await getClassByCode(sanitized);
  if (existing) return existing;

  console.log(`[ClassModel] 🛠️ Auto-provisioning placeholder class: ${sanitized}`);
  return await createClass({
    class_code: sanitized,
    subject: 'General Study',
    name: sanitized,
    user_id: userId
  });
};
const deleteClass = async (code) => {
  // Cascading deletes to avoid foreign key violations
  await db.query("DELETE FROM tasks WHERE class_code = $1", [code]);
  await db.query(
    "DELETE FROM chat_history WHERE session_id IN (SELECT session_id FROM chat_sessions WHERE class_code = $1)",
    [code]
  );
  await db.query("DELETE FROM chat_sessions WHERE class_code = $1", [code]);
  await db.query("DELETE FROM topics WHERE class_code = $1", [code]);
  await db.query("DELETE FROM syllabus_info WHERE class_code = $1", [code]);

  // Finally delete the class
  const result = await db.query("DELETE FROM classes WHERE class_code = $1 RETURNING *", [code]);
  return result.rows[0];
};

const deleteAllClasses = async () => {
  await db.query("DELETE FROM tasks");
  await db.query("DELETE FROM chat_history");
  await db.query("DELETE FROM chat_sessions");
  await db.query("DELETE FROM syllabus_info");
  await db.query("DELETE FROM topics");
  await db.query("DELETE FROM classes");
};

module.exports = {
  getAllClasses,
  getClassByCode,
  createClass,
  ensureClassExists,
  deleteClass,
  deleteAllClasses
};
