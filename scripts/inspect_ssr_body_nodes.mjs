import fs from 'fs';

const html = fs.readFileSync('.rendered/about.html', 'utf8');

const idx = html.indexOf('class="framer-1pltn3m"');
console.log('framer-1pltn3m in HTML body:');
console.log(html.slice(idx - 200, idx + 1200));
