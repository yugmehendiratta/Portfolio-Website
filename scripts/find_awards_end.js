import fs from 'fs';

const bundlePath = 'public/assets/framer/p8d4cIJbhhzOoKynoUz7QFD5AG6-Py0tkGL5Age-idQ.CSuKk7pJ.mjs';
let content = fs.readFileSync(bundlePath, 'utf8');

const aStart = content.indexOf('c("section", { className: "framer-o05pe9", "data-framer-name": "Awards"');
const after = content.substring(aStart);
const endMarker = 'children: "Awards" }) }), className: "framer-n52824", fonts: ["Inter"], verticalAlignment: "top", withExternalLayout: true }) ] }) ] }) ] }) ] })';
const aEnd = content.indexOf(endMarker, aStart);
console.log('aEnd found at:', aEnd);
if (aEnd !== -1) {
  console.log('Full Awards section length:', aEnd + endMarker.length - aStart);
}
