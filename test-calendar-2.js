require('dotenv').config();
const { Pool } = require('pg');
const { google } = require('googleapis');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

async function test() {
  try {
    const res = await pool.query('SELECT * FROM "Account" WHERE provider = $1 LIMIT 1', ['google']);
    const acc = res.rows[0];
    if (!acc) throw new Error("No google account");

    const auth = new google.auth.OAuth2(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET, 'postmessage');
    auth.setCredentials({ access_token: acc.access_token, refresh_token: acc.refresh_token });

    const calendar = google.calendar({ version: 'v3', auth });
    
    // Save mapping
    const savedNames = JSON.stringify({ "testfakemail123321@example.com": "Fake Person Display Name" });

    const eventData = {
      summary: "Test Google Calendar DisplayName 2",
      start: { dateTime: new Date(Date.now() + 3600*1000).toISOString() },
      end: { dateTime: new Date(Date.now() + 7200*1000).toISOString() },
      attendees: [
        { email: "testfakemail123321@example.com" }
      ],
      extendedProperties: {
        private: {
          attendeesNames: savedNames
        }
      }
    };

    const created = await calendar.events.insert({
      calendarId: 'primary',
      resource: eventData
    });

    console.log("Returned Private Props:", created.data.extendedProperties?.private);
    
  } catch(e) {
    console.error(e);
  } finally {
    pool.end();
  }
}

test();
