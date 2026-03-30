const express = require('express');
const router = express.Router();
const upload = require('../middleware/uploadMiddleware');
const syllabusService = require('../services/syllabusService');

router.post('/extract', upload.single("syllabusPdf"), async (req, res, next) => {
  try {
    const fileBuffer = req.file ? req.file.buffer : null;
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

module.exports = router;
