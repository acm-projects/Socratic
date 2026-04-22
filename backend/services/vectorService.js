const { PineconeStore } = require('@langchain/pinecone');
const { Pinecone } = require('@pinecone-database/pinecone');
const { GoogleGenerativeAIEmbeddings } = require('@langchain/google-genai');
const { TaskType } = require('@google/generative-ai');
require('dotenv').config({ path: __dirname + '/../.env' });

const courseData = [
  // --- CS 1436: Fundamentals ---
  "CS 1436: Variables in C++ must be declared before they are used.",
  "CS 1436: A for loop is used when the number of iterations is known.",
  "CS 1436: Arrays are contiguous memory blocks holding elements of the same type.",
  "CS 1436: A while loop is used when the number of iterations is unknown.",
  // --- CS 3345: Complexity & Analysis ---
  "CS 3345: Time complexity is the number of operations performed for a given input size.",
  "CS 3345: Big-O represents the Upper Bound (worst-case) of an algorithm's running time.",
  "CS 3345: Nested loops running 'n' times result in O(n^2) time complexity.",
  "CS 3345: Recurrence relations like T(n) = T(n/2) + O(1) describe Binary Search and result in O(log n).",

  // --- CS 3345: Linear Data Structures ---
  "CS 3345: You need exactly 2 Stacks to implement a Queue.",
  "CS 3345: Linked lists are O(1) for inserting/deleting at the beginning, but O(n) to find the 'nth' element.",
  "CS 3345: Hashing uses a hash function to map keys to indices; collisions can be handled by chaining or open addressing.",

  // --- CS 3345: Trees & Heaps ---
  "CS 3345: A Binary Search Tree (BST) has left children < parent and right children > parent.",
  "CS 3345: Balanced BSTs like AVL or Red-Black trees ensure O(log n) height for search, insert, and delete.",
  "CS 3345: B-Trees are optimized for systems that read/write large blocks of data, like databases.",
  "CS 3345: A Min-Heap is a complete binary tree where the parent is always smaller than its children, used for Priority Queues.",

  // --- CS 3345: Sorting & Sets ---
  "CS 3345: Advanced sorting: Quicksort is O(n log n) on average, while Mergesort is O(n log n) in the worst case.",
  "CS 3345: Disjoint-set Union-Find uses 'find' with path compression and 'union' by rank to achieve near-constant time.",

  // --- CS 3345: Graphs ---
  "CS 3345: Graphs consist of Vertices (V) and Edges (E); they can be represented by Adjacency Matrices or Lists.",
  "CS 3345: Breadth-First Search (BFS) uses a Queue and finds the shortest path in unweighted graphs.",
  "CS 3345: Depth-First Search (DFS) uses a Stack (or recursion) and is used for topological ordering.",
  "CS 3345: Dijkstra's algorithm finds the shortest path in a weighted graph with no negative edge weights.",
  "CS 3345: Prim's and Kruskal's algorithms are greedy approaches to find the Minimum Spanning Tree (MST)."
];

class GeminiEmbeddings {
  constructor() {
    this.model = new GoogleGenerativeAIEmbeddings({
      apiKey: process.env.GEMINI_API_KEY,
      modelName: "gemini-embedding-001",
    });
  }

  async embedDocuments(documents) {
    return this.model.embedDocuments(documents);
  }

  async embedQuery(document) {
    return this.model.embedQuery(document);
  }
}

// Cache instances per namespace to avoid re-initializing
const vectorStoreInstances = {};

/**
 * Returns the shared class-level Pinecone store (namespace: class-cs1436).
 * This is populated by the PDF ingestion pipeline and is read-only from the tutor.
 */
async function getClassVectorStore(classCode) {
  const namespace = `class-${classCode.toLowerCase().replace(/[^a-z0-9]/g, '')}`;
  if (vectorStoreInstances[namespace]) return vectorStoreInstances[namespace];

  const pinecone = new Pinecone({ apiKey: process.env.PINECONE_API_KEY });
  const indexName = process.env.PINECONE_INDEX || 'socratic-tutor';

  // Wait for index readiness
  let ready = false;
  for (let i = 0; i < 10; i++) {
    const desc = await pinecone.describeIndex(indexName);
    if (desc.status && desc.status.ready) { ready = true; break; }
    await new Promise(res => setTimeout(res, 3000));
  }
  if (!ready) {
    console.warn('[VectorStore] Pinecone index not ready after wait — proceeding anyway');
  }

  const pineconeIndex = pinecone.Index(indexName);
  const embeddings = new GeminiEmbeddings();

  const storeInstance = await PineconeStore.fromExistingIndex(embeddings, {
    pineconeIndex,
    namespace,
  });

  vectorStoreInstances[namespace] = storeInstance;

  // Check how many vectors exist — for the class store we never auto-seed
  const stats = await pineconeIndex.describeIndexStats();
  const nsStats = stats.namespaces && stats.namespaces[namespace];
  const count = nsStats ? nsStats.recordCount : 0;
  if (count === 0) {
    console.log(`[VectorStore] ⚠️  Class namespace '${namespace}' is empty. Upload PDFs via /api/ingest/upload to populate it.`);
  } else {
    console.log(`[VectorStore] Class namespace '${namespace}' ready with ${count} vectors.`);
  }

  return storeInstance;
}

