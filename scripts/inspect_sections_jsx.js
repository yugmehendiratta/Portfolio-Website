import fs from 'fs';
const bundle = fs.readFileSync('public/assets/framer/p8d4cIJbhhzOoKynoUz7QFD5AG6-Py0tkGL5Age-idQ.CSuKk7pJ.mjs', 'utf8');

const pStory = bundle.indexOf('"My Story"');
const pWork = bundle.indexOf('"Work"');
const pAwards = bundle.indexOf('"Awards"');

console.log('=== STORY SECTION ===');
console.log(bundle.substring(pStory - 60, pWork - 10));

console.log('=== WORK SECTION ===');
console.log(bundle.substring(pWork - 60, pAwards - 10));

console.log('=== AWARDS SECTION ===');
console.log(bundle.substring(pAwards - 60, pAwards + 2500));
