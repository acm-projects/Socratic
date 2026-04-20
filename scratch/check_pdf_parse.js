const pdf = require('pdf-parse');
console.log('Type of pdf-parse export:', typeof pdf);
console.log('pdf-parse export keys:', Object.keys(pdf || {}));
console.log('pdf-parse export content:', pdf);

