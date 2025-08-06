import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Emulate __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const huskyDir = path.resolve(__dirname, '../.husky/_/');

const hooks = {
  'commit-msg': `#!/bin/sh
yarn commitlint --edit "$1"
`,
  'pre-push': `#!/bin/sh
echo "🐶 Husky pre-push running!"
sh scripts/validate-branch-name.sh
`,
  'pre-commit': `#!/bin/sh
echo "🐶 Husky pre-commit running!"
npx lint-staged
sh scripts/validate-branch-name.sh
`,
};

for (const [hookName, content] of Object.entries(hooks)) {
  const hookPath = path.join(huskyDir, hookName);
  fs.writeFileSync(hookPath, content, { mode: 0o755 });
}
