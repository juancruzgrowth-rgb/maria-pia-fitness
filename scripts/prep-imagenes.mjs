/**
 * Prepara los assets de imagen del sitio. Se corre a mano, no en el build:
 *
 *   node scripts/prep-imagenes.mjs
 *
 * Lee los originales pesados de `images/` (que está en .gitignore) y escribe
 * los archivos servidos en `public/images/`.
 *
 * 1. Retrato de "Sobre mí": recorte 4:5 desde la foto de sesión.
 * 1b. Miniaturas del video: las dos piezas de marca a 1920x1080, que es lo que
 *    el <video> espera. Ver POSTER_WIDTH en `Hero.tsx`. Son dos por art
 *    direction: la de mobile trae el lockup más grande porque ahí la
 *    miniatura se ve a un tercio del tamaño.
 * 2. Testimonios: cada captura de WhatsApp queda centrada en un lienzo
 *    cuadrado del color de marca. Las capturas originales tienen proporciones
 *    muy distintas —desde 2,8:1 hasta 0,68:1—: el lienzo común es lo único
 *    que hace que en la fila de la home se vean todas iguales. No se recorta
 *    nada, así que no se corta ni una línea de texto.
 *
 * Quedan afuera a propósito las capturas de "antes y después" en ropa interior
 * y las fotos sin mensaje: son imágenes identificables de clientas y piden un
 * consentimiento distinto del de un mensaje de texto.
 *
 * Para sumar un testimonio nuevo: dejar la captura en
 * `images/testimonios-originales/`, agregarla a TESTIMONIOS con su slug,
 * correr el script y sumar la transcripción en `src/content/testimonials.ts`.
 *
 * `sharp` no está en package.json: viene con Next.js y sólo se usa acá, fuera
 * del runtime del sitio.
 */
import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const ORIGINALES = path.join(ROOT, "images");
const PUBLICOS = path.join(ROOT, "public/images");

/** mp.canvas — el mismo #F5F5F2 del fondo del sitio. */
const CANVAS = { r: 245, g: 245, b: 242 };
/** Lado del lienzo cuadrado de cada testimonio, en px. */
const LADO = 1080;
/** Aire entre la captura y el borde del lienzo, en px. */
const AIRE = 44;

/** [archivo original, slug del archivo servido] */
const TESTIMONIOS = [
  ["IMG_9864.PNG", "adapta-a-mi"],
  ["IMG_9853.PNG", "sin-excusas-en-casa"],
  ["IMG_9865.PNG", "una-hora-y-listo"],
  ["IMG_9854.PNG", "entrene-un-domingo"],
  ["IMG_9857.PNG", "sin-volver-a-cero"],
  ["IMG_9852.PNG", "miles-de-dietas"],
  ["ABFE826E-6C33-40C8-895B-498847A88778.jpg", "nunca-con-esta-continuidad"],
  ["IMG_9816.PNG", "catorce-kilos"],
  ["IMG_9861.PNG", "de-84-a-71"],
  ["6681B9D7-2B6D-4D9E-8A1E-D1FFB4698E75.jpg", "estoy-feliz"],
  ["IMG_9841.PNG", "amo-el-plan"],
  ["IMG_9845.PNG", "comia-sin-hambre"],
  ["IMG_9813.PNG", "mas-que-el-fisico"],
  ["B631F581-9C3F-4069-BF19-B9F9FE68D125.jpg", "kilo-y-medio-en-nueve-dias"],
  ["703B3E9C-5467-48E3-B78F-FC4EED771C1E.jpg", "nunca-baje-tan-rapido"],
  ["C2A6E5EB-C306-4F99-A6DA-F90C03E2D9A4.jpg", "comida-organizada"],
  ["9C926E04-0AB1-45E4-82CE-C83360AD30FB.jpg", "tres-kilos-en-mes-y-medio"],
  ["IMG_9842.PNG", "el-pantalon-de-montar"],
  ["IMG_9844.PNG", "la-clave-es-comer-bien"],
  ["IMG_9855.PNG", "lo-que-buscaba-en-rosario"],
];

async function retrato() {
  const destino = path.join(PUBLICOS, "sobre-mi.jpg");
  await sharp(path.join(ORIGINALES, "imagenes-nuevas/Pia More-73.jpg"))
    .resize({ width: 1200, height: 1500, fit: "cover" })
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(destino);
  console.log("retrato ->", destino);
}

async function miniaturasVideo() {
  for (const nombre of ["miniatura-presentacion", "miniatura-presentacion-mobile"]) {
    const destino = path.join(PUBLICOS, `${nombre}.jpg`);
    await sharp(path.join(ORIGINALES, `${nombre}.png`))
      .resize({ width: 1920, height: 1080, fit: "cover" })
      .jpeg({ quality: 82, mozjpeg: true })
      .toFile(destino);
    console.log("miniatura ->", destino);
  }
}

async function testimonios() {
  const destinoDir = path.join(PUBLICOS, "testimonios");
  await mkdir(destinoDir, { recursive: true });

  for (const [archivo, slug] of TESTIMONIOS) {
    const captura = await sharp(
      path.join(ORIGINALES, "testimonios-originales", archivo),
    )
      .resize({ width: LADO - AIRE * 2, height: LADO - AIRE * 2, fit: "inside" })
      .toBuffer();

    const destino = path.join(destinoDir, `${slug}.jpg`);
    await sharp({
      create: { width: LADO, height: LADO, channels: 3, background: CANVAS },
    })
      .composite([{ input: captura, gravity: "center" }])
      .jpeg({ quality: 80, mozjpeg: true })
      .toFile(destino);
    console.log("testimonio ->", destino);
  }
}

await retrato();
await miniaturasVideo();
await testimonios();
