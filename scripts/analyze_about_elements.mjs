import fs from 'fs';

const data = JSON.parse(fs.readFileSync('scripts/about_elements.json', 'utf8'));
data.elements.forEach((e, i) => {
  if (i < 40) {
    console.log(`[${e.tag}] top: ${e.top}, left: ${e.left}, w: ${e.width}, h: ${e.height} | text: "${e.text}" | name: "${e.name}"`);
  }
});
