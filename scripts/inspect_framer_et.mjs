import fs from 'node:fs';

const framerCode = fs.readFileSync('public/assets/framer/framer.5HYnILGs.mjs', 'utf8');
const match = framerCode.match(/([a-zA-Z0-9_$]+)\s*as\s*Et/);
console.log('Et in framer is:', match ? match[1] : 'not found');
if (match) {
  const def = framerCode.slice(Math.max(0, framerCode.indexOf(`function ${match[1]}`) - 50), framerCode.indexOf(`function ${match[1]}`) + 300);
  console.log('Def:', def);
}
