const { ChatGoogleGenerativeAI } = require('@langchain/google-genai');
const { ChatPromptTemplate, MessagesPlaceholder, PromptTemplate } = require('@langchain/core/prompts');
const { RunnableSequence, RunnableWithMessageHistory } = require('@langchain/core/runnables');
const { StructuredOutputParser } = require('@langchain/core/output_parsers');
const { HumanMessage, AIMessage } = require('@langchain/core/messages');
const { BaseChatMessageHistory } = require('@langchain/core/chat_history');
const pool = require('../db');
require('dotenv').config({ path: __dirname + '/../.env' });

const TARGET_MODEL = "gemini-2.5-flash";

// --- Robust LLM Configuration ---
function getRobustLLM(temperature = 0.2, maxRetries = 1) {
  const primary = new ChatGoogleGenerativeAI({
    model: TARGET_MODEL,
    apiKey: process.env.GEMINI_API_KEY,
    temperature,
    maxRetries,
  });

  const fallbackPro = new ChatGoogleGenerativeAI({
    model: "gemini-2.5-pro",
    apiKey: process.env.GEMINI_API_KEY,
    temperature,
    maxRetries: 1,
  });

  const fallbackLite = new ChatGoogleGenerativeAI({
    model: "gemini-3.0-flash",
    apiKey: process.env.GEMINI_API_KEY,
    temperature,
    maxRetries: 1,
  });

  return primary.withFallbacks({
    fallbacks: [fallbackPro]
  });
}

/**
 * Super-fast LLM specifically for background tasks like scoring.
 * Uses the Lite model for <1s latency.
 */
function getFastLLM() {
  const primary = new ChatGoogleGenerativeAI({
    model: "gemini-2.5-flash-lite",
    apiKey: process.env.GEMINI_API_KEY,
    temperature: 0.1,
    maxRetries: 2, // Non-zero retries for transient 503s
  });

  // Fallback to high-token 2.0+ models as per user requirement
  const fallbackPro = new ChatGoogleGenerativeAI({
    model: "gemini-2.5-pro",
    apiKey: process.env.GEMINI_API_KEY,
    temperature: 0.1,
    maxRetries: 1,
  });

  return primary.withFallbacks({
    fallbacks: [fallbackPro]
  });
}

// --- Score Engine Setup ---
const parser = StructuredOutputParser.fromNamesAndDescriptions({
  score: "An integer from 0 to 5 reflecting the quality of the user input.",
  reason: "A short, 1-sentence reason explaining why you assigned that score."
});

/**
 * EXPLICIT MODEL DEFINITIONS FOR SCORING ENGINE
 */
const evaluatorPrompt = PromptTemplate.fromTemplate(`
  You are a scoring engine for {class} focusing on {topic}.
  Evaluate this user input on a scale of 0 to 5 based on depth, critical thinking, and clarity.
  
  Score 0: Irrelevant / Not a question / Off-topic / Truly irrelevant garbage ("what is the meaning of life?", "what is rizz?", "skibidi")
  Score 1: Basic definition question ("what is a variable?", "how does a for loop work?", "what is the syntax for a for loop?, "what is the answer to this question?"")
  Score 2: A do it for me request ("How do I solve problem 4?" or "My code doesn't work, why isn't it working", "walk me through step by step to solve this problem then give me the answer")
  Score 3: User asks for help but provides context. User asks why we use a certain concept or demonstrates critical thinking ("I'm trying to solve this problem, but I'm stuck, what am i missing?", "I know how to write a for loop, but I'm not sure how to use it to solve this problem, why do we use for loops how do they help our program?, okay here are my steps what do I do after this?, okay so I know bernouli trials are indpendant but are they mutually exclusive?", "I know how to write a for loop, but I'm not sure how to use it to solve this problem, why do we use for loops how do they help our program?, okay here are my steps what do I do after this?, okay so I know bernouli trials are indpendant but are they mutually exclusive?")
  Score 4: User connects the dots or asks for a practice problem ("Why is a hash map faster than an array for this specific type of data retrieval?", "so we use a for loop to iterate through each element of the array then?", "so bernouli trials are indpendant but are they mutually exclusive?", "give me a practice problem over this topic")
  Score 5: What if hypthethical scenarios critical thinking explaining each step ("So, is it accurate to think of a variable like a physical box? If so, what happens if I try to put a box inside another box?", "I understand how this physics formula works for positive velocity, but what if the object is thrown backward? Does the whole logic reverse, or does the math break?", "so to recap, solving a deravidive take the power, subtract one, then you make that the coefcient?", "so if i have a function that is f(x) = x^2, the derivative is 2x, so if i have a function that is f(x) = x^3, the derivative is 3x^2?")
  User Input: "{input}"
  
  {format_instructions}
`);

