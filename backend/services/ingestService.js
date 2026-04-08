const { PDFLoader } = require('@langchain/community/document_loaders/fs/pdf');
const { RecursiveCharacterTextSplitter } = require('@langchain/textsplitters');
const { Pinecone } = require('@pinecone-database/pinecone');
const { LocalEmbeddings } = require('./vectorService');
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
    chunkSize: 800,
    chunkOverlap: 100,
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
async function ingestDocuments(files, classCode, docType = 'document') {
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
  const embeddings = new LocalEmbeddings();

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

module.exports = { ingestDocuments, getNamespaceStats, getClassNamespace };
