import fs from 'fs';

const bundle = fs.readFileSync('public/assets/framer/p8d4cIJbhhzOoKynoUz7QFD5AG6-Py0tkGL5Age-idQ.CSuKk7pJ.mjs', 'utf8');

// Find all css template literals or arrays
// Usually css strings start with `.framer-` or `@`
const cssStrings = [];
const regex = /`([^`]*\.framer-[^`]*)`/g;
let m;
while ((m = regex.exec(bundle)) !== null) {
  cssStrings.push(m[1]);
}

console.log(`Found ${cssStrings.length} css string chunks.`);

// Dump all selectors and their rules
for (const str of cssStrings) {
  const lines = str.split('\n');
  for (const line of lines) {
    if (line.includes('.framer-14jsokh') || line.includes('.framer-o05pe9') || line.includes('.framer-1q34n9d') || line.includes('.framer-foyt4c') || line.includes('.framer-1h8izsz') || line.includes('.framer-ixsok6') || line.includes('.framer-1y1mzru') || line.includes('.framer-1ql5gwc') || line.includes('.framer-me803a')) {
      console.log(line.trim());
    }
  }
}
