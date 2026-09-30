import fs from 'node:fs';

const bundlePath = 'public/assets/framer/p8d4cIJbhhzOoKynoUz7QFD5AG6-Py0tkGL5Age-idQ.CSuKk7pJ.mjs';
let bundle = fs.readFileSync(bundlePath, 'utf8');

// Replace Awards tag in section
const awardsSectionOld = 'c(`section`,{className:`framer-1q34n9d`,"data-framer-name":`Awards`,id:`awards`,ref:W_ref,children:[o(`div`,{className:`framer-13tnzw6`,"data-framer-name":`Tag`,children:o(`div`,{className:`framer-nc06ra`,"data-framer-name":`Text`,children:o(S,{__fromCanvasComponent:!0,children:o(r,{children:o(`h2`,{className:`framer-styles-preset-27ku3y`,"data-styles-preset":`MffBJovlA`,dir:`auto`,style:{"--framer-text-color":`var(--token-4f4ed186-9023-4858-830a-5202d69249c1, rgb(17, 18, 18))`},children:`Awards & Achievements`})}),className:`framer-tzv26k`,fonts:[`Inter`],verticalAlignment:`top`,withExternalLayout:!0})})}),c(`div`,{className:`framer-1ql5gwc`';

const awardsSectionNew = 'c(`section`,{className:`framer-1q34n9d`,"data-framer-name":`Awards`,id:`awards`,ref:W_ref,children:[o(`div`,{className:`framer-13tnzw6`,"data-framer-name":`Tag`,children:o(`div`,{className:`framer-awards-tag`,"data-framer-name":`Text`,children:o(S,{__fromCanvasComponent:!0,children:o(r,{children:o(`h2`,{className:`framer-styles-preset-27ku3y`,"data-styles-preset":`MffBJovlA`,dir:`auto`,style:{"--framer-text-color":`rgb(255, 255, 255)`},children:`Awards & Achievements`})}),className:`framer-tzv26k`,fonts:[`Inter`],verticalAlignment:`top`,withExternalLayout:!0})})}),c(`div`,{className:`framer-1ql5gwc framer-awards-card`';

if (bundle.includes(awardsSectionOld)) {
  bundle = bundle.replace(awardsSectionOld, awardsSectionNew);
  console.log('Successfully updated Awards section tag in bundle');
} else {
  // Try more flexible pattern
  const target = 'data-framer-name":`Awards`,id:`awards`,ref:W_ref,children:[o(`div`,{className:`framer-13tnzw6`,"data-framer-name":`Tag`,children:o(`div`,{className:`framer-nc06ra`';
  const repl = 'data-framer-name":`Awards`,id:`awards`,ref:W_ref,children:[o(`div`,{className:`framer-13tnzw6`,"data-framer-name":`Tag`,children:o(`div`,{className:`framer-awards-tag`';
  if (bundle.includes(target)) {
    bundle = bundle.replace(target, repl);
    console.log('Updated Awards tag class via flexible match');
  }
}

fs.writeFileSync(bundlePath, bundle);
fs.writeFileSync('vercel_live_bundle.mjs', bundle);
console.log('Saved bundle changes.');
