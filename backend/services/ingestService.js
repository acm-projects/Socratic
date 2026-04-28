const { PDFLoader } = require('@langchain/community/document_loaders/fs/pdf');
const { RecursiveCharacterTextSplitter } = require('@langchain/textsplitters');
const { Pinecone } = require('@pinecone-database/pinecone');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const { GoogleAIFileManager } = require("@google/generative-ai/server");
const { GeminiEmbeddings, invalidateClassCache } = require('./vectorService');
const path = require('path');
const crypto = require('crypto');
require('dotenv').config({ path: __dirname + '/../.env' });

// Pinecone namespace format for shared class knowledge bases
// e.g. classCode "CS 1436" => "class-cs1436"
function getClassNamespace(classCode) {
  return `class-${classCode.toLowerCase().replace(/[^a-z0-9]/g, '')}`;
}

/**
 * Load and chunk a single PDF file using LangChain's PDFLoader.
 * Returns an array of Document objects, each enriched with metadata.
 *
 * @param {string} filePath   - Absolute path to the PDF on disk
 * @param {string} classCode  - e.g. "CS 1436"
 * @param {string} docType    - "syllabus" | "textbook" | "notes" | "document"
 * @param {string} s3Url      - Permanent S3 URL for citation
 */
async function loadAndChunkPDF(filePath, classCode, docType = 'document', s3Url = '') {
  const fileName = path.basename(filePath);

  // 1. THE EXTRACTOR — PDFLoader reads the raw PDF text, one Document per page (auto-paginated)
  console.log(`[Ingest] Loading PDF: ${fileName}`);
  const loader = new PDFLoader(filePath, { splitPages: true });
  const rawPages = await loader.load();
  console.log(`[Ingest] Extracted ${rawPages.length} pages from ${fileName}`);

  // 2. THE AUTO-TAGGER — Enrich every page's metadata before splitting
  const taggedPages = rawPages.map((doc) => {
    doc.metadata = {
      ...doc.metadata,
      source: s3Url || fileName,         // Permanent S3 URL or filename for citation
      fileName,
      classCode,
      docType,
      pageNumber: doc.metadata?.loc?.pageNumber ?? doc.metadata?.page ?? 'unknown',
    };
    return doc;
  });

  // 3. THE SPLITTER — RecursiveCharacterTextSplitter breaks pages into ~800-char chunks
  //    with 100-char overlap so context isn't lost at boundaries
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 400,
    chunkOverlap: 50,
  });
  const chunks = await splitter.splitDocuments(taggedPages);
  console.log(`[Ingest] Split into ${chunks.length} chunks for Pinecone`);

  return chunks;
}

/**
 * Ingest one or more PDFs into the shared Pinecone class namespace.
 * Called after the files have already been saved to S3.
 *
 * @param {Array<{filePath: string, s3Url: string}>} files
 * @param {string} classCode
 * @param {string} docType
 */
async function ingestDocuments(files, classCode, docType = 'document', userId = null) {
  const namespace = getClassNamespace(classCode);
  console.log(`[Ingest] Target Pinecone namespace: '${namespace}'`);

  const pinecone = new Pinecone({ apiKey: process.env.PINECONE_API_KEY });
  const indexName = process.env.PINECONE_INDEX || 'socratic-tutor';

  // Wait for index readiness
  let ready = false;
  for (let i = 0; i < 10; i++) {
    const desc = await pinecone.describeIndex(indexName);
    if (desc.status && desc.status.ready) { ready = true; break; }
    console.log('[Ingest] Waiting for Pinecone index...');
    await new Promise(r => setTimeout(r, 3000));
  }
  if (!ready) throw new Error('Pinecone index not ready after 30 seconds.');

  const pineconeIndex = pinecone.Index(indexName);
  const targetIndex = pineconeIndex.namespace(namespace);
  const embeddings = new GeminiEmbeddings();

  let totalIngested = 0;

  for (const { filePath, s3Url } of files) {
    // 4. Load and chunk the PDF
    const chunks = await loadAndChunkPDF(filePath, classCode, docType, s3Url);

    if (chunks.length === 0) {
      console.warn(`[Ingest] No chunks extracted from ${filePath}, skipping.`);
      continue;
    }

    const texts = chunks.map(c => c.pageContent);
    const metadatas = chunks.map(c => c.metadata);

    // 5. Generate embeddings
    console.log(`[Ingest] Generating embeddings for ${texts.length} chunks...`);
    const vectors = await embeddings.embedDocuments(texts);

    // 6. THE HANDOFF — Build Pinecone records with rich metadata for citation
    const records = texts.map((text, i) => ({
      id: `${classCode.replace(/\s/g, '')}-${crypto.randomUUID().slice(0, 8)}`,
      values: vectors[i],
      metadata: {
        text,                                           // Full chunk text for retrieval
        source: metadatas[i].source,                   // S3 URL or filename
        fileName: metadatas[i].fileName,
        pageNumber: metadatas[i].pageNumber,            // "Check page 4 of the syllabus!"
        classCode: metadatas[i].classCode,
        docType: metadatas[i].docType,
        userId: userId || 'unknown',
        ingestedAt: new Date().toISOString(),
      },
    }));

    // 7. Batch upsert into Pinecone (100 records at a time)
    const batchSize = 100;
    for (let i = 0; i < records.length; i += batchSize) {
      await targetIndex.upsert({ records: records.slice(i, i + batchSize) });
    }

    console.log(`[Ingest] ✅ Upserted ${records.length} vectors for ${path.basename(filePath)}`);
    totalIngested += records.length;
  }

  // Clear the cache so the new content is immediately searchable
  invalidateClassCache(classCode);

  return { totalIngested, namespace, classCode };
}

