/**
 * Single source of truth del producto, el precio y los datos de cobro.
 * Nada de esto se hardcodea en componentes.
 */

/**
 * Precio mensual de la suscripción. Confirmado por Pía el 2026-08-18.
 * Es el precio fundador: rige para las primeras FOUNDING.spotsTotal clientas
 * y queda congelado para ellas mientras no cancelen. Ver FOUNDING más abajo.
 */
const PRICE_ARS = 55000;

/**
 * El método. Naming aprobado el 2026-08-17 (propuesta de Daiana).
 *
 * Arquitectura de marca: el método está POR ENCIMA de la oferta. "El Reto"
 * es lo que se compra; "Mi Método 4F" es el sistema, y sobrevive a que el reto
 * cambie de formato. Ver docs/estrategia/11-metodo-4f.md.
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
  promise: string;
  forWhom: string;
  priceARS: number;
  includes: readonly string[];
}

/**
 * Naming actualizado el 2026-08-21 por pedido de Pía: se cae "28 días" de todo
 * el copy público. El plan sigue estructurado por bloques mensuales, pero la
 * duración deja de ser la promesa: lo que se compra es un proceso que sigue
 * mientras la clienta avanza de nivel, no un programa que termina.
 * Nombre elegido: "El Reto", a secas.
 */
export const CHALLENGE: Challenge = {
  id: "el-reto",
  name: "El Reto",
  shortName: "el Reto",
  promise:
    "Volver a entrenar y sostenerlo con tres sesiones por semana, sin renunciar a tu trabajo ni a tu vida.",
  forWhom:
    "Mujeres que trabajan ocho horas o más y quieren sostener hábitos sin que les coma el día.",
  priceARS: PRICE_ARS,
  /**
   * Alcance actualizado el 2026-08-21. Salieron la guía de nutrición, la
   * biblioteca de ejercicios y el plan B: no están armados y no se prometen.
   * El entrenamiento asume equipamiento del B2 en adelante —ver EQUIPMENT—
   * y todo el material
   * vive en Skool.
   */
  includes: [
    "3 sesiones por semana, de 30 a 60 minutos cada una",
    "Videos cortos que muestran ejercicio por ejercicio qué hacer ese día",
    "Videos donde Pía explica el método y cómo usar todo",
    "Corrección de técnica: subís tu video a Skool y te responde Pía una vez por semana",
    "Comunidad privada en Skool y grupo de WhatsApp",
    "Planilla de seguimiento y check-in diario",
  ],
} as const;

/**
 * Estructura del plan de entrenamiento. Confirmada por Pía el 2026-08-21.
 *
 * Cada nivel tiene 3 días de entrenamiento y cada día 3 sets de ejercicios.
 * El desbloqueo no va por calendario: cada clienta pasa al siguiente cuando
 * su avance lo justifica. Es lo que sostiene el relato de proceso largo en
 * lugar de programa con fecha de vencimiento.
 *
 * `available` es lo que HOY está cargado en Skool. Si se publica un nivel que
 * no existe, alguien lo va a buscar y no lo va a encontrar: sumar B3 acá
 * recién cuando esté subido.
 */
export const TRAINING = {
  daysPerLevel: 3,
  setsPerDay: 3,
  available: ["B1", "B2"],
  levels: [
    {
      id: "B1",
      name: "B1",
      body: "El punto de partida, para las que recién arrancan. Alterna ejercicios que hacés en casa sin equipamiento con otros de gimnasio.",
    },
    {
      id: "B2",
      name: "B2",
      body: "Bastante más exigente. Acá ya entrenás en el gimnasio, o en casa si tenés equipamiento.",
    },
    {
      id: "B3",
      name: "B3",
      body: "El siguiente escalón, todavía más avanzado. Se suma cuando el grupo llega.",
    },
  ],
} as const;

/**
 * Qué hace falta para entrenar. Corregido el 2026-08-21.
 *
 * ANTES el sitio prometía que cada rutina venía en versión gimnasio y versión
 * casa, y que no hacía falta equipamiento. Es falso de la mitad para arriba:
 * el B1 alterna casa y gimnasio, pero del B2 en adelante la mayoría de los
 * ejercicios necesitan peso. Decirlo de entrada evita la peor devolución
 * posible —alguien que paga y no puede entrenar—. No suavizar este texto.
 */
