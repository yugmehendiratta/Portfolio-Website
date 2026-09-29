import fs from 'node:fs';

const buf = fs.readFileSync('scripts/original_bundle.mjs');
let orig = buf[0] === 0xff && buf[1] === 0xfe ? buf.toString('utf16le') : buf.toString('utf8');
if (orig.charCodeAt(0) === 0xFEFF) orig = orig.slice(1);

const curr = fs.readFileSync('public/assets/framer/p8d4cIJbhhzOoKynoUz7QFD5AG6-Py0tkGL5Age-idQ.CSuKk7pJ.mjs', 'utf8');

console.log('--- In ORIG: H8WdmyHet imports and uses ---');
const h8Match = orig.match(/import\s*\{[^}]*\}\s*from\s*"[^"]*H8WdmyHet[^"]*";/);
console.log('Import line:', h8Match ? h8Match[0] : 'not found');
if (h8Match) {
  const vars = h8Match[0].match(/\{([^}]+)\}/)[1].split(',').map(s => s.trim());
  for (const v of vars) {
    const local = v.includes(' as ') ? v.split(' as ')[1].trim() : v;
    const uses = Array.from(orig.matchAll(new RegExp(`\\b${local}\\b`, 'g'))).map(u => u.index);
    console.log(`${local} (${v}) -> uses in orig: ${uses.length}`);
    for (const u of uses) {
      console.log('  ', orig.slice(Math.max(0, u - 30), u + 60));
    }
  }
}
