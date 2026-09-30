import fs from 'node:fs';

const manifestPath = 'src/manifest.json';
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));

const awardsAndNavCss = `
<style id="awards-and-nav-fix">
html { scroll-behavior: smooth !important; }
.framer-NrOiv section.framer-1q34n9d { scroll-margin-top: 120px !important; }

/* Awards Section Custom Royal Purple (#8b5cf6) Identity */
.framer-NrOiv #awards .framer-1ql5gwc,
.framer-NrOiv #awards .framer-1ql5gwc[data-border="true"]::after,
.framer-NrOiv #awards .framer-6aawbq div,
.framer-NrOiv #awards .framer-6aawbq div[data-border="true"]::after {
  --border-color: #8b5cf6 !important;
  border-color: #8b5cf6 !important;
}

.framer-NrOiv #awards .framer-1sty39j,
.framer-NrOiv #awards div[data-framer-name="Cursor Tag"],
.framer-NrOiv #awards .framer-awards-cursor {
  background-color: #8b5cf6 !important;
  --border-color: #111212 !important;
  border-color: #111212 !important;
}

.framer-NrOiv #awards .framer-awards-tag,
.framer-NrOiv #awards .framer-13tnzw6 > div {
  background-color: #8b5cf6 !important;
}
</style>
`;

for (const page of manifest.pages) {
  if (page.file === 'about.html') {
    if (page.head.includes('id="awards-and-nav-fix"')) {
      page.head = page.head.replace(/<style id="awards-and-nav-fix">[\s\S]*?<\/style>/, awardsAndNavCss.trim());
    } else {
      page.head += '\n' + awardsAndNavCss.trim();
    }
    console.log('Updated manifest head for about.html');
  }
}

fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
console.log('Successfully written updated manifest.json');
