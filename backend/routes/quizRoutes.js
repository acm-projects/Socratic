const express = require('express');
const router = express.Router();
const { randomUUID } = require('crypto');
const { getClassVectorStore } = require('../services/vectorService');
const { getQuizGeneratorChain, parser } = require('../services/quizService');
const topicModel = require('../models/topicModel');
const quizModel = require('../models/quizModel');
const classModel = require('../models/classModel');
const userStatsModel = require('../models/userStatsModel');

router.post('/generate', async (req, res, next) => {
  const trace = { step: 'INIT', checkpoints: [], contextCount: 0 };
  try {
    const { classCode: rawClassCode, topic, numQuestions = 5, difficulty, easy, medium, hard, userId } = req.body;
    const classCode = decodeURIComponent(rawClassCode || '').trim().replace(/\s+/g, '-');
    trace.checkpoints.push(`[1] Start: ${classCode} | User: ${userId}`);

    if (!classCode || !topic) return res.status(400).json({ error: "Missing required fields" });

    const count = parseInt(numQuestions) || 5;
    let levels = [];
    if (Array.isArray(difficulty)) levels = difficulty;
    else if (typeof difficulty === 'object' && difficulty !== null) levels = Object.keys(difficulty).filter(k => difficulty[k] === true);
    else {
      if (easy) levels.push("easy");
      if (medium) levels.push("medium");
      if (hard) levels.push("hard");
      if (levels.length === 0) levels = ["easy", "medium", "hard"];
    }

    const selectedLevels = [];
    if (levels.includes("easy")) selectedLevels.push("Easy (Recall/Definitions)");
    if (levels.includes("medium")) selectedLevels.push("Medium (Application/Relationships)");
    if (levels.includes("hard")) selectedLevels.push("Hard (Deep Analysis/Problem-Solving)");

    const difficultyRequirements = selectedLevels.length > 0
      ? `Provide a balanced mix of questions at these difficulty levels: ${selectedLevels.join(", ")}.`
      : "Provide a balanced variety of difficulty levels.";

    // 1. Vector Search
    trace.step = 'VECTOR_SEARCH';
    console.log(`[QuizGen] 🔍 Searching Pinecone for topic: "${topic}" in class: ${classCode}`);
    const vectorStore = await getClassVectorStore(classCode);
    const resultsWithScores = await vectorStore.similaritySearchWithScore(topic, 8);
    trace.contextCount = resultsWithScores.length;
    trace.checkpoints.push(`[2] Found ${resultsWithScores.length} context shards.`);

    const context = resultsWithScores.map(([doc]) => doc.pageContent).join('\n---\n');
    const sources = resultsWithScores.map(([doc]) => ({
      source: doc.metadata.source || 'Unknown',
      page: doc.metadata.pageNumber || 'N/A'
    }));

    // 2. AI Generation
    trace.step = 'AI_GENERATION';
    const chain = getQuizGeneratorChain();
    console.log(`[QuizGen] 🎓 Generating ${count} questions for ${classCode}...`);

    const result = await chain.invoke({
      class: classCode,
      topic: topic,
      numQuestions: count,
      context: context,
      difficultyRequirements: difficultyRequirements,
    });

    trace.checkpoints.push(`[3] AI successfully generated raw JSON.`);

    // 3. Database Ops
    trace.step = 'DATABASE_OPS';
    await classModel.ensureClassExists(classCode, userId);
    let topicEntity = await topicModel.getTopicByNameAndClass(topic, classCode);
    if (!topicEntity) {
      topicEntity = await topicModel.createTopic({ id: randomUUID(), class_code: classCode, name: topic });
    }

    const quizId = randomUUID();
    await quizModel.createQuiz({ id: quizId, user_id: userId, topic_id: topicEntity.id, score: 0 });
    trace.checkpoints.push(`[4] Quiz header saved (ID: ${quizId}).`);

    const questions = Array.isArray(result) ? result : (result.questions || []);
    if (!questions || questions.length === 0) {
      throw new Error('AI returned 0 questions.');
    }
    await quizModel.saveQuestions(quizId, questions);
    trace.checkpoints.push(`[5] All ${questions.length} questions saved.`);

    // 4. Finalizing
    trace.step = 'FINALIZING';

    userStatsModel.incrementQuizzesTaken(userId).catch(() => { });

    console.log(`[QuizGen] 🚀 Finalizing response for Quiz: ${quizId}`);
    res.json({ success: true, quizId: quizId, data: result, sources: sources });
  } catch (error) {
    console.error('[QuizGen] ❌ FATAL ERROR:', error.message);
    res.status(500).json({
      error: error.message,
      stack: error.stack,
      diagnostics: {
        phase: trace.step,
        checkpoints: trace.checkpoints,
        contextCount: trace.contextCount,
        timestamp: new Date().toISOString()
      }
    });
  }
});

