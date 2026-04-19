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
  try {
    const { classCode, topic, numQuestions = 5, difficulty, easy, medium, hard, userId } = req.body;

    if (!classCode || !topic) {
      return res.status(400).json({ error: "Missing required fields: classCode, topic" });
    }

    const count = parseInt(numQuestions) || 5;

    // Normalize difficulty: handle both ["easy"], { easy: true }, and top-level easy/medium/hard
    let levels = [];
    if (Array.isArray(difficulty)) {
      levels = difficulty;
    } else if (typeof difficulty === 'object' && difficulty !== null) {
      levels = Object.keys(difficulty).filter(key => difficulty[key] === true);
    } else {
      // Handle frontend sending easy/medium/hard as separate boolean fields
      if (easy) levels.push("easy");
      if (medium) levels.push("medium");
      if (hard) levels.push("hard");
      // Default to all three if nothing was sent
      if (levels.length === 0) levels = ["easy", "medium", "hard"];
    }

    const selectedLevels = [];
    if (levels.includes("easy")) selectedLevels.push("Easy (Recall/Definitions)");
    if (levels.includes("medium")) selectedLevels.push("Medium (Application/Relationships)");
    if (levels.includes("hard")) selectedLevels.push("Hard (Deep Analysis/Problem-Solving)");

    const difficultyRequirements = selectedLevels.length > 0
      ? `Provide a balanced mix of questions at these difficulty levels: ${selectedLevels.join(", ")}.`
      : "Provide a balanced variety of difficulty levels.";

    // 1. Search the shared class knowledge base (populated by PDF ingest)
    const vectorStore = await getClassVectorStore(classCode);

    console.log(`[QuizGen] Querying Pinecone namespace for class: ${classCode}`);

    // We want broad context for the topic. Retrieve the top 8 most relevant chunks for better recall.
    const resultsWithScores = await vectorStore.similaritySearchWithScore(topic, 8);

    const context = resultsWithScores.map(([doc]) => doc.pageContent).join('\n---\n');
    const sources = resultsWithScores.map(([doc]) => ({
      source: doc.metadata.source || 'Unknown',
      page: doc.metadata.pageNumber || 'N/A'
    }));

    console.log(`[QuizGen] Retrieved ${resultsWithScores.length} context chunks from Pinecone.`);
    resultsWithScores.forEach(([doc], i) => {
      console.log(`  - Chunk ${i + 1} Source: ${doc.metadata.source || 'Local Seed'}`);
    });

    // 2. Initialize the LLM Chain
    const chain = getQuizGeneratorChain();

    // 3. Generate the Quiz
    console.log(`[QuizGen] 🎓 Generating ${count} ${selectedLevels.join("/")} questions for ${classCode}...`);
    const quizStartTime = Date.now();

    const result = await chain.invoke({
      class: classCode,
      topic: topic,
      numQuestions: count,
      context: context,
      difficultyRequirements: difficultyRequirements,
      format_instructions: parser.getFormatInstructions()
    });

    const quizDuration = ((Date.now() - quizStartTime) / 1000).toFixed(1);
    console.log(`[QuizGen] ✅ Quiz generated successfully in ${quizDuration}s`);

    // 4. Resolve Topic ID
    await classModel.ensureClassExists(classCode, userId);

    let topicEntity = await topicModel.getTopicByNameAndClass(topic, classCode);
    if (!topicEntity) {
      console.log(`[QuizGen] 🆕 Creating new topic: ${topic} for ${classCode}`);
      topicEntity = await topicModel.createTopic({
        id: randomUUID(),
        class_code: classCode,
        name: topic
      });
    }

    // 5. Save Quiz Metadata to DB
    if (!userId) {
      return res.status(400).json({ error: "userId is required to generate and save a quiz" });
    }

    const quizId = randomUUID();
    await quizModel.createQuiz({
      id: quizId,
      user_id: userId,
      topic_id: topicEntity.id,
      score: 0 // Initial score
    });

    // 6. Save Generated Questions to DB
    // The parser returns an array of questions. We need to handle that.
    const questions = Array.isArray(result) ? result : (result.questions || []);
    await quizModel.saveQuestions(quizId, questions);

    // 7. Update daily heatmap metrics (questions asked + avg score for that topic)
    const numQuestionsGenerated = questions.length;
    // AFTER
    quizModel.updateTopicMetrics({
      userId,
      classCode,
      topicId: topicEntity.id,
      questionsAsked: numQuestionsGenerated,
      score: 0
    }).catch(err => console.warn('[QuizGen] ⚠️ Stats update failed (non-critical):', err.message));

    // 8. Track quizzes_taken stat (fire-and-forget, non-blocking)
    userStatsModel.incrementQuizzesTaken(userId).catch(err =>
      console.warn('[QuizGen] ⚠️ Failed to increment quizzes_taken:', err.message)
    );

    // 9. Return generated quiz data with quizId
    res.json({
      success: true,
      quizId: quizId,
      data: result,
      sources: sources
    });
  } catch (error) {
    next(error);
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
    res.json(questions);
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

    if (score === undefined || score === null) {
      return res.status(400).json({ error: 'score is required' });
    }

    const updated = await quizModel.updateQuizScore(req.params.id, score, isRetake);
    if (!updated) {
      return res.status(404).json({ error: 'Quiz not found' });
    }

    // Update daily topic metrics if context is available
    if (userId && classCode && topicId && numQuestions) {
      quizModel.updateTopicMetrics({
        userId,
        classCode,
        topicId,
        questionsAsked: numQuestions,
        score,
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
