import fs from 'fs';

const html = fs.readFileSync('.rendered/about.html', 'utf8');
const p1 = html.indexOf('id="mainbio"');
const p2 = html.indexOf('id="my-story"');
const p3 = html.indexOf('id="work"');
const p4 = html.indexOf('id="awards"');

console.log('--- mainbio snippet:');
console.log(html.substring(p1 - 100, p1 + 100));
console.log('--- my-story snippet:');
console.log(html.substring(p2 - 100, p2 + 100));
console.log('--- work snippet:');
console.log(html.substring(p3 - 100, p3 + 100));
console.log('--- awards snippet:');
console.log(html.substring(p4 - 100, p4 + 100));
