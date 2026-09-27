import fs from 'fs';

const bundlePath = 'public/assets/framer/p8d4cIJbhhzOoKynoUz7QFD5AG6-Py0tkGL5Age-idQ.CSuKk7pJ.mjs';
let content = fs.readFileSync(bundlePath, 'utf8');

const aStart = content.indexOf('c("section", { className: "framer-o05pe9", "data-framer-name": "Awards"');
console.log(content.substring(aStart, aStart + 4000));
