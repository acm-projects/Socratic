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

    if (!userId || !classCode || !message) {
      return res.status(400).json({ error: "Missing required fields: userId, classCode, message" });
    }

    // 1. Resolve Topic ID (Official Schema requirement)
    // Try to resolve topic from: 1. Input param, 2. Existing session, 3. Default "General Discussion"
    let topic;
    let resolvedTopicName = topicName;

    // A. Check if session exists and has a topic
    let chatId = incomingSessionId;
    let isNewSession = false;
    let existingSession = null;

    if (chatId) {
      existingSession = await sessionModel.getSessionById(chatId);
      if (!existingSession) {
        isNewSession = true;
      }
    } else {
      chatId = randomUUID();
      isNewSession = true;
    }

    if (!resolvedTopicName && existingSession) {
      console.log(`[Tutor] ℹ️ Topic missing, inheriting from session ${chatId}`);
      topic = await topicModel.getTopicById(existingSession.topic_id);
      resolvedTopicName = topic ? topic.name : "General Discussion";
    }

    if (!resolvedTopicName) {
      resolvedTopicName = "General Discussion";
    }

    await classModel.ensureClassExists(classCode, userId);
    
    if (!topic) {
      topic = await topicModel.getTopicByNameAndClass(resolvedTopicName, classCode);
      if (!topic) {
        console.log(`[Tutor] 🆕 Creating topic: ${resolvedTopicName} for ${classCode}`);
        topic = await topicModel.createTopic({
          id: randomUUID(),
          class_code: classCode,
          name: resolvedTopicName
        });
      }
    }

    // 2. Ensure Session Exists in Official table
    // (chatId and isNewSession already determined above)

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
        topicName: resolvedTopicName
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
    
    // --- EARLY DETECTION: Detect Page/Lecture references for Sniper Search ---
    const pageMatch = message.match(/(?:page|slide|p\.|s\.)\s*(\d+)/i);
    const lectureMatch = message.match(/(?:lecture|lec|l\.)\s*(\d+)/i);
    const targetPage = pageMatch ? parseInt(pageMatch[1]) : null;
    const targetLecture = lectureMatch ? parseInt(lectureMatch[1]) : null;

    // --- SMART QUERY EXPANSION: Prepend Lecture if detected and topic is generic ---
    let fullQuery = (resolvedTopicName === "General Discussion") 
      ? message 
      : `${resolvedTopicName}: ${message}`;

    if (targetLecture && resolvedTopicName === "General Discussion") {
      console.log(`[Tutor] 🚀 Boosting query for Lecture ${targetLecture}`);
      fullQuery = `Lecture ${targetLecture}: ${fullQuery}`;
    }

    // --- NEW: SNIPER SEARCH (Page-Specific Retrieval) ---
    let targetedContext = [];
    if (targetPage) {
      console.log(`[Tutor] 🎯 Sniper Search active for Page ${targetPage}`);
      const targetedResults = await vectorStore.similaritySearch(fullQuery, 3, {
        pageNumber: { "$eq": targetPage }
      });
      
      targetedResults.forEach(doc => {
        const page = doc.metadata.pageNumber || 'N/A';
        const source = doc.metadata.fileName || doc.metadata.source || 'Unknown Source';
        targetedContext.push(`[[PRIORITY DATA >> SOURCE: ${source} | PAGE: ${page}]]\nCONTENT: ${doc.pageContent}`);
      });
    }

    if (targetLecture) {
      console.log(`[Tutor] 🎯 Sniper Search active for Lecture ${targetLecture}`);
    }

    // Fetch 50 chunks (Increased from 25 to improve Sniper Search filtering). 
    const resultsWithScores = await vectorStore.similaritySearchWithScore(fullQuery, 50);
    
    let broadContext = [];
    
    resultsWithScores.forEach(([doc]) => {
      const page = doc.metadata.pageNumber || 'N/A';
      const source = doc.metadata.fileName || doc.metadata.source || 'Unknown Source';
      const chunkStr = `[[DOCUMENT DATA >> SOURCE: ${source} | PAGE: ${page}]]\nCONTENT: ${doc.pageContent}`;

      if (targetLecture) {
        const sourceRegex = new RegExp(`lecture[^a-zA-Z0-9]*0*${targetLecture}\\b`, 'i');
        if (sourceRegex.test(source)) {
          // Add to targeted context to give priority
          targetedContext.push(chunkStr);
          return;
        }
      }
      broadContext.push(chunkStr);
    });

    // Limit to prevent token overflow
    targetedContext = targetedContext.slice(0, 10);
    broadContext = broadContext.slice(0, 10);

    // Combine targeted and broad context (Targeted first)
    const context = [...targetedContext, ...broadContext].join('\n--- NEXT CHUNK ---\n');


    // 4. Run Socratic AI Tutor
    console.log(`[Tutor] 🧠 Thinking... (Topic: ${resolvedTopicName})`);
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
      sessionId: chatId,   
      isNewSession,        
      reply: aiContent,    
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
