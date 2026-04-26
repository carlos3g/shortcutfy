import { execSync } from 'node:child_process';
import { cp, rm } from 'node:fs/promises';
import { join } from 'node:path';

const ROOT = join(import.meta.dirname, '..');
const SRC = join(ROOT, 'src');
const DIST = join(ROOT, 'dist');

await rm(DIST, { recursive: true, force: true });
await rm(join(ROOT, 'tsconfig.tsbuildinfo'), { force: true });
await rm(join(ROOT, 'tsconfig.build.tsbuildinfo'), { force: true });

execSync('tsc --project tsconfig.build.json', { cwd: ROOT, stdio: 'inherit' });

await cp(join(SRC, 'manifest.json'), join(DIST, 'manifest.json'));
await cp(join(SRC, 'icons'), join(DIST, 'icons'), { recursive: true });

console.log('Build complete: dist/');
