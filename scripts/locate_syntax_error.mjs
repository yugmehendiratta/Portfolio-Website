import fs from 'node:fs';

const code = fs.readFileSync('public/assets/framer/p8d4cIJbhhzOoKynoUz7QFD5AG6-Py0tkGL5Age-idQ.CSuKk7pJ.mjs', 'utf8');

// Let's find "View LinkedIn Post" or "AWARDS & ACHIEVEMENTS"
const idxAwards = code.indexOf('AWARDS & ACHIEVEMENTS');
const idxLinkedIn = code.indexOf('View LinkedIn Post');

console.log('Index of AWARDS & ACHIEVEMENTS:', idxAwards);
console.log('Index of View LinkedIn Post:', idxLinkedIn);

if (idxLinkedIn !== -1) {
  console.log('\n--- SNIPPET AROUND LINKEDIN / AWARDS END (300 chars before and after) ---');
  console.log(code.slice(idxLinkedIn - 100, idxLinkedIn + 400));
}