const getScoringModel = (modelName) => new ChatGoogleGenerativeAI({
  model: modelName,
  apiKey: process.env.GEMINI_API_KEY,
  temperature: 0.1,
  maxRetries: 0 // We handle retries manually for better logging
});

/**
 * HIGH-RELIABILITY SCORING ENGINE
 * Explicitly tries Lite, Pro, and then Flash with manual retries and logging.
 */
async function evaluateQuestion({ input, classCode, topicName }) {
  const models = [
    { name: "gemini-2.5-flash", label: "Standard (Primary - Most Stable)" },
    { name: "gemini-2.5-pro", label: "Pro (High Tokens Fallback)" },
    { name: "gemini-3.0-flash", label: "Lite (Speed Fallback)" }
  ];

  const scoringPrompt = await evaluatorPrompt.format({
    class: classCode,
    topic: topicName,
    input: input,
    format_instructions: parser.getFormatInstructions()
  });

  let lastError;
  for (let i = 0; i < models.length; i++) {
    const { name, label } = models[i];
    try {
      if (i > 0) {
        // Small delay for retries/fallbacks
        const delay = i === 1 ? 1500 : 500;
        await new Promise(r => setTimeout(r, delay));
      }

      console.log(`[Tutor] ⭐ Attempting evaluation with ${label}...`);
      const llm = getScoringModel(name);
      const res = await llm.invoke(scoringPrompt);
      const parsed = await parser.parse(res.content || res);

      console.log(`[Tutor] ⭐ Successfully scored via ${label}`);
      return parsed;

    } catch (err) {
      lastError = err;
      const is503 = err.message?.includes("503") || err.message?.includes("Service Unavailable");
      console.warn(`[Tutor] ⚠️  ${label} failed:`, is503 ? "503 Service Unavailable" : err.message);

      if (i === models.length - 1) {
        console.error(`[Tutor] ❌ All scoring models failed. Final error:`, err.message);
      }
    }
  }

  // Final Fallback if everything fails
  return { score: 0, reason: "Scoring failed after multiple fallbacks." };
}

// Keep legacy evalChain if needed elsewhere, but point to a robust runner
const evalChain = {
  invoke: async (params) => {
    return evaluateQuestion({
      input: params.input,
      classCode: params.class,
      topicName: params.topic
    });
  }
};

/**
 * Custom LangChain history adapter for the Socratic chat_history table.
 * Maps 'human' -> 'user' and 'ai' -> 'assistant' for database consistency.
 */
class PostgresSocraticHistory extends BaseChatMessageHistory {
  constructor(fields) {
    super();
    this.sessionId = fields.sessionId;
    this.pool = fields.pool;
  }

  async getMessages() {
    try {
      const res = await this.pool.query(
        "SELECT sender, content FROM chat_history WHERE session_id = $1 ORDER BY created_at ASC",
        [this.sessionId]
      );
      return res.rows.map(row => {
        if (row.sender === 'human' || row.sender === 'user') {
          return new HumanMessage(row.content);
        } else {
          return new AIMessage(row.content);
        }
      });
    } catch (err) {
      console.warn('[History] Failed to load history, starting fresh:', err.message);
      return [];
    }
  }

