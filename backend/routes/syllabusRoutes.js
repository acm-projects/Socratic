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
router.post('/extract', upload.any(), async (req, res, next) => {
  try {
    const file = req.files && req.files.length > 0 ? req.files[0] : null;
    const fileBuffer = file ? file.buffer : null;
    const rawTextFallback = req.body ? req.body.pdfText : null;

    const validatedData = await syllabusService.extractSyllabusData(fileBuffer, rawTextFallback);

    console.log("Successfully extracted and validated syllabus!");
    res.json({
      message: "Syllabus extracted and verified successfully.",
      data: validatedData
    });

  } catch (error) {
    if (error.name === "ZodError") {
      return res.status(400).json({
        error: "AI failed to extract syllabus correctly matching the schema formats",
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

    await pool.query(
      "UPDATE classes SET syllabus_url = $1 WHERE class_code = $2",
      [syllabusUrl, class_code]
    );

    res.json({
      message: "Syllabus uploaded and saved successfully.",
      syllabus_url: syllabusUrl
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

module.exports = router;
