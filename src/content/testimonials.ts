/**
 * Testimonios reales de clientas de Pía: capturas de WhatsApp, sin retocar.
 *
 * Las imágenes de `public/images/testimonios/` están normalizadas a un lienzo
 * cuadrado de 1080×1080 del color de marca, con la captura centrada. Las
 * capturas originales tienen proporciones muy distintas entre sí; el lienzo
 * común es lo que hace que en la grilla se vean todas iguales.
 *
 * `quote` no se muestra en pantalla —el texto ya está en la captura— pero es
 * el `alt` de cada imagen: es lo que escucha un lector de pantalla y lo que
 * lee Google. Transcribe el mensaje, no lo interpreta.
 */
export interface Testimonial {
  /** Archivo en `public/images/testimonios/`, sin extensión. */
  slug: string;
  /** Transcripción del mensaje. Va como texto alternativo de la captura. */
  quote: string;
}

export const TESTIMONIALS: readonly Testimonial[] = [
  {
    slug: "adapta-a-mi",
    quote:
      "Este plan se adapta a mí. En mi caso: mamá, trabajo 8 horas sentada, estudio y tengo vida social. Más no les puedo pedir.",
  },
  {
    slug: "sin-excusas-en-casa",
    quote:
      "Estoy entusiasmada con el plan. Tener la posibilidad de hacerlo en casa no me deja lugar a excusas si no llego al gimnasio.",
  },
  {
    slug: "una-hora-y-listo",
    quote:
      "Me está gustando muchísimo el método nuevo. En una hora hago todo, y es imposible aburrirte.",
  },
  {
    slug: "entrene-un-domingo",
    quote:
      "Sábado y domingo entrené en casa, adapté algunos ejercicios pero hice todo. Jamás en mi vida entrené un domingo: imaginate lo motivada que estoy.",
  },
  {
    slug: "sin-volver-a-cero",
    quote:
      "Me fui unos días e hice desarreglos. Me pesé y estaba todo igual. Antes, un fin de semana así era volver a cero.",
  },
  {
    slug: "miles-de-dietas",
    quote:
      "Desde los 16 hice miles de dietas y me morí de hambre. Ahora, con 35 años y un nene, bajé medio kilo más y mi piel está mejor cada día.",
  },
  {
    slug: "nunca-con-esta-continuidad",
    quote:
      "Sigo re motivada. Las ganas me siguen cautivando. Nunca había entrenado así, con esta continuidad.",
  },
  {
    slug: "catorce-kilos",
    quote:
      "Había subido muchísimo de peso y me sentía muy mal conmigo misma. Gracias a la paciencia y al amor con el que me trataste pude avanzar y bajar 14 kilos.",
  },
  {
    slug: "de-84-a-71",
    quote:
      "Peso 71. El año pasado pesaba 84. Anoche era un lujo mi heladera, con todos los tuppers listos.",
  },
  {
    slug: "estoy-feliz",
    quote:
      "Las piernas me bajaron un montón, y los brazos. Me cambió la piel y el abdomen. Yo estoy feliz, re agradecida.",
  },
] as const;
