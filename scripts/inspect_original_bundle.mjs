import cp from 'child_process';

const bundle = cp.execSync('git show 014501c:public/assets/framer/p8d4cIJbhhzOoKynoUz7QFD5AG6-Py0tkGL5Age-idQ.CSuKk7pJ.mjs').toString();
const idx = bundle.indexOf('data-framer-name":`My Story`');
console.log(bundle.substring(idx - 100, idx + 3500));
