import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv/config";
import readline from "readline";
// universal rules for all tutors
//utd coursebook
    const universalRules = `
    
UNIVERSAL INSTRUCTIONS:
- If the user seems frustrated, offer encouragement.
- omit any ** 


    `;

// track question count for the 3rd and 5th question rules
let questionCount = 0; 
let totalScore = 0;
const AI_SCORING_API = new GoogleGenerativeAI(process.env.GEMINI_RESPONSE_API);
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);


// setup terminal input output
const terminal = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// function to ask terminal
function askQuestion(query) {
  return new Promise(function(resolve) {
    // waits for user to type
    terminal.question(query, function(answer) {
      // send answer back out
      resolve(answer);
    });
  });
}

// start ai with key

// reusable scoring function
async function getScore(topic, userInput) {
  try {
    let scoringPrompt = "";
    
    if (topic === "CS 3345") {
         console.log(`DEBUG: Current Topic is ${topic}`);
      scoringPrompt = `
You are a scoring engine for CS 3345 Data Structures.
COURSE CONTEXT:
You are a TA/Tutor for CS/CE/SE 3345: Data Structures and Introduction to Algorithmic Analysis (Spring 2026). 
You are trained on data from Meghana Saptues course

The primary programming language for textbooks and implementation is Java.

1. ALGORITHMIC ANALYSIS & COMPLEXITY:
- Time complexity is the number of operations performed for a given input size.
- Big-O (Upper Bound), Omega (Lower Bound), Theta (Tight Bound). If f(n) = O(g(n)) and f(n) = Ω(g(n)), then f(n) = Θ(g(n)).
- Logarithmic Complexity: A loop multiplying its iterator (e.g., i = i * p) is O(log_p(n)). Log(A^B) is equivalent to B*log(A).
- Factorial vs Exponential: 2^n is O(n!), but n! is NOT O(2^n).
- Nested Loops: A loop running 'n' times inside another loop running 'n' times is O(n^2).
- Summation: The sum of i=1 to n of i^2 is O(n^3).

2. LINKED LISTS (Singly, Doubly, Circular):
- Pointer Manipulation: Understand deep chaining (e.g., list.next.next.next = list.prev).
- Efficiency: Linked lists are O(1) for inserting/deleting at the beginning, but O(n) to find the 'nth' element from the end.
- Recursion: Passing 'head.next' into a recursive function before printing 'head.data' prints the list in reverse order.
- Generics & OOP: Building custom Generic lists (e.g., <AnyType>) without using the Java Collections API. Implementing Interfaces (e.g., IDedObject with getID() and printID()).

3. STACKS & QUEUES:
- Stack (LIFO): Best for evaluating postfix expressions (e.g., 4 2 3 5 1 - + * + equals 18) and scenarios where the latest arrival leaves first.
- Queue (FIFO): Best for shared resources, asynchronous data transfer, and load balancing. 
- Implementation Tricks: You need exactly 2 Stacks to implement a Queue.
- Circular Queues: The condition for checking if a simple array-based queue is full is usually rear = N-1.

TUTORING RULES FOR CS 3345:
- Focus on "Efficiency", "Memory Management", and "Big-O".
- If the user asks about a data structure, make them justify WHY it is better than an Array.
- When explaining pointer manipulation, verbally trace the nodes step-by-step.
- Never write the whole project code for them. Guide them through the interface setup, constructor, and method logic piece by piece.

CORE TOPICS OVERVIEW (Stay strictly within these bounds):
1. Algorithm Analysis: Asymptotic notations (Big-O), recurrences, time complexity.
2. Linear Structures: Lists, stacks, queues.
3. Trees: Binary search trees, Balanced binary search trees, B-trees.
4. Advanced Structures: Priority queues, Heaps, Hashing, Disjoint sets (Union-Find).
5. Graphs & Algorithms: Depth-first search (DFS), Breadth-first search (BFS), Topological ordering.
6. Specific Algorithms: Dijkstra's shortest path, Prim's algorithm, Kruskal's algorithm, advanced sorting techniques.

GRADING & POLICY RULES (Use this if the user asks logistical questions):
- Grading Weights: Exam 1 (20%), Exam 2 (25%), Quizzes (20%), 5 Homeworks (15%), 3 Projects (15%), Activities (5%).
- Late Work: Homework assignments lose 10% per day they are late.
- Attendance: Mandatory. 3 consecutive unexcused absences = one letter grade drop. 4 absences = an automatic F.
- Academic Integrity: No cheating/plagiarism. Code is checked via Turnitin.
- Admin limit: For grievances, extreme extensions, or disability accommodations, politely redirect the student to email Professor Satpute (mns086000@utdallas.edu) or visit office hours (ECSN 2.926, MW 11:30am-1:00pm).
User Input: "${userInput}"
ALL THIS DATA IS TRAINED ONLY FROM 2024 CS 3345 BY MEGHANA SAPTUTES CLASS MATERIAL MAY BE SUBJECT TO CHANGE
STRICT SCORING RULES:
1. If the input is NOT related to Data Structures, Algorithms, or CS 3345 course logistics (syllabus, exams), return score 0.

   Scoring Scale (1-5):
Award 1 point for a basic syntax or definition question. (e.g. "What is the difference between = and ==?")
Award 2 points for understanding control flow. (e.g. "Why did the loop stop at 9 instead of 10?")
Award 3 points for debugging or tracing code. (e.g. "I think the memory leak is happening because we never closed the file stream.")
Award 4 points for optimization or Big O analysis. (e.g. "This is O(n^2), but if we use a Hash Map it becomes O(n).")
Award 5 points for system design or architectural decisions. (e.g. "We should use a queue here to handle the traffic spikes asynchronously.")

OUTPUT FORMAT:
Return the integer score (0-5) followed by a pipe character "|" and a short reason (max 6 words).
Example: 1|Basic definition question
Example: 3|Complex code tracing
`;

    } else {
       scoringPrompt = `Rate the user's input on a scale of 1-5 based on relevance and quality for ${topic}. Input: "${userInput}". \nOUTPUT FORMAT:\nReturn the integer score (0-5) followed by a pipe character "|" and a short reason.`;
    }

    const scoreModel = AI_SCORING_API.getGenerativeModel({ model: "gemini-3-flash-preview" }); //DO NOT CHANGE THIS CODE EVER
    const scoreResult = await scoreModel.generateContent(scoringPrompt);
    const responseText = scoreResult.response.text();
    const match = responseText.match(/(\d+)\s*\|\s*(.+)/);
    if (match) {
        return { score: parseInt(match[1]), reason: match[2].trim() };
    }
    return { score: parseInt(responseText.match(/\d+/)?.[0] || "0"), reason: "participation" };
  } catch (scoreErr) {
    console.error("Scoring Error:", scoreErr);
    return { score: 0, reason: "error" };
  }
}

