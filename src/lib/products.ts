/**
 * Single source of truth del producto, el precio y los datos de cobro.
 * Nada de esto se hardcodea en componentes.
 */

/**
 * Precio de un nivel (28 días). Confirmado por Pía el 2026-08-18.
 * Es el precio fundador: rige hasta la fecha de FOUNDING.endsAt y después sube.
 * Ver FOUNDING más abajo — la fecha es una promesa pública y hay que cumplirla.
 */
const PRICE_ARS = 55000;

/**
 * Pack de 3 niveles. Confirmado el 2026-08-18.
 * 3 x $55.000 = $165.000 comprando nivel por nivel, contra $130.000 el pack.
 * El descuento es real y por eso se puede anunciar sin violar el art. 8 de la
 * Ley 24.240. Nunca fijar este precio por encima de PRICE_ARS * 3.
 */
const PACK_PRICE_ARS = 130000;

/** Descuento real del pack contra pagar nivel por nivel. Se calcula, no se afirma. */
export const PACK_DISCOUNT_PCT = Math.round(
  (1 - PACK_PRICE_ARS / (PRICE_ARS * 3)) * 100,
);

/**
 * El método. Naming aprobado el 2026-08-17 (propuesta de Daiana).
 *
 * Arquitectura de marca: el método está POR ENCIMA de la oferta. "Reto 28 Días"
 * es lo que se compra; "Mi Método 4F" es el sistema, y sobrevive a que el reto
 * cambie de formato o de duración. Ver docs/estrategia/11-metodo-4f.md.
 *
 * El "Mi" es la firma de Pía: funciona cuando habla ella, no en un botón
 * de compra. Los CTA siguen hablando del reto.
 */
export const METHOD = {
  name: "Mi Método 4F",
  /**
   * TODO(B13): la presentación de naming afirma que los 4F son "los ejes reales
   * de cada rutina". Hasta que Pía confirme que cada rutina mapea a los
   * cuatro pilares, el copy los presenta como los principios que guían el
   * método — no como los bloques de cada sesión.
   */
  pillars: [
    {
      id: "fuerza",
      name: "Fuerza",
      body: "Levantar más de lo que levantabas hoy. Músculo, densidad ósea y un cuerpo que aguanta.",
    },
    {
      id: "funcion",
      name: "Función",
      body: "Que el cuerpo sirva para tu vida real: cargar las bolsas, subir escaleras, agacharte sin crujir.",
    },
    {
      id: "flexibilidad",
      name: "Flexibilidad",
      body: "Movilidad y rango de movimiento. La parte que todo el mundo saltea y después extraña.",
    },
    {
      id: "foco",
      name: "Foco",
      body: "La cabeza. Sostener el hábito el día que el trabajo se puso en contra y no querés saber nada.",
    },
  ],
} as const;

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
   * Alcance actualizado el 2026-08-18. Se cayeron la llamada 1:1 de bienvenida
   * y la sesión grupal de los viernes: el reto pasa a ser 100% grabado y
   * asincrónico, y la corrección de técnica se hace por Skool. Es lo que hace
   * posible que cada clienta arranque el día que compra en vez de esperar a
   * que se arme un grupo.
   */
  includes: [
    "3 sesiones por semana de 50 a 60 minutos",
    "Cada rutina en dos versiones: gimnasio y casa",
    "Videos donde Pía explica el método y cómo usar todo",
    "Corrección de técnica: subís tu video a Skool y te responde Pía",
    "Guía de nutrición del reto",
    "Biblioteca de ejercicios en video, con variantes fácil y difícil",
    "Comunidad privada en Skool y grupo de WhatsApp",
    "Planilla de seguimiento y check-in diario",
  ],
} as const;

/** 3 sesiones por semana durante 4 semanas. Confirmado el 2026-08-13. */
export const SESSIONS_PER_LEVEL = 12;

/**
 * Reglas de acceso al pack de 3 niveles. Confirmadas el 2026-08-13,
 * ratificadas el 2026-08-18 al sacar las cohortes.
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

/**
 * Renovación mensual del plan de un nivel. Confirmado el 2026-08-18.
 *
 * No hay débito automático: el cobro es por transferencia, así que la
 * renovación la sostiene la automatización de recordatorios. Estos números
 * son los que consume el flujo A27 — cambiarlos acá los cambia allá.
 */
