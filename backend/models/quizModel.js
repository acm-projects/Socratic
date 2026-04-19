const db = require('../db');

/**
 * Creates a new quiz record.
 */
const createQuiz = async (data) => {
  const { id, user_id, topic_id, score = 0, color = null } = data;
  console.log(`[QuizModel] 💾 Inserting Quiz metadata: id=${id} | user=${user_id}`);
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
  console.log(`[QuizModel] 💾 Saving ${questions.length} questions for Quiz: ${quizId}`);
  console.log('[saveQuestions] Raw questions from LLM:', JSON.stringify(questions, null, 2));

  const queries = questions.map((q, index) => {
    const qId = `${quizId}-q${index}`;

    let opts;
    try {
      const rawOptions = typeof q.options === 'string' ? JSON.parse(q.options) : q.options;
      // Ensure it's an array of strings
      const safeOptions = Array.isArray(rawOptions)
        ? rawOptions.map(o => String(o))
        : [String(rawOptions)];
      opts = JSON.stringify(safeOptions);
    } catch (e) {
      console.error(`[saveQuestions] Invalid options for q${index}:`, q.options);
      opts = JSON.stringify(['Option A', 'Option B', 'Option C', 'Option D']);
    }
    console.log(`[QuizModel] 📝 [q${index}] Final JSONB Opts:`, opts);
    return db.query(
      `INSERT INTO quiz_questions (id, quiz_id, question, correct_answer, options, explanation) 
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [qId, quizId, q.question, q.correct_answer, opts, q.explanation]
    ).catch(err => {
      console.error(`[QuizModel] ❌ DATABASE ERROR on question ${index}:`, err.message);
      console.error(`[QuizModel] ❌ Failed payload for q${index}:`, { qId, quizId, opts });
      throw err;
    });
  });
  await Promise.all(queries);
  console.log(`[QuizModel] ✅ All ${questions.length} questions saved successfully.`);
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

/**
 * Gets all quizzes for a user, grouped by topic with count and avg score.
 */
const getQuizzesByUser = async (userId) => {
  const result = await db.query(
    `SELECT
       t.id AS topic_id,
       t.name AS topic_name,
       t.class_code,
       COUNT(q.id) AS quiz_count,
       ROUND(AVG(q.score), 1) AS avg_score,
       MAX(q.date) AS last_taken
     FROM quizzes q
     JOIN topics t ON t.id = q.topic_id
     WHERE q.user_id IN (
       SELECT id FROM "User" WHERE email = (SELECT email FROM "User" WHERE id = $1)
       UNION
       SELECT $1
     )
     GROUP BY t.id, t.name, t.class_code
     ORDER BY last_taken DESC`,
    [userId]
  );
  return result.rows.map(row => ({
    topic_id: row.topic_id,
    topic_name: row.topic_name,
    class_code: row.class_code,
    quiz_count: parseInt(row.quiz_count),
    avg_score: parseFloat(row.avg_score) || 0,
    last_taken: row.last_taken
  }));
};

/**
 * Updates daily_topic_metrics after a quiz is taken.
 * Increments questions_asked and recomputes avg_score for that day.
 */
const updateTopicMetrics = async ({ userId, classCode, topicId, questionsAsked, score }) => {
  const today = new Date().toISOString().split('T')[0];
  await db.query(
    `INSERT INTO daily_topic_metrics (user_id, class_code, topic_id, metric_date, questions_asked, avg_score)
     VALUES ($1, $2, $3, $4, $5, $6)
     ON CONFLICT (user_id, class_code, topic_id, metric_date)
     DO UPDATE SET
       questions_asked = daily_topic_metrics.questions_asked + EXCLUDED.questions_asked,
       avg_score = ROUND(
         (daily_topic_metrics.avg_score * daily_topic_metrics.questions_asked + EXCLUDED.avg_score * EXCLUDED.questions_asked)
         / (daily_topic_metrics.questions_asked + EXCLUDED.questions_asked),
       2)`,
    [userId, classCode, topicId, today, questionsAsked, score]
  );
};

/**
 * Updates the score of an existing quiz by ID.
 * Optionally increments retake_count if isRetake is true.
 */
const updateQuizScore = async (quizId, score, isRetake = false) => {
  const result = await db.query(
    `UPDATE quizzes
     SET score = $1${isRetake ? ', retake_count = retake_count + 1' : ''}
     WHERE id = $2
     RETURNING *`,
    [score, quizId]
  );
  return result.rows[0] || null;
};

/**
 * Retrieves a single quiz by its ID.
 */
const getQuizById = async (id) => {
  const result = await db.query("SELECT * FROM quizzes WHERE id = $1", [id]);
  return result.rows[0];
};

module.exports = {
  createQuiz,
  getQuizById,
  saveQuestions,
  getQuestionsByQuizId,
  getQuizzesByUser,
  updateTopicMetrics,
  updateQuizScore
};
