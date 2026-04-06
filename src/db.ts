import { Pool } from 'pg';
import * as dotenv from 'dotenv';
dotenv.config();

// --- PostgreSQL Connection Pool ---
// ssl: rejectUnauthorized: false is required for AWS RDS which uses self-signed certs.
export const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
  ssl: { rejectUnauthorized: false },
});
