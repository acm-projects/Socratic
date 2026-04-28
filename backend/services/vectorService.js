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
    this.primary = new GoogleGenerativeAIEmbeddings({
      apiKey: process.env.GEMINI_API_KEY,
      modelName: "gemini-embedding-001",
    });
    this.fallback = new GoogleGenerativeAIEmbeddings({
      apiKey: process.env.GEMINI_API_KEY,
      modelName: "gemini-embedding-2",
    });
  }

  async embedDocuments(documents) {
    try {
      return await this.primary.embedDocuments(documents);
    } catch (err) {
      console.warn(`[VectorStore] Primary embedding failed, trying fallback:`, err.message);
      return await this.fallback.embedDocuments(documents);
    }
  }

  async embedQuery(document) {
    try {
      return await this.primary.embedQuery(document);
    } catch (err) {
      console.warn(`[VectorStore] Primary embedding failed, trying fallback:`, err.message);
      return await this.fallback.embedQuery(document);
    }
  }
}

// Cache instances per namespace to avoid re-initializing
const vectorStoreInstances = {};

// Cache resolved namespaces per classCode to skip describeIndexStats() on repeat calls.
// This persists for the lifetime of the server process — namespaces change only on uploads.
const resolvedNamespaceCache = {};

/**
 * A wrapper for multiple PineconeStore instances that allows searching across several namespaces.
 */
class MultiNamespaceStore {
  constructor(stores) {
    this.stores = stores;
  }

  async similaritySearch(query, k = 4, filter = undefined) {
    const searchWithTimeout = async (store) => {
      return Promise.race([
        store.similaritySearch(query, k, filter),
        new Promise((_, reject) => setTimeout(() => reject(new Error("Timeout (8s)")), 8000))
      ]);
    };

    const results = await Promise.all(this.stores.map(store =>
      searchWithTimeout(store).catch(err => {
        console.warn(`[VectorStore] ⚠️  Namespace search failed/timed out: ${err.message}`);
        return [];
      })
    ));

    return results.flat()
      .filter(doc => !doc.metadata.fileName?.toLowerCase().includes('textbook'))
      .slice(0, k);
  }

  async similaritySearchWithScore(query, k = 4, filter = undefined) {
    const searchWithTimeout = async (store) => {
      return Promise.race([
        store.similaritySearchWithScore(query, k, filter),
        new Promise((_, reject) => setTimeout(() => reject(new Error("Timeout (8s)")), 8000))
      ]);
    };

    const results = await Promise.all(this.stores.map(store =>
      searchWithTimeout(store).catch(err => {
        console.warn(`[VectorStore] ⚠️  Namespace search failed/timed out: ${err.message}`);
        return [];
      })
    ));

    return results.flat()
      .sort((a, b) => b[1] - a[1])
      .filter(([doc]) => !doc.metadata.fileName?.toLowerCase().includes('textbook'))
      .slice(0, k);
  }
}

async function getClassVectorStore(classCode) {
  const base = classCode.toLowerCase().replace(/[^a-z0-9]/g, '');
  const cacheKey = base;

  const pinecone = new Pinecone({ apiKey: process.env.PINECONE_API_KEY });
  const indexName = process.env.PINECONE_INDEX || 'socratic-tutor';
  const pineconeIndex = pinecone.Index(indexName);
  const embeddings = new GeminiEmbeddings();

  // ── Fast path: namespace already resolved, store instances already cached ──
  if (resolvedNamespaceCache[cacheKey]) {
    const activeNamespaces = resolvedNamespaceCache[cacheKey];
    const stores = activeNamespaces.map(ns => vectorStoreInstances[ns]).filter(Boolean);
    if (stores.length === activeNamespaces.length) {
      // All store instances are cached too — return immediately, zero network calls
      if (stores.length === 1) return stores[0];
      return new MultiNamespaceStore(stores);
    }
  }

  // ── Slow path: first call for this class, resolve namespaces via Pinecone API ──
  const candidates = [
    `class-${base}`,                                    // exact match
    `class-${base.replace(/0w\d+$/, '')}`,              // strip section (0w1)
    `class-${base.replace(/[a-z]{2,4}(\d+).*/, '$1')}`, // just numbers
    `class-cs${base.match(/\d{4}/)?.[0] || base}`,      // cs + 4 digits
  ].filter((v, i, a) => a.indexOf(v) === i); // deduplicate

  const stats = await pineconeIndex.describeIndexStats();

  // Find ALL namespaces with actual data
  const activeNamespaces = [];
  for (const ns of candidates) {
    const nsStats = stats.namespaces?.[ns];
    if (nsStats && nsStats.recordCount > 0) {
      activeNamespaces.push(ns);
      console.log(`[VectorStore] Found active namespace '${ns}' (${nsStats.recordCount} vectors) for ${classCode}`);
    }
  }

  if (activeNamespaces.length === 0) {
    console.log(`[VectorStore] ⚠️ No data found for ${classCode} in any namespace variant. Using default: ${candidates[0]}`);
    activeNamespaces.push(candidates[0]);
  }

  // Cache the resolved namespaces so future calls skip describeIndexStats()
  resolvedNamespaceCache[cacheKey] = activeNamespaces;

  const stores = await Promise.all(activeNamespaces.map(async (ns) => {
    if (vectorStoreInstances[ns]) return vectorStoreInstances[ns];
    const store = await PineconeStore.fromExistingIndex(embeddings, {
      pineconeIndex,
      namespace: ns,
    });
    vectorStoreInstances[ns] = store;
    return store;
  }));

  if (stores.length === 1) return stores[0];

  console.log(`[VectorStore] 🌐 Multi-search active across ${activeNamespaces.length} namespaces: ${activeNamespaces.join(', ')}`);
  return new MultiNamespaceStore(stores);
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
 * Clears the namespace resolution cache for a specific class code.
 * Call this when new documents are uploaded to a class.
 */
function invalidateClassCache(classCode) {
  const base = classCode.toLowerCase().replace(/[^a-z0-9]/g, '');
  delete resolvedNamespaceCache[base];
  console.log(`[VectorStore] 🧹 Cache invalidated for class: ${classCode}`);
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
  deleteUserClassEmbeddings,
  invalidateClassCache
};
