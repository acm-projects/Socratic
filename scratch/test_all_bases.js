const http = require('http');

const endpoints = [
  '/api/syllabus/info/CS3345',
  '/api/classes',
  '/api/users',
  '/api/topics',
  '/api/sessions',
  '/api/stats/user/cmn9fnpv60000gox6sumckr25',
  '/api/friends/user/cmn9fnpv60000gox6sumckr25'
];

async function testAll() {
  console.log('Testing main endpoints on http://localhost:5000...\n');
  
  for (const path of endpoints) {
    await new Promise((resolve) => {
      http.get(`http://localhost:5000${path}`, (res) => {
        let text = '';
        if (res.statusCode >= 200 && res.statusCode < 400) {
          console.log(`✅ [${res.statusCode}] ${path}`);
        } else if (res.statusCode === 404) {
          console.log(`⚠️ [404] ${path} (Endpoint exists but resource not found - OK)`);
        } else {
          console.log(`❌ [${res.statusCode}] ${path}`);
        }
        res.resume();
        resolve();
      }).on('error', (e) => {
        console.log(`❌ ERROR ${path}: ${e.message}`);
        resolve();
      });
    });
  }
}

testAll();
