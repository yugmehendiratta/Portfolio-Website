import fs from 'node:fs';

const html = fs.readFileSync('prod_about_html.html', 'utf8');

console.log('--- SSR HTML ANALYSIS ---');
console.log('Has #mainbio:', html.includes('id="mainbio"'));
console.log('Has #my-story:', html.includes('id="my-story"'));
console.log('Has #work:', html.includes('id="work"'));
console.log('Has #awards:', html.includes('id="awards"'));

const legacyKeywords = [
  'BEJAMAN', 'Bejaman', 'Benjamin', 'Chicago, IL',
  'Meridian Health', 'Searchless AI', 'StyleBook',
  'Homestead', 'North Light'
];
console.log('Legacy keywords found in SSR:', legacyKeywords.filter(k => html.includes(k)));

// Check contact links
console.log('Has mailto:', html.includes('mailto:work.yug29@gmail.com'));
console.log('Has tel:', html.includes('tel:+917988865453'));
console.log('Has linkedin:', html.includes('linkedin.com/in/yugmehendiratta'));
console.log('Has certificate:', /certificate/i.test(html));

// Check navigation items
const navMatches = Array.from(html.matchAll(/href="([^"]*#?[^"]*)"[^>]*>([\s\S]*?)<\/a>/g));
console.log('\nNav items in SSR:');
navMatches.forEach(m => console.log(' href:', m[1], 'text:', m[2].replace(/<[^>]+>/g, '').trim()));
