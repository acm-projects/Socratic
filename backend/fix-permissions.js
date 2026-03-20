require('dotenv').config()
const { Client } = require('pg')

console.log("Starting...")
console.log("Connecting to:", process.env.DATABASE_URL)

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
})
async function fixPermissions() {
  try {
    console.log("Attempting connection...")
    await client.connect()
    console.log("Connected!")
    
    await client.query(`GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO postgres;`)
    console.log("Tables granted!")
    await client.query(`GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO postgres;`)
    console.log("Sequences granted!")
    await client.query(`GRANT USAGE ON SCHEMA public TO postgres;`)
    console.log("Usage granted!")
    
    await client.end()
    console.log("Done!")
  } catch (err) {
    console.error("ERROR:", err.message)
  }
}

fixPermissions()