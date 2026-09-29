import fs from 'node:fs';

const framerCode = fs.readFileSync('public/assets/framer/framer.5HYnILGs.mjs', 'utf8');

const idx = framerCode.indexOf('qb=(e,t,n)=>');
console.log('qb in framer.5HYnILGs.mjs:');
console.log(framerCode.slice(idx, idx + 400));
