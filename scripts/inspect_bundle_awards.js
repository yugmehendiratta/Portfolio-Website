import fs from 'fs';

const bundlePath = 'public/assets/framer/p8d4cIJbhhzOoKynoUz7QFD5AG6-Py0tkGL5Age-idQ.CSuKk7pJ.mjs';
let content = fs.readFileSync(bundlePath, 'utf8');

// Find the section for Awards in the bundle
const aStart = content.indexOf('c("section", { className: "framer-o05pe9", "data-framer-name": "Awards"');
console.log('Found aStart:', aStart);

const aEnd = content.indexOf('])])])})]})]})]})]})]})]}),o(`div`,{id:`overlay`})');
console.log('Found aEnd:', aEnd);

if (aStart !== -1 && aEnd !== -1) {
  console.log('Snippet currently between aStart and aEnd:');
  console.log(content.substring(aStart, aEnd));
}
