import fs from 'fs';

const css = fs.readFileSync('scripts/rendered_styles.css', 'utf8');

['framer-14jsokh', 'framer-o05pe9', 'framer-me803a', 'framer-foyt4c', 'framer-1h8izsz', 'framer-1q34n9d', 'framer-mpn7rf', 'framer-ixsok6'].forEach(cls => {
  let pos = 0;
  console.log(`=== CLS: ${cls} ===`);
  while ((pos = css.indexOf(cls, pos)) !== -1) {
    const start = Math.max(0, css.lastIndexOf('{', pos) - 50);
    const end = Math.min(css.length, css.indexOf('}', pos) + 1);
    console.log(css.substring(start, end).replace(/\s+/g, ' ').trim());
    pos += cls.length;
  }
});
