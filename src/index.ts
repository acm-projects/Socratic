import { getVectorStore } from './lib/vectorstore'; //import vectorstore
import { addMessage, createChat, initTables, pool, updateChatScore } from './lib/db'; //import database

import { ChatGoogleGenerativeAI } from '@langchain/google-genai'; //import gemini  
import { ChatPromptTemplate, MessagesPlaceholder, PromptTemplate } from '@langchain/core/prompts'; //import prompts
import { RunnableSequence, RunnableWithMessageHistory } from '@langchain/core/runnables'; //import runnables for langchain to chain prompt with LLM 
import { StructuredOutputParser } from '@langchain/core/output_parsers'; //import structured output parser to take structured output from LLM 
import { PostgresChatMessageHistory } from '@langchain/community/stores/message/postgres'; //import postgres chat message history

import * as crypto from 'crypto'; //import crypto for unique session key
import readline from 'readline'; //import readline for terminal interface
import * as dotenv from 'dotenv'; //import dotenv for environment variables
dotenv.config(); //load environment variables

const terminal = readline.createInterface({ //create terminal interface
  input: process.stdin, //input from terminal
  output: process.stdout //output to terminal
});

function askQuestion(query: string): Promise<string> { //ask question function
  return new Promise(resolve => terminal.question(query, resolve)); //resolve the promise with the answer
}

async function run() {
  try {
    // Ensure Postgres tables exist before any operations
    await initTables();

    const chatId = crypto.randomUUID(); // unique session key — also used as Postgres sessionId for RunnableWithMessageHistory
    await createChat(chatId, "Terminal Session " + new Date().toLocaleString()); //create chat with unique session key and current date and time
    let totalScore = 0; //initialize total score

    console.log("======================================");
    console.log("   Socratic AI Tutor (CLI Version)    ");
    console.log("======================================\n");

    const studentClass = await askQuestion("What class are you studying for? (e.g. CS 1436): "); //ask for class
    const studentTopic = await askQuestion("What specific topic are you focusing on today?: "); //ask for topic
    console.log(`\n[System] Great! We will stay intensely focused on ${studentTopic} for ${studentClass}.`); //print the class and topic
    console.log("Type 'stop' or 'exit' to quit.\n"); //print instructions to quit

    const TARGET_MODEL = "gemini-2.5-flash-lite"; //set the target model


    const evaluatorLLM = new ChatGoogleGenerativeAI({ //evaluator LLM to score user input
      model: TARGET_MODEL, //set the target model
      temperature: 0.2, //set the temperature to 0.2 for consistent output
      apiKey: process.env.GEMINI_RESPONSE_API, //set the API key
    });

    const parser = StructuredOutputParser.fromNamesAndDescriptions({
      score: "An integer from 0 to 5 reflecting the quality of the user input.",
      reason: "A short, 1-sentence reason explaining why you assigned that score."
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

    const evalChain = RunnableSequence.from([evaluatorPrompt, evaluatorLLM, parser]);

    // ── Tutor Chain with RunnableWithMessageHistory ──────────────────────────
    // Uses ChatPromptTemplate + MessagesPlaceholder so LangChain can inject
    // the full conversation history (loaded from Postgres) automatically.
    const tutorLLM = new ChatGoogleGenerativeAI({
      model: TARGET_MODEL,
      apiKey: process.env.GEMINI_API_KEY,
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
      // LangChain injects the full Postgres-backed message history here
      new MessagesPlaceholder('history'),
      ['human', '{input}']
    ]);

    // The raw chain: prompt → LLM (no history management here)
    const tutorChain = tutorPrompt.pipe(tutorLLM);

    // RunnableWithMessageHistory wraps the chain and handles:
    //   1. Loading past messages from PostgresChatMessageHistory (Postgres table)
    //   2. Injecting them into the 'history' MessagesPlaceholder
    //   3. Saving the new HumanMessage + AIMessage back to Postgres after each turn
    const tutorChainWithHistory = new RunnableWithMessageHistory({
      runnable: tutorChain,
      getMessageHistory: (sessionId: string) =>
        new PostgresChatMessageHistory({
          sessionId,
          pool, // reuses the same pg.Pool from db.ts
          tableName: 'langchain_chat_messages', // auto-created by LangChain
        }),
      inputMessagesKey: 'input',   // which key holds the new user message
      historyMessagesKey: 'history', // which key in the prompt receives history
    });

    console.log("[System] Initializing Vector Store...");
    const vectorStore = await getVectorStore();
    const retriever = vectorStore.asRetriever(2);
    console.log("[System] Ready! Ask your questions.\n");

    while (true) {
      const userInput = await askQuestion("User: ");

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
        // ── Step 1: Score the input ──────────────────────────────────────────
        const evalRes = await evalChain.invoke({
          input: userInput,
          class: studentClass,
          topic: studentTopic,
          format_instructions: parser.getFormatInstructions()
        });

        let score = parseInt(String(evalRes.score));
        let reason = evalRes.reason;

        if (score > 0) {
          console.log(`=> Prompt Score: ${score}/5 (${reason})`);
          totalScore += score;
          await updateChatScore(chatId, score);
        } else if (score === 0 && reason.toLowerCase().includes("off")) {
          console.log(`=> Topic Warning: Let's try to stay focused on ${studentTopic} for ${studentClass}.`);
        }

        // ── Step 2: Save user message to our custom messages table ──────────
        await addMessage(chatId, 'user', userInput, score, reason);

        // ── Step 3: Retrieve relevant course context from Pinecone ───────────
        const relevantDocs = await retriever.invoke(userInput);
        const context = relevantDocs.map((doc: any) => doc.pageContent).join('\n---\n');

        // ── Step 4: Generate tutor response (history auto-handled by LangChain) ─
        // RunnableWithMessageHistory loads past messages from Postgres,
        // injects them into {history}, runs the chain, then saves the new
        // HumanMessage + AIMessage back to Postgres — all automatically.
        const tutorRes = await tutorChainWithHistory.invoke(
          {
            input: userInput,
            class: studentClass,
            topic: studentTopic,
            score,
            reason,
            context,
          },
          {
            configurable: { sessionId: chatId } // ties this conversation to our chatId
          }
        );

        const aiContent = tutorRes.content.toString();
        console.log(`\nSocratic AI:\n${aiContent}\n`);

        // ── Step 5: Save AI response to our custom messages table ────────────
        await addMessage(chatId, 'assistant', aiContent, 0, '');

      } catch (err: any) {
        console.error("\n[Error processing request]:", err.message);
        console.log("Ensure the model supports standard inference or check your API quotas.");
      }
    }

  } catch (fatalErr: any) {
    console.error("Fatal Application Error:", fatalErr.message);
  } finally {
    terminal.close();
    await pool.end(); // cleanly close the Postgres connection pool
  }
}

run();
