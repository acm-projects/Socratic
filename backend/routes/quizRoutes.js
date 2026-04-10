const express = require('express');
const router = express.Router();
const { getClassVectorStore } = require('../services/vectorService');
const { getQuizGeneratorChain, parser } = require('../services/quizService');

router.post('/generate', async (req, res, next) => {
  try {
    const { classCode, topic, numQuestions = 5, easy = true, medium = true, hard = false } = req.body;

    if (!classCode || !topic) {
      return res.status(400).json({ error: "Missing required fields: classCode, topic" });
    }
    
    const count = parseInt(numQuestions) || 5;

    // Construct difficulty requirements based on switches
    const selectedLevels = [];
    if (easy) selectedLevels.push("Easy (Recall/Definitions)");
    if (medium) selectedLevels.push("Medium (Application/Relationships)");
    if (hard) selectedLevels.push("Hard (Deep Analysis/Problem-Solving)");

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

    // 4. Return generated quiz data
    res.json({
      success: true,
      data: result,
      sources: sources // Include sources so the user can verify it's not hardcoded
    });
  } catch (error) {
    if (error.message && (error.message.includes('429') || error.message.toLowerCase().includes('quota'))) {
      return res.status(429).json({ error: "API Quota Exceeded. Please try again later." });
    }
    next(error);
  }
});

module.exports = router;
