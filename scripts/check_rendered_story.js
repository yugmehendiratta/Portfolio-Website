import fs from 'fs';

const html = fs.readFileSync('.rendered/about.html', 'utf8');

// Search for my-story
const idx = html.indexOf('id="my-story"');
console.log(html.substring(idx - 200, idx + 800));
