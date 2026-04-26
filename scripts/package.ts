import { execSync } from 'node:child_process';
import { readFile, rm } from 'node:fs/promises';
import { join } from 'node:path';

const ROOT = join(import.meta.dirname, '..');
const DIST = join(ROOT, 'dist');

const pkg = JSON.parse(await readFile(join(ROOT, 'package.json'), 'utf-8')) as { version: string };
const zipName = `shortcutfy-${pkg.version}.zip`;
const zipPath = join(ROOT, zipName);

execSync('yarn build', { cwd: ROOT, stdio: 'inherit' });

await rm(zipPath, { force: true });
execSync(`zip -r "${zipPath}" .`, { cwd: DIST, stdio: 'inherit' });

console.log(`Created ${zipName}`);
