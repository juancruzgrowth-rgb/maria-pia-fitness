/**
 * Single source of truth del producto, el grupo y los datos de cobro.
 * Nada de esto se hardcodea en componentes.
 */

/** Precio de un nivel (un mes). Confirmado por María Pía el 2026-08-06. */
const PRICE_ARS = 40000;

/**
 * Pack de 3 niveles. Confirmado el 2026-08-13.
 * Los $130.000 que se habían hablado costaban MÁS que 3 niveles sueltos
 * ($120.000) y no podían anunciarse como descuento sin incurrir en publicidad
 * engañosa (art. 8 Ley 24.240). Ver docs/estrategia/10-planes-y-niveles.md §2.
 */
const PACK_PRICE_ARS = 99000;

/** Descuento real del pack contra pagar nivel por nivel. Se calcula, no se afirma. */
export const PACK_DISCOUNT_PCT = Math.round(
  (1 - PACK_PRICE_ARS / (PRICE_ARS * 3)) * 100,
);

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
  /** Alcance confirmado punto por punto con María Pía el 2026-08-13. */
  includes: [
    "3 sesiones por semana de 50 a 60 minutos",
    "Cada rutina en dos versiones: gimnasio y casa",
    "Llamada 1:1 de bienvenida en la Semana 0",
    "Sesión grupal de corrección de técnica, todos los viernes",
    "Guía de nutrición del reto, igual para todo el grupo",
    "Biblioteca de ejercicios en video, con variantes fácil y difícil",
    "Comunidad privada en Skool y grupo de WhatsApp",
    "Planilla de seguimiento y check-in diario",
  ],
} as const;

/** 3 sesiones por semana durante 4 semanas. Confirmado el 2026-08-13. */
export const SESSIONS_PER_LEVEL = 12;

/**
 * Día fijo de la sesión grupal de corrección de técnica. Se hace después de
 * que todas completaron sus 3 sesiones de la semana.
 * TODO(operativa): confirmar el horario exacto con María Pía.
 */
export const TECHNIQUE_SESSION = {
  day: "viernes",
  durationMinutes: 60,
} as const;

/**
 * Reglas de acceso al pack de 3 niveles. Confirmadas el 2026-08-13.
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

/** Formas de comprar el reto. La asesoría 1:1 no entra acá: se vende aparte. */
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
    visible: true,
    summary: `Los 3 niveles, que se desbloquean a medida que los completás. Tenés ${LEVEL_ACCESS.windowMonths} meses para usarlos.`,
  },
];

export const VISIBLE_PLANS = PLANS.filter((plan) => plan.visible);

/**
 * Asesoría 1:1. Producto de ticket alto, mensual y personalizado.
 *
 * Decisión comercial (2026-08-13): NO se publica el precio en la web. A este
 * ticket la venta necesita conversación, y mostrar $280.000 al lado de $40.000
 * convierte al reto en "la opción barata" en vez de "la opción correcta".
 * Los precios viven acá igual porque este archivo es el single source of truth,
 * pero ningún componente los renderiza.
 */
export const ADVISORY = {
  name: "Asesoría 1:1",
  priceARS: 280000,
  priceWithNutritionARS: 350000,
  /** Arranca en 5 para medir la carga real de atención antes de escalar. */
  spotsTotal: 5,
  showPrice: false,
  includes: [
    "Plan de entrenamiento armado para tu caso, con más días por semana",
    "Objetivos puntuales más allá de la recomposición corporal",
    "Plan de nutrición personalizado (opcional)",
    "Corrección de ejercicios por WhatsApp",
    "Consultas ilimitadas por WhatsApp",
    "Llamada 1:1 a los 20 días de arrancar",
  ],
} as const;

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
