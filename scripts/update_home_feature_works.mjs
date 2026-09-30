import fs from 'node:fs';

let content = fs.readFileSync('src/sections/home/FeatureWorks.tsx', 'utf8');

// Helper to generate animated letter spans
function makeAnimatedSpans(text) {
  const words = text.split(' ');
  return words.map(word => {
    const letters = word.split('').map(char => 
      `<span style={{ display: "inline-block", opacity: "0.001", transform: "translateX(0px) translateY(40px) scale(1) rotate(0deg) skewX(0deg) skewY(0deg)" }}>{"${char}"}</span>`
    ).join('');
    return `<span style={{ whiteSpace: "nowrap" }}>${letters}</span>`;
  }).join('{" "}');
}

const arkTitleSpans = makeAnimatedSpans('ArkCV Builder');
const arkDescSpans = makeAnimatedSpans('AI-powered resume and career platform that helps job seekers beat ATS filters and get discovered by recruiters.');

// Replace Project 1 title and text in FeatureWorks
content = content.replaceAll('{"Mar 19, 2026"}', '{"May – July 2026"}');
content = content.replaceAll('{"Healthcare"}', '{"UX Case Study"}');
content = content.replaceAll('{"Workflow Design"}', '{"AI Product"}');
content = content.replaceAll('{"Workflow design"}', '{"AI Product"}');

// Replace Image src for Meridian Health (Project 1)
content = content.replaceAll('srcSet="/assets/img/186744f87f6ead63.webp 512w, /assets/img/d75c47fbb03ef164.webp 1024w, /assets/img/caf37bc3f732a8c0.webp 1500w" src="/assets/img/caf37bc3f732a8c0.webp"', 'src="/assets/img/arkcv_cover.jpg"');
content = content.replaceAll('srcSet="/assets/img/186744f87f6ead63.webp 512w, /assets/img/d75c47fbb03ef164.webp 768w" src="/assets/img/d75c47fbb03ef164.webp"', 'src="/assets/img/arkcv_cover.jpg"');

// Replace Meridian Health letter spans with ArkCV Builder
const meridianLetterPattern = /<span style=\{\{ whiteSpace: "nowrap" \}\}>\s*<span style=\{\{ display: "inline-block", opacity: "0\.001", transform: "translateX\(0px\) translateY\(40px\) scale\(1\) rotate\(0deg\) skewX\(0deg\) skewY\(0deg\)" \}\}>\{"M"\}<\/span>[\s\S]*?\{"h"\}<\/span>\s*<\/span>/g;

content = content.replace(meridianLetterPattern, arkTitleSpans);

// Replace "When therapists spend less time clicking..." letter spans with ArkCV tagline spans
const therapistsLetterPattern = /<span style=\{\{ whiteSpace: "nowrap" \}\}>\s*<span style=\{\{ display: "inline-block", opacity: "0\.001", transform: "translateX\(0px\) translateY\(40px\) scale\(1\) rotate\(0deg\) skewX\(0deg\) skewY\(0deg\)" \}\}>\{"W"\}<\/span>[\s\S]*?\{\"\."\}<\/span>\s*<\/span>/g;

content = content.replace(therapistsLetterPattern, arkDescSpans);

fs.writeFileSync('src/sections/home/FeatureWorks.tsx', content);
console.log('FeatureWorks.tsx updated successfully!');
