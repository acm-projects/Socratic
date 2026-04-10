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
    model: "gemini-3.1-flash-lite-preview",
    apiKey: process.env.GEMINI_API_KEY,
    temperature,
    maxRetries: 1,
  });

  const fallbackLatest = new ChatGoogleGenerativeAI({
    model: "gemini-flash-latest",
    apiKey: process.env.GEMINI_API_KEY,
    temperature,
    maxRetries: 1,
  });

  return primary.withFallbacks({
    fallbacks: [fallbackPro, fallbackLite, fallbackLatest]
  });
}

/**
 * Super-fast LLM specifically for background tasks like scoring.
 * Uses the Lite model for <1s latency.
 */
function getFastLLM() {
  return new ChatGoogleGenerativeAI({
    model: "gemini-3.1-flash-lite-preview", // The newest and fastest lite model for your account
    apiKey: process.env.GEMINI_API_KEY,
    temperature: 0.1,
    maxRetries: 0,
  });
}

// --- Score Engine Setup ---
const parser = StructuredOutputParser.fromNamesAndDescriptions({
  score: "An integer from 0 to 5 reflecting the quality of the user input.",
  reason: "A short, 1-sentence reason explaining why you assigned that score."
});

const evaluatorLLM = getFastLLM();

const evaluatorPrompt = PromptTemplate.fromTemplate(`
  You are a scoring engine for {class} focusing on {topic}.
  Evaluate this user input on a scale of 0 to 5 based on depth, critical thinking, and clarity.
  
  Score 0: Irrelevant / Not a question / Off-topic / Truly irrelevant garbage ("what is the meaning of life?", "what is rizz?", "skibidi")
  Score 1: Basic definition question ("what is a variable?", "how does a for loop work?", "what is the syntax for a for loop?")
  Score 2: A do it for me request ("How do I solve problem 4?" or "My code doesn't work, please fix it", "walk me through step by step to solve this problem")
  Score 3: User asks for help but provides context. User asks why we use a certain concept or demonstrates critical thinking ("I'm trying to solve this problem, but I'm stuck, what am i missing?", "I know how to write a for loop, but I'm not sure how to use it to solve this problem, why do we use for loops how do they help our program?")
  Score 4: User connects the dots ("Why is a hash map faster than an array for this specific type of data retrieval?", "so we use a for loop to iterate through each element of the array then?")
  Score 5: What if hypthethical scenarios critical thinking ("So, is it accurate to think of a variable like a physical box? If so, what happens if I try to put a box inside another box?", "I understand how this physics formula works for positive velocity, but what if the object is thrown backward? Does the whole logic reverse, or does the math break?")
  User Input: "{input}"
  
  {format_instructions}
`);

const evalChain = RunnableSequence.from([evaluatorPrompt, evaluatorLLM, parser]);

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
  const tutorLLM = getRobustLLM(0.7, 1); // 1 retry then failover

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
- STRICT RULE: If the user mentions a specific Source or Page Number (e.g., "Page 17"), you MUST find the chunk with the matching '[[DOCUMENT DATA >> ... | PAGE: 17]]' label.
- Ignore chunks from other pages or lectures if they conflict with the specific page requested by the user.
- If you cannot find the exact page requested in the context, state that you don't have that specific page but provide info from the closest relevant section.

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
  getTutorChainWithHistory
};