/**
 * Get current vector count for a class namespace.
 */
async function getNamespaceStats(classCode) {
  const namespace = getClassNamespace(classCode);
  const pinecone = new Pinecone({ apiKey: process.env.PINECONE_API_KEY });
  const indexName = process.env.PINECONE_INDEX || 'socratic-tutor';
  const pineconeIndex = pinecone.Index(indexName);
  const stats = await pineconeIndex.describeIndexStats();
  const nsStats = stats.namespaces && stats.namespaces[namespace];
  return {
    namespace,
    classCode,
    vectorCount: nsStats ? nsStats.recordCount : 0,
  };
}

/**
 * NEW: Ingest documents using Gemini's Native PDF Vision.
 * This describes every page (including graphs/images) and stores descriptions in Pinecone.
 */
async function ingestDocumentsWithVision(files, classCode, docType = 'document', userId = null) {
  const namespace = getClassNamespace(classCode);
  const embeddings = new GeminiEmbeddings();
  const pinecone = new Pinecone({ apiKey: process.env.PINECONE_API_KEY });
  const indexName = process.env.PINECONE_INDEX || 'socratic-tutor';
  const targetIndex = pinecone.Index(indexName).namespace(namespace);

  // For Vision Fallback
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const fileManager = new GoogleAIFileManager(process.env.GEMINI_API_KEY);

  // Vision Fallback Models (Waterfall)
  const VISION_MODELS = [
    "gemini-2.5-flash",
    "gemini-2.5-pro",
    "gemini-3-flash-preview"
  ];

  let totalIngested = 0;

  for (const { filePath, originalName } of files) {
    const fileName = path.basename(filePath);
    const friendlyName = originalName || fileName;
    console.log(`[Ingest] 🚀 Starting Hybrid Ingest for ${friendlyName}...`);

    // 1. FUZZY DEDUPLICATION: Kill anything matching the original filename
    try {
      console.log(`[Ingest] 🧹 Cleaning up all vectors for ${friendlyName}...`);
      await targetIndex.deleteMany({ filter: { originalName: { '$eq': friendlyName } } });
    } catch (e) {
      console.warn(`[Ingest] ⚠️ Cleanup skipped: ${e.message}`);
    }

    // 2. TEXT EXTRACTION (FAST)
    const loader = new PDFLoader(filePath, { splitPages: true });
    const rawPages = await loader.load();
    console.log(`[Ingest] 📄 Extracted ${rawPages.length} pages via Text OCR.`);

    // 3. VISION FALLBACK FOR EMPTY/IMAGE PAGES
    let fileRef = null;
    const taggedPages = [];

    for (let i = 0; i < rawPages.length; i++) {
      const page = rawPages[i];
      const pageNum = i + 1;
      let content = page.pageContent.trim();

      // INCREASED THRESHOLD: If < 200 chars, it's probably a graph/title-only slide
      if (content.length < 200) {
        console.log(`[Ingest] 👁️  Page ${pageNum} looks thin (${content.length} chars). Triggering Vision...`);

        // Lazy-upload the file only if we need vision
        if (!fileRef) {
          const uploadResult = await fileManager.uploadFile(filePath, {
            mimeType: "application/pdf",
            displayName: fileName,
          });
          fileRef = uploadResult.file;
          // Wait for processing
          let f = await fileManager.getFile(fileRef.name);
          while (f.state === "PROCESSING") {
            await new Promise(r => setTimeout(r, 2000));
            f = await fileManager.getFile(fileRef.name);
          }
        }

        // VISION WATERFALL SCAN
        let scanSuccess = false;
        for (const modelId of VISION_MODELS) {
          if (scanSuccess) break;
          try {
            console.log(`[Ingest] 🔍 Scanning Page ${pageNum} with ${modelId}...`);
            const currentModel = genAI.getGenerativeModel({ model: modelId });

            const prompt = `Describe this slide (Page ${pageNum}). If there is a graph, diagram, or model, explain it in detail. Summarize the main point of the slide.`;
            const result = await currentModel.generateContent([
              { fileData: { mimeType: fileRef.mimeType, fileUri: fileRef.uri } },
              { text: prompt },
            ]);

            content = `[AI VISUAL DESCRIPTION OF SLIDE]: ${result.response.text()}`;
            console.log(`[Ingest] ✅ Vision captured Page ${pageNum} using ${modelId}`);
            scanSuccess = true;
          } catch (vizErr) {
            const isRetryable = vizErr.message.includes('503') || vizErr.message.includes('429');
            console.warn(`[Ingest] ⚠️ ${modelId} failed for Page ${pageNum}: ${vizErr.message}`);

            if (isRetryable) {
              console.log(`[Ingest] ⏳ Retrying in 2s...`);
              await new Promise(r => setTimeout(r, 2000));
              // We'll give it one second try with the SAME model before moving to next in waterfall
              try {
                const currentModel = genAI.getGenerativeModel({ model: modelId });
                const promptRetry = `Describe this slide (Page ${pageNum}). If there is a graph, diagram, or model, explain it in detail. Summarize the main point of the slide.`;
                const result = await currentModel.generateContent([
                  { fileData: { mimeType: fileRef.mimeType, fileUri: fileRef.uri } },
                  { text: promptRetry },
                ]);
                content = `[AI VISUAL DESCRIPTION OF SLIDE]: ${result.response.text()}`;
                console.log(`[Ingest] ✅ Vision captured Page ${pageNum} on retry!`);
                scanSuccess = true;
              } catch (secondErr) {
                console.warn(`[Ingest] ❌ Retry failed, moving to next model in waterfall...`);
              }
            }
          }
        }

        if (!scanSuccess) {
          console.error(`[Ingest] 💀 ALL vision models failed for Page ${pageNum}.`);
          content = "[Scanning failed for this slide]";
        }
      }

      taggedPages.push({
        pageContent: content,
        metadata: {
          ...page.metadata,
          pageNumber: pageNum,
          fileName: fileName,
          source: fileName,
          docType,
          classCode
        }
      });
    }

    // 4. CHUNKING & EMBEDDINGS
    const splitter = new RecursiveCharacterTextSplitter({
      chunkSize: 600, // Slightly larger chunks for better context
      chunkOverlap: 100,
    });

    const chunks = await splitter.splitDocuments(taggedPages);
    console.log(`[Ingest] 🧩 Created ${chunks.length} chunks.`);

    const texts = chunks.map((c) => c.pageContent);
    const vectors = await embeddings.embedDocuments(texts);

    const records = chunks.map((chunk, j) => ({
      id: `${classCode.replace(/\s/g, '')}-${crypto.randomUUID().slice(0, 8)}`,
      values: vectors[j],
      metadata: {
        text: chunk.pageContent,
        pageNumber: chunk.metadata.pageNumber,
        fileName: chunk.metadata.fileName,
        originalName: friendlyName, // Key for deduplication
        source: friendlyName,
        docType: chunk.metadata.docType,
        classCode: chunk.metadata.classCode,
        userId: userId || 'unknown',
        ingestedAt: new Date().toISOString(),
      },
    }));

    // UPSERT
    const batchSize = 100;
    for (let k = 0; k < records.length; k += batchSize) {
      await targetIndex.upsert({ records: records.slice(k, k + batchSize) });
    }

    console.log(`[Ingest] ✅ Ingested ${fileName}`);
    totalIngested += records.length;

    // Cleanup Google File
    if (fileRef) {
      await fileManager.deleteFile(fileRef.name).catch(() => { });
    }
  }

  // Clear the cache so the new content is immediately searchable
  invalidateClassCache(classCode);

  return { totalIngested, namespace, classCode };
}



module.exports = { ingestDocuments, ingestDocumentsWithVision, getNamespaceStats, getClassNamespace };
