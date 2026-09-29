import fs from 'node:fs';
import path from 'node:path';

const dir = 'public/assets/framer';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.mjs'));

for (const f of files) {
  const code = fs.readFileSync(path.join(dir, f), 'utf8');
  if (code.includes('"Arrow"') || code.includes('`Arrow`')) {
    console.log(`\nFound Arrow in ${f}:`);
    const matches = Array.from(code.matchAll(/([_ao])\(([A-Za-z0-9_$]+),\{[^}]*"Arrow"[^}]*\}\)/g));
    matches.forEach(m => console.log(' ', m[0].slice(0, 150)));
  }
}
