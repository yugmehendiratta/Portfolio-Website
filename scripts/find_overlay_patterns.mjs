import fs from 'node:fs';

const files = fs.readdirSync('public/assets/framer');
for (const f of files) {
  if (!f.endsWith('.mjs')) continue;
  const content = fs.readFileSync('public/assets/framer/' + f, 'utf8');
  if (content.includes('id:`overlay`') || content.includes('id:"overlay"')) {
    console.log(`Found overlay in ${f}`);
    const idx = content.indexOf('id:`overlay`') !== -1 ? content.indexOf('id:`overlay`') : content.indexOf('id:"overlay"');
    console.log('Snippet around overlay in ' + f + ':');
    console.log(content.slice(Math.max(0, idx - 100), idx + 200));
    console.log('---');
  }
}
