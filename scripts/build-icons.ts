import { mkdir } from 'node:fs/promises';
import { join } from 'node:path';
import sharp from 'sharp';

const ROOT = join(import.meta.dirname, '..');
const ICON_SVG = join(ROOT, 'src', 'icon.svg');
const ASSETS = join(ROOT, 'assets');
const ICONS_OUT = join(ROOT, 'src', 'icons');
const SIZES = [16, 32, 48, 128];

await mkdir(ICONS_OUT, { recursive: true });

await Promise.all([
  ...SIZES.map((size) =>
    sharp(ICON_SVG)
      .resize(size, size)
      .png({ compressionLevel: 9 })
      .toFile(join(ICONS_OUT, `${size}.png`))
  ),
  sharp(join(ASSETS, 'promo-tile.svg')).png({ compressionLevel: 9 }).toFile(join(ASSETS, 'promo-tile.png')),
  sharp(join(ASSETS, 'promo-marquee.svg')).png({ compressionLevel: 9 }).toFile(join(ASSETS, 'promo-marquee.png')),
]);

console.log(`Generated ${SIZES.length} icons in src/icons/ and 2 promo tiles in assets/`);
