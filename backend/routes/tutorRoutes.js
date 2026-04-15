const syllabusService = require('../services/syllabusService');
const topicModel = require('../models/topicModel');
const sessionModel = require('../models/chatSessionModel');
require('dotenv').config({ path: __dirname + '/../.env' });

const express = require('express');
const router = express.Router();
const { randomUUID } = require('crypto');
const { getClassVectorStore } = require('../services/vectorService');
const { evaluateQuestion, parser, getTutorChainWithHistory } = require('../services/tutorService');
const classModel = require('../models/classModel');
const userStatsModel = require('../models/userStatsModel');
// We no longer use chatModel; we use sessionModel and topicModel instead.

router.post('/chat', async (req, res, next) => {
  try {
    // Accept either sessionId OR chatId (chatId is legacy, sessionId is the new name)
    const { userId, classCode, topic: topicName, message, chatId: providedChatId, sessionId: providedSessionId } = req.body;
    
    // Normalize sessionId: ignore empty strings or stringified 'null'/'undefined'
    let incomingSessionId = providedSessionId || providedChatId || null;
    if (incomingSessionId === 'null' || incomingSessionId === 'undefined' || incomingSessionId === '') {
      incomingSessionId = null;
    }

    if (!userId || !classCode || !topicName || !message) {
      return res.status(400).json({ error: "Missing required fields: userId, classCode, topic, message" });
    }

    // 1. Resolve Topic ID (Official Schema requirement)
    await classModel.ensureClassExists(classCode, userId);
    let topic = await topicModel.getTopicByNameAndClass(topicName, classCode);
    if (!topic) {
      console.log(`[Tutor] 🆕 Creating new topic: ${topicName} for ${classCode}`);
      topic = await topicModel.createTopic({
        id: randomUUID(),
        class_code: classCode,
        name: topicName
      });
    }

    // 2. Ensure Session Exists in Official table
    // If the frontend passes sessionId/chatId, check if it exists in DB.
    let chatId = incomingSessionId;
    let isNewSession = false;

    if (chatId) {
      const existingSession = await sessionModel.getSessionById(chatId);
      if (!existingSession) {
        // If an ID was provided but not found, we create a new one with that requested ID
        // (This handles the case where frontend generates IDs locally)
        isNewSession = true;
      }
    } else {
      chatId = randomUUID();
      isNewSession = true;
    }

    // Use the first message as the session title — only matters on creation
    const sessionTitle = message.length > 50 ? message.substring(0, 47) + "..." : message;
    const session = await sessionModel.upsertTutorSession({
      session_id: chatId,
      class_code: classCode,
      user_id: userId,
      topic_id: topic.id,
      title: sessionTitle
    });

    // 3. Evaluate Question Quality
    console.log(`[Tutor] ⭐ Evaluating question quality...`);
    let score = 0;
    let reason = "Evaluation skipped.";
    
    try {
      const evalResult = await evaluateQuestion({ 
        input: message, 
        classCode: classCode, 
        topicName: topicName
      });
      score = evalResult.score;
      reason = evalResult.reason;
      console.log(`[Tutor] ⭐ Scored ${score}/5`);
    } catch (err) {
      console.error(`[Tutor] ❌ Scoring failed:`, err.message);
    }

    // 4. Save User Message to Official chat_history
    await sessionModel.saveChatMessage({
      id: randomUUID(),
      session_id: chatId,
      sender: 'user',
      content: message,
      score,
      reason
    });

    // 3. Vector Search (Simultaneous)
    const vectorStore = await getClassVectorStore(classCode);
    const fullQuery = `${topic}: ${message}`;
    
    // --- NEW: SNIPER SEARCH (Page-Specific Retrieval) ---
    // Detect if user is asking for a specific page/slide number
    const pageMatch = message.match(/(?:page|slide|p\.|s\.)\s*(\d+)/i);
    let targetedContext = [];
    
    if (pageMatch) {
      const targetPage = parseInt(pageMatch[1]);
      console.log(`[Tutor] 🎯 Sniper Search active for Page ${targetPage}`);
      
      const targetedResults = await vectorStore.similaritySearch(fullQuery, 3, {
        pageNumber: { "$eq": targetPage }
      });
      
      targetedContext = targetedResults.map(doc => {
        const page = doc.metadata.pageNumber || 'N/A';
        const source = doc.metadata.fileName || doc.metadata.source || 'Unknown Source';
        return `[[PRIORITY DATA >> SOURCE: ${source} | PAGE: ${page}]]\nCONTENT: ${doc.pageContent}`;
      });
    }

    // Set k to 10 for broad context
    const resultsWithScores = await vectorStore.similaritySearchWithScore(fullQuery, 10);
    
    // Enrich context with Page Numbers and Filenames
    const broadContext = resultsWithScores.map(([doc]) => {
      const page = doc.metadata.pageNumber || 'N/A';
      const source = doc.metadata.fileName || doc.metadata.source || 'Unknown Source';
      return `[[DOCUMENT DATA >> SOURCE: ${source} | PAGE: ${page}]]\nCONTENT: ${doc.pageContent}`;
    });

    // Combine targeted and broad context (Targeted first)
    const context = [...targetedContext, ...broadContext].join('\n--- NEXT CHUNK ---\n');

    // 4. Run Socratic AI Tutor
    console.log(`[Tutor] 🧠 Thinking... (Topic: ${topic})`);
    const tutorStartTime = Date.now();
    const tutorChainWithHistory = getTutorChainWithHistory();

    const tutorRes = await tutorChainWithHistory.invoke(
      {
        input: message,
        class: classCode,
        topic: topic,
        score,
        reason,
        context,
      },
      { configurable: { sessionId: chatId } }
    );

    const tutorDuration = ((Date.now() - tutorStartTime) / 1000).toFixed(1);
    console.log(`[Tutor] ✅ Brainstormed response in ${tutorDuration}s`);

    const aiContent = tutorRes.content || tutorRes;

    // 7. Final Save and Response
    await sessionModel.saveChatMessage({
      id: randomUUID(),
      session_id: chatId,
      sender: 'ai',
      content: aiContent
    });

    // 8. Track ai_messages count + streak (fire-and-forget, non-blocking)
    userStatsModel.incrementAiMessages(userId).catch(err =>
      console.warn('[Tutor] ⚠️ Failed to increment ai_messages:', err.message)
    );

    res.json({
      chatId,
      sessionId: chatId,   
      isNewSession,        
      reply: aiContent,    // Align with Swagger UI
      response: aiContent, // Stay compatible with existing code
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
