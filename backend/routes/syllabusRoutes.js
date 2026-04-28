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
    const class_code = normalizeCode(req.body?.class_code);

    if (!fileBuffer && !rawTextFallback && !req.body?.file_url) {
      return res.status(400).json({ error: "No PDF file, pdfText, or file_url provided." });
    }

    let activeBuffer = fileBuffer;

    // Handle file_url if provided (e.g. from frontend auto-extract)
    if (!activeBuffer && req.body?.file_url) {
      console.log(`[Syllabus] 🌐 Downloading PDF from URL: ${req.body.file_url}`);
      try {
        const response = await fetch(req.body.file_url);
        if (!response.ok) throw new Error(`Failed to download PDF: ${response.statusText}`);
        const arrayBuffer = await response.arrayBuffer();
        activeBuffer = Buffer.from(arrayBuffer);
      } catch (downloadErr) {
        return res.status(400).json({ error: `Could not fetch PDF from URL: ${downloadErr.message}` });
      }
    }

    const validatedData = await syllabusService.extractSyllabusData(activeBuffer, rawTextFallback);

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

// Helper to normalize class codes (CS/CE/SE3345 -> CS3345, CS-3341.001 -> CS3341)
const normalizeCode = (code) => {
  if (!code) return null;

  const alphaMatch = code.match(/[a-zA-Z]+/);
  const numericMatch = code.match(/\d+/);

  if (alphaMatch && numericMatch) {
    return (alphaMatch[0] + numericMatch[0]).toUpperCase().trim();
  }

  // Fallback to basic cleaning if matches fail
  return code.split('.')[0].replace(/[^a-zA-Z0-9]/g, '').toUpperCase().trim();
};

// POST /upload — Upload syllabus PDF to S3 and save URL to classes table
router.post('/upload', upload.any(), async (req, res, next) => {
  try {
    const { user_id } = req.body;
    let { class_code } = req.body;
    class_code = normalizeCode(class_code);

    const file = req.files && req.files.length > 0 ? req.files[0] : null;

    if (!file) {
      return res.status(400).json({ error: "No PDF file provided." });
    }

    let syllabusUrl = null;
    try {
      syllabusUrl = await s3Service.uploadSyllabus(file.buffer, file.originalname);
    } catch (s3Err) {
      console.warn(`[Syllabus] ⚠️ S3 Upload failed (proceeding without URL):`, s3Err.message);
      syllabusUrl = `local-fallback://${file.originalname}`;
    }

    // AUTOMATED EXTRACTION
    console.log(`[Syllabus] 🤖 Starting automated extraction...`);
    let extractedData = null;
    try {
      extractedData = await syllabusService.extractSyllabusData(file.buffer, null);

      // If class_code wasn't provided, use the one from AI
      const finalClassCode = class_code || extractedData?.courseCode;

      if (!finalClassCode) {
        throw new Error("Could not determine class_code from request or syllabus content.");
      }

      // Extract subject
      const subjectMatch = finalClassCode.match(/[a-zA-Z]+/);
      const subject = subjectMatch ? subjectMatch[0].toUpperCase() : "GEN";
      const placeholderName = `Course ${finalClassCode}`;

      // UPSERT Class
      await pool.query(
        `INSERT INTO classes (class_code, subject, name, syllabus_url, user_id) 
         VALUES ($1, $2, $3, $4, $5) 
         ON CONFLICT (class_code) 
         DO UPDATE SET syllabus_url = EXCLUDED.syllabus_url,
                       user_id = COALESCE(classes.user_id, EXCLUDED.user_id)`,
        [finalClassCode, subject, placeholderName, syllabusUrl, user_id || null]
      );

      if (extractedData) {
        try {
          // Sync code and save
          extractedData.courseCode = finalClassCode;
          extractedData.user_id = user_id || null;
          await syllabusService.saveSyllabusData(extractedData);
          console.log(`[Syllabus] ✅ Automated extraction and saving completed for ${finalClassCode}`);
        } catch (saveErr) {
          console.error(`[Syllabus] ❌ Failed to save extracted data:`, saveErr.message);
        }
      }

      res.json({
        message: "Syllabus uploaded and processed successfully.",
        class_code: finalClassCode,
        data: extractedData
      });

    } catch (extractErr) {
      console.warn(`[Syllabus] ⚠️ Automated extraction failed:`, extractErr.message);

      // If extraction failed but we have a class_code, we at least save the URL
      if (class_code) {
        const subjectMatch = class_code.match(/[a-zA-Z]+/);
        const subject = subjectMatch ? subjectMatch[0].toUpperCase() : "GEN";
        await pool.query(
          `INSERT INTO classes (class_code, subject, name, syllabus_url, user_id) 
           VALUES ($1, $2, $3, $4, $5) 
           ON CONFLICT (class_code) DO UPDATE SET syllabus_url = EXCLUDED.syllabus_url`,
          [class_code, subject, `Course ${class_code}`, syllabusUrl, user_id || null]
        );
        return res.json({ message: "Syllabus uploaded, but extraction failed.", class_code });
      }

      res.status(400).json({ error: "Syllabus upload failed: Could not determine class code." });
    }
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
    const [classRes, tasksRes, topicsRes, infoRes] = await Promise.all([
      pool.query("SELECT * FROM classes WHERE class_code = $1", [normalizedCode]),
      pool.query("SELECT * FROM class_tasks WHERE class_code = $1 AND due_date >= CURRENT_DATE ORDER BY due_date ASC", [normalizedCode]),
      pool.query("SELECT * FROM topics WHERE class_code = $1", [normalizedCode]),
      pool.query("SELECT * FROM syllabus_info WHERE class_code = $1", [normalizedCode])
    ]);

    if (classRes.rows.length === 0) {
      return res.status(404).json({ error: `Class ${normalizedCode} not found.` });
    }

    res.json({
      classInfo: classRes.rows[0],
      tasks: tasksRes.rows,
      topics: topicsRes.rows,
      syllabusInfo: infoRes.rows[0] || null
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
