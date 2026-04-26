import { mkdir } from 'node:fs/promises';
import { join } from 'node:path';
import sharp from 'sharp';

const ROOT = join(import.meta.dirname, '..');
const SVG_PATH = join(ROOT, 'src', 'icon.svg');
const OUT_DIR = join(ROOT, 'src', 'icons');
const SIZES = [16, 32, 48, 128];

await mkdir(OUT_DIR, { recursive: true });

await Promise.all(
  SIZES.map((size) =>
    sharp(SVG_PATH)
      .resize(size, size)
      .png({ compressionLevel: 9 })
      .toFile(join(OUT_DIR, `${size}.png`))
  )
);

console.log(`Generated ${SIZES.length} icons in src/icons/`);
