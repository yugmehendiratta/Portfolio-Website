import fs from 'node:fs';

const log = fs.readFileSync('C:/Users/yugme/.gemini/antigravity-ide/brain/cedcf934-c9cb-414b-ad3e-85b04a9bb830/.system_generated/tasks/task-187.log', 'utf8');

// Find all occurrences of DIAG_REACT_130
const idxs = [];
let idx = 0;
while ((idx = log.indexOf('DIAG_REACT_130', idx)) !== -1) {
  idxs.push(idx);
  idx += 14;
}

console.log(`Found ${idxs.length} occurrences.`);
idxs.forEach((pos, i) => {
  console.log(`\n--- OCCURRENCE ${i + 1} ---`);
  console.log(log.slice(pos - 100, pos + 800));
});
