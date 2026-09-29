import fs from 'node:fs';

const log = fs.readFileSync('C:/Users/yugme/.gemini/antigravity-ide/brain/cedcf934-c9cb-414b-ad3e-85b04a9bb830/.system_generated/tasks/task-372.log', 'utf8');

const msgs = Array.from(log.matchAll(/"value":\s*"([^"]+)"/g)).map(m => m[1]);
console.log('Distinct console string values:');
console.log([...new Set(msgs)]);
