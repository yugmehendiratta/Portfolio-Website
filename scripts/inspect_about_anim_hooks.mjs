import fs from 'node:fs';

const code = fs.readFileSync('public/assets/framer/p8d4cIJbhhzOoKynoUz7QFD5AG6-Py0tkGL5Age-idQ.CSuKk7pJ.mjs', 'utf8');

const regex = /([a-zA-Z0-9_$]+:[^,]+__framer__[^,]+|__framer__[^,]+)/g;
const matches = Array.from(code.matchAll(regex));

console.log('--- ANIMATION OBJECTS IN ABOUT BUNDLE ---');
matches.forEach(m => console.log(' at', m.index, m[0].slice(0, 100)));

// Check loop definitions X and Y
const xIdx = code.indexOf('X={');
const yIdx = code.indexOf('Y={');
console.log('\nX def:', code.slice(xIdx, xIdx + 120));
console.log('Y def:', code.slice(yIdx, yIdx + 120));

// Check where X and Y are used
const loopUses = Array.from(code.matchAll(/__framer__loop:X/g));
console.log('__framer__loop:X count:', loopUses.length);
loopUses.forEach(m => {
  console.log('Loop usage at', m.index, code.slice(m.index - 50, m.index + 200));
});

// Check Nav scroll targets: __framer__targets
const targetUses = Array.from(code.matchAll(/__framer__targets/g));
console.log('\n__framer__targets count:', targetUses.length);
targetUses.forEach(m => {
  console.log('Targets usage at', m.index, code.slice(m.index - 50, m.index + 250));
});
