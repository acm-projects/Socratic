const { createClass } = require('../models/classModel');
const db = require('../db');

async function testSuffixConflict() {
  console.log("--- Testing suffix conflict stability ---");
  
  // 1. Create a class for User A
  await db.query("DELETE FROM classes WHERE class_code LIKE 'CONFLICT%'");
  await createClass({
    class_code: "CONFLICT101",
    subject: "TEST",
    name: "User A Class",
    user_id: "user-a"
  });
  console.log("Created CONFLICT101 for user-a");

  // 2. Call createClass for null user (should get scoped)
  const res1 = await createClass({
    class_code: "CONFLICT101",
    subject: "TEST",
    name: "Null User Class",
    user_id: null
  });
  console.log("Call 1 (null user) result:", res1.class_code);

  // 3. Call createClass again for null user (should get the SAME scoped)
  const res2 = await createClass({
    class_code: "CONFLICT101",
    subject: "TEST",
    name: "Null User Class",
    user_id: null
  });
  console.log("Call 2 (null user) result:", res2.class_code);

  if (res1.class_code !== res2.class_code) {
    console.error("FAIL: Suffix changes every time for null user when conflict exists!");
  } else {
    console.log("PASS: Suffix is stable even on conflict.");
  }
  
  process.exit(0);
}

testSuffixConflict();
