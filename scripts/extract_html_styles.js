import fs from 'fs';

const html = fs.readFileSync('.rendered/about.html', 'utf8');

// Find all style tags or classes
const styleMatches = html.match(/<style[^>]*>([\s\S]*?)<\/style>/g) || [];
console.log('Found style tags:', styleMatches.length);

fs.writeFileSync('scripts/rendered_styles.css', styleMatches.map(s => s.replace(/<style[^>]*>|<\/style>/g, '')).join('\n\n'));
console.log('Saved all styles from .rendered/about.html to scripts/rendered_styles.css');
