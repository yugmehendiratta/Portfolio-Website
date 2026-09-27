import fs from 'node:fs';

const files = fs.readdirSync('public/assets/framer');
for (const f of files) {
  if (!f.endsWith('.mjs')) continue;
  const content = fs.readFileSync('public/assets/framer/' + f, 'utf8');
  if (content.includes('1sbsau2')) {
    console.log(`Found 1sbsau2 in ${f}`);
    let idx = 0;
    while ((idx = content.indexOf('.framer-1sbsau2', idx)) !== -1) {
      const end = content.indexOf('}', idx);
      console.log(content.slice(idx, end + 1).replace(/\n/g, ' '));
      idx += 15;
    }
  }
}
