// One-shot media pipeline: rotates the sideways live shots, converts the new
// photos from /images into web-sized JPEGs in /public/media, and turns the
// white-on-black logo PNG into a white-on-transparent PNG.
import sharp from 'sharp';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const IMAGES = path.join(root, 'images');
const MEDIA = path.join(root, 'public', 'media');

const MAX_W = 1920;
const JPEG_OPTS = { quality: 82, mozjpeg: true };

async function rotate90(file) {
  const p = path.join(MEDIA, file);
  const buf = await sharp(p).rotate(90).jpeg(JPEG_OPTS).toBuffer();
  await sharp(buf).toFile(p);
  console.log(`rotated 90cw  ${file}`);
}

async function convert(srcName, outName) {
  const src = path.join(IMAGES, srcName);
  const out = path.join(MEDIA, outName);
  try {
    await sharp(src)
      .rotate() // respect EXIF orientation
      .resize({ width: MAX_W, height: MAX_W, fit: 'inside', withoutEnlargement: true })
      .jpeg(JPEG_OPTS)
      .toFile(out);
    console.log(`converted     ${srcName} -> ${outName}`);
  } catch (err) {
    console.error(`FAILED        ${srcName}: ${err.message}`);
  }
}

async function logoToTransparent() {
  const src = path.join(IMAGES, 'LCDJLOGO.png');
  const out = path.join(MEDIA, 'lcdj-logo.png');
  const { data, info } = await sharp(src)
    .resize({ width: 1600 })
    .greyscale()
    .raw()
    .toBuffer({ resolveWithObject: true });
  // white fill, luminance becomes alpha -> black background disappears
  const rgba = Buffer.alloc(info.width * info.height * 4);
  for (let i = 0; i < info.width * info.height; i++) {
    rgba[i * 4] = 255;
    rgba[i * 4 + 1] = 255;
    rgba[i * 4 + 2] = 255;
    rgba[i * 4 + 3] = data[i];
  }
  await sharp(rgba, { raw: { width: info.width, height: info.height, channels: 4 } })
    .trim({ threshold: 10 })
    .png()
    .toFile(out);
  console.log('logo          LCDJLOGO.png -> lcdj-logo.png (transparent)');
}

await rotate90('live-04.jpg');
await rotate90('live-05.jpg');
await rotate90('live-06.jpg');

await convert('Blake Profile.JPEG', 'blake.jpg');
await convert('Cade Profile.JPEG', 'cade.jpg');
await convert('IMG_0618 (2).JPG', 'party-house.jpg');
await convert('IMG_1168 (2).JPG', 'boat-decks.jpg');
await convert('IMG_1170 (2).JPG', 'trio-boat.jpg');
await convert('IMG_1621.JPG', 'rig-purple.jpg');
await convert('IMG_6589 (2).JPEG', 'pub-decks.jpg');
await convert('IMG_1405 (2).HEIC', 'heic-extra.jpg'); // may fail: HEIC support varies

await logoToTransparent();
console.log('done');
