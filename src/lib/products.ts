/**
 * Single source of truth del producto, el grupo y los datos de cobro.
 * Nada de esto se hardcodea en componentes.
 */

/** Precio de un nivel (un mes). Confirmado por María Pía el 2026-08-06. */
const PRICE_ARS = 40000;

/**
 * Pack de 3 niveles.
 * TODO(precio): María Pía propuso $130.000, pero 3 meses sueltos cuestan
 * $120.000 — el pack saldría MÁS CARO y no puede anunciarse como descuento
 * (art. 8 Ley 24.240). Propuesta pendiente de aprobación: $99.000 (17,5% off).
 * Ver docs/estrategia/10-planes-y-niveles.md §2. No mostrar hasta resolverlo.
 */
const PACK_PRICE_ARS = 99000;
const PACK_PRICE_CONFIRMED = false;

export type GroupStatus = "open" | "waitlist" | "closed";

export interface Challenge {
  id: string;
  name: string;
  shortName: string;
  duration: string;
  promise: string;
  forWhom: string;
  priceARS: number;
  includes: readonly string[];
}

export const CHALLENGE: Challenge = {
  id: "reto-28-dias",
  name: "Reto 28 Días",
  shortName: "el Reto",
  duration: "28 días",
  promise:
    "Volver a entrenar y comer bien con tres sesiones por semana, sin renunciar a tu trabajo ni a tu vida.",
  forWhom:
    "Mujeres que trabajan ocho horas o más y quieren sostener hábitos sin que les coma el día.",
  priceARS: PRICE_ARS,
  /**
   * TODO(alcance): sólo los dos primeros puntos están confirmados por María Pía.
   * El resto son propuestas nuestras pendientes de validar — especialmente la
   * llamada 1:1 y la guía de nutrición, que podrían pertenecer únicamente a la
   * asesoría. Ver docs/estrategia/10-planes-y-niveles.md §3.
   * NO PUBLICAR hasta confirmarlas una por una.
   */
  includes: [
    "3 sesiones por semana de 50 a 60 minutos",
    "Cada rutina en dos versiones: gimnasio y casa",
    "Corrección de técnica por video",
    "Biblioteca de ejercicios en video, con variantes fácil y difícil",
    "Comunidad privada con tu grupo",
    "Planilla de seguimiento y check-in diario",
  ],
} as const;

/** Cuántas sesiones tiene un nivel. TODO(producto): confirmar con María Pía. */
export const SESSIONS_PER_LEVEL = 12;

/**
 * Reglas de acceso al pack de 3 niveles.
 * Ver docs/estrategia/10-planes-y-niveles.md §5.
 */
export const LEVEL_ACCESS = {
  totalLevels: 3,
  /** Porcentaje del nivel anterior que hay que completar para desbloquear el siguiente. */
  unlockThresholdPct: 80,
  /** Meses desde la compra para usar los 3 niveles. */
  windowMonths: 6,
  /** Días de pausa que se pueden pedir una vez, sin justificar. */
  pauseDays: 30,
} as const;

export interface Plan {
  id: string;
  name: string;
  priceARS: number;
  /** Si es false, no se muestra en la web. */
  visible: boolean;
  summary: string;
}

/**
 * Formas de comprar. El pack queda oculto hasta que se resuelva su precio.
 * La asesoría 1:1 se vende sólo por WhatsApp, sin precio público.
 */
export const PLANS: Plan[] = [
  {
    id: "nivel-mensual",
    name: "Un nivel",
    priceARS: PRICE_ARS,
    visible: true,
    summary: "Pagás un nivel. Al completarlo podés seguir con el siguiente.",
  },
  {
    id: "pack-3-niveles",
    name: "Los 3 niveles",
    priceARS: PACK_PRICE_ARS,
    visible: PACK_PRICE_CONFIRMED,
    summary: `Los 3 niveles, que se desbloquean a medida que los completás. Tenés ${LEVEL_ACCESS.windowMonths} meses para usarlos.`,
  },
];

export const VISIBLE_PLANS = PLANS.filter((plan) => plan.visible);

/**
 * Cadencia entre grupos. Con 14 días nadie espera más de 13 días para
 * empezar y el promedio de espera es de 7. Ver docs/estrategia/08-grupos-y-cadencia.md
 */
export const GROUP_CADENCE_DAYS = 14;

/**
 * Estado del grupo activo.
 * Cambiar `status` a "waitlist" entre grupos: todos los CTA del sitio se adaptan solos.
 */
export interface Group {
  status: GroupStatus;
  label: string;
  /** Marca el lanzamiento fundacional: cambia el copy y habilita el badge. */
  isFounding: boolean;
  /** Texto que se muestra en la web. */
  startsAt: string;
  closesAt: string;
  /** Formato YYYY-MM-DD, sólo para datos estructurados. */
  startsAtISO: string;
  spotsTotal: number;
  spotsLeft: number;
}

// TODO(grupo): completar con las fechas reales antes del lanzamiento.
export const GROUP: Group = {
  status: "open",
  label: "Grupo fundador",
  isFounding: true,
  startsAt: "lunes 7 de septiembre",
  closesAt: "viernes 4 de septiembre",
  startsAtISO: "2026-09-07",
  spotsTotal: 25,
  spotsLeft: 25,
};

/**
 * Garantía comercial alineada con el derecho de revocación del art. 34 de la
 * Ley 24.240 (10 días corridos, irrenunciable). Al coincidir ambos plazos no
 * hay letra chica que explicar ni riesgo de incumplimiento.
 */
export const GUARANTEE = {
  days: 10,
  headline: "10 días de garantía",
  summary:
    "Entrás, lo probás, y si no es para vos me escribís antes del día 10 y te devuelvo el 100%. Sin explicaciones ni condiciones.",
} as const;

/**
 * Datos de la cuenta para transferencia.
 * TODO(cobro): completar con los datos reales antes de publicar.
 */
export const TRANSFER = {
  alias: "MP.CEP.RETO",
  cbu: "0000000000000000000000",
  holder: "María Pía",
  bank: "",
  responseWindow: "menos de 2 horas",
} as const;

const ARS_FORMATTER = new Intl.NumberFormat("es-AR", {
  style: "currency",
  currency: "ARS",
  maximumFractionDigits: 0,
});

export function formatARS(amount: number): string {
  return ARS_FORMATTER.format(amount);
}

export const isGroupOpen = GROUP.status === "open";

export const CTA_LABEL = isGroupOpen
  ? "Quiero entrar al reto"
  : "Anotarme para la próxima";
