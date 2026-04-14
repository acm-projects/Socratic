/**
 * Manual Google Token Refresh Script
 *
 * Use this to refresh a team member's Google OAuth tokens in the DB
 * when their refresh_token has expired (invalid_grant error).
 *
 * STEP 1 — Get auth URL:
 *   node scratch/refresh_user_token.js url snigdhahy3@gmail.com
 *
 * STEP 2 — Visit the URL, authorize, paste the code:
 *   node scratch/refresh_user_token.js save snigdhahy3@gmail.com <PASTE_CODE_HERE>
 */

require('dotenv').config({ path: './backend/.env' });
const { google } = require('googleapis');
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  'http://localhost:3000/api/auth/callback/google' // Using a known authorized redirect URI
);

const SCOPES = [
  'https://www.googleapis.com/auth/calendar',
  'https://www.googleapis.com/auth/userinfo.email',
  'https://www.googleapis.com/auth/userinfo.profile'
];

const [,, command, email, code] = process.argv;

async function getUrl() {
  const url = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    prompt: 'consent',         // forces a fresh refresh_token to be issued
    scope: SCOPES,
    login_hint: email          // prefills the account selector with her email
  });
  console.log(`\n📋 Send this URL to ${email} (or visit it yourself if you have access):\n`);
  console.log(url);
  console.log(`\nOnce they authorize, they'll see a code. Run:\n`);
  console.log(`  node scratch/refresh_user_token.js save ${email} <CODE>\n`);
  await pool.end();
}

async function saveTokens() {
  if (!code) {
    console.error('❌ Missing code argument');
    console.error(`Usage: node scratch/refresh_user_token.js save ${email} <CODE>`);
    process.exit(1);
  }

  // 1. Exchange code for tokens
  console.log(`\n🔄 Exchanging code for tokens...`);
  const { tokens } = await oauth2Client.getToken(code);

  if (!tokens.refresh_token) {
    console.error('❌ No refresh_token in response. Make sure the URL used prompt=consent.');
    process.exit(1);
  }

  // 2. Get the user's Google profile to find their providerAccountId
  oauth2Client.setCredentials(tokens);
  const oauth2 = google.oauth2({ version: 'v2', auth: oauth2Client });
  const { data: profile } = await oauth2.userinfo.get();
  console.log(`✅ Got tokens for: ${profile.email} (sub: ${profile.id})`);

  // 3. Look up the Account row
  const existing = await pool.query(
    'SELECT * FROM "Account" WHERE "providerAccountId" = $1 AND provider = $2',
    [profile.id, 'google']
  );

  if (!existing.rows[0]) {
    console.error(`❌ No Account row found for providerAccountId=${profile.id}`);
    console.error('Their account may not exist yet. They need to sign in through the app first.');
    await pool.end(); process.exit(1);
  }

  // 4. Update the tokens
  await pool.query(
    'UPDATE "Account" SET access_token = $1, refresh_token = $2 WHERE "providerAccountId" = $3 AND provider = $4',
    [tokens.access_token, tokens.refresh_token, profile.id, 'google']
  );

  console.log(`\n✅ Tokens successfully updated in DB for ${profile.email}`);
  console.log(`   userId: ${existing.rows[0].userId}`);
  console.log(`   providerAccountId: ${profile.id}`);
  console.log(`   access_token: ${tokens.access_token?.substring(0, 20)}...`);
  console.log(`   refresh_token: ${tokens.refresh_token?.substring(0, 20)}...\n`);

  await pool.end();
}

if (command === 'url') {
  getUrl().catch(err => { console.error(err); process.exit(1); });
} else if (command === 'save') {
  saveTokens().catch(err => { console.error(err.message); process.exit(1); });
} else {
  console.log(`\nUsage:`);
  console.log(`  Step 1: node scratch/refresh_user_token.js url <email>`);
  console.log(`  Step 2: node scratch/refresh_user_token.js save <email> <code>\n`);
  process.exit(0);
}