export const RENEWAL = {
  /** Días desde el alta en los que se avisa que se vence el acceso. */
  reminderDays: [25, 28],
  /** Tolerancia después del vencimiento. Confirmado el 2026-08-18: el corte es el día 30. */
  graceDays: 2,
  /** Duración del acceso pagado, en días. */
  accessDays: 28,
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
 * Formas de comprar el reto. La asesoría 1:1 no entra acá: se vende aparte.
 *
 * Los `id` los usa la automatización de cobro para calcular el monto de cada
 * venta (ver docs/setup/n8n/). No renombrarlos sin actualizar los flujos.
 */
export const PLANS: Plan[] = [
  {
    id: "nivel-mensual",
    name: "Un nivel",
    priceARS: PRICE_ARS,
    visible: true,
    summary:
      "Pagás 28 días. Al completarlo podés renovar y seguir con el siguiente nivel.",
  },
  {
    id: "pack-3-niveles",
    name: "Los 3 niveles",
    priceARS: PACK_PRICE_ARS,
    visible: true,
    summary: `Los 3 niveles pagos de una vez, sin renovar cada mes. Se desbloquean a medida que los completás y tenés ${LEVEL_ACCESS.windowMonths} meses para usarlos.`,
  },
];

export const VISIBLE_PLANS = PLANS.filter((plan) => plan.visible);

/**
 * Asesoría 1:1. Producto de ticket alto, mensual y personalizado.
 *
 * Decisión comercial (2026-08-13): NO se publica el precio en la web. A este
 * ticket la venta necesita conversación, y mostrar $280.000 al lado de $55.000
 * convierte al reto en "la opción barata" en vez de "la opción correcta".
 * Los precios viven acá igual porque este archivo es el single source of truth,
 * pero ningún componente los renderiza.
 *
 * Lo que separa la asesoría del reto (2026-08-18): acá el plan se arma para tu
 * caso y Pía te atiende por WhatsApp de forma directa. En el reto el plan es
 * el mismo para todas y la consulta va a Skool. Si esa línea se borra, la
 * asesoría deja de justificar su precio.
 */
export const ADVISORY = {
  name: "Asesoría 1:1",
  priceARS: 280000,
  priceWithNutritionARS: 350000,
  /** Mensual, como el reto. Arranca en 5 lugares para medir la carga real. */
  spotsTotal: 5,
  showPrice: false,
  includes: [
    "Plan de entrenamiento armado para tu caso, con más días por semana",
    "Objetivos puntuales más allá de la recomposición corporal",
    "Plan de nutrición personalizado (opcional)",
    "Corrección de ejercicios por WhatsApp, directo conmigo",
    "Consultas ilimitadas por WhatsApp",
    "Llamada 1:1 a los 20 días de arrancar",
  ],
} as const;

/**
 * Precio fundador. Reemplaza a las cohortes como motor de urgencia.
 *
 * Se sacaron los grupos el 2026-08-18: sin llamada de bienvenida ni sesión
 * grupal, un grupo no compartía nada más que la fecha de inicio, y esa fecha
 * costaba hasta 13 días de espera entre que alguien decidía comprar y podía
 * empezar. Ahora cada clienta arranca el día que paga.
 *
 * Eso deja la oferta sin escasez, y sin escasez no hay razón para comprar hoy.
 * La reemplaza una fecha: hasta `endsAt` el reto sale PRICE_ARS y después sube.
 * Es verdadero y verificable, a diferencia de un cupo inventado.
 *
 * TODO(B19): confirmar con Pía a cuánto sube el 1 de octubre. Propuesto el
 * 2026-08-18: **$69.000 el nivel y $165.000 el pack** — es +25% sobre el precio
 * fundador, que es el rango donde una suba se lee como "me perdí la promo", y
 * mantiene el descuento del pack en 20% exacto (3 x 69.000 = 207.000).
 *
 * No se publica el precio futuro —no hace falta— pero la suba tiene que ocurrir
 * de verdad: si el precio fundador no vence nunca, es publicidad engañosa
 * (art. 8 Ley 24.240) y además la próxima fecha no se la cree nadie.
 */
export const FOUNDING = {
  active: true,
  label: "Precio fundador",
  /** Cómo se escribe la fecha en la web. */
  endsAt: "30 de septiembre",
  /** Formato YYYY-MM-DD, para datos estructurados. */
  endsAtISO: "2026-09-30",
} as const;

/**
 * Interruptor de venta. Con arranque inmediato la inscripción está siempre
 * abierta; esto queda como corte manual para cuando Pía no dé abasto.
 * En false, todos los CTA del sitio pasan a la lista de espera solos.
 */
export const ENROLLMENT_OPEN = true;

/**
 * Derecho de revocación del art. 34 de la Ley 24.240: 10 días corridos en toda
 * compra a distancia, IRRENUNCIABLE.
 *
 * Decisión comercial del 2026-08-18: la garantía deja de ser argumento de venta
 * y desaparece del marketing. El derecho legal no desaparece —no se puede— y
 * sigue escrito en los Términos y Condiciones, que es donde corresponde.
 *
 * Esta constante se usa ÚNICAMENTE en /terminos-condiciones. Si aparece en una
 * sección de venta, alguien volvió a convertirla en promesa.
 */
export const WITHDRAWAL_RIGHT = {
  days: 10,
  law: "art. 34, Ley 24.240",
} as const;

/**
 * Datos de la cuenta para transferencia.
 * TODO(B2): completar con los datos reales antes de publicar.
 */
export const TRANSFER = {
  alias: "MP.CEP.RETO",
  cbu: "0000000000000000000000",
  holder: "Pía",
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

export const CTA_LABEL = ENROLLMENT_OPEN
  ? "Quiero entrar al reto"
  : "Anotarme para la próxima";
