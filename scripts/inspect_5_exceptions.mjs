import fs from 'node:fs';

const log = fs.readFileSync('C:/Users/yugme/.gemini/antigravity-ide/brain/cedcf934-c9cb-414b-ad3e-85b04a9bb830/.system_generated/tasks/task-474.log', 'utf8');

const idx = log.indexOf('STEP 6 — CONSOLE GATE');
console.log(log.slice(idx - 1000));
