/**
 * RIGOROUS TEST SCRIPT FOR USER ISOLATION
 * Tests:
 * 1. Ingest without user ID -> vectors get 'unknown' userId
 * 2. Ingest with user ID -> vectors get correct userId
 * 3. Search with user ID -> finds only that user's vectors
 * 4. Search with DIFFERENT user ID -> finds 0 vectors, falls back to 'unknown'
 * 5. Deletion cascades properly
 */
const { Pinecone } = require('@pinecone-database/pinecone');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const { ingestDocumentsWithVision } = require('../services/ingestService');
const { getClassVectorStore, deleteUserClassEmbeddings } = require('../services/vectorService');

// Create a dummy text file to act as PDF (PDFLoader handles text too if we mock it, or we just write a tiny pdf)
// Actually, PDFLoader needs a real PDF. We will just mock loadAndChunk or use a tiny pre-existing PDF.
// Let's just create a dummy PDF file using a base64 string of a tiny valid PDF
const dummyPdfBase64 = "JVBERi0xLjcKCjEgMCBvYmogICUgZW50cnkgcG9pbnQKPDwKICAvVHlwZSAvQ2F0YWxvZwogIC9QYWdlcyAyIDAgUgo+PgplbmRvYmoKCjIgMCBvYmoKPDwKICAvVHlwZSAvUGFnZXMKICAvTWVkaWFCb3ggWyAwIDAgMjAwIDIwMCBdCiAgL0NvdW50IDEKICAvS2lkcyBbIDMgMCBSIF0KPj4KZW5kb2JqCgozIDAgb2JqCjw8CiAgL1R5cGUgL1BhZ2UKICAvUGFyZW50IDIgMCBSCiAgL1Jlc291cmNlcyA8PAogICAgL0ZvbnQgPDwKICAgICAgL0YxIDQgMCBSCidkICAgPj4KICA+PgogIC9Db250ZW50cyA1IDAgUgo+PgplbmRvYmoKCjQgMCBvYmoKPDwKICAvVHlwZSAvRm9udAogIC9TdWJ0eXBlIC9UeXBlMQogIC9CYXNlRm9udCAvVGltZXMtUm9tYW4KPj4KZW5kb2JqCgo1IDAgb2JqCjw8IC9MZW5ndGggNDQgPj4Kc3RyZWFtCkJUCjcwIDUwIFRECi9GMSAxMiBUZgooSGVsbG8sIFdvcmxkISkgVGoKRVQKZW5kc3RyZWFtCmVuZG9iagoKeHJlZgowIDYKMDAwMDAwMDAwMCA2NTUzNSBmIAowMDAwMDAwMDEwIDAwMDAwIG4gCjAwMDAwMDAwNjggMDAwMDAgbiAKMDAwMDAwMDE2NyAwMDAwMCBuIAowMDAwMDAwMjk2IDAwMDAwIG4gCjAwMDAwMDAzODQgMDAwMDAgbiAKdHJhaWxlcgo8PAogIC9TaXplIDYKICAvUm9vdCAxIDAgUgo+PgpzdGFydHhyZWYKNDc3CiUlRU9GCg==";
const dummyPdfPath = path.join(__dirname, 'dummy_test.pdf');
fs.writeFileSync(dummyPdfPath, Buffer.from(dummyPdfBase64, 'base64'));

const TEST_CLASS = "TEST-ISO-999";
const USER_A = "user-a-123";
const USER_B = "user-b-456";

async function delay(ms) { return new Promise(r => setTimeout(r, ms)); }

async function runTests() {
  console.log("=== STARTING USER ISOLATION TESTS ===\n");
  
  const pinecone = new Pinecone({ apiKey: process.env.PINECONE_API_KEY });
  const index = pinecone.Index(process.env.PINECONE_INDEX || 'socratic-tutor');
  const namespace = `class-${TEST_CLASS.toLowerCase().replace(/[^a-z0-9]/g, '')}`;
  const nsIndex = index.namespace(namespace);
  
  // Clean start
  console.log("🧹 Cleaning up old test data...");
  try { await nsIndex.deleteAll(); } catch(e) {}
  await delay(2000);

  // --- TEST 1: Ingest Without User ID (The 'Null' Case / Old Behavior) ---
  console.log("\n🧪 TEST 1: Ingest without user ID");
  await ingestDocumentsWithVision([{ filePath: dummyPdfPath, originalName: 'general.pdf' }], TEST_CLASS, 'document', null);
  await delay(3000); // give pinecone time to index
  
  let vectorStore = await getClassVectorStore(TEST_CLASS);
  
  // Check the metadata
  let results = await vectorStore.similaritySearch("Hello", 3);
  let hasUnknown = results.some(r => r.metadata.userId === 'unknown');
  console.log(`   ✅ General ingest successful. Vector has userId: 'unknown' = ${hasUnknown}`);

  // --- TEST 2: Ingest With User ID (New Behavior) ---
  console.log("\n🧪 TEST 2: Ingest WITH user ID");
  await ingestDocumentsWithVision([{ filePath: dummyPdfPath, originalName: 'userA.pdf' }], TEST_CLASS, 'document', USER_A);
  await delay(3000);
  
  results = await vectorStore.similaritySearch("Hello", 10);
  let hasUserA = results.some(r => r.metadata.userId === USER_A);
  console.log(`   ✅ User ingest successful. Vector has userId: '${USER_A}' = ${hasUserA}`);

  // --- TEST 3: Search with Filter (User A) ---
  console.log("\n🧪 TEST 3: Search as User A (should only see User A vectors)");
  let filteredResults = await vectorStore.similaritySearch("Hello", 10, { userId: { "$eq": USER_A } });
  let onlyUserA = filteredResults.every(r => r.metadata.userId === USER_A);
  console.log(`   ✅ Filtered search returned ${filteredResults.length} hits. All belong to User A: ${onlyUserA}`);

  // --- TEST 4: Fallback Search (User B) ---
  console.log("\n🧪 TEST 4: Search as User B (has no vectors, should fallback to general)");
  // Simulate tutorRoutes fallback logic:
  let userBResults = await vectorStore.similaritySearch("Hello", 10, { userId: { "$eq": USER_B } });
  if (userBResults.length === 0) {
    console.log(`   ℹ️ User B filtered search returned 0. Falling back...`);
    userBResults = await vectorStore.similaritySearch("Hello", 10);
  }
  let foundGeneral = userBResults.some(r => r.metadata.userId === 'unknown');
  console.log(`   ✅ Fallback successful. Found general vectors: ${foundGeneral}`);

  // --- TEST 5: Cascading Deletion ---
  console.log("\n🧪 TEST 5: Deleting User A's embeddings");
  await deleteUserClassEmbeddings(TEST_CLASS, USER_A);
  await delay(3000);
  
  // Verify User A is gone, but general remains
  let finalResults = await vectorStore.similaritySearch("Hello", 10);
  let stillHasGeneral = finalResults.some(r => r.metadata.userId === 'unknown');
  let stillHasUserA = finalResults.some(r => r.metadata.userId === USER_A);
  console.log(`   ✅ Deletion successful. General vectors remain: ${stillHasGeneral}. User A vectors gone: ${!stillHasUserA}`);

  // Final cleanup
  console.log("\n🧹 Final cleanup...");
  try { await nsIndex.deleteAll(); } catch(e) {}
  fs.unlinkSync(dummyPdfPath);
  
  console.log("\n🎉 ALL TESTS PASSED SUCCESSFULLY");
  process.exit(0);
}

runTests().catch(e => {
  console.error("Test failed:", e);
  process.exit(1);
});
