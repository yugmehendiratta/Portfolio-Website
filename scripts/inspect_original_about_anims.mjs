import fs from 'node:fs';

const bakCode = fs.readFileSync('public/assets/framer/p8d4cIJbhhzOoKynoUz7QFD5AG6-Py0tkGL5Age-idQ.CSuKk7pJ.mjs.bak', 'utf8');
const currCode = fs.readFileSync('public/assets/framer/p8d4cIJbhhzOoKynoUz7QFD5AG6-Py0tkGL5Age-idQ.CSuKk7pJ.mjs', 'utf8');

console.log('--- 1. IMPORTS CHECK ---');
const bakImports = bakCode.slice(0, 1500);
console.log('Imports in bak:');
console.log(bakImports);

console.log('\n--- 2. ANIMATION PROPS IN BAK ---');
const loopMatches = Array.from(bakCode.matchAll(/__framer__loop[a-zA-Z0-9_$:]+/g)).map(m => m[0]);
console.log('Loop matches in bak:', [...new Set(loopMatches)]);

const scrollMatches = Array.from(bakCode.matchAll(/ScrollTrigger|Lenis|Loop|transition|animate|whileHover|whileInView/g)).map(m => m[0]);
console.log('Animation keyword matches in bak:', [...new Set(scrollMatches)]);

// Check what components had animations in bak:
// e.g. Cursor Tag, Polaroid, Notes, Cards
const cursorTagBak = bakCode.match(/className:`framer-1sty39j[^`]*`[^}]+children/g);
console.log('\nCursor tag in bak:', cursorTagBak?.slice(0, 2));

const polaroidBak = bakCode.match(/nodeId:`[^`]+`[^}]*Polaroid/g);
console.log('Polaroid in bak:', polaroidBak);
