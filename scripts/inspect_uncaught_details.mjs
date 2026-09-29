import fs from 'node:fs';

const log = fs.readFileSync('C:/Users/yugme/.gemini/antigravity-ide/brain/cedcf934-c9cb-414b-ad3e-85b04a9bb830/.system_generated/tasks/task-474.log', 'utf8');

// Find all occurrences of exception
const lines = log.split('\n');
for (const line of lines) {
  if (line.includes('exception') || line.includes('Error:') || line.includes('TypeError')) {
    console.log(line.slice(0, 200));
  }
}
