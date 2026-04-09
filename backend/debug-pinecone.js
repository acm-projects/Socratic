const { Pinecone } = require('@pinecone-database/pinecone');
require('dotenv').config({ path: __dirname + '/.env' });

async function debugPage() {
    const classCode = "CS 3345";
    const namespace = `class-${classCode.toLowerCase().replace(/\s/g, '')}`;
    
    try {
        const pinecone = new Pinecone({ apiKey: process.env.PINECONE_API_KEY });
        const index = pinecone.Index(process.env.PINECONE_INDEX || 'socratic-tutor').namespace(namespace);
        
        console.log(`\n🔍 DEEP PROBE: Reading Page 19 for ${namespace}...`);
        
        // We'll search specifically for the metadata field
        const queryRes = await index.query({
            vector: new Array(3072).fill(0),
            topK: 100,
            includeMetadata: true,
            filter: { pageNumber: { "$eq": 19 } }
        });

        if (queryRes.matches && queryRes.matches.length > 0) {
            queryRes.matches.forEach(match => {
                console.log(`\n📄 [PAGE 19 FOUND]`);
                console.log(`   Source: ${match.metadata.fileName}`);
                console.log(`   Text Content: \n"${match.metadata.text.substring(0, 1000)}..."`);
            });
        } else {
            console.log("❌ ERROR: Page 19 metadata exists according to audit, but was not found in filtered query.");
        }
    } catch (err) {
        console.error("❌ Debug failed:", err.message);
    }
}

debugPage();
