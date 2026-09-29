import fs from 'node:fs';

const code = fs.readFileSync('public/assets/framer/script_main.B4-njmYi.mjs', 'utf8');

const idx = code.indexOf('function ty(');
console.log('ty definition:');
console.log(code.slice(idx, idx + 1000));
