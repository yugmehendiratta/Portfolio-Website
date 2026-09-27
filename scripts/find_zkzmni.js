import fs from 'fs';
const cssText = fs.readFileSync('scripts/bundle_css.txt', 'utf8');

const rules = cssText.split('`,').map(r => r.replace(/[`\[\]]/g, '').trim()).filter(Boolean);

console.log('=== RULES CONTAINING zkzmni ===');
rules.filter(r => r.includes('zkzmni')).forEach(r => console.log(r));

console.log('=== RULES CONTAINING 6p0jh5 ===');
rules.filter(r => r.includes('6p0jh5')).forEach(r => console.log(r));
