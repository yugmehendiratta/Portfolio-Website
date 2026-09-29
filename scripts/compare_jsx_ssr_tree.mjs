import fs from 'fs';

const aboutBundle = fs.readFileSync('public/assets/framer/p8d4cIJbhhzOoKynoUz7QFD5AG6-Py0tkGL5Age-idQ.CSuKk7pJ.mjs', 'utf8');
const aboutHtml = fs.readFileSync('.rendered/about.html', 'utf8');

// Find the parent of framer-n5931f in JSX
const nIdx = aboutBundle.indexOf('framer-n5931f');
console.log('JSX around framer-n5931f:');
console.log(aboutBundle.slice(nIdx - 400, nIdx + 600));

// Find framer-n5931f in SSR HTML
const hIdx = aboutHtml.indexOf('framer-n5931f');
console.log('\nSSR HTML around framer-n5931f:');
console.log(aboutHtml.slice(hIdx - 400, hIdx + 600));
