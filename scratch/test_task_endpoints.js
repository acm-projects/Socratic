const http = require('http');

async function getRequest(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => resolve({ status: res.statusCode, data: JSON.parse(body || '{}') }));
    }).on('error', reject);
  });
}

async function patchRequest(url, data) {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url);
    const options = {
      hostname: urlObj.hostname,
      port: urlObj.port,
      path: urlObj.pathname,
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const req = http.request(options, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => resolve({ status: res.statusCode, data: JSON.parse(body || '{}') }));
    });
    req.on('error', reject);
    req.write(JSON.stringify(data));
    req.end();
  });
}

(async () => {
  const userId = '101581076193018787027'; // User's google ID
  const testUserId = 'user_test_api_v1';   // Local API test user
  const classCode = 'CS3341'; // Class with 14 tasks

  console.log("=== Socratic Tasks API Test ===\n");

  console.log(`[1] Testing GET /api/syllabus/tasks/${classCode}...`);
  const sylTasks = await getRequest(`http://localhost:5000/api/syllabus/tasks/${classCode}`);
  console.log(`   Status: ${sylTasks.status}`);
  console.log(`   Data length: ${sylTasks.data.length || 0}`);
  if (sylTasks.status !== 200) console.log("   ❌ FAILED");

  console.log(`\n[2] Testing GET /api/users/${testUserId}/upcoming-tasks...`);
  const apiTasks = await getRequest(`http://localhost:5000/api/users/${testUserId}/upcoming-tasks`);
  console.log(`   Status: ${apiTasks.status}`);
  console.log(`   Data length: ${apiTasks.data.length || 0}`);
  if (apiTasks.status !== 200) console.log("   ❌ FAILED");

  console.log(`\n[3] Testing GET /users/${testUserId}/upcoming-tasks (legacy)...`);
  const legacyTasks = await getRequest(`http://localhost:5000/users/${testUserId}/upcoming-tasks`);
  console.log(`   Status: ${legacyTasks.status}`);
  console.log(`   Data length: ${legacyTasks.data.length || 0}`);
  if (legacyTasks.status !== 200) console.log("   ❌ FAILED");

  if (apiTasks.data.length > 0) {
    const taskToToggle = apiTasks.data[0];
    const newStatus = !taskToToggle.completed;
    
    console.log(`\n[4] Testing PATCH /api/users/${testUserId}/tasks/${taskToToggle.id}...`);
    const patchApi = await patchRequest(`http://localhost:5000/api/users/${testUserId}/tasks/${taskToToggle.id}`, { completed: newStatus });
    console.log(`   Status: ${patchApi.status}`);
    console.log(`   Result completed: ${patchApi.data.completed}`);
    
    console.log(`\n[5] Testing PATCH /users/${testUserId}/tasks/${taskToToggle.id} (legacy)...`);
    const patchLegacy = await patchRequest(`http://localhost:5000/users/${testUserId}/tasks/${taskToToggle.id}`, { completed: !newStatus });
    console.log(`   Status: ${patchLegacy.status}`);
    console.log(`   Result completed: ${patchLegacy.data.completed}`);
  } else {
    console.log(`\n⚠️ Skipping PATCH testing because user ${testUserId} has no tasks configured in test environment.`);
  }

  // Check the Google user who complained
  console.log(`\n[Diagnosis] Testing GET /users/${userId}/upcoming-tasks (User complaining)...`);
  const complaintLegacy = await getRequest(`http://localhost:5000/users/${userId}/upcoming-tasks`);
  console.log(`   Status: ${complaintLegacy.status}`);
  console.log(`   Data length: ${complaintLegacy.data.length || 0}`);

  process.exit(0);
})();
