const { GeminiEmbeddings, getClassVectorStore } = require('./services/vectorService');
require('dotenv').config({ path: __dirname + '/.env' });

async function runTest() {
  console.log("🚀 Starting Vector Service Test...");

  // 1. Test Embeddings
  const embeddings = new GeminiEmbeddings();
  console.log("\n--- Step 1: Testing Embeddings ---");
  try {
    // Note: this will try primary then fallback
    const queryVector = await embeddings.embedQuery("What is probability?");
    console.log(`✅ Embedding successful! Vector length: ${queryVector.length}`);
  } catch (err) {
    console.error(`❌ Embedding failed: ${err.message}`);
  }

  // 2. Test Pinecone Connectivity
  console.log("\n--- Step 2: Testing Pinecone Search ---");
  const testClass = "CS3341"; // Example class
  try {
    const vectorStore = await getClassVectorStore(testClass);
    console.log(`✅ VectorStore initialized for ${testClass}`);
    
    console.log(`Performing similarity search...`);
    const results = await vectorStore.similaritySearch("probability", 1);
    
    if (results.length > 0) {
      console.log(`✅ Search successful! Found ${results.length} result(s).`);
      console.log(`Top result: "${results[0].pageContent.substring(0, 100)}..."`);
    } else {
      console.log(`ℹ️ Search executed but returned 0 results (namespace might be empty).`);
    }
  } catch (err) {
    console.error(`❌ Pinecone test failed: ${err.message}`);
  }

  console.log("\n--- Test Complete ---");
  process.exit(0);
}

runTest();
