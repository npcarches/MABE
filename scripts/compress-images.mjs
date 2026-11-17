// Converts master photos in media-src/images into the WebP files the site ships.
// Photos get two widths (600 for grids/thumbnails, 1400 for large views); client logos get one.
// Re-runnable: an output is skipped when it is newer than its source. Runs before every build.
import { readdir, stat, mkdir } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import sharp from 'sharp';

const SRC = 'media-src/images';
const OUT = 'public/images';
const PHOTO_WIDTHS = [600, 1400];
const LOGO_WIDTH = 400;
// Logos actually shown on the site; other clientlogo* files are kept as masters only.
const LOGOS = new Set(['clientlogo1.jpeg', 'clientlogo2-web.png', 'clientlogo3.jpeg']);
const QUALITY = 80;
// Files converted at once; sharp also uses its own threads per file.
const CONCURRENCY = Math.max(1, Math.min(4, os.availableParallelism() - 1));

const mtime = (file) => stat(file).then((s) => s.mtimeMs, () => -1);

/** Writes the WebP outputs for one master file; returns { bytes, written }. */
async function convertFile(file) {
  const isLogo = file.startsWith('clientlogo');
  const src = path.join(SRC, file);
  const { size, mtimeMs } = await stat(src);
  const base = file.replace(/\.[a-z]+$/i, '');
  const outputs = (isLogo ? [LOGO_WIDTH] : PHOTO_WIDTHS).map((w) => ({
    w,
    out: path.join(OUT, isLogo ? `${base}.webp` : `${base}-${w}.webp`),
  }));
  const stale = [];
  for (const o of outputs) if ((await mtime(o.out)) < mtimeMs) stale.push(o);
  if (stale.length) {
    const input = sharp(src);
    await Promise.all(
      stale.map(({ w, out }) =>
        input.clone().resize({ width: w, withoutEnlargement: true }).webp({ quality: QUALITY }).toFile(out),
      ),
    );
  }
  return { bytes: size, written: stale.length };
}

async function main() {
  await mkdir(OUT, { recursive: true });
  const queue = (await readdir(SRC)).filter(
    (f) => /\.(jpe?g|png)$/i.test(f) && (!f.startsWith('clientlogo') || LOGOS.has(f)),
  );
  let before = 0;
  let written = 0;
  const worker = async () => {
    for (let file = queue.pop(); file; file = queue.pop()) {
      const r = await convertFile(file);
      before += r.bytes;
      written += r.written;
    }
  };
  await Promise.all(Array.from({ length: CONCURRENCY }, worker));

  const outFiles = await readdir(OUT);
  const sizes = await Promise.all(outFiles.map((f) => stat(path.join(OUT, f)).then((s) => s.size)));
  const after = sizes.reduce((a, b) => a + b, 0);
  const mb = (n) => (n / 1024 / 1024).toFixed(1) + ' MB';
  console.log(`sources ${mb(before)} → ${outFiles.length} webp files ${mb(after)} (${written} written this run)`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
