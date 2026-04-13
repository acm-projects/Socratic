const express = require('express');
const router = express.Router();
const upload = require('../middleware/uploadMiddleware');
const syllabusService = require('../services/syllabusService');
const s3Service = require('../services/s3Service');
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

// POST /extract — Upload PDF and extract syllabus data using Gemini AI
// Accepts optional user_id and class_code in the multipart body.
// When class_code is provided it overrides the AI-extracted courseCode for consistency.
router.post('/extract', upload.any(), async (req, res, next) => {
  try {
    const file = req.files && req.files.length > 0 ? req.files[0] : null;
    const fileBuffer = file ? file.buffer : null;
    const rawTextFallback = req.body ? req.body.pdfText : null;

    // Optional metadata from the caller
    const user_id   = req.body?.user_id   || null;
    const class_code = req.body?.class_code || null;

    if (!fileBuffer && !rawTextFallback) {
      return res.status(400).json({ error: "No PDF file or pdfText provided." });
    }

    const validatedData = await syllabusService.extractSyllabusData(fileBuffer, rawTextFallback);

    // If the caller supplied a class_code, override the AI-extracted one to guarantee consistency
    if (class_code) {
      validatedData.courseCode = class_code;
    }

    console.log(`[Syllabus] ✅ Extracted syllabus${class_code ? ` for ${class_code}` : ''}${user_id ? ` (user: ${user_id})` : ''}`);
    res.json({
      message: "Syllabus extracted and verified successfully.",
      user_id,
      class_code: class_code || validatedData.courseCode,
      data: validatedData
    });

  } catch (error) {
    if (error.name === "ZodError") {
      console.error("[Syllabus] ❌ Validation Error:", JSON.stringify(error.errors, null, 2));
      return res.status(400).json({
        error: "AI failed to extract syllabus correctly matching the schema formats",
        step: "Validation",
        rawData: error.rawData,
        validationErrors: error.errors
      });
    }
    next(error);
  }
});

// POST /save — Save extracted syllabus data to database
router.post('/save', async (req, res, next) => {
  try {
    const payload = req.body;

    if (!payload || !payload.courseCode || !payload.courseName) {
      return res.status(400).json({ error: "Missing required syllabus payload fields (courseCode, courseName)." });
    }

    const result = await syllabusService.saveSyllabusData(payload);

    console.log(`Successfully saved syllabus data for class: ${result.savedClass?.class_code || payload.courseCode}`);
    res.json({
      message: "Syllabus data successfully saved to the database.",
      data: result
    });

  } catch (error) {
    console.error("Database or service error:", error);
    if (error.code === '23505') {
       return res.status(409).json({ error: "This class or topic already exists in the database." });
    }
    res.status(500).json({ error: error.message || "Failed to save syllabus." });
  }
});

// POST /upload — Upload syllabus PDF to S3 and save URL to classes table
router.post('/upload', upload.any(), async (req, res, next) => {
  try {
    const { class_code } = req.body;

    const file = req.files && req.files.length > 0 ? req.files[0] : null;

    if (!file) {
      return res.status(400).json({ error: "No PDF file provided." });
    }

    if (!class_code) {
      return res.status(400).json({ error: "class_code is required." });
    }

    const syllabusUrl = await s3Service.uploadSyllabus(file.buffer, file.originalname);

    // Extract a basic subject from class_code (e.g. CS-SE from CS-SE-3377)
    const subjectMatch = class_code.match(/[a-zA-Z]+/);
    const subject = subjectMatch ? subjectMatch[0].toUpperCase() : "GEN";
    const placeholderName = `Course ${class_code}`;

    // UPSERT: Create class if it doesn't exist, otherwise update the syllabus_url
    await pool.query(
      `INSERT INTO classes (class_code, subject, name, syllabus_url) 
       VALUES ($1, $2, $3, $4) 
       ON CONFLICT (class_code) 
       DO UPDATE SET syllabus_url = EXCLUDED.syllabus_url`,
      [class_code, subject, placeholderName, syllabusUrl]
    );

    // AUTOMATED EXTRACTION (New Unified Workflow)
    console.log(`[Syllabus] 🤖 Starting automated extraction for ${class_code}...`);
    let extractedData = null;
    try {
      extractedData = await syllabusService.extractSyllabusData(file.buffer, null);
      if (extractedData) {
        // Override the courseCode from AI with the one provided by user to ensure consistency
        extractedData.courseCode = class_code; 
        await syllabusService.saveSyllabusData(extractedData);
        console.log(`[Syllabus] ✅ Automated extraction and saving completed for ${class_code}`);
      }
    } catch (extractErr) {
      console.warn(`[Syllabus] ⚠️ Automated extraction failed for ${class_code}:`, extractErr.message);
      // We don't fail the whole request since the upload was successful
    }

    res.json({
      message: "Syllabus uploaded and saved successfully.",
      syllabus_url: syllabusUrl,
      extracted: !!extractedData,
      data: extractedData
    });

  } catch (error) {
    console.error("S3 upload error:", error);
    next(error);
  }
});

// GET /:class_code — Get syllabus URL for a class
router.get('/:class_code', async (req, res, next) => {
  try {
    const result = await pool.query(
      "SELECT syllabus_url FROM classes WHERE class_code = $1",
      [req.params.class_code]
    );

    if (!result.rows[0] || !result.rows[0].syllabus_url) {
      return res.status(404).json({ error: "No syllabus found for this class." });
    }

    res.json({ syllabus_url: result.rows[0].syllabus_url });

  } catch (error) {
    next(error);
  }
});

// GET /tasks/:class_code — Get all extracted tasks (quizzes, tests, etc.) for a class
router.get('/tasks/:class_code', async (req, res, next) => {
  try {
    const result = await pool.query(
      "SELECT * FROM class_tasks WHERE class_code = $1 ORDER BY due_date ASC",
      [req.params.class_code]
    );

    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching class tasks:", error);
    next(error);
  }
});

// GET /data/:class_code — Unified endpoint for Class Info, Tasks, and Topics
router.get('/data/:class_code', async (req, res, next) => {
  const { class_code } = req.params;
  const normalizedCode = class_code.toUpperCase().trim();

  try {
    console.log(`[Syllabus] 🔍 Fetching unified data for ${normalizedCode}...`);
    
    // Perform queries in parallel for peak performance
    const [classRes, tasksRes, topicsRes] = await Promise.all([
      pool.query("SELECT * FROM classes WHERE class_code = $1", [normalizedCode]),
      pool.query("SELECT * FROM class_tasks WHERE class_code = $1 ORDER BY due_date ASC", [normalizedCode]),
      pool.query("SELECT * FROM topics WHERE class_code = $1", [normalizedCode])
    ]);

    if (classRes.rows.length === 0) {
      return res.status(404).json({ error: `Class ${normalizedCode} not found.` });
    }

    res.json({
      classInfo: classRes.rows[0],
      tasks: tasksRes.rows,
      topics: topicsRes.rows
    });

  } catch (error) {
    console.error(`[Syllabus] ❌ Unified fetch failed for ${normalizedCode}:`, error.message);
    next(error);
  }
});

module.exports = router;
