import { getVectorStore } from './lib/vectorstore';
import { addMessage, createChat, updateChatScore } from './lib/db';
import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
import { PromptTemplate } from '@langchain/core/prompts';
import { RunnableSequence } from '@langchain/core/runnables';
import * as crypto from 'crypto';
import readline from 'readline';
import * as dotenv from 'dotenv';
dotenv.config();

const terminal = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function askQuestion(query: string): Promise<string> {
  return new Promise(resolve => terminal.question(query, resolve));
}

async function run() {
  try {
    const chatId = crypto.randomUUID();
    createChat(chatId, "Terminal Session " + new Date().toLocaleString());
    const chatHistory: { role: string; content: string }[] = [];
    let totalScore = 0;

    console.log("======================================");
    console.log("   Socratic AI Tutor (CLI Version)    ");
    console.log("======================================\n");

    // 1. Initial Prompting for Subject & Topic tracking
    const studentClass = await askQuestion("What class are you studying for? (e.g. CS 1436): ");
    const studentTopic = await askQuestion("What specific topic are you focusing on today?: ");

    console.log(`\n[System] Great! We will stay intensely focused on ${studentTopic} for ${studentClass}.`);
    console.log("Type 'stop' or 'exit' to quit.\n");
    
    // As per your request, using "gemini-2.5-flash-lite".
    // Alternatively, fallback to your legacy model "gemini-3-flash-preview" if this throws a 404!
    const TARGET_MODEL = "gemini-2.5-flash-lite";

    // Initialize LLMs and Chains
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

    console.log("[System] Initializing Vector Store...");
    const vectorStore = await getVectorStore();
    const retriever = vectorStore.asRetriever(2);
    console.log("[System] Ready! Ask your questions.");

    while (true) {
      const userInput = await askQuestion("\nUser: ");

      if (userInput.toLowerCase().trim() === "stop" || userInput.toLowerCase().trim() === "exit") {
        console.log(`\nEnding session. Total EXP earned: ${totalScore}`);
        break;
      }

      if (!userInput.trim()) {
        console.log("Please enter a valid question.");
        continue;
      }

      console.log("\n[Thinking...]");

      try {
        // Evaluate score
        const evalRes = await evalChain.invoke({ 
          input: userInput,
          class: studentClass,
          topic: studentTopic
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
          console.log(`=> Prompt Score: ${score}/5 (${reason})`);
          totalScore += score;
          updateChatScore(chatId, score);
        } else if (score === 0 && reason.toLowerCase().includes("off")) {
          console.log(`=> Topic Warning: Let's try to stay focused on ${studentTopic} for ${studentClass}.`);
        }

        // Add user message to DB
        addMessage(chatId, 'user', userInput, score, reason);

        // Retrieve context
        const relevantDocs = await retriever.invoke(userInput);
        const context = relevantDocs.map((doc: any) => doc.pageContent).join('\n---\n');

        // Formulate history string
        const historyString = chatHistory.map((h: any) => `${h.role === 'user' ? 'User' : 'Tutor'}: ${h.content}`).join('\n');

        // Tutor generation
        const tutorRes = await tutorChain.invoke({
          input: userInput,
          class: studentClass,
          topic: studentTopic,
          score,
          reason,
          context,
          history: historyString,
        });

        const aiContent = tutorRes.content.toString();

        console.log(`\nSocratic AI:\n${aiContent}\n`);

        // Add to history and DB
        chatHistory.push({ role: 'user', content: userInput });
        chatHistory.push({ role: 'assistant', content: aiContent });
        addMessage(chatId, 'assistant', aiContent, 0, '');

      } catch (err: any) {
        console.error("\n[Error processing request]:", err.message);
        console.log("Ensure the model supports standard inference or check your API quotas.");
      }
    }

  } catch (fatalErr: any) {
    console.error("Fatal Application Error:", fatalErr.message);
  } finally {
    terminal.close();
  }
}

run();
