/**
 * Genera la imagen que se ve al compartir el link (WhatsApp, Instagram, X).
 * Se corre a mano, no en el build:
 *
 *   node scripts/prep-og.mjs
 *
 * Es el monograma P│M centrado en un lienzo cuadrado del color de marca.
 * Cuadrado a propósito: WhatsApp arma la tarjeta compacta con la miniatura al
 * costado, que es como se lee la marca sin depender de que el texto de la
 * pieza entre en la previsualización.
 */
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve(import.meta.dirname, "..");
const MONOGRAM_SVG = path.join(ROOT, "public/brand/logo-monograma.svg");
const CANVAS = "#F5F5F2";
const SIZE = 1200;
/** El monograma ocupa el 70% del lienzo: el resto es aire, como en el icono. */
const MARK_SIZE = Math.round(SIZE * 0.7);
const TARGETS = [
  path.join(ROOT, "src/app/opengraph-image.png"),
  path.join(ROOT, "src/app/twitter-image.png"),
];

const mark = await sharp(await readFile(MONOGRAM_SVG))
  .resize(MARK_SIZE, MARK_SIZE, { fit: "contain", background: "#00000000" })
  .toBuffer();

const png = await sharp({
  create: {
    width: SIZE,
    height: SIZE,
    channels: 3,
    background: CANVAS,
  },
})
  .composite([{ input: mark, gravity: "centre" }])
  .png()
  .toBuffer();

for (const target of TARGETS) {
  await writeFile(target, png);
  console.log(`escrito ${path.relative(ROOT, target)} (${SIZE}x${SIZE})`);
}
