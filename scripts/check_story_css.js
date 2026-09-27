import fs from 'fs';

const bundle = fs.readFileSync('public/assets/framer/p8d4cIJbhhzOoKynoUz7QFD5AG6-Py0tkGL5Age-idQ.CSuKk7pJ.mjs', 'utf8');

// Look at the className on #my-story in the bundle
// In bundle:
// c(`section`,{className:`framer-14jsokh`,"data-framer-name":`My Story`,id:fe,ref:P,children:[
//   o(`div`,{className:`framer-foyt4c`,"data-framer-name":`Content`,children:[ ...

console.log('Class on My Story section: framer-14jsokh');
console.log('Class on My Story Content: framer-foyt4c');
console.log('Class on My Story Bio: framer-ixsok6');
console.log('Class on My Story Grid: framer-mpn7rf');

// Let's check all CSS rules for framer-14jsokh, framer-foyt4c, framer-ixsok6, framer-mpn7rf
