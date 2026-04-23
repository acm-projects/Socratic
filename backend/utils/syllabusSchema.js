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
        z.string().describe("An academic topic being taught. EXCLUDE exams, holidays, spring break, and review sessions.")
    ).optional()
});

// 2. Convert it to a JSON Schema so the AI model knows what to generate
const syllabusJsonSchema = zodToJsonSchema(syllabusSchema, "SyllabusSchema");

module.exports = {
    syllabusSchema,
    syllabusJsonSchema
};