  /**
   * NO-OP: We handle manual message saving in tutorRoutes.js
   * to ensure we can save custom fields like 'score' and 'reason'.
   */
  async addMessage(message) {
    // Already saved in the route logic
    return;
  }

  async addUserMessage(message) {
    await this.addMessage(new HumanMessage(message));
  }

  async addAIChatMessage(message) {
    await this.addMessage(new AIMessage(message));
  }

  async clear() {
    await this.pool.query("DELETE FROM chat_history WHERE session_id = $1", [this.sessionId]);
  }
}

// --- Tutor Engine Setup ---
function getTutorChainWithHistory() {
  const tutorLLM = getRobustLLM(0.7, 3); // 3 retries then failover

  const tutorPrompt = ChatPromptTemplate.fromMessages([
    [
      'system',
      `You are a Socratic AI Tutor for {class}. The user is specifically studying: {topic}.

INSTRUCTIONS:
- You are a helpful AI Tutor. Your primary goal is to help the user learn effectively.
- WHILE you should use the Socratic method to guide students, you MUST NOT be a gatekeeper.
- If the user asks for a summary, a direct answer, or a step-by-step explanation, PROVIDE IT immediately.
- Once you've provided the information, you can then ask follow-up Socratic questions to ensure they understand the "why" behind the answer.
- Do not be overly strict. If they want the answer so they can ask follow-up questions based on the steps, give them the steps!

RETRIEVAL & CONTEXT GUIDELINES:
- You have been provided with document chunks from this class.
- ALWAYS prioritize chunks from user-uploaded materials (slides, notes, textbooks) first.
- If the uploaded materials contain relevant information, use ONLY that to answer.
- If the uploaded materials do NOT contain relevant information for the question, then use whatever general course context is available in the provided chunks.
- If there are truly no relevant chunks at all, answer from your general knowledge about the topic but clearly state: 'I don't see this in your uploaded materials, but here is what I know generally:'
- Never fabricate specific course details like exam dates, assignment weights, or professor-specific policies if they aren't in the context.

SOURCE CITATION:
- When your answer is based on specific document chunks from the COURSE CONTEXT, **always end your response with a short "📖 Source" note** pointing the student to where they can find more.
- Write the source in natural, human-readable language — NOT the raw filename. Convert filenames to clean references:
  - "lecture-15(2).pdf" → "Lecture 15"
  - "CS3341_slides_week3.pdf" → "Week 3 slides"
  - "textbook_chapter4.pdf" → "Chapter 4 of the textbook"
  - "syllabus.pdf" → "the course syllabus"
  - When in doubt, strip file extensions, dashes, underscores, and numbers to form a clean name.
- Always include specific page numbers when available. Format: "pages 6 and 10" or "pages 3–5".
- Example: " **Source**: You can find more about this in Lecture 15, pages 6 and 10."
- Example: " **Source**: This is covered in Week 3 slides (pages 2–4) and Chapter 4 of the textbook (page 87)."
- If multiple sources were used, list them concisely in one sentence.
- **If no relevant context was found in the COURSE CONTEXT, do NOT add a source note.** Just answer from your general knowledge naturally — do not mention that documents were missing or that you're using general knowledge.

=== COURSE CONTEXT INCORPORATED FROM LECTURES/TEXTBOOK ===
{context}

Current question quality score: {score}/5 — {reason}.`
    ],
    new MessagesPlaceholder('history'),
    ['human', '{input}']
  ]);

  const tutorChain = tutorPrompt.pipe(tutorLLM);

  const tutorChainWithHistory = new RunnableWithMessageHistory({
    runnable: tutorChain,
    getMessageHistory: (sessionId) => new PostgresSocraticHistory({ sessionId, pool }),
    inputMessagesKey: 'input',
    historyMessagesKey: 'history',
  });

  return tutorChainWithHistory;
}

module.exports = {
  parser,
  evalChain,
  evaluateQuestion,
  getTutorChainWithHistory
};
