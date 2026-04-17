/**
 * Test: POST /api/syllabus/extract with user_id and class_code
 *
 * This script sends a raw PDF text payload (no actual PDF file needed) to
 * the /extract route and verifies that user_id and class_code are returned
 * in the response and that the AI-extracted courseCode is correctly overridden.
 *
 * Usage:  node scratch/test_syllabus_extract.js
 */

const http = require('http');
const FormData = require('form-data');

// -----------------------------------------------------------------------
// Configuration — change these to match your real data
// -----------------------------------------------------------------------
const HOST    = 'localhost';
const PORT    = 5000;
const USER_ID = 'user_123';
const CLASS_CODE = 'CS-SE-3377';

// Minimal syllabus text that Gemini can parse without an actual PDF
const SYLLABUS_TEXT = `
Number: CS-SE-3377
Title: Object-Oriented Programming
Term: Spring 2026
Instructor: Dr. Jane Doe
Email: jane.doe@utdallas.edu
Office Hours: Monday 2-4pm

Grading:
  Homework: 40%
  Midterm: 30%
  Final: 30%

Schedule:
  Jan 20  - Course Intro
  Feb 10  - Homework 1 Due
  Mar 15  - Midterm Exam
  Apr 28  - Final Project Due
`;

// -----------------------------------------------------------------------
// Build multipart/form-data request (text-only test, no real PDF)
// -----------------------------------------------------------------------
const form = new FormData();
form.append('pdfText',    SYLLABUS_TEXT);
form.append('user_id',   USER_ID);
form.append('class_code', CLASS_CODE);

const options = {
  hostname: HOST,
  port:     PORT,
  path:     '/api/syllabus/extract',
  method:   'POST',
  headers:  form.getHeaders()
};

console.log(`\n📤 POST http://${HOST}:${PORT}/api/syllabus/extract`);
console.log(`   user_id    = ${USER_ID}`);
console.log(`   class_code = ${CLASS_CODE}`);
console.log(`   Using:     pdfText (text-only, no real PDF)\n`);

const req = http.request(options, (res) => {
  let body = '';
  res.on('data', chunk => body += chunk);
  res.on('end', () => {
    console.log('─'.repeat(60));
    console.log(`HTTP Status : ${res.statusCode}`);
    try {
      const parsed = JSON.parse(body);

      // ---------- Assertions ----------
      let pass = true;

      if (parsed.user_id !== USER_ID) {
        console.error(`❌ user_id mismatch: expected "${USER_ID}", got "${parsed.user_id}"`);
        pass = false;
      } else {
        console.log(`✅ user_id correctly returned: ${parsed.user_id}`);
      }

      if (parsed.class_code !== CLASS_CODE) {
        console.error(`❌ class_code mismatch: expected "${CLASS_CODE}", got "${parsed.class_code}"`);
        pass = false;
      } else {
        console.log(`✅ class_code correctly returned: ${parsed.class_code}`);
      }

      if (parsed.data?.courseCode !== CLASS_CODE) {
        console.error(`❌ courseCode override failed: expected "${CLASS_CODE}", got "${parsed.data?.courseCode}"`);
        pass = false;
      } else {
        console.log(`✅ data.courseCode overridden correctly: ${parsed.data?.courseCode}`);
      }

      if (parsed.data?.courseName) {
        console.log(`✅ data.courseName extracted: ${parsed.data.courseName}`);
      }

      console.log('─'.repeat(60));
      if (pass && res.statusCode === 200) {
        console.log('\n🎉 ALL ASSERTIONS PASSED\n');
      } else if (res.statusCode !== 200) {
        console.error('\n💥 Request FAILED — see response below');
        console.log(JSON.stringify(parsed, null, 2));
      } else {
        console.error('\n💥 One or more assertions FAILED\n');
      }
    } catch (_) {
      console.log('Raw response:', body);
    }
    process.exit(res.statusCode === 200 ? 0 : 1);
  });
});

req.on('error', err => {
  console.error('Connection error:', err.message);
  console.error('  → Make sure the server is running on port 5000');
  process.exit(1);
});

form.pipe(req);
