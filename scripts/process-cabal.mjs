// Touch-up pass for the Cabal photo set.
// 1. Regenerate the home background straight from cabalwebsitehome3.png so it
//    keeps its warm orange grade (the earlier copy had a purple cast).
// 2. Pull in the remaining distinct crowd shots from the cabal folder.
// 3. party-01 / booth-pov are phone screenshots: crop the status bar (top) and
//    home indicator (bottom) so only the photo remains.
import sharp from 'sharp';
import { fileURLToPath } from 'node:url';
import { rename } from 'node:fs/promises';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const CABAL = 'C:/Users/Leon/Downloads/cabal';
const MEDIA = path.join(root, 'public', 'media');
const MAX_W = 1920;
const JPEG_OPTS = { quality: 84, mozjpeg: true };

async function convert(srcName, outName) {
  const out = path.join(MEDIA, outName);
  await sharp(path.join(CABAL, srcName))
    .rotate()
    .resize({ width: MAX_W, height: MAX_W, fit: 'inside', withoutEnlargement: true })
    .jpeg(JPEG_OPTS)
    .toFile(out);
  console.log(`converted     ${srcName} -> ${outName}`);
}

// crop top/bottom % off a file that already lives in /media (rewrites in place)
async function cropBars(file, topPct, bottomPct) {
  const p = path.join(MEDIA, file);
  const tmp = path.join(MEDIA, `__tmp_${file}`);
  const meta = await sharp(p).metadata();
  const top = Math.round(meta.height * topPct);
  const bottom = Math.round(meta.height * bottomPct);
  await sharp(p)
    .extract({ left: 0, top, width: meta.width, height: meta.height - top - bottom })
    .jpeg(JPEG_OPTS)
    .toFile(tmp);
  await rename(tmp, p);
  console.log(`cropped       ${file}  (-${topPct * 100}% top / -${bottomPct * 100}% bottom)`);
}

// home background — clean orange master
await convert('cabalwebsitehome3.png', 'home-bg.jpg');
// square brand crop of the same shot for og:image / share cards
await sharp(path.join(CABAL, 'cabalwebsitehome3.png'))
  .resize({ width: 1200, height: 1200, fit: 'cover', position: 'attention' })
  .jpeg(JPEG_OPTS)
  .toFile(path.join(MEDIA, 'brand-square.jpg'));
console.log('converted     cabalwebsitehome3.png -> brand-square.jpg (square)');

// extra distinct crowd shots not already on the site
await convert('IMG_0618.JPG', 'party-06.jpg');     // balcony, blue wash
await convert('IMG_1725 (2).JPEG', 'party-07.jpg'); // blue laser room
await convert('IMG_1760 (2).JPG', 'party-08.jpg');  // disco ball, purple
await convert('IMG_1139 (2).PNG', 'booth-pov.jpg'); // booth POV (screenshot)

// strip the phone status bar / home indicator from the screenshots
await cropBars('booth-pov.jpg', 0.05, 0.03);

console.log('done');
