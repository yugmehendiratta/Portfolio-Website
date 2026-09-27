import fs from 'node:fs';

let content = fs.readFileSync('src/manifest.json', 'utf8');
const searchStr = '\\"1790534470\\":\\"7:31:16 PM\\"';
const replaceStr = '\\"1790534470\\":\\"7:31:16 PM IST\\"';
if (content.includes(searchStr)) {
  content = content.replace(searchStr, replaceStr);
  fs.writeFileSync('src/manifest.json', content, 'utf8');
  console.log('Updated manifest.json time serialization');
} else {
  console.log('searchStr not found');
}
