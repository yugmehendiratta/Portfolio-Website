import fs from 'fs';
const orig = fs.readFileSync('scripts/original_bundle.mjs', 'utf16le');

console.log('Orig UTF16 length:', orig.length);
['framer-me803a', 'framer-1q34n9d', 'framer-1h8izsz', 'framer-14jsokh', 'framer-o05pe9', 'framer-foyt4c', 'framer-ixsok6'].forEach(cls => {
  let pos = 0;
  while ((pos = orig.indexOf(cls, pos)) !== -1) {
    console.log(`Class "${cls}" at ${pos}:`, orig.substring(Math.max(0, pos - 30), pos + 120));
    pos += cls.length;
  }
});
