import fs from 'node:fs';

const content = fs.readFileSync('src/sections/about/AllContent.tsx', 'utf8');
const regex = /data-framer-name=["'`]([^"'`]+)["'`]/g;
let match;
const names = [];
while ((match = regex.exec(content)) !== null) {
  names.push(match[1]);
}
console.log('Framer names in AllContent.tsx:');
console.log(names);
