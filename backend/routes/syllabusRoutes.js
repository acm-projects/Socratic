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

module.exports = router;
