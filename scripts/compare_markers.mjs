import fs from 'node:fs';

const buf = fs.readFileSync('scripts/original_bundle.mjs');
let orig = buf[0] === 0xff && buf[1] === 0xfe ? buf.toString('utf16le') : buf.toString('utf8');
if (orig.charCodeAt(0) === 0xFEFF) orig = orig.slice(1);
const curr = fs.readFileSync('public/assets/framer/p8d4cIJbhhzOoKynoUz7QFD5AG6-Py0tkGL5Age-idQ.CSuKk7pJ.mjs', 'utf8');

// Let's normalize text / utf8 characters or see where structural differences are
console.log('Comparing structural changes...');

// Let's check sections in both:
// 1. Bio section
// 2. Story section
// 3. Work section
// 4. Awards section
// 5. CTA section
// 6. HeaderLine section

function findOccurrences(str, pattern) {
  return Array.from(str.matchAll(new RegExp(pattern, 'g'))).map(m => m.index);
}

const markers = ['mainbio', 'my-story', 'work', 'awards', 'Polaroid', 'Hover Force', 'Sticky Card', 'ScrollTrigger', 'Lenis'];
for (const m of markers) {
  console.log(`\nMarker [${m}]:`);
  console.log('Orig count:', findOccurrences(orig, m).length);
  console.log('Curr count:', findOccurrences(curr, m).length);
}
