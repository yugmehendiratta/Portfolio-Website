import fs from 'fs';

const html = fs.readFileSync('.rendered/about.html', 'utf8');

const pStory = html.indexOf('id="my-story"');
const pWork = html.indexOf('id="work"');

console.log('--- HTML around end of my-story and start of work ---');
console.log(html.substring(pWork - 200, pWork + 100));
