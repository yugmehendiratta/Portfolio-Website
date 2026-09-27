import fs from 'fs';
const bundle = fs.readFileSync('public/assets/framer/p8d4cIJbhhzOoKynoUz7QFD5AG6-Py0tkGL5Age-idQ.CSuKk7pJ.mjs', 'utf8');

const lastArrayIdx = bundle.lastIndexOf('`.framer-');
const cssText = bundle.substring(lastArrayIdx);
const rules = cssText.split('`,').map(r => r.replace(/[`\[\]]/g, '').trim()).filter(Boolean);

rules.forEach((r, idx) => {
  if (r.includes('1h8izsz') || r.includes('foyt4c') || r.includes('14jsokh') || r.includes('o05pe9') || r.includes('1q34n9d') || r.includes('me803a')) {
    console.log(`[Rule ${idx}] ${r}`);
  }
});
