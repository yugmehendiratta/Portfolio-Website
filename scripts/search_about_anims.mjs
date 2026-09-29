import fs from 'fs';

const aboutBundle = fs.readFileSync('public/assets/framer/p8d4cIJbhhzOoKynoUz7QFD5AG6-Py0tkGL5Age-idQ.CSuKk7pJ.mjs', 'utf8');

// Search for all motion components, variants, hover effects, transform transitions, and loops in aboutBundle
console.log('--- About bundle animations search ---');

// 1. Loops
const loopMatches = [...aboutBundle.matchAll(/__framer__loop[^}]+}/g)];
console.log('Loop matches (count ' + loopMatches.length + '):');
loopMatches.forEach(m => console.log(' ', m[0]));

// 2. Variants
const variantMatches = [...aboutBundle.matchAll(/variants:\{[^}]+\}/g)];
console.log('Variant matches (count ' + variantMatches.length + '):');
variantMatches.forEach(m => console.log(' ', m[0]));

// 3. Transitions
const transMatches = [...aboutBundle.matchAll(/transition:\{[^}]+\}/g)];
console.log('Transition matches (count ' + transMatches.length + '):');
transMatches.forEach(m => console.log(' ', m[0]));

// 4. Appear effects / Targets
const targetMatches = [...aboutBundle.matchAll(/__framer__targets:\[[^\]]+\]/g)];
console.log('Targets matches (count ' + targetMatches.length + '):');
targetMatches.forEach(m => console.log(' ', m[0]));

// 5. Code components (repel, etc.)
const codeCompMatches = [...aboutBundle.matchAll(/AwardCursorTag|CursorTag|SmoothScroll|Lenis/gi)];
console.log('Code component mentions:', codeCompMatches.map(m => m[0]));
