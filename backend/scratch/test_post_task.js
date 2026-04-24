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

async function testPostTask() {
  const userId = 'cmndnfpv4000ekbuaopj8a773'; 
  const BASE_URL = 'http://localhost:5000/api/users';

  try {
    console.log('--- Step 1: Fetching an existing task ---');
    const tasksRes = await getRequest(`${BASE_URL}/${userId}/upcoming-tasks`);
    
    if (tasksRes.data.length === 0) {
      console.log('Test aborted: No tasks found for this user. Please ensure tasks exist.');
      process.exit();
    }

    const firstTask = tasksRes.data[0];
    const taskId = firstTask.id;
    const originalName = firstTask.task_name;
    const originalCompleted = firstTask.completed;

    console.log(`Testing with Task ID: ${taskId}`);
    console.log(`Original Name: ${originalName}`);

    console.log('\n--- Step 2: Updating task via POST ---');
    const testName = `Updated via POST at ${new Date().toLocaleTimeString()}`;
    const updateRes = await postRequest(`${BASE_URL}/${userId}/tasks/${taskId}`, {
      task_name: testName,
      completed: !originalCompleted
    });

    if (updateRes.status === 200 && updateRes.data.task_name === testName) {
      console.log('✅ Success: Task updated correctly via POST.');
    } else {
      console.error('❌ Failure: Failed to update task via POST.');
      console.log('Response Status:', updateRes.status);
      console.log('Response Data:', updateRes.data);
    }

    console.log('\n--- Step 3: Verifying the update ---');
    const verifyRes = await getRequest(`${BASE_URL}/${userId}/upcoming-tasks`);
    const updatedTask = verifyRes.data.find(t => t.id === taskId);
    if (updatedTask && updatedTask.task_name === testName) {
      console.log('✅ Success: Update verified in upcoming tasks list.');
    } else {
      console.error('❌ Failure: Update not reflected in tasks list.');
    }

    console.log('\n--- Step 4: Reverting changes ---');
    await postRequest(`${BASE_URL}/${userId}/tasks/${taskId}`, {
      task_name: originalName,
      completed: originalCompleted
    });
    console.log('Changes reverted.');

  } catch (err) {
    console.error('Test failed:', err.message);
  } finally {
    process.exit();
  }
}

testPostTask();
