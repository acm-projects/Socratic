import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
import { ChatPromptTemplate, MessagesPlaceholder, PromptTemplate } from '@langchain/core/prompts';
import { RunnableSequence, RunnableWithMessageHistory } from '@langchain/core/runnables';
import { StructuredOutputParser } from '@langchain/core/output_parsers';
import { PostgresChatMessageHistory } from '@langchain/community/stores/message/postgres';
import { pool } from '../db';
import * as dotenv from 'dotenv';
dotenv.config();

const TARGET_MODEL = "gemini-2.0-flash";

// --- Score Engine Setup ---
export const parser = StructuredOutputParser.fromNamesAndDescriptions({
  score: "An integer from 0 to 5 reflecting the quality of the user input.",
  reason: "A short, 1-sentence reason explaining why you assigned that score."
});

const evaluatorLLM = new ChatGoogleGenerativeAI({
  model: TARGET_MODEL,
  temperature: 0.2,
  apiKey: process.env.GEMINI_RESPONSE_API,
  maxRetries: 0,
});

const evaluatorPrompt = PromptTemplate.fromTemplate(`
  You are a scoring engine for {class} focusing on {topic}.
  Evaluate this user input on a scale of 0 to 5 based on depth, critical thinking, and clarity.
  If it is completely unrelated to {class} or {topic}, assign a score of 0 and note "Off-topic".
  
  Score 0: Irrelevant / Not a question / Off-topic ("what is the meaning of life?", "what is rizz?", "skibidi")
  Score 1: Basic definition question ("what is a variable?", "how does a for loop work?", "what is the syntax for a for loop?")
  Score 2: A do it for me request ("How do I solve problem 4?" or "My code doesn't work, please fix it", "walk me through step by step to solve this problem")
  Score 3: User asks for help but provides context ("I'm trying to solve this problem, but I'm stuck, what am i missing?", "I know how to write a for loop, but I'm not sure how to use it to solve this problem")
  Score 4: User connects the dots ("Why is a hash map faster than an array for this specific type of data retrieval?", "so we use a for loop to iterate through each element of the array then?")
  Score 5: What if hypthethical scenarios critical thinking ("So, is it accurate to think of a variable like a physical box? If so, what happens if I try to put a box inside another box?", "I understand how this physics formula works for positive velocity, but what if the object is thrown backward? Does the whole logic reverse, or does the math break?")
  User Input: "{input}"
  
  {format_instructions}
`);

export const evalChain = RunnableSequence.from([evaluatorPrompt, evaluatorLLM, parser]);

// --- Tutor Engine Setup ---
export function getTutorChainWithHistory() {
  const tutorLLM = new ChatGoogleGenerativeAI({
    model: TARGET_MODEL,
    apiKey: process.env.GEMINI_API_KEY,
    maxRetries: 0,
  });

  const tutorPrompt = ChatPromptTemplate.fromMessages([
    [
      'system',
      `You are a Socratic AI Tutor for {class}. The user is specifically studying: {topic}.

UNIVERSAL INSTRUCTIONS:
- Do NOT give them the exact code or direct answer. Make them think.
- If the user's question is entirely unrelated to {class} or {topic}, politely redirect them back to studying {topic}. Do not answer off-topic questions.
- If they scored low (0-2) but are on-topic, offer a small hint or ask a guiding question about fundamentals.
- If they scored high (3-5), validate their deep thinking and dive deeper into optimization or context.
- Keep them strictly on track.

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
    getMessageHistory: (sessionId: string) =>
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
