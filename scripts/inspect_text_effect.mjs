import fs from 'node:fs';

const framerCode = fs.readFileSync('public/assets/framer/framer.5HYnILGs.mjs', 'utf8');

const idx = framerCode.indexOf('case`character`:case`line`:');
console.log('Text effect snippet in framer.5HYnILGs.mjs:');
console.log(framerCode.slice(Math.max(0, idx - 200), idx + 500));
