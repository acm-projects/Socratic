const { getClassVectorStore } = require('../services/vectorService');

const testCases = [
  { classCode: 'CS-SE-3341-0W1', query: 'central limit theorem' },
  { classCode: 'CS 3341', query: 'probability density function' },
  { classCode: 'CS 3345', query: 'binary search tree' },
  { classCode: 'MATH 2413', query: 'derivative' },
  { classCode: 'PHYS 2305', query: 'momentum' },
  { classCode: 'CS-SE-3341-0W1', query: 'syllabus' },
  { classCode: 'CS 3345', query: 'time complexity' },
  { classCode: 'CS 3341', query: 'normal distribution' },
  { classCode: 'CSSE 3377', query: 'linux commands' },
  { classCode: 'CS 3341', query: 'Bayes theorem' }
];

async function runTests() {
  console.log('🚀 Starting Context Retrieval Integration Tests (10 cases)...\n');
  
  for (const [i, test] of testCases.entries()) {
    console.log(`--- Test ${i + 1}: [${test.classCode}] Query: "${test.query}" ---`);
    try {
      const store = await getClassVectorStore(test.classCode);
      const results = await store.similaritySearchWithScore(test.query, 3);
      
      console.log(`Chunks found: ${results.length}`);
      results.forEach(([doc, score]) => {
        console.log(`  [Score: ${score.toFixed(4)}] File: ${doc.metadata.fileName || 'N/A'} (Page: ${doc.metadata.pageNumber || 'N/A'})`);
      });
    } catch (err) {
      console.error(`  ❌ Error: ${err.message}`);
    }
    console.log('\n');
  }
  
  console.log('✅ All tests completed.');
  process.exit(0);
}

runTests();
