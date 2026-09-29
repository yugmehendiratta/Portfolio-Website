import fs from 'node:fs';
import path from 'node:path';

const dir = 'public/assets/framer';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.mjs') || f.endsWith('.js'));

for (const f of files) {
  const code = fs.readFileSync(path.join(dir, f), 'utf8');
  if (code.includes('framer-fm2tup') || code.includes('framer-1ugaiiq') || code.includes('framer-1a3z98x') || code.includes('framer-1t5eghs')) {
    console.log(`Found class in ${f}`);
  }
}
