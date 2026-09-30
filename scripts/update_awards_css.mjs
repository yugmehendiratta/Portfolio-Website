import fs from 'node:fs';

const bundlePath = 'public/assets/framer/p8d4cIJbhhzOoKynoUz7QFD5AG6-Py0tkGL5Age-idQ.CSuKk7pJ.mjs';
let bundle = fs.readFileSync(bundlePath, 'utf8');

// Replace awards CSS rules with strong specific rules
const oldCssSnippet = `.framer-NrOiv .framer-awards-tag { align-content: center; align-items: center; background-color: #8b5cf6; display: flex; flex: none; flex-direction: column; flex-wrap: nowrap; gap: 0px; height: min-content; justify-content: center; overflow: var(--overflow-clip-fallback, clip); padding: 4px; position: relative; width: min-content; }\`,\`.framer-NrOiv .framer-awards-card { --border-color: #8b5cf6 !important; border-color: #8b5cf6 !important; }\`,\`.framer-NrOiv .framer-awards-corner { --border-color: #8b5cf6 !important; border-color: #8b5cf6 !important; }\`,\`.framer-NrOiv .framer-awards-cursor { background-color: #8b5cf6 !important; }\`,\`.framer-NrOiv section.framer-1q34n9d { scroll-margin-top: 120px; }`;

const newCssSnippet = `.framer-NrOiv .framer-awards-tag { align-content: center; align-items: center; background-color: #8b5cf6 !important; display: flex; flex: none; flex-direction: column; flex-wrap: nowrap; gap: 0px; height: min-content; justify-content: center; overflow: var(--overflow-clip-fallback, clip); padding: 4px; position: relative; width: min-content; }\`,\`.framer-NrOiv .framer-awards-card, .framer-NrOiv .framer-awards-card[data-border="true"]::after { --border-color: #8b5cf6 !important; border-color: #8b5cf6 !important; }\`,\`.framer-NrOiv .framer-awards-corner, .framer-NrOiv .framer-awards-corner[data-border="true"]::after { --border-color: #8b5cf6 !important; border-color: #8b5cf6 !important; }\`,\`.framer-NrOiv .framer-awards-cursor, .framer-NrOiv div.framer-awards-cursor { background-color: #8b5cf6 !important; --border-color: #111212 !important; }\`,\`.framer-NrOiv section.framer-1q34n9d { scroll-margin-top: 120px; }`;

if (bundle.includes(oldCssSnippet)) {
  bundle = bundle.replace(oldCssSnippet, newCssSnippet);
  console.log('Replaced CSS rules in bundle');
}

fs.writeFileSync(bundlePath, bundle);
fs.writeFileSync('vercel_live_bundle.mjs', bundle);
console.log('Saved bundle.');
