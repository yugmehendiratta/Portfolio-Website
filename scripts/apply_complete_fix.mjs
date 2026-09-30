import fs from 'node:fs';

const bundlePath = 'public/assets/framer/p8d4cIJbhhzOoKynoUz7QFD5AG6-Py0tkGL5Age-idQ.CSuKk7pJ.mjs';
let bundle = fs.readFileSync(bundlePath, 'utf8');

console.log('1. Updating Nav Scrollspy targets in bundle...');

// 1. Fix Bio targets
const bioTargetOld = '__framer__targets:[{ref:P,target:`GFYf86X4h`}]';
const bioTargetNew = '__framer__targets:[{ref:F,target:`lFsyY1e3B`},{ref:P,target:`GFYf86X4h`},{ref:I,target:`GFYf86X4h`},{ref:W_ref,target:`GFYf86X4h`}]';
if (bundle.includes(bioTargetOld)) {
  bundle = bundle.replace(bioTargetOld, bioTargetNew);
  console.log('  Updated Bio targets');
} else {
  console.log('  Bio target pattern not found or already updated');
}

// 2. Fix Story targets
const storyTargetOld = '__framer__targets:[{ref:F,target:`GFYf86X4h`},{ref:P,target:`lFsyY1e3B`},{ref:I,target:`GFYf86X4h`}]';
const storyTargetNew = '__framer__targets:[{ref:F,target:`GFYf86X4h`},{ref:P,target:`lFsyY1e3B`},{ref:I,target:`GFYf86X4h`},{ref:W_ref,target:`GFYf86X4h`}]';
if (bundle.includes(storyTargetOld)) {
  bundle = bundle.replace(storyTargetOld, storyTargetNew);
  console.log('  Updated Story targets');
} else {
  console.log('  Story target pattern not found or already updated');
}

// 3. Fix Work targets
const workTargetOld = '__framer__targets:[{ref:F,target:`GFYf86X4h`},{ref:P,target:`GFYf86X4h`},{ref:I,target:`lFsyY1e3B`}]';
const workTargetNew = '__framer__targets:[{ref:F,target:`GFYf86X4h`},{ref:P,target:`GFYf86X4h`},{ref:I,target:`lFsyY1e3B`},{ref:W_ref,target:`GFYf86X4h`}]';
if (bundle.includes(workTargetOld)) {
  bundle = bundle.replace(workTargetOld, workTargetNew);
  console.log('  Updated Work targets (added W_ref -> GFYf86X4h)');
} else {
  console.log('  Work target pattern not found or already updated');
}

console.log('2. Updating Awards styling & colors in bundle...');

// Update Awards tag class and text color
const awardsTagOld = 'o(`div`,{className:`framer-nc06ra`,"data-framer-name":`Text`,children:o(S,{__fromCanvasComponent:!0,children:o(r,{children:o(`h2`,{className:`framer-styles-preset-27ku3y`,"data-styles-preset":`MffBJovlA`,dir:`auto`,style:{"--framer-text-color":`var(--token-4f4ed186-9023-4858-830a-5202d69249c1, rgb(17, 18, 18))`},children:`Awards \\u0026 Achievements`})}),className:`framer-tzv26k`,fonts:[`Inter`],verticalAlignment:`top`,withExternalLayout:!0})})';
const awardsTagNew = 'o(`div`,{className:`framer-awards-tag`,"data-framer-name":`Text`,children:o(S,{__fromCanvasComponent:!0,children:o(r,{children:o(`h2`,{className:`framer-styles-preset-27ku3y`,"data-styles-preset":`MffBJovlA`,dir:`auto`,style:{"--framer-text-color":`rgb(255, 255, 255)`},children:`Awards \\u0026 Achievements`})}),className:`framer-tzv26k`,fonts:[`Inter`],verticalAlignment:`top`,withExternalLayout:!0})})';
if (bundle.includes(awardsTagOld)) {
  bundle = bundle.replace(awardsTagOld, awardsTagNew);
  console.log('  Updated Awards tag in bundle');
}

// Update Awards card container and corner classes
const awardsCardOld = 'c(`div`,{className:`framer-1ql5gwc`,"data-border":!0,"data-framer-name":`Content`,children:[c(`div`,{className:`framer-6aawbq`,"data-framer-name":`Border`,children:[o(`div`,{className:`framer-3cixhw`,"data-border":!0,"data-framer-name":`Rectangle`}),o(`div`,{className:`framer-iw10lq`,"data-border":!0,"data-framer-name":`Rectangle`}),o(`div`,{className:`framer-11qzkjj`,"data-border":!0,"data-framer-name":`Rectangle`}),o(`div`,{className:`framer-cis23f`,"data-border":!0,"data-framer-name":`Rectangle`})]}),';
const awardsCardNew = 'c(`div`,{className:`framer-1ql5gwc framer-awards-card`,"data-border":!0,"data-framer-name":`Content`,children:[c(`div`,{className:`framer-6aawbq`,"data-framer-name":`Border`,children:[o(`div`,{className:`framer-3cixhw framer-awards-corner`,"data-border":!0,"data-framer-name":`Rectangle`}),o(`div`,{className:`framer-iw10lq framer-awards-corner`,"data-border":!0,"data-framer-name":`Rectangle`}),o(`div`,{className:`framer-11qzkjj framer-awards-corner`,"data-border":!0,"data-framer-name":`Rectangle`}),o(`div`,{className:`framer-cis23f framer-awards-corner`,"data-border":!0,"data-framer-name":`Rectangle`})]}),';
if (bundle.includes(awardsCardOld)) {
  bundle = bundle.replace(awardsCardOld, awardsCardNew);
  console.log('  Updated Awards card and corners in bundle');
}

