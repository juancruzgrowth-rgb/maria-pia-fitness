import { publicEnv } from "@/lib/env";
import { CHALLENGE, CTA_LABEL, isGroupOpen } from "@/lib/products";

export const SITE = {
  brand: "MP — Centro de Entrenamiento Personalizado",
  shortBrand: "MP CEP",
  tagline: "Entrenamiento online para mujeres con poco tiempo.",
  ownerName: "María Pía",
  city: "Rosario, Santa Fe",
  country: "Argentina",
  email: "hola@mpcep.com",
  fiscalName: "María Pía — MP Centro de Entrenamiento Personalizado",
} as const;

export const NAV_SECTIONS = [
  { id: "el-reto", label: "El reto" },
  { id: "que-recibis", label: "Qué recibís" },
  { id: "testimonios", label: "Testimonios" },
  { id: "sobre-mi", label: "Sobre mí" },
  { id: "faq", label: "Preguntas" },
] as const;

const cleanedNumber = publicEnv.whatsappNumber.replace(/[^\d]/g, "");

function waLink(message: string): string {
  if (!cleanedNumber) return "#";
  return `https://wa.me/${cleanedNumber}?text=${encodeURIComponent(message)}`;
}

/** Mensaje del botón de consulta general. */
const ASK_MESSAGE = `Hola María Pía! Vi la web del ${CHALLENGE.name} y tengo una consulta antes de entrar.`;

/**
 * Mensaje precargado para enviar el comprobante de transferencia.
 * Pide nombre y email explícitamente: sin esos datos la automatización
 * no puede dar el acceso a Skool.
 */
const RECEIPT_MESSAGE = [
  `Hola María Pía! Quiero entrar al ${CHALLENGE.name}.`,
  "Ya hice la transferencia y te adjunto el comprobante.",
  "",
  "Mi nombre:",
  "Mi email:",
  "Plan (un nivel / los 3 niveles):",
].join("\n");

/** Mensaje para anotarse en la lista de espera entre grupos. */
const WAITLIST_MESSAGE = `Hola María Pía! Quiero anotarme para el próximo grupo del ${CHALLENGE.name}.`;

/**
 * Consulta por la asesoría 1:1. No se publica precio: la conversación
 * arranca por acá. Ver ADVISORY en @/lib/products.
 */
const ADVISORY_MESSAGE = `Hola María Pía! Me interesa la asesoría 1:1 y quiero saber cómo funciona y cuánto sale.`;

export const CONTACT = {
  whatsappNumber: cleanedNumber,
  askUrl: waLink(ASK_MESSAGE),
  receiptUrl: waLink(RECEIPT_MESSAGE),
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
 * Único CTA de compra del sitio. Si el grupo está cerrado apunta a la
 * lista de espera en lugar de a la página de compra.
 */
export const PRIMARY_CTA = {
  label: CTA_LABEL,
  href: isGroupOpen ? "/comprar" : CONTACT.waitlistUrl,
} as const;
