import fs from 'node:fs';
import path from 'node:path';

const dir = 'public/assets/framer';
const results = {};

for (const f of fs.readdirSync(dir)) {
  if (f.endsWith('.mjs') || f.endsWith('.js')) {
    const content = fs.readFileSync(path.join(dir, f), 'utf8');
    const regex = /https:\/\/framerusercontent\.com\/images\/[^`"'\s\)]+/g;
    let match;
    while ((match = regex.exec(content)) !== null) {
      if (!results[f]) results[f] = new Set();
      results[f].add(match[0]);
    }
  }
}

for (const [file, urls] of Object.entries(results)) {
  console.log(`=== ${file} ===`);
  for (const url of urls) {
    console.log(`  ${url}`);
  }
}
