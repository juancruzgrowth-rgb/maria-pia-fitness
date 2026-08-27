/**
 * Testimonios reales de clientas de Pía: capturas de WhatsApp, sin retocar.
 *
 * Las imágenes de `public/images/testimonios/` están normalizadas a un lienzo
 * cuadrado de 1080×1080 del color de marca, con la captura centrada. Las
 * capturas originales tienen proporciones muy distintas entre sí; el lienzo
 * común es lo que hace que en la fila se vean todas iguales.
 *
 * `quote` no se muestra en pantalla —el texto ya está en la captura— pero es
 * el `alt` de cada imagen: es lo que escucha un lector de pantalla y lo que
 * lee Google. Transcribe el mensaje, no lo interpreta.
 *
 * El orden es el de la fila. Está alternado a propósito: los mensajes que
 * hablan del problema real —el tiempo, la constancia, sostenerlo— van
 * primero, y los largos se intercalan con los cortos para que la fila no sea
 * un muro de texto.
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
    slug: "lo-que-buscaba-en-rosario",
    quote:
      "Estoy re contenta: Pía, eras lo que tanto estaba buscando acá en Rosario.",
  },
  {
    slug: "entrene-un-domingo",
    quote:
      "Sábado y domingo entrené en casa, adapté algunos ejercicios pero hice todo. Jamás en mi vida entrené un domingo: imaginate lo motivada que estoy.",
  },
  {
    slug: "amo-el-plan",
    quote:
      "Amo el plan y la rutina, me es súper simple llevarla a cabo, y además veo resultados. Es ideal para sostenerlo en el tiempo: si no, sería imposible vivir a dieta.",
  },
  {
    slug: "nunca-con-esta-continuidad",
    quote:
      "Sigo re motivada. Las ganas me siguen cautivando. Nunca había entrenado así, con esta continuidad.",
  },
  {
    slug: "tres-kilos-en-mes-y-medio",
    quote: "Me pesé recién: llevo bajados 3,300 kilos en menos de un mes y medio.",
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
    slug: "el-pantalon-de-montar",
    quote:
      "Mis caderas, no puedo creer: justamente ese pantalón de montar que está siempre ahí.",
  },
  {
    slug: "catorce-kilos",
    quote:
      "Había subido muchísimo de peso y me sentía muy mal conmigo misma. Gracias a la paciencia y al amor con el que me trataste pude avanzar y bajar 14 kilos.",
  },
  {
    slug: "comia-sin-hambre",
    quote:
      "Me daba cuenta de que comía sin hambre. Ahora me acostumbré, y me llena más la comida que las porquerías que comía antes.",
  },
  {
    slug: "kilo-y-medio-en-nueve-dias",
    quote:
      "Te quería contar que me fui a pesar y bajé 1,5 kilos en 9 días. No sé si es mucho o poco, pero a mí me pone re feliz.",
  },
  {
    slug: "de-84-a-71",
    quote:
      "Peso 71. El año pasado pesaba 84. Anoche era un lujo mi heladera, con todos los tuppers listos.",
  },
  {
    slug: "mas-que-el-fisico",
    quote:
      "Nunca había visto un cambio tan grande en el físico. Y no es sólo el cambio físico: fue volvernos fuertes, por esos días en que creíamos que no íbamos a poder y ahí estuvimos.",
  },
  {
    slug: "estoy-feliz",
    quote:
      "Las piernas me bajaron un montón, y los brazos. Me cambió la piel y el abdomen. Yo estoy feliz, re agradecida.",
  },
  {
    slug: "la-clave-es-comer-bien",
    quote:
      "La adiposidad es lo que me costaba combatir siempre. Pero la clave es comer bien.",
  },
  {
    slug: "comida-organizada",
    quote:
      "Un día sos joven y al otro resulta que el placer más grande te lo da tener organizada la comida de la semana.",
  },
  {
    slug: "nunca-baje-tan-rapido",
    quote:
      "Yo nunca bajé tan rápido ni reduje celulitis. Ayer me miraba de costado en malla y me cambió la piel.",
  },
] as const;
