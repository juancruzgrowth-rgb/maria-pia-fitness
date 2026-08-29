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
 * Arquitectura de marca: el método está POR ENCIMA de la oferta. El "Flex
 * Program" es lo que se compra; "Mi Método 4F" es el sistema, y sobrevive a
 * que el programa cambie de nombre o de formato —ya pasó dos veces—.
 * Ver docs/estrategia/11-metodo-4f.md.
 *
 * El "Mi" es la firma de Pía: funciona cuando habla ella, no en un botón
 * de compra. Los CTA siguen hablando del programa.
 */
export const METHOD = {
  name: "Mi Método 4F",
  /**
   * Los cuatro pilares, con la definición que escribió Pía a mano el
   * 2026-08-29. Cierra el TODO(B13): quedó confirmado que los 4F son los
   * principios que guían el método, no los bloques de cada sesión.
   */
  lead:
    "Un método de fuerza integral que se apoya en la calidad y no en la cantidad de horas. Nació de lo que me traía la gente: tiempos acotados, ganas de moverse sin tener elementos a mano y dolencias articulares que había que respetar.",
  forWhom:
    "Para mujeres que disponen de poco tiempo y quieren moverse a conciencia, sin que el entrenamiento se les coma el día.",
  /**
   * El camino del punto A al punto B. Son los tres tramos que Pía describe
   * cuando explica el método, en orden: de dónde salís, qué pasa en el medio
   * y en qué te convertís.
   */
  path: [
    {
      id: "punto-a",
      label: "De dónde salís",
      body: "Intentaste arrancar varias veces y nunca pudiste sostenerlo. No es falta de voluntad: es que ningún plan te entraba en la semana.",
    },
    {
      id: "camino",
      label: "Qué pasa en el medio",
      body: "Tres sesiones por semana, con progresiones que se ajustan a lo que hoy podés. Vas subiendo de nivel cuando tu avance lo justifica, no cuando lo dice el calendario.",
    },
    {
      id: "punto-b",
      label: "A dónde llegás",
      body: "Fuerza que se nota en tu día: cargar las bolsas, aguantar la jornada de pie, agacharte sin que aparezca la molestia. Y el hábito ya sostenido, que es lo que hace que los resultados lleguen solos.",
    },
  ],
  pillars: [
    {
      id: "fuerza",
      name: "Fuerza",
      body: "Progresiones para que pases al siguiente nivel. No tiene que ver con los kilos, sino con el esfuerzo que vas incorporando en cada uno.",
    },
    {
      id: "funcion",
      name: "Función",
      body: "Movimientos que trasladás a lo cotidiano con el mínimo esfuerzo: levantar las bolsas del súper, permanecer de pie en jornadas largas o agacharte, sin que aparezca la dolencia.",
    },
    {
      id: "flexibilidad",
      name: "Flexibilidad",
      body: "El programa se adapta a tu disponibilidad, a tus objetivos y a dónde entrenes, sea el gimnasio o tu casa.",
    },
    {
      id: "foco",
      name: "Foco",
      body: "Herramientas para que permanezcas en el proceso, motivada, también las semanas en las que todo se pone en contra.",
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
 * Naming actualizado el 2026-08-25 por pedido de Pía: "El Reto" pasa a
 * llamarse "Flex Program". El producto no cambia —tres sesiones por semana y
 * niveles que se desbloquean por avance—: cambia el nombre con el que se
 * vende. "Reto" prometía un esfuerzo con fecha de fin; "Flex" habla de lo
 * único que la clienta no tiene, que es tiempo.
 *
 * Antes de 2026-08-21 el nombre incluía "28 días". Se cayó por lo mismo: la
 * duración no es la promesa.
 */
export const CHALLENGE: Challenge = {
  id: "flex-program",
  name: "Flex Program",
  shortName: "el Flex Program",
  /**
   * Es el texto que se ve al compartir el link (og:description y el JSON-LD).
   * Cambiado el 2026-08-29: antes prometia un resultado —"volver a entrenar y
   * sostenerlo"—; ahora cuenta el metodo, que es lo que distingue al programa
   * de cualquier otro plan de entrenamiento online.
   */
  promise:
    "Mi Método 4F: fuerza, función, flexibilidad y foco. Tres sesiones por semana que se apoyan en la calidad del movimiento, no en las horas que le puedas dedicar.",
  forWhom:
    "Mujeres que trabajan ocho horas o más y quieren sostener hábitos sin que les coma el día.",
  priceARS: PRICE_ARS,
  /**
   * Alcance actualizado el 2026-08-21. Salieron la guía de nutrición, la
   * biblioteca de ejercicios y el plan B: no están armados y no se prometen.
   * El B1 se puede hacer con peso corporal y del B2 en adelante hace falta
   * equipamiento —ver EQUIPMENT—
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
      body: "Para las que arrancan el proceso de moverse. Lo hacés con tu propio peso corporal, o sumando elementos simples de casa como una banda o unas mancuernas.",
    },
    {
      id: "B2",
      name: "B2",
      body: "Para las que ya tienen entrenamiento previo. Acá sí necesitás gimnasio y elementos: se entrena con peso.",
    },
    {
      id: "B3",
      name: "B3",
      body: "El siguiente escalón, todavía más avanzado. Se suma cuando el grupo llega.",
    },
  ],
} as const;

/**
 * Qué hace falta para entrenar. Confirmado por Pía el 2026-08-29.
 *
 * El corte está entre el B1 y el B2, y hay que decirlo con precisión en las
 * dos direcciones. Para abajo: el B1 se puede hacer entero con peso corporal,
 * así que exigir gimnasio de entrada espanta a gente que sí podría entrenar.
 * Para arriba: del B2 en adelante hacen falta elementos de verdad, y alguien
 * que pague sin saberlo se va a trabar. No suavizar ninguna de las dos mitades.
 *
 * La versión anterior decía que el B1 "alterna casa y gimnasio". Era el dato
 * equivocado y se corrigió acá y en todo el copy que lo repetía.
 */
export const EQUIPMENT = {
  short: "El B1 lo hacés con o sin equipamiento",
  detail:
    "El B1, que es donde arrancás, lo podés hacer sólo con tu propio peso corporal: vas a encontrar rutinas que se resuelven así, y otras donde sumás elementos simples que tengas en casa, como una banda o unas mancuernas. Del B2 en adelante sí necesitás gimnasio y elementos: la mayoría de los ejercicios van con mancuernas, barra o máquinas.",
} as const;

/**
 * Cobro por transferencia bancaria. Decisión de Pía del 2026-08-25.
 *
 * Vuelve a ser el único medio de pago y reemplaza a la suscripción con débito
 * automático de MercadoPago, que quedó construida y se borró del código: está
 * en el historial de git (commit fc8b826) para cuando haga falta escalar.
 *
 * El primer grupo se atiende a mano y a propósito: la clienta transfiere, le
 * manda el comprobante por WhatsApp y Pía le da el acceso a Skool ella misma.
 * El trato personalizado es parte de la oferta mientras el grupo sea chico.
 *
 * Datos de cobro confirmados el 2026-08-25 contra la constancia de CVU que
 * pasó Pía. Cualquier cambio acá se verifica contra el documento original: un
 * dígito mal manda la plata de una clienta a la cuenta de otra persona.
 */
export const TRANSFER = {
  alias: "cepmoretto.mp",
  /**
   * Es un CVU, no un CBU: la cuenta es de Mercado Pago, no de un banco. Se
   * etiqueta como CVU en /comprar porque es lo que va a buscar la clienta en
   * la pantalla de transferencia de su app.
   */
  cvu: "0000003100019693666879",
  holder: "María Pía Moretto",
  bank: "Mercado Pago",
  /** Cuánto tarda Pía en confirmar el comprobante y dar el acceso. */
  responseWindow: "menos de 24 horas",
} as const;

/**
 * Renovación. Sin débito automático no se renueva sola: cada período la
 * clienta vuelve a transferir, y el aviso lo manda Pía por WhatsApp.
 *
 * `accessDays` es la duración del acceso del plan mensual. El trimestral dura
 * tres veces eso. Los días de aviso son los que Pía usa para escribir antes
 * de que se venza, no una automatización: hoy no hay ninguna corriendo.
 */
export const RENEWAL = {
  manual: true,
  accessDays: 30,
  reminderDays: [25, 28],
  frequencyLabel: "por mes",
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
 * Confirmado por Pía el 2026-08-25. Contra 3 x $55.000 = $165.000 el descuento
 * es real y por eso se puede anunciar sin violar el art. 8 de la Ley 24.240.
 * Nunca fijarlo por encima de PRICE_ARS * 3: ahí el "21% menos" pasa a ser
 * falso y el cartel se vuelve publicidad engañosa.
 */
const QUARTERLY_PRICE_ARS = 130000;

/** Descuento real del trimestral contra pagar mes a mes. Se calcula, no se afirma. */
export const QUARTERLY_DISCOUNT_PCT = Math.round(
  (1 - QUARTERLY_PRICE_ARS / (PRICE_ARS * 3)) * 100,
);

/**
 * Formas de comprar el programa. La asesoría 1:1 no entra acá: se vende
 * aparte.
 *
 * Los `id` los heredan los flujos de n8n, que hoy están apagados. Se
 * conservan igual: si alguna vez se retoman, renombrarlos obliga a tocarlos.
 */
export const PLANS: Plan[] = [
  {
    /* El id lo consumen los flujos de n8n: no renombrar sin tocarlos. */
    id: "nivel-mensual",
    name: "Plan mensual",
    priceARS: PRICE_ARS,
    frequencyLabel: "por mes",
    visible: true,
    summary:
      "Un mes de entrenamiento. Transferís, me mandás el comprobante y te doy el acceso. Si querés seguir, al mes siguiente volvés a transferir.",
  },
  {
    id: "trimestral",
    name: "Plan trimestral",
    priceARS: QUARTERLY_PRICE_ARS,
    frequencyLabel: "cada 3 meses",
    visible: true,
    summary:
      "Tres meses por adelantado, en una sola transferencia y a un precio menor que mes a mes. Entrenás a tu ritmo y vas desbloqueando los niveles a medida que avanzás.",
  },
];

export const VISIBLE_PLANS = PLANS.filter((plan) => plan.visible);

/**
 * Asesoría 1:1. Producto de ticket alto, mensual y personalizado.
 *
 * Decisión comercial (2026-08-13): NO se publica el precio en la web. A este
 * ticket la venta necesita conversación, y mostrar $280.000 al lado de $55.000
 * convierte al programa en "la opción barata" en vez de "la opción correcta".
 * Los precios viven acá igual porque este archivo es el single source of truth,
 * pero ningún componente los renderiza.
 *
 * Lo que separa la asesoría del programa (2026-08-18): acá el plan se arma
 * para tu caso y Pía te atiende por WhatsApp de forma directa. En el Flex
 * Program el plan es el mismo para todas y la consulta va a Skool. Si esa
 * línea se borra, la asesoría deja de justificar su precio.
 */
export const ADVISORY = {
  name: "Asesoría 1:1",
  priceARS: 280000,
  priceWithNutritionARS: 350000,
  /** Mensual, como el programa. Arranca en 5 lugares para medir la carga real. */
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
 * Grupo fundador. APAGADO por decisión de Pía el 2026-08-25.
 *
 * El contador de lugares se cae de toda la web. El motivo es operativo, no
 * comercial: `spotsTaken` se actualiza a mano y nadie iba a acordarse de
 * hacerlo, y un cartel que dice "quedan 20" para siempre es un cupo inventado
 * —publicidad engañosa, art. 8 de la Ley 24.240—.
 *
 * El mecanismo queda entero por si vuelve: poner `active: true` y mantener
 * `spotsTaken` al día alcanza para que reaparezca en el hero, en el bloque de
 * precio, en la barra de compra y en /comprar. Con `active: false` no se
 * renderiza en ningún lado.
 */
export const FOUNDING = {
  active: false,
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
  ? "Quiero entrar al Flex Program"
  : "Anotarme para la próxima";
