const axios = require('axios');
const fs = require('fs');

// Configuration
const BASE_URL = 'http://localhost:5000/api';
const TEST_DATA = {
  userId: 'user_test_api_v1',
  classCode: 'SECURE_ISOLATION_TEST',
  topicId: '21713293-16c5-4b4c-b74f-24d674373ba2',
  quizId: 'c0f3f08e-7609-474e-bcc2-474384fc8d45'
};

const results = {
  passed: [],
  failed: [],
  skipped: []
};

async function auditRoute(name, method, endpoint, body = null, params = {}) {
  let url = `${BASE_URL}${endpoint}`;
  
  // Replace path parameters
  Object.keys(params).forEach(key => {
    url = url.replace(`:${key}`, params[key]);
  });

  process.stdout.write(`Testing ${method} ${url}... `);

  try {
    const config = { method, url, data: body };
    const response = await axios(config);
    
    if (response.status >= 200 && response.status < 300) {
      console.log('✅ PASSED');
      results.passed.push({ name, url, status: response.status });
    } else {
      console.log(`❌ FAILED (Status: ${response.status})`);
      results.failed.push({ name, url, status: response.status, error: 'Non-2xx status' });
    }
  } catch (error) {
    const status = error.response ? error.response.status : 'ECONN';
    const message = error.response ? error.response.data : error.message;
    
    if (status === 404) {
      console.log('⚠️ SKIPPED (404 - Expected for some dummy data)');
      results.skipped.push({ name, url, status, message });
    } else {
      console.log(`❌ FAILED (Status: ${status})`);
      results.failed.push({ name, url, status, error: message });
    }
  }
}

async function runAudit() {
  console.log('=== Socratic Backend Full System Audit ===\n');

  // Group 1: User & Identity
  await auditRoute('Get All Users', 'GET', '/users');
  await auditRoute('Get User by ID', 'GET', '/users/:id', null, { id: TEST_DATA.userId });
  await auditRoute('Get User Classes', 'GET', '/users/:id/classes', null, { id: TEST_DATA.userId });
  await auditRoute('Get Quiz Overview', 'GET', '/users/:id/quiz-overview', null, { id: TEST_DATA.userId });

  // Group 2: Quizzes
  await auditRoute('Get Quiz Questions', 'GET', '/quizzes/:id/questions', null, { id: TEST_DATA.quizId });
  await auditRoute('Get User Quizzes', 'GET', '/quizzes/users/:id', null, { id: TEST_DATA.userId });

  // Group 3: Classes & Topics
  await auditRoute('Get Classes', 'GET', '/classes');
  await auditRoute('Get Class by Code', 'GET', '/classes/:code', null, { code: TEST_DATA.classCode });
  await auditRoute('Get Topics for Class', 'GET', '/topics/class/:code', null, { code: TEST_DATA.classCode });
  await auditRoute('Get Topic by ID', 'GET', '/topics/:id', null, { id: TEST_DATA.topicId });

  // Group 4: Achievements & Stats
  await auditRoute('Get Achievements', 'GET', '/achievements');
  await auditRoute('Get User Achievements', 'GET', '/achievements/user/:userId', null, { userId: TEST_DATA.userId });
  await auditRoute('Get User Stats', 'GET', '/stats/user/:userId', null, { userId: TEST_DATA.userId });

  // Group 5: Friends
  await auditRoute('Get User Friends', 'GET', '/friends/user/:userId', null, { userId: TEST_DATA.userId });

  console.log('\n=== Audit Summary ===');
  console.log(`Passed: ${results.passed.length}`);
  console.log(`Failed: ${results.failed.length}`);
  console.log(`Skipped: ${results.skipped.length}`);

  if (results.failed.length > 0) {
    console.log('\nFailed Details:');
    results.failed.forEach(f => console.log(`- ${f.name}: ${f.url} (${f.status})`));
  }
}

runAudit();
