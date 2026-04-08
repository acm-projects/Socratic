const express = require('express');
const router = express.Router();
const { randomUUID } = require('crypto');
const { getClassVectorStore } = require('../services/vectorService');
const { evalChain, parser, getTutorChainWithHistory } = require('../services/tutorService');
const { addMessage, createChat, updateChatScore } = require('../models/chatModel');

router.post('/chat', async (req, res, next) => {
  try {
    const { userId, classCode, topic, message, chatId: providedChatId } = req.body;

    if (!userId || !classCode || !topic || !message) {
      return res.status(400).json({ error: "Missing required fields: userId, classCode, topic, message" });
    }

    // Determine Chat ID
    let chatId = providedChatId;
    if (!chatId) {
      chatId = randomUUID();
      const title = `${classCode} - ${topic}`;
      await createChat(chatId, title);
    }

    // Search the shared class knowledge base (populated by PDF ingest)
    const vectorStore = await getClassVectorStore(classCode);
    const tutorChainWithHistory = getTutorChainWithHistory();

    // 1. Evaluate User Input
    const evalRes = await evalChain.invoke({
      input: message,
      class: classCode,
      topic: topic,
      format_instructions: parser.getFormatInstructions()
    });

    let score = parseInt(String(evalRes.score)) || 0;
    let reason = evalRes.reason || "";

    if (score > 0) {
      await updateChatScore(chatId, score);
    }

    // 2. Save User Message
    await addMessage(chatId, 'user', message, score, reason);

    // 3. Vector Search
    const fullQuery = `${topic}: ${message}`;
    const resultsWithScores = await vectorStore.similaritySearchWithScore(fullQuery, 2);
    const context = resultsWithScores.map(([doc]) => doc.pageContent).join('\n---\n');

    // 4. Run Socratic AI Tutor
    const tutorRes = await tutorChainWithHistory.invoke(
      {
        input: message,
        class: classCode,
        topic: topic,
        score,
        reason,
        context,
      },
      {
        configurable: { sessionId: chatId }
      }
    );

    const aiContent = tutorRes.content.toString();

    // 5. Save AI Message
    await addMessage(chatId, 'assistant', aiContent, 0, '');

    res.json({
      chatId,
      response: aiContent,
      score,
      reason
    });
  } catch (error) {
    if (error.message && (error.message.includes('429') || error.message.toLowerCase().includes('quota'))) {
      return res.status(429).json({ error: "API Quota Exceeded. Please try again later." });
    }
    next(error);
  }
});

module.exports = router;
