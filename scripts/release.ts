import { execSync } from 'node:child_process';
import { readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const ROOT = join(import.meta.dirname, '..');
const part = process.argv[2];

if (part !== 'patch' && part !== 'minor' && part !== 'major') {
  console.error('Usage: yarn release <patch|minor|major>');
  process.exit(1);
}

const pkgPath = join(ROOT, 'package.json');
const manifestPath = join(ROOT, 'src/manifest.json');

const pkg = JSON.parse(await readFile(pkgPath, 'utf-8')) as { version: string };
const manifest = JSON.parse(await readFile(manifestPath, 'utf-8')) as { version: string };

const [maj, min, pat] = pkg.version.split('.').map(Number) as [number, number, number];
const newVersion =
  part === 'patch' ? `${maj}.${min}.${pat + 1}` : part === 'minor' ? `${maj}.${min + 1}.0` : `${maj + 1}.0.0`;

pkg.version = newVersion;
manifest.version = newVersion;

await writeFile(pkgPath, `${JSON.stringify(pkg, null, 2)}\n`);
await writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);

execSync('yarn format', { cwd: ROOT, stdio: 'inherit' });

const status = execSync('git status --porcelain', { cwd: ROOT }).toString().trim();
if (!status) {
  console.error('Nothing to commit. Did the version actually change?');
  process.exit(1);
}

execSync('git add package.json src/manifest.json', { cwd: ROOT, stdio: 'inherit' });
execSync(`git commit -m "chore(release): v${newVersion}"`, { cwd: ROOT, stdio: 'inherit' });
execSync(`git tag v${newVersion}`, { cwd: ROOT, stdio: 'inherit' });

console.log(`\nReleased v${newVersion}.`);
console.log(`Run: git push origin main --follow-tags`);
console.log(`That will trigger the GitHub Actions release workflow.`);
