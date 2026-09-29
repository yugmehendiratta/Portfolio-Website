import fs from 'node:fs';

for (let i = 1; i <= 4; i++) {
  const content = fs.readFileSync(`scripts/about_style_${i}.css`, 'utf8');
  console.log(`\n=== Style ${i} (length: ${content.length}) ===`);
  const keywords = ['14jsokh', 'o05pe9', '1h8izsz', 'foyt4c', 'ixsok6', 'mpn7rf', '1ql5gwc', '1q34n9d', '1ukjnmv', 'rmz83s', '94tkti', 'me803a', '1pltn3m', '1y1mzru'];
  for (const kw of keywords) {
    const lines = content.split('}').filter(l => l.includes(kw));
    if (lines.length > 0) {
      console.log(`--- Keyword: ${kw} (${lines.length} rules) ---`);
      lines.forEach(l => console.log(l.trim() + '}'));
    }
  }
}
