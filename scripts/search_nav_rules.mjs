import fs from 'node:fs';

const manifest = JSON.parse(fs.readFileSync('src/manifest.json', 'utf8'));
const aboutPage = manifest.pages.find(p => p.route === '/about');

const navRules = [];
const lines = aboutPage.head.split('}');
for (const line of lines) {
  if (line.includes('1ukjnmv') || line.includes('qu7yco') || line.includes('rmz83s')) {
    navRules.push(line.trim() + '}');
  }
}

console.log('Found', navRules.length, 'nav rules:');
navRules.forEach(r => console.log(r));
