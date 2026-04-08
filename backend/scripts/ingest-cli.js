const readline = require('readline');
const path = require('path');
const fs = require('fs');
const { ingestDocuments, getNamespaceStats } = require('../services/ingestService');
require('dotenv').config({ path: __dirname + '/../.env' });

const terminal = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function ask(question) {
  return new Promise(resolve => terminal.question(question, resolve));
}

function chooseDocType(input) {
  const map = { '1': 'syllabus', '2': 'textbook', '3': 'notes', '4': 'document' };
  return map[input.trim()] || 'document';
}

async function run() {
  console.log('\n========================================');
  console.log('  📚 Socratic PDF Ingestion Tool (CLI)  ');
  console.log('========================================\n');

  const classCode = await ask('Class code (e.g. CS 1436): ');
  if (!classCode.trim()) { console.log('Class code required.'); process.exit(1); }

  // Show current stats before ingestion
  try {
    const stats = await getNamespaceStats(classCode.trim());
    console.log(`\n[Status] Current vectors in namespace '${stats.namespace}': ${stats.vectorCount}\n`);
  } catch (e) {
    console.log('[Status] Could not fetch namespace stats:', e.message);
  }

  console.log('Document type:');
  console.log('  1) Syllabus');
  console.log('  2) Textbook');
  console.log('  3) Lecture Notes');
  console.log('  4) Other Document');
  const typeChoice = await ask('Choose [1-4]: ');
  const docType = chooseDocType(typeChoice);

  console.log('\nEnter the path(s) to your PDF file(s).');
  console.log('You can enter multiple paths separated by commas.');
  const rawPaths = await ask('PDF path(s): ');

  const filePaths = rawPaths.split(',').map(p => p.trim()).filter(Boolean);

  const validFiles = [];
  for (const fp of filePaths) {
    const resolved = path.resolve(fp);
    if (!fs.existsSync(resolved)) {
      console.warn(`⚠️  File not found, skipping: ${resolved}`);
    } else if (!fp.toLowerCase().endsWith('.pdf')) {
      console.warn(`⚠️  Not a PDF, skipping: ${resolved}`);
    } else {
      validFiles.push({ filePath: resolved, s3Url: '' });
      console.log(`  ✔ ${resolved}`);
    }
  }

  if (validFiles.length === 0) {
    console.log('\n❌ No valid PDF files found. Exiting.');
    terminal.close();
    process.exit(1);
  }

  const confirm = await ask(`\nIngest ${validFiles.length} file(s) into class '${classCode}' as '${docType}'? (y/n): `);
  if (!confirm.trim().toLowerCase().startsWith('y')) {
    console.log('Cancelled.');
    terminal.close();
    process.exit(0);
  }

  console.log('\n🔄 Starting ingestion...\n');

  try {
    const { totalIngested, namespace } = await ingestDocuments(validFiles, classCode.trim(), docType);
    console.log(`\n✅ Done! Ingested ${totalIngested} vectors into Pinecone namespace '${namespace}'.`);
    console.log(`   The AI tutor will now use these documents for RAG when students study ${classCode}.`);
  } catch (err) {
    console.error('\n❌ Ingestion failed:', err.message);
  }

  terminal.close();
  process.exit(0);
}

run();
