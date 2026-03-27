const courseData = [
  "CS 1436: Variables in C++ must be declared before they are used.",
  "CS 1436: A for loop is used when the number of iterations is known.",
  "CS 1436: Arrays are contiguous memory blocks holding elements of the same type.",
  "CS 3345: Time complexity is the number of operations performed for a given input size.",
  "CS 3345: Big-O represents the Upper Bound of an algorithm's running time.",
  "CS 3345: Nested loops running 'n' times result in O(n^2) time complexity.",
  "CS 3345: You need exactly 2 Stacks to implement a Queue.",
  "CS 3345: Linked lists are O(1) for inserting/deleting at the beginning, but O(n) to find the 'nth' element from the end.",
  "CS 3345: Trees are recursive structures. A Binary Search Tree has left children smaller than the parent and right children larger than the parent."
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
