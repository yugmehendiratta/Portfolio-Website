import fs from 'fs';

const indexHtml = fs.readFileSync('.rendered/index.html', 'utf8');
const aboutHtml = fs.readFileSync('.rendered/about.html', 'utf8');

console.log('index.html:');
console.log('  has main:', indexHtml.includes('id="main"'));
console.log('  has framerHydrateV2:', indexHtml.includes('framerHydrateV2'));
console.log('  has __framer-badge-container:', indexHtml.includes('__framer-badge-container'));

console.log('about.html:');
console.log('  has main:', aboutHtml.includes('id="main"'));
console.log('  has framerHydrateV2:', aboutHtml.includes('framerHydrateV2'));
console.log('  has __framer-badge-container:', aboutHtml.includes('__framer-badge-container'));

const getMainTag = (h) => {
  const m = h.match(/<div[^>]*id="main"[^>]*>/);
  return m ? m[0] : 'no main tag match';
};
console.log('index.html main tag:\n', getMainTag(indexHtml));
console.log('about.html main tag:\n', getMainTag(aboutHtml));

// Also let's check what script tags and bottom tags exist in both
console.log('index.html end:\n', indexHtml.slice(-800));
console.log('about.html end:\n', aboutHtml.slice(-800));
