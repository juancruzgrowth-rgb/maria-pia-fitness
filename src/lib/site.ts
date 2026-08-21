import { publicEnv } from "@/lib/env";
import { CHALLENGE, CTA_LABEL, ENROLLMENT_OPEN } from "@/lib/products";

/**
 * Identidad de marca. Actualizada el 2026-08-17 con el logotipo nuevo.
 *
 * En el trato hablamos de "Pía" a secas, no de "María Pía": es más cercano y
 * más corto, y es como firma. "Pía Moretto" queda para la marca — la firma
 * completa, el pie de página y los datos legales.
 *
 * TODO(legal): `fiscalName` tiene que ser el nombre que figura en la
 * constancia de AFIP, no el nombre comercial. Confirmar con ella antes de
 * publicar las páginas legales.
 */
export const SITE = {
  brand: "Pía Moretto",
  shortBrand: "Pía Moretto",
  /** Iniciales del monograma. Se usan en el logo y en el favicon. */
  monogram: ["P", "M"],
  tagline: "Entrenamiento online para mujeres con poco tiempo.",
  ownerName: "Pía",
  fullName: "Pía Moretto",
  city: "Rosario, Santa Fe",
  country: "Argentina",
  email: "hola@piamoretto.com",
  fiscalName: "Pía Moretto",
} as const;

export const NAV_SECTIONS = [
  { id: "el-reto", label: "El reto" },
  { id: "que-recibis", label: "Qué recibís" },
  { id: "sobre-mi", label: "Sobre mí" },
  { id: "faq", label: "Preguntas" },
] as const;

const cleanedNumber = publicEnv.whatsappNumber.replace(/[^\d]/g, "");

function waLink(message: string): string {
  if (!cleanedNumber) return "#";
  return `https://wa.me/${cleanedNumber}?text=${encodeURIComponent(message)}`;
}

/** Mensaje del botón de consulta general. */
const ASK_MESSAGE = `Hola Pía! Vi la web del ${CHALLENGE.name} y tengo una consulta antes de entrar.`;

/**
 * Mensaje precargado para pedir ayuda con el pago.
 *
 * Con la suscripción de MercadoPago el alta es automática y este mensaje deja
 * de ser el camino normal de compra: queda para cuando el débito falla o la
 * clienta no puede pagar con MercadoPago.
 */
const PAYMENT_HELP_MESSAGE = [
  `Hola Pía! Quiero entrar al ${CHALLENGE.name} y tuve un problema con el pago.`,
  "",
  "Mi nombre:",
  "Mi email:",
  "Qué me pasó:",
].join("\n");

/**
 * Mensaje para la lista de espera. Con la inscripción siempre abierta esto
 * sólo se usa si ENROLLMENT_OPEN pasa a false porque Pía no da abasto.
 */
const WAITLIST_MESSAGE = `Hola Pía! Quiero anotarme para cuando vuelvan a abrir el ${CHALLENGE.name}.`;

/**
 * Consulta por la asesoría 1:1. No se publica precio: la conversación
 * arranca por acá. Ver ADVISORY en @/lib/products.
 */
const ADVISORY_MESSAGE = `Hola Pía! Me interesa la asesoría 1:1 y quiero saber cómo funciona y cuánto sale.`;

export const CONTACT = {
  whatsappNumber: cleanedNumber,
  askUrl: waLink(ASK_MESSAGE),
  paymentHelpUrl: waLink(PAYMENT_HELP_MESSAGE),
  waitlistUrl: waLink(WAITLIST_MESSAGE),
  advisoryUrl: waLink(ADVISORY_MESSAGE),
  instagramUrl: publicEnv.instagramUrl || "https://www.instagram.com/mp.cep",
  tiktokUrl: publicEnv.tiktokUrl,
  youtubeUrl: publicEnv.youtubeUrl,
  calendlyUrl: publicEnv.calendlyUrl,
  mapsUrl:
    "https://www.google.com/maps/place/MP+Centro+de+Entrenamiento+Personalizado/@-32.8984607,-60.684188,17z",
} as const;

/**
 * Único CTA de compra del sitio. Si la inscripción está cerrada apunta a la
 * lista de espera en lugar de a la página de compra.
 */
export const PRIMARY_CTA = {
  label: CTA_LABEL,
  href: ENROLLMENT_OPEN ? "/comprar" : CONTACT.waitlistUrl,
} as const;
