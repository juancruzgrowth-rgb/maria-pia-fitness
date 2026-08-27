import { publicEnv } from "@/lib/env";
import { CHALLENGE, CTA_LABEL, ENROLLMENT_OPEN } from "@/lib/products";

/**
 * Identidad de marca. Actualizada el 2026-08-17 con el logotipo nuevo.
 *
 * En el trato hablamos de "Pía" a secas, no de "María Pía": es más cercano y
 * más corto, y es como firma. "Pía Moretto" queda para la marca — la firma
 * completa y el pie de página.
 *
 * `fiscalName` es el nombre de la titular de la cuenta donde cobra, tomado de
 * la constancia de CVU (2026-08-25). Es el que va en las páginas legales y el
 * que la clienta ve al transferir: si los dos no coinciden, la transferencia
 * parece ir a un desconocido.
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
  email: "comunidad.piamoretto@gmail.com",
  fiscalName: "María Pía Moretto",
  /**
   * CUIT de la constancia de CVU. Publicado en las páginas legales por
   * decisión del 2026-08-25: identifica a la responsable del tratamiento
   * (Ley 25.326) y a la prestadora del servicio (Ley 24.240).
   */
  cuit: "27-34820345-8",
  /**
   * Domicilio del centro de entrenamiento, que es el domicilio comercial que
   * se declara en las páginas legales (confirmado 2026-08-25, cierra B29).
   *
   * Sólo calle y número. El código postal va aparte porque el `streetAddress`
   * de schema.org no lo admite: ahí tiene su propia propiedad.
   */
  fiscalAddress: "Av. Carlos Colombres 1450",
  /** Código postal argentino del domicilio de arriba. */
  postalCode: "S2005",
} as const;

/**
 * Domicilio para las páginas legales. Si falta la calle, cae a la ciudad y el
 * texto sigue siendo válido.
 *
 * El CP va pegado a la ciudad y no separado por coma: es como se escribe una
 * dirección en Argentina.
 */
export const LEGAL_ADDRESS = SITE.fiscalAddress
  ? `${SITE.fiscalAddress}, ${SITE.postalCode} ${SITE.city}, ${SITE.country}`
  : `${SITE.city}, ${SITE.country}`;

export const NAV_SECTIONS = [
  { id: "flex-program", label: "El programa" },
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
 * Mensaje del comprobante. Es EL camino de compra: la clienta transfiere y
 * manda el comprobante por acá, y Pía le da el acceso a mano.
 *
 * Los campos van escritos como líneas a completar porque son exactamente los
 * datos que Pía necesita para dar el alta: sin el email no puede invitarla a
 * Skool, y sin el plan no sabe hasta cuándo le corresponde el acceso.
 */
const RECEIPT_MESSAGE = [
  `Hola Pía! Ya hice la transferencia del ${CHALLENGE.name}. Te paso mis datos:`,
  "",
  "Mi nombre:",
  "Mi email:",
  "Plan que elegí:",
  "",
  "(Acá te adjunto el comprobante)",
].join("\n");

/**
 * Mensaje para cuando algo del pago no sale. Queda aparte del comprobante
 * para que Pía distinga de una la venta cerrada del problema a resolver.
 */
const PAYMENT_HELP_MESSAGE = [
  `Hola Pía! Quiero entrar al ${CHALLENGE.name} y tuve un problema con el pago.`,
  "",
  "Mi nombre:",
  "Mi email:",
  "Qué me pasó:",
].join("\n");

/** Pedido de baja. Ver /cancelar: la baja también se procesa a mano. */
const CANCEL_MESSAGE = [
  `Hola Pía! Quiero dar de baja mi acceso al ${CHALLENGE.name}.`,
  "",
  "Mi nombre:",
  "Mi email:",
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
  receiptUrl: waLink(RECEIPT_MESSAGE),
  paymentHelpUrl: waLink(PAYMENT_HELP_MESSAGE),
  cancelUrl: waLink(CANCEL_MESSAGE),
  waitlistUrl: waLink(WAITLIST_MESSAGE),
  advisoryUrl: waLink(ADVISORY_MESSAGE),
  /* La comunidad. El link es publico y estable, asi que va con fallback en
     codigo. Hoy el acceso lo manda Pia a mano por WhatsApp; esto queda para
     que cualquier pantalla que necesite el link no dependa de una variable
     que nadie cargo en Vercel. */
  skoolUrl:
    publicEnv.skoolInviteUrl ||
    "https://www.skool.com/mi-metodo-4f-6827/about",
  whatsappGroupUrl: publicEnv.whatsappGroupUrl,
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
