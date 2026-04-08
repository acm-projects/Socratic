const { ChatGoogleGenerativeAI } = require('@langchain/google-genai');
const { ChatPromptTemplate, MessagesPlaceholder, PromptTemplate } = require('@langchain/core/prompts');
const { RunnableSequence, RunnableWithMessageHistory } = require('@langchain/core/runnables');
const { StructuredOutputParser } = require('@langchain/core/output_parsers');
const { PostgresChatMessageHistory } = require('@langchain/community/stores/message/postgres');
const pool = require('../db');
require('dotenv').config({ path: __dirname + '/../.env' });

const TARGET_MODEL = "gemini-2.5-flash";

// --- Score Engine Setup ---
const parser = StructuredOutputParser.fromNamesAndDescriptions({
  score: "An integer from 0 to 5 reflecting the quality of the user input.",
  reason: "A short, 1-sentence reason explaining why you assigned that score."
});

const evaluatorLLM = new ChatGoogleGenerativeAI({
  model: TARGET_MODEL,
  temperature: 0.2,
  apiKey: process.env.GEMINI_RESPONSE_API || process.env.GEMINI_API_KEY,
  maxRetries: 0,
});

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

// --- Tutor Engine Setup ---
function getTutorChainWithHistory() {
  const tutorLLM = new ChatGoogleGenerativeAI({
    model: TARGET_MODEL,
    apiKey: process.env.GEMINI_API_KEY,
    maxRetries: 0,
  });

  const tutorPrompt = ChatPromptTemplate.fromMessages([
    [
      'system',
      `You are a Socratic AI Tutor for {class}. The user is specifically studying: {topic}.

INSTRUCTIONS:
- You are allowed to casually chat, remember past questions, and answer meta-questions (e.g. "what was my last question").
- Do not be overly strict about staying on topic if the user is just casually talking to you.
- However, when they DO ask a learning question, do NOT just spoon-feed them the code or direct answer. Gently guide them using the Socratic method.

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
    getMessageHistory: (sessionId) =>
      new PostgresChatMessageHistory({
        sessionId,
        pool,
        tableName: 'langchain_chat_messages',
      }),
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
