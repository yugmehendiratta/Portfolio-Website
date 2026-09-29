import fs from 'node:fs';

const filePath = 'public/assets/framer/script_main.B4-njmYi.mjs';
const code = fs.readFileSync(filePath, 'utf8');

const target = 'NFldwpxHM:{elements:{dkrKqQyE0:`mainbio`,Jdwi6XhE4:`my-story`,OlJBi42Qf:`work`}';
const replacement = 'NFldwpxHM:{elements:{awards:`awards`,dkrKqQyE0:`mainbio`,Jdwi6XhE4:`my-story`,OlJBi42Qf:`work`}';

if (code.includes(target)) {
  const updated = code.replace(target, replacement);
  fs.writeFileSync(filePath, updated, 'utf8');
  console.log('Updated script_main.B4-njmYi.mjs with awards element mapping');
} else {
  console.log('Target not found in script_main');
}
