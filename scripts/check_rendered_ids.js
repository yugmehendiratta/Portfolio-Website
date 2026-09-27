import fs from 'fs';
const html = fs.readFileSync('.rendered/about.html', 'utf8');

console.log('HTML length:', html.length);
['mainbio', 'my-story', 'work', 'awards'].forEach(id => {
  let pos = html.indexOf(`id="${id}"`);
  console.log(`id="${id}" at ${pos}`);
  if (pos !== -1) {
    console.log(html.substring(Math.max(0, pos - 50), pos + 200));
  }
});
