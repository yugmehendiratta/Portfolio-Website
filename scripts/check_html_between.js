import fs from 'fs';

const html = fs.readFileSync('.rendered/about.html', 'utf8');

const pBio = html.indexOf('id="mainbio"');
const pStory = html.indexOf('id="my-story"');
const pWork = html.indexOf('id="work"');
const pAwards = html.indexOf('id="awards"');

console.log('--- Between Bio and Story ---');
console.log(html.substring(pBio + 100, pStory));

console.log('--- Between Story and Work ---');
console.log(html.substring(pStory + 100, pWork));

console.log('--- Between Work and Awards ---');
console.log(html.substring(pWork + 100, pAwards));
