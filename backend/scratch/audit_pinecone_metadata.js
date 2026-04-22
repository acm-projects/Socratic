/**
 * AUDIT SCRIPT — Read-only. Does NOT modify anything in Pinecone.
 * Uses a real Gemini embedding to query each namespace and read metadata.
 */
const { Pinecone } = require('@pinecone-database/pinecone');
const { GeminiEmbeddings } = require('../services/vectorService');
require('dotenv').config({ path: require('path').join(__dirname, '../.env') });

async function audit() {
  const pinecone = new Pinecone({ apiKey: process.env.PINECONE_API_KEY });
  const indexName = process.env.PINECONE_INDEX || 'socratic-tutor';
  const index = pinecone.Index(indexName);
  const embeddings = new GeminiEmbeddings();

  // Embed a generic query once — reuse across all namespaces
  console.log('\n⏳ Generating embedding for audit query...');
  const [queryVector] = await embeddings.embedDocuments(['data structures algorithms concepts']);
  console.log('✅ Embedding ready\n');

  // 1. Overview
  const stats = await index.describeIndexStats();
  const namespaces = Object.keys(stats.namespaces || {});
  console.log('📊 PINECONE INDEX OVERVIEW');
  console.log('══════════════════════════════════════════');
  console.log(`Total namespaces: ${namespaces.length}`);
  console.log(`Total vectors:    ${stats.totalRecordCount}\n`);
  for (const ns of namespaces) {
    console.log(`  ${ns}: ${stats.namespaces[ns].recordCount} vectors`);
  }

  // 2. Query each namespace with a real vector
  console.log('\n🔍 METADATA FIELD AUDIT PER NAMESPACE');
  console.log('══════════════════════════════════════════');

  for (const ns of namespaces) {
    try {
      const nsIndex = index.namespace(ns);
      const result = await nsIndex.query({
        vector: queryVector,
        topK: 3,
        includeMetadata: true
      });

      const matches = result.matches || [];
      if (matches.length === 0) {
        console.log(`\n[${ns}] — Query returned 0 matches`);
        continue;
      }

      console.log(`\n[${ns}]`);
      const sample = matches[0];
      const fields = Object.keys(sample.metadata || {});
      console.log(`  Metadata fields: ${fields.join(', ')}`);
      console.log(`  Has userId:      ${fields.includes('userId') ? '✅ YES' : '❌ NO'}`);

      const meta = sample.metadata || {};
      if (meta.userId)     console.log(`  userId:     ${meta.userId}`);
      if (meta.fileName)   console.log(`  fileName:   ${meta.fileName}`);
      if (meta.classCode)  console.log(`  classCode:  ${meta.classCode}`);
      if (meta.docType)    console.log(`  docType:    ${meta.docType}`);
      if (meta.source)     console.log(`  source:     ${meta.source}`);
      if (meta.ingestedAt) console.log(`  ingestedAt: ${meta.ingestedAt}`);

    } catch (err) {
      console.log(`\n[${ns}] ERROR: ${err.message}`);
    }
  }

  // 3. Deep dive on class-cs3341 — the big mixed namespace
  console.log('\n🔬 DEEP DIVE: class-cs3341 (top 5 matches)');
  console.log('══════════════════════════════════════════');
  try {
    const result = await index.namespace('class-cs3341').query({
      vector: queryVector,
      topK: 5,
      includeMetadata: true
    });
    (result.matches || []).forEach((m, i) => {
      console.log(`\n  Match ${i + 1}: ${m.id}`);
      const meta = m.metadata || {};
      Object.entries(meta).forEach(([k, v]) => {
        if (k !== 'text') console.log(`    ${k}: ${v}`);
      });
    });
  } catch (err) {
    console.log(`  ERROR: ${err.message}`);
  }

  console.log('\n📋 CONCLUSION');
  console.log('══════════════════════════════════════════');
  console.log('If NO namespace shows "userId" field → all existing vectors have NO user tag.');
  console.log('  → The fallback (unfiltered search) will always fire for old data.');
  console.log('  → SAFE to implement. No existing chats will break.\n');

  process.exit(0);
}

audit().catch(err => {
  console.error('Audit crashed:', err.message);
  process.exit(1);
});
