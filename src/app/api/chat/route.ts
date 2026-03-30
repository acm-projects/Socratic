import { NextResponse } from 'next/server';
import { getVectorStore } from '@/lib/vectorstore';
import { addMessage, updateChatScore, getMessages } from '@/lib/db';
import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
import { PromptTemplate } from '@langchain/core/prompts';
import { RunnableSequence } from '@langchain/core/runnables';

const TARGET_MODEL = "gemini-2.5-flash-lite";

// Create instances globally if possible to avoid rapid recreation
const evaluatorLLM = new ChatGoogleGenerativeAI({
  model: TARGET_MODEL,
  temperature: 0,
  apiKey: process.env.GEMINI_RESPONSE_API,
});

const evaluatorPrompt = PromptTemplate.fromTemplate(`
  You are a scoring engine for {class} focusing on {topic}.
  Evaluate this user input on a scale of 0 to 5 based on depth, critical thinking, and clarity.
  If it is completely unrelated to {class} or {topic}, assign a score of 0 and note "Off-topic".
  
  Score 0: Irrelevant / Not a question / Off-topic
  Score 1: Basic definition question
  Score 2: Understanding control flow / basic concepts
  Score 3: Debugging or tracing code
  Score 4: Optimization or Big O analysis
  Score 5: System design or architectural decisions
  
  User Input: "{input}"
  
  OUTPUT EXACTLY IN THIS FORMAT: SCORE|REASON
  Example: 1|Basic definition question
  Example: 0|Off-topic from {topic}
`);

const evalChain = RunnableSequence.from([evaluatorPrompt, evaluatorLLM]);

const tutorLLM = new ChatGoogleGenerativeAI({
  model: TARGET_MODEL,
  apiKey: process.env.GEMINI_API_KEY,
});

const tutorPrompt = PromptTemplate.fromTemplate(`
  You are a Socratic AI Tutor for {class}. The user is specifically studying: {topic}.
  
  UNIVERSAL INSTRUCTIONS:
  - Do NOT give them the exact code or direct answer. Make them think.
  - If the user's question is entirely unrelated to {class} or {topic}, politely redirect them back to studying {topic}. Do not answer off-topic questions.
  - If they scored low (0-2) but are on-topic, offer a small hint or ask a guiding question about fundamentals.
  - If they scored high (3-5), validate their deep thinking and dive deeper into optimization or context.
  - Keep them strictly on track.
  
  === COURSE CONTEXT INCORPORATED FROM LECTURES/TEXTBOOK ===
  {context}
  
  === CONVERSATION HISTORY ===
  {history}
  
  === CURRENT USER QUESTION ===
  Question: {input}
  Assigned Question Quality Score: {score}/5 ({reason}). 
  
  Tutor Response:
`);

const tutorChain = RunnableSequence.from([tutorPrompt, tutorLLM]);

export async function POST(req: Request) {
  try {
    const { chatId, userInput, classCode, topic } = await req.json();

    if (!chatId || !userInput) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Evaluate
    console.log("[Thinking...]");
    const evalRes = await evalChain.invoke({ 
      input: userInput,
      class: classCode,
      topic: topic
    });
    const evalText = evalRes.content.toString();
    
    let score = 0;
    let reason = "general inquiry";
    
    const match = evalText.match(/(\d+)\s*\|\s*(.+)/);
    if (match) {
      score = parseInt(match[1]);
      reason = match[2].trim();
    } else {
      const fallbackMatch = evalText.match(/\d+/);
      if (fallbackMatch) score = parseInt(fallbackMatch[0]);
    }

    if (score > 0) {
      updateChatScore(chatId, score);
    }

    // Add user message to DB
    addMessage(chatId, 'user', userInput, score, reason);

    // Retrieve context and history
    const vectorStore = await getVectorStore();
    const retriever = vectorStore.asRetriever(2);
    const relevantDocs = await retriever.invoke(userInput);
    const context = relevantDocs.map((doc: any) => doc.pageContent).join('\n---\n');

    // Retrieve history from DB
    const dbMessages = getMessages(chatId);
    
    // Convert history format to string, ignoring the very last user message we just inserted
    const priorMessages = dbMessages.slice(0, -1);
    const historyString = priorMessages.map((m: any) => `${m.role === 'user' ? 'User' : 'Tutor'}: ${m.content}`).join('\n');

    // Tutor generation
    const tutorRes = await tutorChain.invoke({
      input: userInput,
      class: classCode,
      topic: topic,
      score,
      reason,
      context,
      history: historyString,
    });

    const aiContent = tutorRes.content.toString();

    // Add assistant message
    addMessage(chatId, 'assistant', aiContent, 0, '');

    return NextResponse.json({ 
      role: 'assistant', 
      content: aiContent,
      debug: { score, reason }
    });

  } catch (err: any) {
    console.error("\n[API Error processing request]:", err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
