const { google } = require('googleapis');
require('dotenv').config({ path: './backend/.env' });

const code = process.argv[2];

if (!code) {
  console.error("❌ Error: Please provide the authorization code as an argument.");
  console.log("Usage: node scratch/manual_token_exchange.js \"YOUR_CODE_HERE\"");
  process.exit(1);
}

// Ensure secrets are loaded
if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
  console.error("❌ Error: GOOGLE_CLIENT_ID or GOOGLE_CLIENT_SECRET missing from backend/.env");
  process.exit(1);
}

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  'http://localhost:3000'
);

async function exchange() {
  console.log("📡 Exchanging code for tokens...");
  try {
    const { tokens } = await oauth2Client.getToken(code);
    console.log("\n✅ SUCCESS! Here are your tokens:\n");
    console.log(JSON.stringify(tokens, null, 2));
    
    if (tokens.refresh_token) {
      console.log("\n🔑 REFRESH TOKEN FOUND! You can now use this for long-term access.");
    } else {
      console.warn("\n⚠️ WARNING: No refresh token returned. You might need to use 'prompt=consent' in the link.");
    }
  } catch (error) {
    console.error("\n❌ FAILED to exchange code:", error.response ? error.response.data : error.message);
  }
}

exchange();
