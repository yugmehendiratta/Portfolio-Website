import fs from 'fs';
import path from 'path';

const framerDir = 'public/assets/framer';
const files = fs.readdirSync(framerDir);

for (const file of files) {
  if (!file.endsWith('.mjs') && !file.endsWith('.js')) continue;
  const fullPath = path.join(framerDir, file);
  const content = fs.readFileSync(fullPath, 'utf8');
  const matches = [...new Set(content.match(/https:\/\/framerusercontent\.com\/images\/[^\s\"\'\`]+/g) || [])];
  if (matches.length > 0) {
    console.log(`\n=== File: ${file} ===`);
    matches.forEach(m => console.log('  ', m));
  }
}
