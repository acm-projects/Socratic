const { ChatGoogleGenerativeAI } = require('@langchain/google-genai');
const { PromptTemplate } = require('@langchain/core/prompts');
const { RunnableSequence } = require('@langchain/core/runnables');
const { StructuredOutputParser } = require('@langchain/core/output_parsers');
const { z } = require('zod');

require('dotenv').config({ path: __dirname + '/../.env' });

const TARGET_MODEL = "gemini-2.0-flash";

const quizOutputSchema = z.object({
  questions: z.array(z.object({
    question: z.string().describe("The text of the question (e.g. 'What is the time complexity of Binary Search?')"),
    options: z.array(z.string()).describe("A list of 4 possible multiple choice options."),
    correct_answer: z.string().describe("The exact string text of the correct answer from the options array."),
    depth_score: z.number().int().describe("An integer from 1 to 5 indicating the cognitive depth/difficulty of the question (1=Recall, 5=Analysis)."),
    explanation: z.string().describe("A concise explanation of why the answer is correct, derived from the context.")
  }))
});

const parser = StructuredOutputParser.fromZodSchema(quizOutputSchema);

// ADD THIS after: const parser = StructuredOutputParser.fromZodSchema(quizOutputSchema);

const cleanAndParse = (text) => {
  let cleaned = text
    .replace(/```json|```/g, '')
    .replace(/[\u0000-\u001F\u007F-\u009F]/g, '') // strip control characters
    .trim();
  const start = cleaned.indexOf('{');
  const end = cleaned.lastIndexOf('}');
  if (start === -1 || end === -1) throw new Error('No JSON object found in LLM response');
  const jsonStr = cleaned.slice(start, end + 1);
  try {
    return JSON.parse(jsonStr);
  } catch (e) {
    // Try fixing single quotes
    const fixed = jsonStr.replace(/'/g, '"');
    return JSON.parse(fixed);
  }
};

function getQuizGeneratorChain() {
  // Primary
  const primaryLLM = new ChatGoogleGenerativeAI({
    model: TARGET_MODEL,
    temperature: 0.2,
    apiKey: process.env.GEMINI_API_KEY || process.env.GEMINI_RESPONSE_API,
    maxRetries: 2,
  }).withStructuredOutput(quizOutputSchema);

  const fallbackPro = new ChatGoogleGenerativeAI({
    model: "gemini-2.5-pro",
    temperature: 0.2,
    apiKey: process.env.GEMINI_API_KEY || process.env.GEMINI_RESPONSE_API,
    maxRetries: 2,
  }).withStructuredOutput(quizOutputSchema);

  const llm = primaryLLM.withFallbacks({
    fallbacks: [fallbackPro]
  });

  const prompt = PromptTemplate.fromTemplate(`
    You are an expert Professor creating a multiple-choice quiz for the class {class} on the topic of: {topic}.
    
    Difficulty Requirements:
    {difficultyRequirements}

    You must generate exactly {numQuestions} questions.
    Ensure all questions are directly derived from the following course material context.
    
    === COURSE CONTEXT ===
    {context}
    ======================
    
    Guidelines:
    1. Provide 4 plausible options for each question.
    2. Ensure only 1 option is clearly correct.
    3. Difficulty Tiers: 
       - If Easy is requested: focus on basic recall and definitions (depth_score 1-2).
       - If Medium is requested: focus on application of concepts and relationships (depth_score 3).
       - If Hard is requested: focus on deep analysis, edge cases, and complex problem-solving (depth_score 4-5).
    4. Provide the exact text of the correct answer in the correct_answer field.
    5. Provide a concise explanation for the correct answer based on the context.
    6. Do NOT include phrases like "According to the context". State questions as objective facts based on the provided material.
    7. IMPORTANT: Ignore all logistical or administrative information (e.g., course schedules, office hours, due dates, instructor names, exam dates). Focus strictly on academic concepts, theories, and subject matter related to the topic.
    8. IMPORTANT: Return ONLY raw JSON. No markdown, no backticks, no extra text.
  `);

  return {
    invoke: async (input) => {
      const MAX_RETRIES = 3;
      let lastError;
      for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
        try {
          const formattedPrompt = await prompt.format(input);
          console.log(`[QuizService] 📤 Sending Prompt: "${formattedPrompt.substring(0, 100)}..." (${formattedPrompt.length} chars)`);
          const result = await llm.invoke(formattedPrompt);
          if (!result.questions || !Array.isArray(result.questions) || result.questions.length === 0) {
            throw new Error('Structured output missing questions array');
          }
          return result;
        } catch (err) {
          lastError = err;
          console.warn(`[QuizService] Attempt ${attempt}/${MAX_RETRIES} failed: ${err.message}`);
        }
      }
      throw lastError;
    }
  };
}

module.exports = {
  getQuizGeneratorChain,
  parser
};
