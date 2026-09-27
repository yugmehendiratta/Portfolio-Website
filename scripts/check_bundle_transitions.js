import fs from 'fs';
const bundle = fs.readFileSync('public/assets/framer/p8d4cIJbhhzOoKynoUz7QFD5AG6-Py0tkGL5Age-idQ.CSuKk7pJ.mjs', 'utf8');

const pBio = bundle.indexOf('className:`framer-1q34n9d`');
const pStory = bundle.indexOf('className:`framer-14jsokh`');
const pWork = bundle.indexOf('className:`framer-o05pe9`');
const pAwards = bundle.indexOf('className: "framer-o05pe9"');

console.log('pBio:', pBio, 'pStory:', pStory, 'pWork:', pWork, 'pAwards:', pAwards);

console.log('--- Transition around Story -> Work ---');
console.log(bundle.substring(pWork - 150, pWork + 150));
