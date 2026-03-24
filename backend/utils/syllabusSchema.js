const { z } = require("zod");
const { zodToJsonSchema } = require("zod-to-json-schema");

// 1. Define the exact structure you want to extract from the Syllabus PDF
const syllabusSchema = z.object({
    courseName: z.string().describe("The full name of the course"),
    courseCode: z.string().describe("The course identifier, e.g., CS101"),
    instructor: z.object({
        name: z.string(),
        email: z.string().email().optional(),
        officeHours: z.string().optional()
    }),
    gradingPolicy: z.array(
        z.object({
            category: z.string().describe("e.g., Homework, Midterm, Final"),
            weightPercentage: z.number().min(0).max(100)
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
