const express = require('express');
const router = express.Router();
const { randomUUID } = require('crypto');
const { getClassVectorStore } = require('../services/vectorService');
const { getQuizGeneratorChain, parser } = require('../services/quizService');
const topicModel = require('../models/topicModel');
const quizModel = require('../models/quizModel');

router.post('/generate', async (req, res, next) => {
  try {
    const { classCode, topic, numQuestions = 5, difficulty = ["easy", "medium"], userId } = req.body;

    if (!classCode || !topic) {
      return res.status(400).json({ error: "Missing required fields: classCode, topic" });
    }
    
    const count = parseInt(numQuestions) || 5;

    // Construct difficulty requirements based on the difficulty array
    const selectedLevels = [];
    const levels = Array.isArray(difficulty) ? difficulty : [];
    
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
      console.log(`  - Chunk ${i+1} Source: ${doc.metadata.source || 'Local Seed'}`);
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

    // 7. Return generated quiz data with quizId
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

module.exports = router;
