const db = require('../db');

const getAllTopics = async () => {
  const result = await db.query("SELECT * FROM topics");
  return result.rows;
};

const getTopicsByClassCode = async (classCode) => {
  const result = await db.query("SELECT * FROM topics WHERE class_code = $1", [classCode]);
  return result.rows;
};

const getTopicById = async (id) => {
  const result = await db.query("SELECT * FROM topics WHERE id = $1", [id]);
  return result.rows[0];
};

const createTopic = async (data) => {
  const { id, class_code, name } = data;
  const result = await db.query(
    "INSERT INTO topics (id, class_code, name) VALUES ($1, $2, $3) RETURNING *",
    [id, class_code, name]
  );
  return result.rows[0];
};

module.exports = {
  getAllTopics,
  getTopicsByClassCode,
  getTopicById,
  createTopic
};
