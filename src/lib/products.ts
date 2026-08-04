/**
 * Single source of truth del producto, la cohorte y los datos de cobro.
 * Nada de esto se hardcodea en componentes.
 */

// TODO(precio): valor provisorio a confirmar por María Pía. Cambiar sólo acá.
const PRICE_ARS = 29900;

export type CohortStatus = "open" | "waitlist" | "closed";

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
    "Volver a entrenar y comer bien en 30 minutos por día, sin renunciar a tu trabajo ni a tu vida.",
  forWhom:
    "Mujeres que trabajan ocho horas o más y quieren sostener hábitos sin que les coma el día.",
  priceARS: PRICE_ARS,
  includes: [
    "28 días de entrenamiento guiado, con rutinas de 30 minutos",
    "Llamada 1:1 de bienvenida con María Pía",
    "Corrección de técnica por video, todas las semanas",
    "Guía de nutrición práctica para semanas con poco tiempo",
    "Biblioteca de ejercicios en video, con variantes fácil y difícil",
    "Plan B para los días imposibles: rutinas de 10 minutos",
    "Comunidad privada con el grupo de tu cohorte",
    "Planilla de seguimiento y check-in diario",
  ],
} as const;

/**
 * Cadencia entre cohortes. Con 14 días nadie espera más de 13 días para
 * empezar y el promedio de espera es de 7. Ver docs/estrategia/08-cohortes.md
 */
export const COHORT_CADENCE_DAYS = 14;

/**
 * Estado de la cohorte activa.
 * Cambiar `status` a "waitlist" entre cohortes: todos los CTA del sitio se adaptan solos.
 */
export interface Cohort {
  status: CohortStatus;
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

// TODO(cohorte): completar con las fechas reales antes del lanzamiento.
export const COHORT: Cohort = {
  status: "open",
  label: "Cohorte fundadora",
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

export const isCohortOpen = COHORT.status === "open";

export const CTA_LABEL = isCohortOpen
  ? "Quiero entrar al reto"
  : "Anotarme para la próxima";