async function getVectorStore(namespace = '') {
  if (vectorStoreInstances[namespace]) return vectorStoreInstances[namespace];

  const pinecone = new Pinecone({ apiKey: process.env.PINECONE_API_KEY });
  const indexName = process.env.PINECONE_INDEX || 'socratic-tutor';

  // Wait for the Pinecone index to be ready
  let ready = false;
  for (let i = 0; i < 10; i++) {
    const desc = await pinecone.describeIndex(indexName);
    if (desc.status && desc.status.ready) { ready = true; break; }
    console.log('[VectorStore] Waiting for Pinecone index to be ready...');
    await new Promise(res => setTimeout(res, 3000));
  }
  if (!ready) {
    console.warn('[VectorStore] Pinecone index not ready after 30 seconds — proceeding anyway');
  }

  const pineconeIndex = pinecone.Index(indexName);
  const embeddings = new GeminiEmbeddings();

  // Create the store instance attached to the specific namespace
  const storeInstance = await PineconeStore.fromExistingIndex(embeddings, { 
    pineconeIndex,
    namespace: namespace || undefined 
  });
  
  vectorStoreInstances[namespace] = storeInstance;

  // Seed index if this specific namespace is empty
  const stats = await pineconeIndex.describeIndexStats();
  const namespaceStats = namespace ? (stats.namespaces && stats.namespaces[namespace]) : (stats.namespaces && stats.namespaces['']);
  const totalVectors = namespaceStats ? namespaceStats.recordCount : 0;

  if (totalVectors === 0 && process.env.FORCE_RESEED !== 'true') {
    console.log(`[VectorStore] Namespace '${namespace || 'default'}' is empty — seeding course data...`);
    const vectors = await embeddings.embedDocuments(courseData);
    const records = courseData.map((text, i) => ({
      id: `course-${i}`,
      values: vectors[i],
      metadata: { text, source: 'course-data', chunk: i },
    }));
    
    // Upsert directly into the given namespace
    const targetIndex = namespace ? pineconeIndex.namespace(namespace) : pineconeIndex;
    
    const batchSize = 100;
    for (let i = 0; i < records.length; i += batchSize) {
      await targetIndex.upsert({ records: records.slice(i, i + batchSize) });
    }
    console.log(`[VectorStore] Seeded ${courseData.length} vectors into Pinecone namespace: '${namespace || 'default'}'.`);
  } else {
    console.log(`[VectorStore] Found ${totalVectors} existing vectors in Pinecone namespace: '${namespace || 'default'}' — skipping seed.`);
  }

  return storeInstance;
}

/**
 * Deletes all embeddings in a class namespace that belong to a specific user.
 * If no userId is provided, logs a warning and aborts to prevent mass deletion.
 */
async function deleteUserClassEmbeddings(classCode, userId) {
  if (!userId) {
    console.warn(`[VectorStore] ⚠️ Cannot delete user embeddings for class ${classCode} without a userId.`);
    return;
  }
  
  const namespace = `class-${classCode.toLowerCase().replace(/[^a-z0-9]/g, '')}`;
  const pinecone = new Pinecone({ apiKey: process.env.PINECONE_API_KEY });
  const indexName = process.env.PINECONE_INDEX || 'socratic-tutor';
  
  try {
    const pineconeIndex = pinecone.Index(indexName);
    const targetIndex = pineconeIndex.namespace(namespace);
    
    // Pinecone supports deleteMany with metadata filter
    await targetIndex.deleteMany({ filter: { userId: { '$eq': userId } } });
    console.log(`[VectorStore] 🗑️ Deleted Pinecone embeddings for user ${userId} in namespace ${namespace}`);
  } catch (err) {
    console.error(`[VectorStore] ❌ Failed to delete embeddings for user ${userId} in ${namespace}:`, err.message);
  }
}

module.exports = {
  getVectorStore,
  getClassVectorStore,
  GeminiEmbeddings,
  deleteUserClassEmbeddings
};
