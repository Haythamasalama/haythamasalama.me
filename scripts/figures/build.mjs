// Regenerates every .excalidraw figure from its script in scripts/figures/<project>/.
// Usage: npm run figures            (all figures)
//        npm run figures -- winch   (only scripts whose path contains "winch")
import { execFileSync } from 'node:child_process';
import { readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const root = import.meta.dirname;
const only = process.argv[2];
const scripts = readdirSync(root)
  .filter(entry => statSync(join(root, entry)).isDirectory())
  .flatMap(project => readdirSync(join(root, project))
    .filter(file => file.endsWith('.mjs'))
    .map(file => join(project, file)))
  .filter(path => !only || path.includes(only));

for (const script of scripts) {
  execFileSync(process.execPath, [join(root, script)], { stdio: 'inherit' });
}

console.log(`${scripts.length} figure(s) built`);
