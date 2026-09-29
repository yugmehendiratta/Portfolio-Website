import fs from 'node:fs';

const code = fs.readFileSync('public/assets/framer/p8d4cIJbhhzOoKynoUz7QFD5AG6-Py0tkGL5Age-idQ.CSuKk7pJ.mjs', 'utf8');

// Let's find all identifiers passed to o(...) or a(...)
const calls = Array.from(code.matchAll(/([_ao])\(([A-Za-z0-9_$]+),/g)).map(m => m[2]);
const unique = [...new Set(calls)];
console.log('All unique component identifiers in jsx calls:');
console.log(unique);

// Let's check what each identifier is in the scope:
// Valid HTML tag strings: not in this list (strings like `div` are passed as `div`)
// React motion tags: u.div etc
// Components:
// te -> motion.AnimatePresence
// at -> motion.div
// rt -> TransitionProvider
// ae -> ?
// S -> ?
// r -> React.Fragment
// D -> ?
// h -> ?
// z -> SVGComponent
// lt -> ?
// jt -> ?
// w -> Framer Component Container
// Ee -> Lenis
// de -> ?
// M -> ?
// N -> Breakpoint / Responsive Container
// K -> ?
// Ae -> ?
// V -> Sticky Card
// H -> Polaroid
// B -> Hover Force
// g -> Framer Motion Div
// qe -> Right Arrow
// G -> Arrow Decoration
// U -> Work / Experience item
