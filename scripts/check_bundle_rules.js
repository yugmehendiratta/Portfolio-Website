import fs from 'fs';
const bundle = fs.readFileSync('public/assets/framer/p8d4cIJbhhzOoKynoUz7QFD5AG6-Py0tkGL5Age-idQ.CSuKk7pJ.mjs', 'utf8');

const lastArrayIdx = bundle.lastIndexOf('`.framer-');
const cssText = bundle.substring(lastArrayIdx);
const rules = cssText.split('`,').map(r => r.replace(/[`\[\]]/g, '').trim()).filter(Boolean);

console.log('Total rules in bundle:', rules.length);

rules.forEach((r, idx) => {
  if (r.includes('14jsokh') || r.includes('o05pe9') || r.includes('foyt4c') || r.includes('1h8izsz') || r.includes('me803a') || r.includes('1q34n9d')) {
    console.log(`[Rule ${idx}] ${r}`);
  }
});
