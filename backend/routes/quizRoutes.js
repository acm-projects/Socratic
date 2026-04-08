const express = require('express');
const router = express.Router();
const { getClassVectorStore } = require('../services/vectorService');
const { getQuizGeneratorChain, parser } = require('../services/quizService');

router.post('/generate', async (req, res, next) => {
  try {
    const { classCode, topic, numQuestions = 5 } = req.body;

    if (!classCode || !topic) {
      return res.status(400).json({ error: "Missing required fields: classCode, topic" });
    }
    
    const count = parseInt(numQuestions) || 5;

    // 1. Search the shared class knowledge base (populated by PDF ingest)
    const vectorStore = await getClassVectorStore(classCode);
    
    console.log(`[QuizGen] Querying Pinecone namespace for class: ${classCode}`);
    
    // We want broad context for the topic. Retrieve the top 5 most relevant chunks.
    const resultsWithScores = await vectorStore.similaritySearchWithScore(topic, 5);
    
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
    console.log(`[QuizGen] 🎓 Generating ${count} questions for ${classCode}...`);
    const quizStartTime = Date.now();
    
    const result = await chain.invoke({
      class: classCode,
      topic: topic,
      numQuestions: count,
      context: context,
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
