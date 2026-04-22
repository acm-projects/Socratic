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
    const user_id = req.body?.user_id || null;
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

    // Forward user_id so the class row gets linked to the user
    const result = await syllabusService.saveSyllabusData({
      ...payload,
      user_id: payload.user_id || null
    });

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
    const { class_code, user_id } = req.body;  // <-- also read user_id

    const file = req.files && req.files.length > 0 ? req.files[0] : null;

    if (!file) {
      return res.status(400).json({ error: "No PDF file provided." });
    }

    if (!class_code) {
      return res.status(400).json({ error: "class_code is required." });
    }

    let syllabusUrl = null;
    try {
      syllabusUrl = await s3Service.uploadSyllabus(file.buffer, file.originalname);
    } catch (s3Err) {
      console.warn(`[Syllabus] ⚠️ S3 Upload failed (proceeding without URL):`, s3Err.message);
      // Use a local placeholder if S3 is down/misconfigured
      syllabusUrl = `local-fallback://${file.originalname}`;
    }

    // Extract a basic subject from class_code (e.g. CS-SE from CS-SE-3377)
    const subjectMatch = class_code.match(/[a-zA-Z]+/);
    const subject = subjectMatch ? subjectMatch[0].toUpperCase() : "GEN";
    const placeholderName = `Course ${class_code}`;

    // UPSERT: Create class if it doesn't exist, otherwise update the syllabus_url
    // Also set user_id so the row is correctly tied to the uploading user
    await pool.query(
      `INSERT INTO classes (class_code, subject, name, syllabus_url, user_id) 
       VALUES ($1, $2, $3, $4, $5) 
       ON CONFLICT (class_code) 
       DO UPDATE SET syllabus_url = EXCLUDED.syllabus_url,
                     user_id = COALESCE(classes.user_id, EXCLUDED.user_id)`,
      [class_code, subject, placeholderName, syllabusUrl, user_id || null]
    );

    // AUTOMATED EXTRACTION (New Unified Workflow)
    console.log(`[Syllabus] 🤖 Starting automated extraction for ${class_code}...`);
    let extractedData = null;
    try {
      extractedData = await syllabusService.extractSyllabusData(file.buffer, null);
      if (extractedData) {
        // Override the courseCode from AI and inject user_id for proper DB linkage
        extractedData.courseCode = class_code;
        extractedData.user_id = user_id || null;
        await syllabusService.saveSyllabusData(extractedData);
        console.log(`[Syllabus] ✅ Automated extraction and saving completed for ${class_code}${user_id ? ` (user: ${user_id})` : ''}`);
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
      "SELECT * FROM class_tasks WHERE class_code = $1 AND due_date >= CURRENT_DATE ORDER BY due_date ASC",
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
      pool.query("SELECT * FROM class_tasks WHERE class_code = $1 AND due_date >= CURRENT_DATE ORDER BY due_date ASC", [normalizedCode]),
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

// GET /info/:class_code — Professor, TA, office hours, and grading policy
router.get('/info/:class_code', async (req, res, next) => {
  const { class_code } = req.params;
  const normalizedCode = class_code.toUpperCase().trim();

  try {
    const result = await pool.query(
      'SELECT * FROM syllabus_info WHERE class_code = $1',
      [normalizedCode]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: `No syllabus info found for class ${normalizedCode}. Upload a syllabus first.` });
    }

    const row = result.rows[0];

    res.json({
      class_code: row.class_code,
      professor_name: row.professor_name,
      professor_email: row.professor_email,
      office_hours: row.office_hours,
      office_location: row.office_location,
      ta_name: row.ta_name,
      ta_email: row.ta_email,
      ta_office_hours: row.ta_office_hours,
      grading_policy: row.grading_policy,   // JSONB array
      updated_at: row.updated_at
    });

  } catch (error) {
    console.error(`[Syllabus] ❌ Info fetch failed for ${normalizedCode}:`, error.message);
    next(error);
  }
});

// PUT /info/:class_code — Update Professor, TA, office hours, and grading policy
router.put('/info/:class_code', async (req, res, next) => {
  const { class_code } = req.params;
  const normalizedCode = class_code.toUpperCase().trim();
  const {
    professor_name,
    professor_email,
    office_hours,
    office_location,
    ta_name,
    ta_email,
    ta_office_hours,
    grading_policy
  } = req.body;

  try {
    // We use UPSERT in case the info row hasn't been created yet.
    const result = await pool.query(
      `INSERT INTO syllabus_info (
         class_code, professor_name, professor_email, office_hours, office_location, 
         ta_name, ta_email, ta_office_hours, grading_policy, updated_at
       ) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, NOW())
       ON CONFLICT (class_code) DO UPDATE SET
         professor_name = EXCLUDED.professor_name,
         professor_email = EXCLUDED.professor_email,
         office_hours = EXCLUDED.office_hours,
         office_location = EXCLUDED.office_location,
         ta_name = EXCLUDED.ta_name,
         ta_email = EXCLUDED.ta_email,
         ta_office_hours = EXCLUDED.ta_office_hours,
         grading_policy = EXCLUDED.grading_policy,
         updated_at = NOW()
       RETURNING *`,
      [
        normalizedCode,
        professor_name,
        professor_email,
        office_hours,
        office_location,
        ta_name,
        ta_email,
        ta_office_hours,
        grading_policy ? JSON.stringify(grading_policy) : null
      ]
    );

    res.json(result.rows[0]);
  } catch (error) {
    console.error(`[Syllabus] ❌ Info update failed for ${normalizedCode}:`, error.message);
    next(error);
  }
});

module.exports = router;
