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

async function testSocialImages() {
  const userId = 'user_123'; // User with friends found in DB
  const SOCIALS_URL = `http://localhost:5000/api/friends/user/${userId}`;

  try {
    console.log(`--- Step 1: Fetching friends for user ${userId} ---`);
    const friendsRes = await getRequest(SOCIALS_URL);
    
    if (friendsRes.data.length > 0) {
      const firstFriend = friendsRes.data[0];
      console.log('Sample Friend Object:', JSON.stringify(firstFriend, null, 2));

      if (firstFriend.hasOwnProperty('image')) {
        console.log('✅ Success: Friend object contains the "image" field.');
      } else {
        console.error('❌ Failure: Friend object is missing the "image" field.');
      }
    } else {
      console.log('Test warning: No friends found for this user. Cannot verify image exposure.');
    }

  } catch (err) {
    console.error('Test failed:', err.message);
  } finally {
    process.exit();
  }
}

testSocialImages();
