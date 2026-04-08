const { ChatGoogleGenerativeAI } = require('@langchain/google-genai');
const { PromptTemplate } = require('@langchain/core/prompts');
const { RunnableSequence } = require('@langchain/core/runnables');
const { StructuredOutputParser } = require('@langchain/core/output_parsers');
const { z } = require('zod');

require('dotenv').config({ path: __dirname + '/../.env' });

const TARGET_MODEL = "gemini-2.5-flash";

const quizOutputSchema = z.object({
  questions: z.array(z.object({
    question: z.string().describe("The text of the question (e.g. 'What is the time complexity of Binary Search?')"),
    options: z.array(z.string()).describe("A list of 4 possible multiple choice options."),
    correct_answer: z.string().describe("The exact string text of the correct answer from the options array."),
    depth_score: z.number().int().describe("An integer from 1 to 5 indicating the cognitive depth/difficulty of the question (1=Recall, 5=Analysis).")
  }))
});

const parser = StructuredOutputParser.fromZodSchema(quizOutputSchema);

function getQuizGeneratorChain() {
  const llm = new ChatGoogleGenerativeAI({
    model: TARGET_MODEL,
    temperature: 0.2, // Low temperature for factual consistency
    apiKey: process.env.GEMINI_API_KEY || process.env.GEMINI_RESPONSE_API,
  });

  const prompt = PromptTemplate.fromTemplate(`
    You are an expert Professor creating a challenging, multiple-choice quiz for the class {class} on the topic of: {topic}.
    
    You must generate exactly {numQuestions} questions.
    Ensure all questions are directly derived from the following course material context.
    
    === COURSE CONTEXT ===
    {context}
    ======================
    
    Guidelines:
    1. Provide 4 plausible options for each question.
    2. Ensure only 1 option is clearly correct.
    3. Make sure the difficulty is appropriate (include some basic recall, some application, and some analysis).
    4. Provide the exact text of the correct answer in the correct_answer field.
    5. Do NOT include phrases like "According to the context". State questions as objective facts based on the provided material.
  
    {format_instructions}
  `);

  return RunnableSequence.from([prompt, llm, parser]);
}

module.exports = {
  getQuizGeneratorChain,
  parser
};
