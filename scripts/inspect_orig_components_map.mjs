import fs from 'node:fs';

const buf = fs.readFileSync('scripts/original_bundle.mjs');
let orig = buf[0] === 0xff && buf[1] === 0xfe ? buf.toString('utf16le') : buf.toString('utf8');
if (orig.charCodeAt(0) === 0xFEFF) orig = orig.slice(1);

// Let's find all component wrappers and variables in orig
console.log('--- In ORIG ---');
const origVars = orig.match(/var [^;]+;/);
console.log('Orig vars definition:\n', origVars ? origVars[0].slice(0, 500) : 'not found');

// Let's find all `p(...)` or `m(...)` or `P(...)` in orig
const pCalls = Array.from(orig.matchAll(/([a-zA-Z0-9_$]+)\s*=\s*p\(([^)]+)\)/g)).map(m => `${m[1]} = p(${m[2]})`);
console.log('\np(...) calls in orig:');
console.log(pCalls);

// Let's find all `P(...)` calls in orig
const capPCalls = Array.from(orig.matchAll(/([a-zA-Z0-9_$]+)\s*=\s*P\(([^)]+)\)/g)).map(m => `${m[1]} = P(${m[2]})`);
console.log('\nP(...) calls in orig:');
console.log(capPCalls);

// Let's find what was rendered inside nodeId: oIrQDv8Wg in orig
const oIrMatch = orig.match(/nodeId:`oIrQDv8Wg`[^}]*children:([^}]+})/);
console.log('\nnodeId: oIrQDv8Wg in orig:');
console.log(oIrMatch ? oIrMatch[0].slice(0, 300) : 'not found');
