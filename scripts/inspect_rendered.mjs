import fs from 'fs';

const html = fs.readFileSync('.rendered/about.html', 'utf8');
const mainbioIdx = html.indexOf('id="mainbio"');
const mystoryIdx = html.indexOf('id="my-story"');
const workIdx = html.indexOf('id="work"');
const awardsIdx = html.indexOf('id="awards"');

console.log('mainbio:', mainbioIdx);
console.log('mystory:', mystoryIdx);
console.log('work:', workIdx);
console.log('awards:', awardsIdx);

console.log('--- mainbio snippet ---');
console.log(html.substring(mainbioIdx - 80, mainbioIdx + 200));

console.log('--- mystory snippet ---');
console.log(html.substring(mystoryIdx - 80, mystoryIdx + 200));

console.log('--- work snippet ---');
console.log(html.substring(workIdx - 80, workIdx + 200));

console.log('--- awards snippet ---');
console.log(html.substring(awardsIdx - 80, awardsIdx + 200));