export const EQUIPMENT = {
  short: "Vas a necesitar gimnasio o equipamiento",
  detail:
    "El B1, que es donde arrancás, alterna ejercicios que hacés en casa sin nada con otros de gimnasio. Del B2 en adelante la mayoría necesita mancuernas, barra o máquinas: lo más simple es entrenar en un gimnasio, y si tenés equipamiento en casa también funciona.",
} as const;

/**
 * Suscripción con débito automático por MercadoPago. Confirmado el 2026-08-21.
 *
 * Reemplaza al cobro por transferencia: se cobra solo todos los meses y la
 * clienta cancela cuando quiere desde MercadoPago. Eso es lo que hace que el
 * producto pueda leerse como un proceso largo en vez de como un programa
 * con fecha de vencimiento.
 */
export const SUBSCRIPTION = {
  provider: "MercadoPago",
  /** Cada cuánto se debita. */
  frequencyLabel: "por mes",
  autoRenews: true,
  cancelNote:
    "Cancelás cuando quieras desde MercadoPago, sin llamar a nadie ni dar explicaciones.",
} as const;

export interface Plan {
  id: string;
  name: string;
  priceARS: number;
  /** Cada cuánto se debita ese importe. Va al lado del precio. */
  frequencyLabel: string;
  /** Si es false, no se muestra en la web. */
  visible: boolean;
  summary: string;
}

/**
 * Precio del plan trimestral: 3 meses de entrenamiento al ritmo de cada una,
 * NO un pack de 3 niveles. Los niveles se desbloquean por avance real.
 *
 * TODO(B21): PRECIO SIN CONFIRMAR. Se reusa el importe que Pía había aprobado
 * el 2026-08-18 para el pack de 3 niveles. Contra 3 x $55.000 = $165.000 el
 * descuento es real y por eso se puede anunciar sin violar el art. 8 de la
 * Ley 24.240. Confirmar con Pía antes de publicar, y nunca fijarlo por encima
 * de PRICE_ARS * 3.
 */
const QUARTERLY_PRICE_ARS = 130000;

/** Descuento real del trimestral contra pagar mes a mes. Se calcula, no se afirma. */
export const QUARTERLY_DISCOUNT_PCT = Math.round(
  (1 - QUARTERLY_PRICE_ARS / (PRICE_ARS * 3)) * 100,
);

/**
 * Formas de comprar el reto. La asesoría 1:1 no entra acá: se vende aparte.
 *
 * Los `id` los usa la automatización de cobro para calcular el monto de cada
 * venta (ver docs/setup/n8n/). No renombrarlos sin actualizar los flujos.
 */
export const PLANS: Plan[] = [
  {
    /* El id lo consumen los flujos de n8n: no renombrar sin tocarlos. */
    id: "nivel-mensual",
    name: "Suscripción mensual",
    priceARS: PRICE_ARS,
    frequencyLabel: "por mes",
    visible: true,
    summary:
      "Débito automático por MercadoPago. Entrenás, avanzás de nivel y seguís mientras te sirva. Cancelás cuando quieras.",
  },
  {
    id: "trimestral",
    name: "Plan trimestral",
    priceARS: QUARTERLY_PRICE_ARS,
    frequencyLabel: "cada 3 meses",
    visible: true,
    summary:
      "Tres meses por adelantado, a un precio menor que mes a mes. Entrenás a tu ritmo y vas desbloqueando los niveles a medida que avanzás.",
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
 * Grupo fundador. Confirmado por Pía el 2026-08-21.
 *
 * La escasez es el cupo, no una fecha: 20 lugares al precio fundador, y ese
 * precio queda CONGELADO para las fundadoras mientras no cancelen la
 * suscripción. Cuando se llenan los 20, el precio sube para las que entren
 * después.
 *
 * `spotsTaken` se actualiza a mano a medida que entran clientas. Es un dato
 * público: si dice 14 tienen que ser 14 de verdad, porque un cupo inventado es
 * publicidad engañosa (art. 8, Ley 24.240).
 *
 * El lanzamiento en redes es el 30/08, pero la web ya vende: quien llegue
 * antes entra igual y ocupa lugar.
 */
export const FOUNDING = {
  active: true,
  label: "Grupo fundador",
  spotsTotal: 20,
  spotsTaken: 0,
  priceLocked: true,
} as const;

/** Lugares que quedan libres en el grupo fundador. Nunca menos de cero. */
export const FOUNDING_SPOTS_LEFT = Math.max(
  FOUNDING.spotsTotal - FOUNDING.spotsTaken,
  0,
);

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
