import fs from 'node:fs';

const headerFiles = [
  'src/sections/home/HeaderLine.tsx',
  'src/sections/about/HeaderLine.tsx',
  'src/sections/contact/HeaderLine.tsx',
  'src/sections/play-ground/HeaderLine.tsx',
  'src/sections/case-study/HeaderLine.tsx',
  'src/sections/case-study-homestead/HeaderLine.tsx',
  'src/sections/case-study-meridian-health/HeaderLine.tsx',
  'src/sections/case-study-north-light/HeaderLine.tsx',
  'src/sections/case-study-stylebook/HeaderLine.tsx'
];

for (const file of headerFiles) {
  let content = fs.readFileSync(file, 'utf8');

  // Replace EM block
  const emOld = `<div className="framer-119y192-container" id="undefined-119y192">
                  <div className="framer-1W99m framer-NkuHG framer-zqh0pq framer-v-zqh0pq" data-framer-name="Intactive" data-highlight="true" style={{ backgroundColor: "var(--token-eee4728f-06ef-4d99-9d02-ac8944e7f6dd, rgb(226, 226, 226))", height: "100%", width: "100%", borderBottomLeftRadius: "32px", borderBottomRightRadius: "32px", borderTopLeftRadius: "32px", borderTopRightRadius: "32px" }}>
                    <div className="framer-1njt74i" data-framer-component-type="RichTextContainer" style={{ "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", transform: "translate(-50%, -50%)" }}>
                      <p className="framer-text framer-styles-preset-27ku3y" data-styles-preset="MffBJovlA" dir="auto">
                        {"EM"}
                      </p>
                    </div>
                  </div>
                </div>`;

  const emNew = `<div className="framer-119y192-container" id="undefined-119y192">
                  <a className="framer-1W99m framer-NkuHG framer-zqh0pq framer-v-zqh0pq" data-framer-name="Intactive" data-highlight="true" href="mailto:work.yug29@gmail.com" style={{ backgroundColor: "var(--token-eee4728f-06ef-4d99-9d02-ac8944e7f6dd, rgb(226, 226, 226))", height: "100%", width: "100%", borderBottomLeftRadius: "32px", borderBottomRightRadius: "32px", borderTopLeftRadius: "32px", borderTopRightRadius: "32px", textDecoration: "none", display: "block" }}>
                    <div className="framer-1njt74i" data-framer-component-type="RichTextContainer" style={{ "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", transform: "translate(-50%, -50%)" }}>
                      <p className="framer-text framer-styles-preset-27ku3y" data-styles-preset="MffBJovlA" dir="auto">
                        {"EM"}
                      </p>
                    </div>
                  </a>
                </div>`;

  // Replace PH block
  const phOld = `<div className="framer-1yzdk2p-container" id="undefined-1yzdk2p">
                  <div className="framer-1W99m framer-NkuHG framer-zqh0pq framer-v-zqh0pq" data-framer-name="Intactive" data-highlight="true" style={{ backgroundColor: "var(--token-eee4728f-06ef-4d99-9d02-ac8944e7f6dd, rgb(226, 226, 226))", height: "100%", width: "100%", borderBottomLeftRadius: "32px", borderBottomRightRadius: "32px", borderTopLeftRadius: "32px", borderTopRightRadius: "32px" }}>
                    <div className="framer-1njt74i" data-framer-component-type="RichTextContainer" style={{ "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", transform: "translate(-50%, -50%)" }}>
                      <p className="framer-text framer-styles-preset-27ku3y" data-styles-preset="MffBJovlA" dir="auto">
                        {"PH"}
                      </p>
                    </div>
                  </div>
                </div>`;

  const phNew = `<div className="framer-1yzdk2p-container" id="undefined-1yzdk2p">
                  <a className="framer-1W99m framer-NkuHG framer-zqh0pq framer-v-zqh0pq" data-framer-name="Intactive" data-highlight="true" href="tel:+917988865453" style={{ backgroundColor: "var(--token-eee4728f-06ef-4d99-9d02-ac8944e7f6dd, rgb(226, 226, 226))", height: "100%", width: "100%", borderBottomLeftRadius: "32px", borderBottomRightRadius: "32px", borderTopLeftRadius: "32px", borderTopRightRadius: "32px", textDecoration: "none", display: "block" }}>
                    <div className="framer-1njt74i" data-framer-component-type="RichTextContainer" style={{ "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", transform: "translate(-50%, -50%)" }}>
                      <p className="framer-text framer-styles-preset-27ku3y" data-styles-preset="MffBJovlA" dir="auto">
                        {"PH"}
                      </p>
                    </div>
                  </a>
                </div>`;

  if (!content.includes(emOld)) {
    console.error(`File ${file} missing emOld`);
  } else {
    content = content.replace(emOld, emNew);
  }

  if (!content.includes(phOld)) {
    console.error(`File ${file} missing phOld`);
  } else {
    content = content.replace(phOld, phNew);
  }

  fs.writeFileSync(file, content, 'utf8');
  console.log(`Updated ${file}`);
}
