import { PineconeStore } from '@langchain/pinecone';
import { Pinecone } from '@pinecone-database/pinecone';
import { Embeddings } from '@langchain/core/embeddings';
import { Document } from '@langchain/core/documents';
import * as dotenv from 'dotenv';
dotenv.config();

//stored locally using Xenova/bge-small-en-v1.5 (ONNX, 384-dim, no API key).
//stored in pinecone (socratic-tutor, 384-dim cosine index).

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


class LocalEmbeddings extends Embeddings { //embed the documents locally
  private pipe: any = null; //feed the documents to the model

  constructor() { super({}); } //constructor

  private async getPipeline() { //get model to embed the documents
    if (!this.pipe) { //if the model is not loaded, load it
      const { pipeline, env } = await import('@xenova/transformers'); //import pipeline and env
      env.allowLocalModels = false; //allow local models
      this.pipe = await pipeline('feature-extraction', 'Xenova/bge-small-en-v1.5'); //load the model
    }
    return this.pipe;
  }

  async embedDocuments(documents: string[]): Promise<number[][]> {
    const pipe = await this.getPipeline();
    const results: number[][] = [];
    for (const text of documents) {
      const output = await pipe(text, { pooling: 'mean', normalize: true });
      // output is a Tensor with a flat .data Float32Array (384-dim)
      results.push(Array.from(output.data as Float32Array) as number[]);
    }
    return results;
  }

  async embedQuery(document: string): Promise<number[]> {
    const pipe = await this.getPipeline();
    const output = await pipe(document, { pooling: 'mean', normalize: true });
    // output is a Tensor with a flat .data Float32Array (384-dim)
    return Array.from(output.data as Float32Array) as number[];
  }
}

// Singleton — only initialize once per process run
let vectorStoreInstance: PineconeStore | null = null;

export async function getVectorStore(): Promise<PineconeStore> {
  if (vectorStoreInstance) return vectorStoreInstance;

  const pinecone = new Pinecone({ apiKey: process.env.PINECONE_API_KEY! });
  const indexName = process.env.PINECONE_INDEX || 'socratic-tutor';

  // Wait for the Pinecone index to be ready (handles cold-start after creation)
  let ready = false;
  for (let i = 0; i < 10; i++) {
    const desc = await pinecone.describeIndex(indexName);
    if (desc.status?.ready) { ready = true; break; }
    console.log('[VectorStore] Waiting for Pinecone index to be ready...');
    await new Promise(res => setTimeout(res, 3000));
  }
  if (!ready) throw new Error('Pinecone index not ready after 30 seconds.');

  const pineconeIndex = pinecone.Index(indexName);
  const embeddings = new LocalEmbeddings();

  // Create the store instance — this does NOT hit the network for embeddings
  vectorStoreInstance = await PineconeStore.fromExistingIndex(embeddings, { pineconeIndex });

  // Seed index if empty
  const stats = await pineconeIndex.describeIndexStats();
  const totalVectors = stats.totalRecordCount ?? 0;

  if (totalVectors === 0) {
    console.log('[VectorStore] Index is empty — embedding course data locally with ONNX...');
    // @langchain/pinecone v1 calls upsert(array) but Pinecone SDK v7 requires upsert({ records: [] })
    // so we bypass addDocuments and upsert directly via the raw SDK.
    const vectors = await embeddings.embedDocuments(courseData);
    const records = courseData.map((text, i) => ({
      id: `course-${i}`,
      values: vectors[i],
      metadata: { text, source: 'course-data', chunk: i },
    }));
    // Upsert in batches of 100
    const batchSize = 100;
    for (let i = 0; i < records.length; i += batchSize) {
      await pineconeIndex.upsert({ records: records.slice(i, i + batchSize) });
    }
    console.log(`[VectorStore] Seeded ${courseData.length} vectors into Pinecone.`);
  } else {
    console.log(`[VectorStore] Found ${totalVectors} existing vectors in Pinecone — skipping seed.`);
  }

  return vectorStoreInstance;
}
