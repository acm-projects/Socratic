const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { S3Client, PutObjectCommand, GetObjectCommand } = require('@aws-sdk/client-s3');
const { ingestDocuments, ingestDocumentsWithVision, getNamespaceStats } = require('../services/ingestService');
const syllabusService = require('../services/syllabusService');
require('dotenv').config({ path: __dirname + '/../.env' });

// Store uploaded files to a local temp dir before processing
const uploadDir = path.join('/tmp', 'socratic-uploads');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, unique + '-' + file.originalname.replace(/\s+/g, '_'));
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype !== 'application/pdf') {
      return cb(new Error('Only PDF files are supported.'));
    }
    cb(null, true);
  },
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB per file
});

// --- S3 Client ---
const s3 = new S3Client({
  region: process.env.AWS_REGION || 'us-east-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || 'dummy',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || 'dummy',
  },
});

async function uploadToS3(filePath, classCode, docType, originalName) {
  const safeName = originalName.replace(/\s+/g, '_');
  const key = `course-docs/${classCode.replace(/\s/g, '')}/${docType}/${Date.now()}-${safeName}`;
  const fileBuffer = fs.readFileSync(filePath);

  await s3.send(new PutObjectCommand({
    Bucket: process.env.S3_BUCKET_NAME,
    Key: key,
    Body: fileBuffer,
    ContentType: 'application/pdf',
  }));

  return `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
}

/**
 * POST /api/ingest/upload
 *
 * Body (multipart/form-data):
 *   - file(s)    : one or more PDF files
 *   - classCode  : e.g. "CS 1436"
 *   - docType    : "syllabus" | "textbook" | "notes" (default: "document")
 *
 * Flow:
 *   1. Receive PDF via multer → local /tmp
 *   2. Upload original to S3 for permanent storage
 *   3. Run LangChain ingestion pipeline (PDFLoader → Splitter → Pinecone)
 *   4. Delete local temp file
 *   5. Return ingestion summary
 */
router.post('/upload', upload.array('file', 10), async (req, res, next) => {
  const { classCode, docType = 'document' } = req.body;
  const userId = req.body.user_id || req.body['user-id'] || null;

  if (!classCode) {
    return res.status(400).json({ error: 'classCode is required.' });
  }
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ error: 'At least one PDF file is required.' });
  }

  const results = [];
  const tempFiles = [];

  try {
    for (const file of req.files) {
      tempFiles.push(file.path);
      let s3Url = '';

      // Upload to S3 first for permanent storage
      try {
        console.log(`[Ingest] Uploading ${file.originalname} to S3...`);
        s3Url = await uploadToS3(file.path, classCode, docType, file.originalname);
        console.log(`[Ingest] S3 URL: ${s3Url}`);
        results.push({ fileName: file.originalname, s3Url, status: 'uploaded' });
      } catch (s3Err) {
        console.warn(`[Ingest] S3 upload failed for ${file.originalname}: ${s3Err.message}`);
        console.warn('[Ingest] Proceeding with ingestion without S3 storage...');
        results.push({ fileName: file.originalname, s3Url: '', status: 'no-s3' });
      }
    }

    // Run the NEW Intelligent Vision Ingestion pipeline
    const filesToIngest = req.files.map((file, i) => ({
      filePath: file.path,
      s3Url: results[i].s3Url,
      originalName: file.originalname, // Add original name for deduplication
    }));

    const { totalIngested, namespace } = await ingestDocumentsWithVision(filesToIngest, classCode, docType, userId);

    // 4. SYLLABUS-SPECIFIC: Extract tasks and schedule if docType is syllabus
    let syllabusData = null;
    if (docType === 'syllabus' && req.files.length > 0) {
      try {
        console.log(`[Ingest] 📑 Auto-Extracting syllabus data for ${classCode}...`);
        // We use req.files[0] because it's still available (haven't unlinked yet)
        const fileBuffer = fs.readFileSync(req.files[0].path); 
        
        // Extract via Multimodal AI
        const rawJson = await syllabusService.extractSyllabusData(fileBuffer);
        
        // Save to Database (Tasks, Topics, etc.)
        const saved = await syllabusService.saveSyllabusData(rawJson);
        
        syllabusData = {
          extracted: true,
          savedCourseCode: saved.savedClass?.class_code || rawJson.courseCode,
          tasksCount: saved.savedTasks?.length || 0,
          topicsCount: saved.savedTopics?.length || 0,
          courseName: rawJson.courseName
        };
        console.log(`[Ingest] ✅ Syllabus tasks saved: ${syllabusData.tasksCount} tasks found.`);
      } catch (extErr) {
        console.error(`[Ingest] ❌ Syllabus auto-extraction failed:`, extErr.message);
        syllabusData = { extracted: false, error: extErr.message };
      }
    }

    // 5. Clean up temp files ONLY AFTER processing is fully done
    for (const tmpPath of tempFiles) {
      try { fs.unlinkSync(tmpPath); } catch (_) {}
    }

    res.json({
      success: true,
      classCode,
      namespace,
      docType,
      filesProcessed: req.files.length,
      vectorsIngested: totalIngested,
      files: results,
      syllabusData
    });

  } catch (err) {
    // Clean up any remaining temp files on error
    for (const tmpPath of tempFiles) {
      try { fs.unlinkSync(tmpPath); } catch (_) {}
    }
    next(err);
  }
});

/**
 * GET /api/ingest/status/:classCode
 * Returns the number of vectors currently stored for a class in Pinecone.
 */
router.get('/status/:classCode', async (req, res, next) => {
  try {
    const stats = await getNamespaceStats(req.params.classCode);
    res.json(stats);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
