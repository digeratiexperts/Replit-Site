import sharp from "sharp";
import fs from "fs";
import path from "path";

const srcRoot = "assets/licensed/meshy-batch-01/ORIGINAL";
const outRoot = "client/public/images/visual-system/meshy-batch-01";
const approved = ["endpoint", "email", "network", "backup"];

/** Knock out near-black studio backdrop → real transparency for dark UI. */
async function knockoutBlack(inputPath) {
  const { data, info } = await sharp(inputPath)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const threshold = 28; // keep soft shadow grey on the clay
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    if (r <= threshold && g <= threshold && b <= threshold) {
      data[i + 3] = 0;
    }
  }

  return sharp(data, {
    raw: { width: info.width, height: info.height, channels: 4 },
  });
}

fs.mkdirSync(outRoot, { recursive: true });

for (const slug of approved) {
  const alpha = path.join(srcRoot, slug, `${slug}-preview-alpha.png`);
  const solid = path.join(srcRoot, slug, `${slug}-preview.png`);
  const input = fs.existsSync(alpha) ? alpha : solid;
  const base = path.join(outRoot, slug);
  const meta = await sharp(input).metadata();
  console.log(slug, meta.width, meta.height, "←", input);

  const processed = await knockoutBlack(input);

  await processed
    .clone()
    .resize({ width: 512, height: 512, fit: "inside", withoutEnlargement: true })
    .png({ compressionLevel: 9 })
    .toFile(`${base}.png`);

  await (await knockoutBlack(input))
    .resize({ width: 512, height: 512, fit: "inside", withoutEnlargement: true })
    .webp({ quality: 82, alphaQuality: 90 })
    .toFile(`${base}.webp`);

  await (await knockoutBlack(input))
    .resize({ width: 256, height: 256, fit: "inside", withoutEnlargement: true })
    .webp({ quality: 80, alphaQuality: 90 })
    .toFile(`${base}-256.webp`);

  for (const file of [`${base}.png`, `${base}.webp`, `${base}-256.webp`]) {
    console.log(" ", path.basename(file), fs.statSync(file).size);
  }
}

console.log("done");
