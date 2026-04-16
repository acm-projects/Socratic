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
          reject(new Error(`Failed to parse response from ${url}: ${body.substring(0, 100)}`));
        }
      });
    }).on('error', reject);
  });
}

async function testFinalUnification() {
  const userId = 'user_123';
  const apiUserId = 'user_test_api_v1';
  const BASE_URL = 'http://localhost:5000';

  try {
    console.log('--- Step 1: Testing legacy social route (/users/:id/friends) ---');
    const legacyFriends = await getRequest(`${BASE_URL}/users/${userId}/friends`);
    if (legacyFriends.data.length > 0 && legacyFriends.data[0].hasOwnProperty('image')) {
      console.log('✅ Success: Legacy friends route contains "image".');
    } else {
      console.error('❌ Failure: Legacy friends route missing "image".');
    }

    console.log('\n--- Step 2: Testing Shared Classes route ---');
    const sharedRes = await getRequest(`${BASE_URL}/users/${userId}/friends/shared-classes`);
    if (sharedRes.data.length > 0 && sharedRes.data[0].hasOwnProperty('image')) {
      console.log('✅ Success: Shared classes route contains "image".');
    }

    console.log('\n--- Step 3: Testing Task naming (/api/users/:id/upcoming-tasks) ---');
    const tasksRes = await getRequest(`${BASE_URL}/api/users/${apiUserId}/upcoming-tasks`);
    if (tasksRes.data.length > 0) {
      const task = tasksRes.data[0];
      if (task.hasOwnProperty('completed') && task.hasOwnProperty('is_completed')) {
        console.log('✅ Success: Task has both "completed" and "is_completed".');
      } else {
        console.error('❌ Failure: Task missing completion aliases.');
      }
    }

  } catch (err) {
    console.error('Final verification failed:', err.message);
  } finally {
    process.exit();
  }
}

testFinalUnification();
