import fs from 'node:fs';

const bundlePath = 'public/assets/framer/p8d4cIJbhhzOoKynoUz7QFD5AG6-Py0tkGL5Age-idQ.CSuKk7pJ.mjs';
let code = fs.readFileSync(bundlePath, 'utf8');

// Target rule:
// .framer-NrOiv .framer-1ukjnmv { align-content: center; align-items: center; display: flex; flex: none; flex-direction: row; flex-wrap: nowrap; gap: 0px; height: min-content; justify-content: center; overflow: visible; padding: 0px; position: sticky; top: 150px; width: min-content; z-index: 2; }
const oldRule = `.framer-NrOiv .framer-1ukjnmv { align-content: center; align-items: center; display: flex; flex: none; flex-direction: row; flex-wrap: nowrap; gap: 0px; height: min-content; justify-content: center; overflow: visible; padding: 0px; position: sticky; top: 150px; width: min-content; z-index: 2; }`;

const newRule = `.framer-NrOiv .framer-1ukjnmv { align-content: center; align-items: center; display: flex; flex: none; flex-direction: row; flex-wrap: nowrap; gap: 0px; height: min-content; justify-content: center; overflow: visible; padding: 0px; position: fixed; left: 48px; top: 50%; transform: translateY(-50%); width: min-content; z-index: 50; }`;

if (code.includes(oldRule)) {
  code = code.replace(oldRule, newRule);
  fs.writeFileSync(bundlePath, code, 'utf8');
  console.log('Successfully replaced old sticky nav rule with fixed desktop nav rule in bundle!');
} else {
  console.log('Target oldRule not found, checking if already updated or variant difference...');
  const idx = code.indexOf('.framer-NrOiv .framer-1ukjnmv');
  if (idx !== -1) {
    console.log('Found around idx:', code.slice(idx, idx + 300));
  }
}
