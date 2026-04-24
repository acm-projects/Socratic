const { z } = require("zod"); //zod is to define the schema of the data which is like a blueprint for gemini to understand the data
const { zodToJsonSchema } = require("zod-to-json-schema"); //converts the schema to a json schema
//this is for just the syllabus pdf for other course info like slides, textbooks, we a structuredOutput schema with langchain
// 1. Define the exact structure you want to extract from the Syllabus PDF
const syllabusSchema = z.object({
    courseName: z.string().nullable().optional().describe("The full name of the course"),
    courseCode: z.string().nullable().optional()
        .describe("The course identifier, e.g., CS101")
        .transform((val) => {
            if (!val) return val;
            const alphaMatch = val.match(/[a-zA-Z]+/);
            const numericMatch = val.match(/\d+/);
            if (alphaMatch && numericMatch) {
                return (alphaMatch[0] + numericMatch[0]).toUpperCase().trim();
            }
            return val.split('.')[0].replace(/[^a-zA-Z0-9]/g, '').toUpperCase().trim();
        }),
    instructor: z.object({
        name: z.string().nullable().optional(),
        email: z.string().nullable().optional(),
        officeHours: z.string().nullable().optional(),
        officeLocation: z.string().nullable().optional().describe("Room/building for office hours e.g. ECSS 3.201")
    }),
    ta: z.object({
        name: z.string().nullable().optional(),
        email: z.string().nullable().optional(),
        officeHours: z.string().nullable().optional()
    }).nullable().optional().describe("Teaching Assistant info if present"),
    gradingPolicy: z.array(
        z.object({
            category: z.string().describe("e.g., Homework, Midterm, Final"),
            weightPercentage: z.preprocess(
                (val) => (typeof val === 'string' ? val.replace(/[^\d.-]/g, '') : val),
                z.coerce.number().optional()
            ).describe("0-100 (numeric only)")
        })
    ).describe("The breakdown of how the course is graded"),
    importantDates: z.array(
        z.object({
            eventName: z.string(),
            date: z.string().describe("Format: YYYY-MM-DD")
        })
    ).optional(),
    topics: z.array(
        z.string().describe("An academic topic being taught. EXCLUDE exams, holidays, spring break, and review sessions. Every distinct topic, concept, unit, module, and subtopic covered in this course. Extract from ALL sections — course schedule, week-by-week outline, learning objectives, module list, and any numbered or bulleted content lists. Do NOT summarize or merge related items. A well-structured course should yield 15–40 topics minimum. Include specific concepts (e.g. 'Binary search trees') not vague headings (e.g. 'Data structures'). ADDITIONALLY: When a course schedule table exists, scan it row by row and preserve compound entries exactly as written — do not split entries joined by '+', 'and', or ','. Prefer the schedule's exact phrasing over paraphrased versions from the course description. The Greek letter χ² should be preserved as-is, not converted to x². Do NOT include exams, quizzes, midterms, or any assessment events as topics. After extracting all schedule rows, you MUST also extract every distinct topic from the course description and learning outcomes sections, even if conceptually similar entries exist from the schedule. If a topic appears in the course description or learning outcomes as a standalone item, extract it separately even if a similar phrase already exists as part of a compound schedule entry — e.g. 'Parameter estimation' and 'Hypothesis testing' should appear on their own if listed independently elsewhere. When learning outcomes list items as separate bullet points, keep them as separate entries — do not merge them into one string (e.g. 'Common discrete probability distributions' and 'Common continuous probability distributions' are two entries, not one). Capitalize all topic entries consistently — use title case for every entry regardless of source section. When extracting from learning outcomes, extract the topic noun phrase only — not the full sentence or verb phrase. For example, 'Construct confidence intervals' should be extracted as 'Confidence intervals', not the full instructional phrase. When a schedule entry ends with '+ practice questions' or similar variants, omit that portion — extract only the core topic name (e.g. 'Expectations and Variance', not 'Expectations and Variance + practice questions'). Every topic entry must be at least 2 words — never extract single-word topics. If trimming a phrase would result in a single word (e.g. 'Calculus', 'Concepts'), keep enough context to make it meaningful (e.g. 'Calculus in Probability', 'Fundamental Probability Concepts').")
    ).optional()
});

// 2. Convert it to a JSON Schema so the AI model knows what to generate
const syllabusJsonSchema = zodToJsonSchema(syllabusSchema, "SyllabusSchema");

module.exports = {
    syllabusSchema,
    syllabusJsonSchema
};
