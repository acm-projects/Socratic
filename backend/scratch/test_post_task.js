const http = require('http');

async function getRequest(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, data: JSON.parse(body) });
        } catch (e) {
          reject(new Error(`Failed to parse response: ${body}`));
        }
      });
    }).on('error', reject);
  });
}

async function postRequest(url, data) {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url);
    const options = {
      hostname: urlObj.hostname,
      port: urlObj.port,
      path: urlObj.pathname,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(JSON.stringify(data)),
      },
    };

    const req = http.request(options, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, data: JSON.parse(body) });
        } catch (e) {
          reject(new Error(`Failed to parse response: ${body}`));
        }
      });
    });

    req.on('error', reject);
    req.write(JSON.stringify(data));
    req.end();
  });
}

async function testTaskSystem() {
  const userId = 'cmndnfpv4000ekbuaopj8a773'; 
  const BASE_URL = 'http://localhost:5000/api/users';

  try {
    console.log('--- Step 1: Creating a NEW task ---');
    const creationData = {
      class_code: 'CHEM1203',
      task_name: `Manual Test Task ${Date.now()}`,
      due_date: '2026-12-31'
    };
    
    const createRes = await postRequest(`${BASE_URL}/${userId}/tasks`, creationData);
    
    if (createRes.status === 201 && createRes.data.task_name === creationData.task_name) {
      console.log('✅ Success: Task created successfully.');
      var newTaskId = createRes.data.id;
    } else {
      console.error('❌ Failure: Failed to create task.');
      console.log('Response:', createRes.data);
      process.exit(1);
    }

    console.log('\n--- Step 2: Verifying creation in upcoming tasks ---');
    const tasksRes = await getRequest(`${BASE_URL}/${userId}/upcoming-tasks`);
    const foundTask = tasksRes.data.find(t => t.id === newTaskId);
    
    if (foundTask) {
      console.log('✅ Success: New task found in upcoming tasks list.');
    } else {
      console.error('❌ Failure: New task NOT found in upcoming tasks list.');
    }

    console.log('\n--- Step 3: Updating the new task via POST alias ---');
    const updatedName = `Updated via POST alias ${Date.now()}`;
    const updateRes = await postRequest(`${BASE_URL}/${userId}/tasks/${newTaskId}`, {
      task_name: updatedName,
      completed: true
    });

    if (updateRes.status === 200 && updateRes.data.task_name === updatedName) {
      console.log('✅ Success: Task updated correctly via POST alias.');
    } else {
      console.error('❌ Failure: Failed to update task via POST alias.');
    }

    console.log('\n--- Step 4: Final verification ---');
    const finalVerifyRes = await getRequest(`${BASE_URL}/${userId}/upcoming-tasks`);
    const finalTask = finalVerifyRes.data.find(t => t.id === newTaskId);
    if (finalTask && finalTask.task_name === updatedName && finalTask.completed === true) {
      console.log('✅ Success: Final state verified.');
    } else {
      console.error('❌ Failure: Final state verification failed.');
    }

    // Cleanup: We don't have a DELETE route for tasks in userRoutes, 
    // but we can leave it or add one if needed. For now, we'll just end.
    console.log('\nTest completed successfully.');

  } catch (err) {
    console.error('Test failed:', err.message);
  } finally {
    process.exit();
  }
}

testTaskSystem();
