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

async function testTaskLogic() {
  const userId = 'user_test_api_v1'; 
  const BASE_URL = 'http://localhost:5000/api/users';

  try {
    console.log('--- Step 1: Fetching all upcoming tasks ---');
    const tasksRes = await getRequest(`${BASE_URL}/${userId}/upcoming-tasks`);
    console.log(`Found ${tasksRes.data.length} tasks.`);
    
    if (tasksRes.data.length > 0) {
      const firstTask = tasksRes.data[0];
      console.log('Sample Task:', JSON.stringify(firstTask, null, 2));

      if (firstTask.hasOwnProperty('completed')) {
        console.log('✅ Success: Task has the "completed" field.');
      } else {
        console.error('❌ Failure: Task is missing the "completed" field.');
      }

      console.log('\n--- Step 2: Toggling task completion ---');
      const toggleRes = await patchRequest(`${BASE_URL}/${userId}/tasks/${firstTask.id}`, { completed: true });
      
      if (toggleRes.status === 200 && toggleRes.data.completed === true) {
        console.log('✅ Success: Task status updated to true.');
      } else {
        console.error('❌ Failure: Failed to update task status.');
        console.log('Response:', toggleRes.data);
      }

      console.log('\n--- Step 3: Toggling back to incomplete ---');
      const toggleBackRes = await patchRequest(`${BASE_URL}/${userId}/tasks/${firstTask.id}`, { completed: false });
      if (toggleBackRes.data.completed === false) {
        console.log('✅ Success: Task status reverted correctly.');
      }
    } else {
      console.log('Test warning: No tasks found for this user. Ensure tasks exist for due_date >= CURRENT_DATE.');
    }

  } catch (err) {
    console.error('Test failed:', err.message);
  } finally {
    process.exit();
  }
}

testTaskLogic();
