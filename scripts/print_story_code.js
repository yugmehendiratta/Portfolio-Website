import fs from 'fs';
const bundle = fs.readFileSync('public/assets/framer/p8d4cIJbhhzOoKynoUz7QFD5AG6-Py0tkGL5Age-idQ.CSuKk7pJ.mjs', 'utf8');

let pStory = bundle.indexOf('My Story');
let pWork = bundle.indexOf('Work', pStory);

console.log('=== STORY SECTION CODE ===');
console.log(bundle.substring(pStory - 50, pWork - 10));
