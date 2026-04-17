const http = require('http');

async function putRequest(url, data) {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url);
    const options = {
      hostname: urlObj.hostname,
      port: urlObj.port,
      path: urlObj.pathname,
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(JSON.stringify(data)),
      },
    };

    const req = http.request(options, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => resolve({ status: res.statusCode, data: JSON.parse(body) }));
    });
    req.on('error', reject);
    req.write(JSON.stringify(data));
    req.end();
  });
}

async function getRequest(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => resolve({ status: res.statusCode, data: JSON.parse(body) }));
    }).on('error', reject);
  });
}

(async () => {
  const userId = 'user_test_api_v1';
  const dummyPic = 'https://dummyimage.com/600x400/000/fff&text=TEST+PIC';
  console.log(`Setting image for ${userId} to ${dummyPic}...`);
  
  // Try server.js endpoint
  const res1 = await putRequest(`http://localhost:5000/users/${userId}`, {
    email: 'test@example.com',
    image: dummyPic,
    first_name: 'API Test'
  });
  console.log('PUT /users/:id full response:', JSON.stringify(res1.data));

  // Read it back
  const res2 = await getRequest(`http://localhost:5000/users/${userId}`);
  console.log('GET /users/:id image:', res2.data.image);
  
  process.exit(0);
})();
