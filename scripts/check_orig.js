import fs from 'fs';
const orig = fs.readFileSync('scripts/original_bundle.mjs', 'utf8');

console.log('Original bundle length:', orig.length);
['mainbio', 'my-story', 'work', 'Bio', 'Story', 'Work'].forEach(keyword => {
  let pos = 0;
  while ((pos = orig.indexOf(keyword, pos)) !== -1) {
    console.log(`Keyword "${keyword}" at ${pos}:`, orig.substring(Math.max(0, pos - 40), pos + 100));
    pos += keyword.length;
  }
});
