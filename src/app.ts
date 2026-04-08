import { getVectorStore } from './services/vectorService';
import { addMessage, createChat, initTables, updateChatScore } from './models/chatModel';
import { pool } from './db';
import { evalChain, parser, getTutorChainWithHistory } from './services/tutorService';

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
    await initTables();

    const chatId = crypto.randomUUID();
    await createChat(chatId, "Terminal Session " + new Date().toLocaleString());
    let totalScore = 0;

    console.log("======================================");
    console.log("   Socratic AI Tutor (CLI Version)    ");
    console.log("======================================\n");

    const userId = await askQuestion("Enter your User ID (e.g. user123): ");
    const studentClass = await askQuestion("What class are you studying for? (e.g. CS 1436): ");
    const studentTopic = await askQuestion("What specific topic are you focusing on today?: ");
    console.log(`\n[System] Great! We will stay intensely focused on ${studentTopic} for ${studentClass}.`);
    console.log("Type 'stop' or 'exit' to quit.\n");

    // Generate a namespace per user per class for strict vector isolation
    const formattedClass = studentClass.toLowerCase().replace(/[^a-z0-9]/g, '');
    const formattedUser = userId.toLowerCase().replace(/[^a-z0-9]/g, '');
    const userClassNamespace = `${formattedUser}-${formattedClass}`;

    console.log(`[System] Initializing Vector Store for namespace: '${userClassNamespace}'...`);
    const vectorStore = await getVectorStore(userClassNamespace);
    const tutorChainWithHistory = getTutorChainWithHistory();
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

        await addMessage(chatId, 'user', userInput, score, reason);

        const fullQuery = `${studentTopic}: ${userInput}`;
        const resultsWithScores = await vectorStore.similaritySearchWithScore(fullQuery, 2);
        
        console.log(`\n[Vector Search] Query: "${fullQuery}"`);
        resultsWithScores.forEach(([doc, docScore], i) => {
          console.log(`  ${i+1}. Score: ${docScore.toFixed(4)} | ID: ${doc.metadata?.id || 'N/A'}`);
          console.log(`     Text: "${doc.pageContent.substring(0, 100)}..."`);
        });

        const context = resultsWithScores.map(([doc]) => doc.pageContent).join('\n---\n');

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
            configurable: { sessionId: chatId }
          }
        );

        const aiContent = tutorRes.content.toString();
        console.log(`\nSocratic AI:\n${aiContent}\n`);

        await addMessage(chatId, 'assistant', aiContent, 0, '');

      } catch (err: any) {
        const msg = err.message || "";
        
        if (msg.includes("429") || msg.toLowerCase().includes("quota")) {
          console.log("\n[!] Gemini AI Quota Exceeded");
          console.log("    The Free Tier has a limit of 15 requests per minute.");
          
          // Try to extract the retry time if it exists in the raw Google error
          const retryMatch = msg.match(/retry in ([\d\.]+)s/);
          if (retryMatch) {
            console.log(`    Please wait ~${Math.ceil(parseFloat(retryMatch[1]))} seconds before trying again.\n`);
          } else {
            console.log("    Please wait a few seconds and try again.\n");
          }
        } else {
          console.error("\n[Error processing request]:", msg);
        }
      }
    }

  } catch (fatalErr: any) {
    console.error("Fatal Application Error:", fatalErr.message);
  } finally {
    terminal.close();
    await pool.end();
  }
}

// In case this file is imported as a module in the future, check if it's the main module
if (require.main === module) {
  run();
}

export default run;
