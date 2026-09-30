import fs from 'node:fs';

const code = fs.readFileSync('public/assets/framer/p8d4cIJbhhzOoKynoUz7QFD5AG6-Py0tkGL5Age-idQ.CSuKk7pJ.mjs', 'utf8');

const regex = /`([^`]*(?:1ukjnmv|qu7yco|rmz83s|1u3qm76)[^`]*)`/g;
let match;
while ((match = regex.exec(code)) !== null) {
  console.log('=== MATCH ===');
  console.log(match[1]);
}
