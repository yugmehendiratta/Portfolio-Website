import fs from 'fs';

const css = fs.readFileSync('scripts/rendered_styles.css', 'utf8');

['14jsokh', 'o05pe9', 'me803a', 'foyt4c', '1h8izsz', '1q34n9d', 'mpn7rf', 'ixsok6'].forEach(cls => {
  console.log(`=== CLS: ${cls} ===`);
  const regex = new RegExp(`[^{}]*\\.${cls}[^{}]*\\{[^}]*\\}`, 'g');
  let m;
  while ((m = regex.exec(css)) !== null) {
    console.log(m[0].replace(/\s+/g, ' ').trim());
  }
});