/**
 * GET /api/quizzes/:id/questions
 * Retrieves all questions for a specific quiz.
 */
router.get('/:id/questions', async (req, res, next) => {
  try {
    const questions = await quizModel.getQuestionsByQuizId(req.params.id);
    if (!questions || questions.length === 0) {
      return res.status(404).json({ error: "Quiz not found or has no questions" });
    }

    // Get quiz metadata for topic_id and retake_count
    const quiz = await quizModel.getQuizById(req.params.id);

    res.json({
      questions: questions,
      topic_id: quiz?.topic_id ?? null,
      retake_count: quiz?.retake_count ?? 0
    });
  } catch (error) {
    next(error);
  }
});

/**
 * GET /api/quizzes/users/:id
 * Returns all quizzes for a user grouped by topic, with quiz_count and avg_score.
 */
router.get('/users/:id', async (req, res, next) => {
  try {
    const quizzes = await quizModel.getQuizzesByUser(req.params.id);
    res.json(quizzes);
  } catch (error) {
    next(error);
  }
});

/**
 * PUT /api/quizzes/:id
 * Updates the score for a completed quiz.
 * Body: { score, userId, topicId, classCode, numQuestions, isRetake? }
 */
router.put('/:id', async (req, res, next) => {
  try {
    const { score, userId, topicId, classCode, numQuestions, isRetake = false } = req.body;
    console.log(`[Score Update] 📡 INCOMING: ID=${req.params.id} | Score=${score} | User=${userId} | Topic=${topicId}`);

    if (score === undefined || score === null) {
      console.warn(`[Score Update] ⚠️ REJECTED: Score is missing for Quiz ${req.params.id}`);
      return res.status(400).json({ error: 'score is required' });
    }

    const updated = await quizModel.updateQuizScore(req.params.id, score, isRetake);
    if (!updated) {
      console.error(`[Score Update] ❌ NOT FOUND: Quiz ${req.params.id} does not exist in DB.`);
      return res.status(404).json({ error: 'Quiz not found' });
    }

    console.log(`[Score Update] ✅ SUCCESS: Quiz ${req.params.id} updated to ${score}%`);

    // Update daily topic metrics if context is available
    if (userId && classCode && topicId && numQuestions) {
      quizModel.updateTopicMetrics({
        userId,
        classCode,
        topicId,
        questionsAsked: numQuestions,
        score: score != null ? parseFloat((score / 20).toFixed(2)) : null,
      }).catch(err => console.warn('[QuizGen] ⚠️ Stats update failed (non-critical):', err.message));
    }

    res.json({ success: true, quiz: updated });
  } catch (error) {
    next(error);
  }
});

/**
 * POST /api/quizzes/:id/retake
 * Signals a quiz retake — increments retakes_taken for the user.
 * Body: { userId }
 */
router.post('/:id/retake', async (req, res, next) => {
  try {
    const { userId } = req.body;
    if (!userId) return res.status(400).json({ error: 'userId is required' });

    await userStatsModel.incrementRetakesTaken(userId);
    res.json({ success: true, message: 'Retake tracked.' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
