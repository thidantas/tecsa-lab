import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { Resvg } from '@resvg/resvg-js';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

const brands = [
  { id: 'vita', svg: 'src/brands/vita/vita.svg' },
  { id: 'nexo', svg: 'src/brands/nexo/nexo.svg' },
];

for (const brand of brands) {
  const svg = readFileSync(join(root, brand.svg));
  const png = new Resvg(svg, {
    fitTo: { mode: 'width', value: 320 },
    background: 'rgba(0,0,0,0)',
  })
    .render()
    .asPng();

  const out = join(root, 'src/brands', brand.id, 'splash-icon.png');
  writeFileSync(out, png);
  console.log(out);
}