//create a prompt for each class
//async for rest API
async function run() {
  // catch fatal script errors
  try {
    // ask user for the topic first
    const topic = "CS 3345";
    const currentTopic = "Keep conversation relevant about " + topic;


    // track history to keep the AI context aware
    const chatHistory = [];

    const model = genAI.getGenerativeModel({ 
        model: "gemini-3-flash-preview", //DO NOT CHANGE THIS CODE EVER
        // setup ai model rules 1-5
        systemInstruction: currentTopic + universalRules
    });

    // initialize chat with history
    const chat = model.startChat({
        history: chatHistory,
    });

    // start question loop
    while (true) {
      // wait for user typing
      const userInput = await askQuestion("Ask a question or type stop: ");

      // check if user stops
      if (userInput.toLowerCase().trim() === "stop") {
        console.log("Stopping the analysis");
        // exit loop
        break; 
      }

      console.log("Thinking...");

      // catch server overload errors
      try {
        // increment count
        questionCount++;

        // request ai generated content using chat to keep history
        const result = await chat.sendMessage(userInput);

        // get text from result
        const text = result.response.text();

        console.log("\nGemini says:");
        console.log(text + "\n");
        
        // Scoring Logic
        const scoreData = await getScore(topic, userInput);
        if (scoreData.score > 0) {
          console.log(`SCORE: ${scoreData.score}/5`);
          console.log(`REASON: +${scoreData.score} points for ${scoreData.reason}`);
          totalScore += scoreData.score;
          console.log(`EXP EARNED: ${totalScore}`);
        }

      } catch (apiError) {
        // print busy server warning
        console.log("\nServer is busy try again\n");
      }
    }

  } catch (error) {
    // print fatal error details
    console.error("Error details:", error.message);
  } finally {
    // stop terminal listening process
    terminal.close(); 
  }
}

// execute main function
run();