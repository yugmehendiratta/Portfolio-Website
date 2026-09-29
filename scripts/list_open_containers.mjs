import fs from 'node:fs';

const code = fs.readFileSync('public/assets/framer/p8d4cIJbhhzOoKynoUz7QFD5AG6-Py0tkGL5Age-idQ.CSuKk7pJ.mjs', 'utf8');

// Let's write a tokenizer that matches:
// 1. Calls like c(..., { children: [
// 2. Calls like o(..., { children: [
// 3. Simple objects { ... }
// 4. Arrays [ ... ]

const startIdx = code.indexOf('return k({}),o(E.Provider');
const endIdx = code.indexOf('[`.framer-NrOiv.framer-12hy5k5');

const snippet = code.slice(startIdx, endIdx);

// Let's log all calls with children:[
const regex = /(c|o)\(([^,]+),\{([^}]*children:\[)/g;
let m;
while ((m = regex.exec(snippet)) !== null) {
  console.log(`Open at ${m.index}: ${m[1]}(${m[2].slice(0, 30)} ... ${m[3]}`);
}
