const db = require('../db');

/**
 * Creates a new quiz record.
 */
const createQuiz = async (data) => {
  const { id, user_id, topic_id, score = 0, color = null } = data;
  const result = await db.query(
    "INSERT INTO quizzes (id, user_id, topic_id, score, date, retake_count, color) VALUES ($1, $2, $3, $4, NOW(), 0, $5) RETURNING *",
    [id, user_id, topic_id, score, color]
  );
  return result.rows[0];
};

/**
 * Saves multiple questions for a specific quiz.
 */
const saveQuestions = async (quizId, questions) => {
  const queries = questions.map((q, index) => {
    // Generate a unique ID for each question
    const qId = `${quizId}-q${index}`;
    return db.query(
      `INSERT INTO quiz_questions (id, quiz_id, question, correct_answer, options, explanation) 
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [qId, quizId, q.question, q.correct_answer, q.options, q.explanation]
    );
  });
  await Promise.all(queries);
};

/**
 * Retrieves all questions for a specific quiz.
 */
const getQuestionsByQuizId = async (quizId) => {
  const result = await db.query(
    "SELECT * FROM quiz_questions WHERE quiz_id = $1 ORDER BY id ASC",
    [quizId]
  );
  return result.rows;
};

module.exports = {
  createQuiz,
  saveQuestions,
  getQuestionsByQuizId
};
