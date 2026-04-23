const pool = require('../db');
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
const quizModel = require('../models/quizModel');

// Utility to sanitize class codes (decodes %20, replaces spaces with dashes, uppercase)
const sanitizeClassCode = (code) => {
  if (!code) return code;
  try {
    const decoded = decodeURIComponent(code);
    return decoded.trim().replace(/\s+/g, '-').toUpperCase();
  } catch (e) {
    return code.trim().replace(/\s+/g, '-').toUpperCase();
  }
};
// We no longer use chatModel; we use sessionModel and topicModel instead.

router.post('/chat', async (req, res, next) => {

  try {
    // Accept either sessionId OR chatId (chatId is legacy, sessionId is the new name)
    const { userId, topic: topicName, message, chatId: providedChatId, sessionId: providedSessionId } = req.body;
    const classCode = sanitizeClassCode(req.body.classCode);

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

    // --- EARLY DETECTION: Detect Page/Lecture references for Sniper Search ---
    const pageMatch = message.match(/(?:page|slide|p\.|s\.)\s*(\d+)/i);
    const lectureMatch = message.match(/(?:lecture|lec|l\.)\s*(\d+)/i);
    const targetPage = pageMatch ? parseInt(pageMatch[1]) : null;
    const targetLecture = lectureMatch ? parseInt(lectureMatch[1]) : null;

    let vectorStore = null;
    try {
      vectorStore = await getClassVectorStore(classCode);
    } catch (vecErr) {
      console.warn('[Tutor] ⚠️ Pinecone unavailable, continuing without context:', vecErr.message);
    }

    // --- SMART QUERY EXPANSION: Prepend Lecture if detected and topic is generic ---
    let fullQuery = (resolvedTopicName === "General Discussion")
      ? message
      : `${resolvedTopicName}: ${message}`;

    if (targetLecture && resolvedTopicName === "General Discussion") {
      console.log(`[Tutor] 🚀 Dynamic Topic Override: General -> Lecture ${targetLecture}`);
      resolvedTopicName = `Lecture ${targetLecture}`;
      fullQuery = `${resolvedTopicName}: ${message}`;
    }

    // Build user filter
    const userFilter = userId ? { userId: { "$eq": userId } } : undefined;

    // --- NEW: SNIPER SEARCH (Page-Specific Retrieval) ---
    let targetedContext = [];
    if (targetPage && vectorStore) {
      console.log(`[Tutor] 🎯 Sniper Search active for Page ${targetPage}`);

      let targetedResults = [];
      if (userFilter) {
        targetedResults = await vectorStore.similaritySearch(fullQuery, 3, {
          pageNumber: { "$eq": targetPage },
          ...userFilter
        });
      }

      if (targetedResults.length === 0) {
        targetedResults = await vectorStore.similaritySearch(fullQuery, 3, {
          pageNumber: { "$eq": targetPage }
        });
      }

      targetedResults.forEach(doc => {
        const page = doc.metadata.pageNumber || 'N/A';
        const source = doc.metadata.fileName || doc.metadata.source || 'Unknown Source';
        targetedContext.push(`[[PRIORITY DATA >> SOURCE: ${source} | PAGE: ${page}]]\nCONTENT: ${doc.pageContent}`);
      });
    }

    // Fetch 100 chunks (Increased to cast a much wider net for implicit references). 
    let resultsWithScores = [];
    if (vectorStore) {
      try {
        if (userFilter) {
          // FIRST PASS: Search specifically for THIS user's uploaded documents (slides, notes, etc.)
          const userHits = await vectorStore.similaritySearchWithScore(fullQuery, 100, userFilter);
          
          // RELEVANCE THRESHOLD: If the user has high-quality hits in their own data, use THEM ONLY.
          const HIGH_RELEVANCE = 0.7; 
          const relevantUserHits = userHits.filter(([doc, score]) => score >= HIGH_RELEVANCE);

          if (relevantUserHits.length > 0) {
            console.log(`[Tutor] 🎯 Found ${relevantUserHits.length} high-relevance chunks from User ${userId}'s own uploads.`);
            resultsWithScores = relevantUserHits;
          } else if (userHits.length > 0) {
            console.log(`[Tutor] ⚠️ User ${userId} has docs, but they aren't highly relevant (Best: ${userHits[0][1].toFixed(2)}). Falling back to class search.`);
            resultsWithScores = await vectorStore.similaritySearchWithScore(fullQuery, 100);
          } else {
            console.log(`[Tutor] 📚 User ${userId} has no personal uploads. Searching class-wide documents...`);
            resultsWithScores = await vectorStore.similaritySearchWithScore(fullQuery, 100);
          }
        } else {
          resultsWithScores = await vectorStore.similaritySearchWithScore(fullQuery, 100);
        }
      } catch (err) {
        console.warn('[Tutor] ⚠️ Pinecone search failed:', err.message);
      }
    }

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

    // --- ADAPTIVE CONTEXT SLICING ---
    // Gemini has huge context; we want to be as aggressive as possible (top 50 chunks total).
    // Strategy: Take all targeted hits first (up to 25), then fill the remaining budget with broad search.
    const MAX_TOTAL_CHUNKS = 50;
    const MAX_TARGETED = 30; // Prioritize specific matches

    const finalTargeted = targetedContext.slice(0, MAX_TARGETED);
    const remainingBudget = Math.max(0, MAX_TOTAL_CHUNKS - finalTargeted.length);
    const finalBroad = broadContext.slice(0, remainingBudget);

    console.log(`[Tutor] 📚 RAG Density: ${finalTargeted.length} Targeted, ${finalBroad.length} Broad (Total: ${finalTargeted.length + finalBroad.length} chunks)`);

    // Combine targeted and broad context (Targeted first)
    const context = [...finalTargeted, ...finalBroad].join('\n--- NEXT CHUNK ---\n');


    // 4. Run Socratic AI Tutor
    console.log(`[Tutor] 🧠 Thinking... (Topic: ${resolvedTopicName})`);
    const tutorStartTime = Date.now();
    const tutorChainWithHistory = getTutorChainWithHistory();

    let tutorRes;
    const MAX_TUTOR_RETRIES = 3;
    for (let attempt = 1; attempt <= MAX_TUTOR_RETRIES; attempt++) {
      try {
        tutorRes = await tutorChainWithHistory.invoke(
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
        break;
      } catch (err) {
        const is503 = err.message?.includes('503') || err.message?.includes('Service Unavailable');
        const is429 = err.message?.includes('429');
        if ((is503 || is429) && attempt < MAX_TUTOR_RETRIES) {
          const delay = attempt * 1500;
          console.warn(`[Tutor] ⚠️ Attempt ${attempt} failed, retrying in ${delay}ms...`);
          await new Promise(r => setTimeout(r, delay));
        } else {
          throw err;
        }
      }
    }

    console.log(`[Tutor] 🧠 AI thinking complete. Response length: ${tutorRes.content?.length || tutorRes.length} chars`);

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

    userStatsModel.incrementAiMessages(userId).catch(err =>
      console.warn('[Tutor] ⚠️ Failed to increment ai_messages:', err.message)
    );

    const xpToAward = userStatsModel.CHAT_XP_MAP[score] || 10;
    userStatsModel.awardXP(userId, 'chat', xpToAward).catch(err =>
      console.warn('[Tutor] ⚠️ Failed to award XP:', err.message)
    );

    // 9. Update heatmap (daily_topic_metrics)
    quizModel.updateTopicMetrics({
      userId,
      classCode: sanitizeClassCode(classCode),
      topicId: topic.id,
      questionsAsked: 1,
      score
    }).catch(err =>
      console.warn('[Tutor] ⚠️ Failed to update heatmap:', err.message)
    );

    // Update class engagement (fire and forget)
    pool.query('SELECT name FROM classes WHERE class_code = $1', [sanitizeClassCode(classCode)])
      .then(classResult => {
        if (classResult.rows[0]) {
          const className = classResult.rows[0].name;
          const COLORS = ['#10B981', '#8B5CF6', '#3B82F6', '#EC4899', '#F59E0B', '#06B6D4'];
          const LIGHTS = ['#34D399', '#A78BFA', '#60A5FA', '#F472B6', '#FCD34D', '#22D3EE'];
          const colorIndex = className.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0) % COLORS.length;
          const color = COLORS[colorIndex];
          const light = LIGHTS[colorIndex];
          const weekStart = new Date();
          weekStart.setHours(0, 0, 0, 0);
          weekStart.setDate(weekStart.getDate() - weekStart.getDay());
          return pool.query(
            `INSERT INTO class_engagement (id, user_id, class_name, question_count, week_start, color, light)
             VALUES ($1, $2, $3, 1, $4, $5, $6)
             ON CONFLICT (user_id, class_name, week_start)
             DO UPDATE SET question_count = class_engagement.question_count + 1`,
            [require('crypto').randomUUID(), userId, className, weekStart, color, light]
          );
        }
      })
      .catch(err => console.warn('[Tutor] ⚠️ Failed to update engagement:', err.message));

    // Update class streak (fire and forget)
    pool.query("SELECT streak, last_activity_date FROM classes WHERE class_code = $1 AND user_id = $2", [classCode, userId])
      .then(classResult => {
        if (!classResult.rows[0]) return;
        const today = new Date().toISOString().split('T')[0];
        const { streak, last_activity_date } = classResult.rows[0];
        const lastDate = last_activity_date ? new Date(last_activity_date).toISOString().split('T')[0] : null;
        if (lastDate === today) return;
        let newStreak = 1;
        if (lastDate) {
          const yesterday = new Date();
          yesterday.setDate(yesterday.getDate() - 1);
          if (lastDate === yesterday.toISOString().split('T')[0]) {
            newStreak = (streak || 0) + 1;
          }
        }
        return pool.query(
          "UPDATE classes SET streak = $1, last_activity_date = $2 WHERE class_code = $3 AND user_id = $4",
          [newStreak, today, classCode, userId]
        );
      })
      .catch(err => console.warn('[Tutor] ⚠️ Failed to update streak:', err.message));

    res.json({
      chatId,
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