// Update Awards cursor tag
const awardsCursorOld = 'className:`framer-1sty39j hidden-1hh7fxx`,"data-border":!0,"data-framer-name":`Cursor Tag`,style:{rotate:-11},transformTemplate:Z,children:[o(D,{children:o(w,{className:`framer-161e4g2-container`,isAuthoredByUser:!0,isModuleExternal:!0,nodeId:`AwardCursorTag`,scopeId:`NFldwpxHM`,children:o(B,{animationDistance:300,direction:`both`,enabled:!0,height:`100%`,id:`AwardCursorTag`,layoutId:`AwardCursorTag`,mode:`repel`,smoothness:10,threshold:300,width:`100%`})})}),o(g,{className:`framer-1mrct6g`,"data-framer-name":`Cursor`,requiresOverflowVisible:!0,svg:`<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 28 26" overflow="visible"><path d="M 0 0 L 12 26 L 14 13 L 28 9.5 Z" fill="var(--token-1892785e-8581-4826-b411-015017430ad3, rgb(54, 197, 240))" stroke-width="2" stroke="var(--token-4f4ed186-9023-4858-830a-5202d69249c1, rgb(17, 18, 18))"></path></svg>`,withExternalLayout:!0}),o(S,{__fromCanvasComponent:!0,children:o(r,{children:o(`p`,{className:`framer-styles-preset-1833qg6`,"data-styles-preset":`jB2nPzqr7`,dir:`auto`,style:{"--framer-text-color":`var(--token-4f4ed186-9023-4858-830a-5202d69249c1, rgb(17, 18, 18))`},children:`Awards`})})';
const awardsCursorNew = 'className:`framer-1sty39j framer-awards-cursor hidden-1hh7fxx`,"data-border":!0,"data-framer-name":`Cursor Tag`,style:{rotate:-11},transformTemplate:Z,children:[o(D,{children:o(w,{className:`framer-161e4g2-container`,isAuthoredByUser:!0,isModuleExternal:!0,nodeId:`AwardCursorTag`,scopeId:`NFldwpxHM`,children:o(B,{animationDistance:300,direction:`both`,enabled:!0,height:`100%`,id:`AwardCursorTag`,layoutId:`AwardCursorTag`,mode:`repel`,smoothness:10,threshold:300,width:`100%`})})}),o(g,{className:`framer-1mrct6g`,"data-framer-name":`Cursor`,requiresOverflowVisible:!0,svg:`<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 28 26" overflow="visible"><path d="M 0 0 L 12 26 L 14 13 L 28 9.5 Z" fill="#8b5cf6" stroke-width="2" stroke="var(--token-4f4ed186-9023-4858-830a-5202d69249c1, rgb(17, 18, 18))"></path></svg>`,withExternalLayout:!0}),o(S,{__fromCanvasComponent:!0,children:o(r,{children:o(`p`,{className:`framer-styles-preset-1833qg6`,"data-styles-preset":`jB2nPzqr7`,dir:`auto`,style:{"--framer-text-color":`rgb(255, 255, 255)`},children:`Awards`})})';
if (bundle.includes(awardsCursorOld)) {
  bundle = bundle.replace(awardsCursorOld, awardsCursorNew);
  console.log('  Updated Awards cursor tag in bundle');
}

// Update Awards trophy badge
const trophyOld = 'backgroundColor:`var(--token-cd9da077-16e0-46f3-9a80-6bf4c2a79928, rgb(245, 221, 161))`';
const trophyNew = 'backgroundColor:`#fef08a`';
if (bundle.includes(trophyOld)) {
  bundle = bundle.replace(trophyOld, trophyNew);
  console.log('  Updated trophy badge in bundle');
}

// Add CSS rules into bundle array
const cssRulesToAdd = `,\`.framer-NrOiv #awards .framer-1ql5gwc, .framer-NrOiv #awards .framer-1ql5gwc[data-border="true"]::after, .framer-NrOiv #awards .framer-6aawbq div, .framer-NrOiv #awards .framer-6aawbq div[data-border="true"]::after { --border-color: #8b5cf6 !important; border-color: #8b5cf6 !important; }\`,\`.framer-NrOiv #awards .framer-1sty39j, .framer-NrOiv #awards div[data-framer-name="Cursor Tag"], .framer-NrOiv #awards .framer-awards-cursor { background-color: #8b5cf6 !important; }\`,\`.framer-NrOiv #awards .framer-awards-tag, .framer-NrOiv #awards .framer-13tnzw6 > div { background-color: #8b5cf6 !important; }\`,\`.framer-NrOiv section.framer-1q34n9d { scroll-margin-top: 120px; }\``;

if (!bundle.includes('#awards .framer-1ql5gwc')) {
  // Replace old awards tag rules if present
  if (bundle.includes('.framer-awards-tag')) {
    const startIdx = bundle.indexOf(',`.framer-NrOiv .framer-awards-tag');
    const endIdx = bundle.indexOf('],`framer-NrOiv`)');
    if (startIdx !== -1 && endIdx !== -1) {
      bundle = bundle.slice(0, startIdx) + bundle.slice(endIdx);
    }
  }
  const cssEndPattern = `],\`framer-NrOiv\`)`;
  bundle = bundle.replace(cssEndPattern, `${cssRulesToAdd}],\`framer-NrOiv\`)`);
  console.log('  Added awards CSS rules to bundle array');
}

fs.writeFileSync(bundlePath, bundle);
fs.writeFileSync('vercel_live_bundle.mjs', bundle);
console.log('Updated bundle file and vercel_live_bundle.mjs');

