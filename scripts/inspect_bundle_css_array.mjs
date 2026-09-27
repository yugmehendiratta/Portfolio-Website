import fs from 'fs';

const bundle = fs.readFileSync('public/assets/framer/p8d4cIJbhhzOoKynoUz7QFD5AG6-Py0tkGL5Age-idQ.CSuKk7pJ.mjs', 'utf8');

// Find css arrays in bundle: css: [ `...`, `...` ]
const cssMatch = bundle.match(/css\s*=\s*\[([\s\S]*?)\];/);
if (cssMatch) {
  console.log('Found css = [...] assignment!');
  const cssBlock = cssMatch[1];
  const rules = [];
  const r = /`([^`]+)`/g;
  let m;
  while ((m = r.exec(cssBlock)) !== null) {
    rules.push(m[1]);
  }
  console.log(`Total rules in bundle css array: ${rules.length}`);
  rules.forEach((rule, i) => {
    if (
      rule.includes('1u3qm76') ||
      rule.includes('1ukjnmv') ||
      rule.includes('94tkti') ||
      rule.includes('me803a') ||
      rule.includes('1q34n9d') ||
      rule.includes('14jsokh') ||
      rule.includes('o05pe9') ||
      rule.includes('1y1mzru') ||
      rule.includes('ixsok6') ||
      rule.includes('1ql5gwc') ||
      rule.includes('mpn7rf') ||
      rule.includes('10gofpt') ||
      rule.includes('foyt4c') ||
      rule.includes('rmz83s')
    ) {
      console.log(`\nRule [${i}]:\n${rule}`);
    }
  });
} else {
  console.log('No css = [...] found, searching for other patterns...');
}
