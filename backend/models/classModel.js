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
  const { class_code, subject, name } = data;
  const result = await db.query(
    "INSERT INTO classes (class_code, subject, name) VALUES ($1, $2, $3) RETURNING *",
    [class_code, subject, name]
  );
  return result.rows[0];
};

const deleteAllClasses = async () => {
  await db.query("DELETE FROM topics");
  await db.query("DELETE FROM classes");
};

module.exports = {
  getAllClasses,
  getClassByCode,
  createClass,
  deleteAllClasses
};
