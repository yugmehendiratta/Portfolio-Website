import fs from 'node:fs';

const log = fs.readFileSync('C:/Users/yugme/.gemini/antigravity-ide/brain/cedcf934-c9cb-414b-ad3e-85b04a9bb830/.system_generated/tasks/task-187.log', 'utf8');

const idx = log.indexOf('Array(4)');
if (idx !== -1) {
  console.log(log.slice(idx, idx + 2000));
}
