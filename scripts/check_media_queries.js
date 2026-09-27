import fs from 'fs';

const html = fs.readFileSync('.rendered/about.html', 'utf8');

const regex = /@media[^{]*\{[\s\S]*?\}(?=\s*@|\s*<\/style>)/g;
let match;
while ((match = regex.exec(html)) !== null) {
  if (match[0].includes('foyt4c') || match[0].includes('1h8izsz') || match[0].includes('14jsokh')) {
    console.log('=== Media query match ===');
    console.log(match[0]);
  }
}
