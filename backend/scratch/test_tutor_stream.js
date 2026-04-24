/**
 * test_tutor_stream.js
 * Tests the POST /api/tutor/chat/stream SSE endpoint.
 * Run: node backend/scratch/test_tutor_stream.js
 */

const http = require('http');

const BASE_URL = 'http://localhost:5000';
const TEST_USER_ID   = 'cmndnfpv4000ekbuaopj8a773';
const TEST_CLASS     = 'CHEM1203';
const TEST_TOPIC     = 'General Discussion';
const TEST_MESSAGE   = 'What is a mole in chemistry?';

function streamSSERequest(path, body) {
  return new Promise((resolve, reject) => {
    const payload = JSON.stringify(body);
    const options = {
      hostname: 'localhost',
      port: 5000,
      path,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(payload),
        'Accept': 'text/event-stream',
      },
    };

    const events = { metadata: null, chunks: [], done: false, error: null };
    let buffer = '';

    const req = http.request(options, (res) => {
      console.log(`\nHTTP Status: ${res.statusCode}`);
      console.log(`Content-Type: ${res.headers['content-type']}`);

      if (res.statusCode !== 200) {
        let body = '';
        res.on('data', d => body += d);
        res.on('end', () => reject(new Error(`Non-200 status ${res.statusCode}: ${body}`)));
        return;
      }

      res.on('data', (chunk) => {
        buffer += chunk.toString();
        // SSE events are separated by double newlines
        const parts = buffer.split('\n\n');
        buffer = parts.pop(); // keep any incomplete trailing data

        for (const part of parts) {
          const line = part.trim();
          if (!line.startsWith('data: ')) continue;
          try {
            const event = JSON.parse(line.slice(6));
            if (event.type === 'metadata') {
              events.metadata = event;
              console.log(`\n✅ [metadata]  chatId=${event.chatId} | score=${event.score} | isNew=${event.isNewSession}`);
            } else if (event.type === 'chunk') {
              events.chunks.push(event.content);
              process.stdout.write(event.content); // live print tokens
            } else if (event.type === 'done') {
              events.done = true;
              console.log('\n✅ [done]');
            } else if (event.type === 'error') {
              events.error = event.message;
              console.error('\n❌ [error]', event.message);
            }
          } catch (e) {
            // ignore malformed lines
          }
        }
      });

      res.on('end', () => resolve(events));
      res.on('error', reject);
    });

    req.on('error', reject);
    req.write(payload);
    req.end();
  });
}

async function run() {
  console.log('=== Socratic Tutor Stream Test ===');
  console.log(`Endpoint : POST ${BASE_URL}/api/tutor/chat/stream`);
  console.log(`User     : ${TEST_USER_ID}`);
  console.log(`Class    : ${TEST_CLASS}`);
  console.log(`Message  : "${TEST_MESSAGE}"`);
  console.log('');
  console.log('--- Streaming response below ---');

  try {
    const events = await streamSSERequest('/api/tutor/chat/stream', {
      userId:    TEST_USER_ID,
      classCode: TEST_CLASS,
      topic:     TEST_TOPIC,
      message:   TEST_MESSAGE,
    });

    console.log('\n\n=== Results ===');

    // 1. Metadata
    if (events.metadata) {
      console.log(`✅ Metadata received  (chatId=${events.metadata.chatId}, score=${events.metadata.score})`);
    } else {
      console.error('❌ No metadata event received');
    }

    // 2. Chunks
    const fullResponse = events.chunks.join('');
    if (fullResponse.length > 0) {
      console.log(`✅ Received ${events.chunks.length} chunks, ${fullResponse.length} total chars`);
    } else {
      console.error('❌ No content chunks received');
    }

    // 3. Done
    if (events.done) {
      console.log('✅ Stream ended cleanly with [done] event');
    } else {
      console.error('❌ Stream did not receive [done] event');
    }

    // 4. No error
    if (!events.error) {
      console.log('✅ No errors');
    } else {
      console.error(`❌ Error event: ${events.error}`);
    }

    // 5. Verify existing /chat still returns JSON (backward compat check)
    console.log('\n--- Backward compatibility: checking /chat still returns JSON ---');
    const jsonRes = await new Promise((resolve, reject) => {
      const payload = JSON.stringify({
        userId: TEST_USER_ID,
        classCode: TEST_CLASS,
        topic: TEST_TOPIC,
        message: 'What is water made of?',
      });
      const opts = {
        hostname: 'localhost', port: 5000,
        path: '/api/tutor/chat', method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(payload) },
      };
      const req = http.request(opts, (res) => {
        let body = '';
        res.on('data', d => body += d);
        res.on('end', () => {
          try { resolve({ status: res.statusCode, data: JSON.parse(body) }); }
          catch (e) { reject(new Error(`JSON parse failed: ${body}`)); }
        });
      });
      req.on('error', reject);
      req.write(payload);
      req.end();
    });

    if (jsonRes.status === 200 && jsonRes.data.reply) {
      console.log(`✅ /chat still returns JSON (reply length=${jsonRes.data.reply.length})`);
    } else {
      console.error(`❌ /chat returned unexpected response:`, jsonRes);
    }

    console.log('\n🏁 All tests complete.');
  } catch (err) {
    console.error('\n💥 Test failed:', err.message);
  }

  process.exit();
}

run();
