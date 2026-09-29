import fs from 'node:fs';

const manifest = JSON.parse(fs.readFileSync('src/manifest.json', 'utf8'));
const aboutPage = manifest.pages.find(p => p.route === '/about');

// Find all CSS in manifest for about
console.log('Manifest head length:', aboutPage.head.length);
fs.writeFileSync('scripts/about_manifest_head.html', aboutPage.head);

// Look for styles in aboutPage.head
const styleRegex = /<style[^>]*>([\s\S]*?)<\/style>/gi;
let match;
let count = 0;
while ((match = styleRegex.exec(aboutPage.head)) !== null) {
  count++;
  fs.writeFileSync(`scripts/about_style_${count}.css`, match[1]);
}
console.log(`Extracted ${count} style tags from about head`);
