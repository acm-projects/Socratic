import * as dotenv from 'dotenv';
import { Pinecone } from '@pinecone-database/pinecone';

dotenv.config();

async function seedPinecone() {
  console.log('Seeding pinecone not fully implemented in automatic recovery.');
  console.log('Use src/lib/vectorstore.ts functions to interact with Pinecone.');
  process.exit(0);
}

seedPinecone();
