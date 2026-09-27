import fs from 'fs';

const orig = fs.readFileSync('scripts/original_bundle.mjs', 'utf8');

const listContentIdx = orig.indexOf('List Content');
if (listContentIdx !== -1) {
  console.log('Original JSX around List Content:');
  console.log(orig.substring(listContentIdx - 200, listContentIdx + 3000));
}
