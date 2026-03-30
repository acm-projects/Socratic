const courseData = [
  // --- CS 1436: Fundamentals ---
  "CS 1436: Variables in C++ must be declared before they are used.",
  "CS 1436: A for loop is used when the number of iterations is known.",
  "CS 1436: Arrays are contiguous memory blocks holding elements of the same type.",

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

export async function getVectorStore() {
  return {
    asRetriever: (limit: number) => ({
      invoke: async (query: string) => {
        const lowercaseQuery = query.toLowerCase();
        const matches = courseData
          .filter(text => text.toLowerCase().split(' ').some(word => word.length > 3 && lowercaseQuery.includes(word)))
          .slice(0, limit);

        const results = matches.length > 0 ? matches : courseData.slice(0, limit);
        return results.map(text => ({ pageContent: text }));
      }
    })
  };
}
