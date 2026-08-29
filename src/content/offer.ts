/**
 * Copy de la oferta. Reescrito el 2026-08-29 sobre el prototipo manuscrito de
 * Pía: la home se acortó y quedó en el orden que ella pidió —para quién es,
 * testimonios, quién soy, el método, qué tenés que saber, precio, tres pasos,
 * preguntas—.
 */

/**
 * El filtro. Las razones son las de Pía. El equipamiento se nombra de un solo
 * lado: en `no`, para que nadie pague sin saber que del B2 en adelante hacen
 * falta elementos. Estuvo también en `yes` hasta el 2026-08-29 —"arrancá sin
 * gastar en nada"—; se cayó por pedido de Pía: prometer costo cero al lado de
 * una lista de precios sonaba a otra cosa. Ver EQUIPMENT en @/lib/products.
 */
export const FOR_WHOM = {
  yes: {
    title: "Es para vos si...",
    items: [
      "Trabajás ocho horas o más y llegás a casa con poca energía.",
      "Ya probaste distintos métodos y nunca pudiste terminar ninguno.",
      "Querés construir hábitos nuevos y sostenerlos, sin estar atada a conseguir resultados a los diez días: eso se da solo, como consecuencia de los cambios mínimos que vayas haciendo.",
    ],
  },
  no: {
    title: "No es para vos si...",
    items: [
      "Querés bajar equis cantidad de kilos en un mes.",
      "No estás dispuesta a reservarte tres momentos de 30 a 60 minutos por semana, sólo para vos.",
      "Necesitás clases en vivo o un profesor acompañándote durante tus sesiones.",
      "Pasados los primeros meses no vas a poder sumar elementos y/o gimnasio.",
    ],
  },
} as const;

/** De la decisión al primer entrenamiento. Va dentro de la sección de precio. */
export const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Transferís y me mandás el comprobante",
    body: "Los datos de la cuenta están en la página de compra. Me lo pasás por WhatsApp con tu nombre y tu email.",
  },
  {
    step: "02",
    title: "Te doy el acceso a Skool",
    body: "Te mando la invitación y te explico por dónde arrancar. Ahí están las rutinas, los videos y el grupo.",
  },
  {
    step: "03",
    title: "Entrenás ese mismo día",
    body: "Mirás los videos de arranque y abrís la sesión 1. No esperás a que arranque ningún grupo.",
  },
] as const;

export interface FaqItem {
  question: string;
  answer: string;
}

/**
 * "Lo que más me preguntan". Eran catorce y quedaron ocho: se fusionaron las
 * que se pisaban —acceso con arranque, baja con forma de pago— y se cayeron
 * las que ya responde el bloque del método. Cada una que queda saca una
 * objeción de compra distinta.
 */
export const FAQS: FaqItem[] = [
  {
    question: "Trabajo ocho horas por día. ¿De verdad me alcanza el tiempo?",
    answer:
      "Sí, y es exactamente para lo que está diseñado. Son tres sesiones por semana de 30 a 60 minutos: tres días, no siete. Podés hacerlas a la mañana temprano, al mediodía o cuando llegás. La idea no es que entrenes más: es que entrenes lo justo, bien y de forma sostenida.",
  },
  {
    question: "Nunca entrené o hace años que no lo hago. ¿Puedo hacerlo igual?",
    answer:
      "Sí, y el B1 está hecho exactamente para eso. Es el nivel de arranque y lo podés hacer con tu propio peso corporal: vas a encontrar rutinas que se resuelven así, sin comprar nada, y cada ejercicio tiene su video explicado. Si tenés una banda o unas mancuernas en casa, mejor. La mayoría de las que entran al Flex Program hace años que no entrena de forma estructurada, así que estás en buena compañía.",
  },
  {
    question: "¿Necesito gimnasio o equipamiento?",
    answer:
      "Depende del nivel, y prefiero ser clara. Para el B1, que es donde arrancás, no necesitás nada: lo hacés con tu propio peso corporal. Vas a encontrar rutinas que se resuelven así y otras donde sumás elementos simples de casa, como una banda o unas mancuernas. Del B2 en adelante la cosa cambia: la mayoría de los ejercicios necesitan mancuernas, barra o máquinas para que la progresión tenga sentido, así que ahí sí vas a necesitar gimnasio o equipamiento. Te lo digo antes de que pagues: si no pensás sumar nada de eso, vas a hacer el B1 completo y después te vas a trabar.",
  },
  {
    question: "¿Cómo está armado el plan y cómo avanzo de nivel?",
    answer:
      "El entrenamiento está dividido en niveles. Arrancás en el B1, que es el de entrada y se hace con tu peso corporal, seguís con el B2, que es bastante más exigente y ya se entrena con peso en el gimnasio, y después viene el B3, todavía más avanzado. Cada nivel tiene tres días de entrenamiento, y cada día tres sets de ejercicios. No pasás de nivel por calendario: pasás cuando tu avance lo justifica, y eso lo vemos juntas. Hoy en Skool están el B1 y el B2, y los que siguen se van sumando.",
  },
  {
    question: "Si transfiero hoy, ¿cuándo empiezo?",
    answer:
      "Prácticamente en el día. No hay fechas de inicio ni grupos que esperar: apenas veo tu comprobante te mando el acceso a Skool —tardo menos de 24 horas y casi siempre mucho menos— y arrancás. Lo primero que vas a ver son los videos donde te explico cómo funciona todo, y de ahí directo a la sesión 1.",
  },
  {
    question: "¿Cómo pago? ¿Se renueva solo?",
    answer:
      "Se paga por transferencia. En la página de compra están el alias y el CVU de mi cuenta de Mercado Pago: transferís el monto del plan que elegiste y me mandás el comprobante por WhatsApp con tu nombre y tu email. Con eso te doy el acceso yo misma. No hay tarjetas ni débito automático, así que no se renueva solo: cuando se acerca el vencimiento te escribo, y si querés seguir volvés a transferir. Si no querés seguir, no hacés nada y se termina. Y si entrás con el precio de lanzamiento, ese precio te lo respeto mientras no cortes.",
  },
  {
    question: "¿Hay clases en vivo o llamadas conmigo?",
    answer:
      "No, y prefiero decírtelo de entrada. El Flex Program es 100% grabado, y eso es a propósito: entrenás cuando vos podés, no cuando puedo yo. Los videos son cortos —te muestran el ejercicio, no te acompañan en tiempo real—. Lo que sí tenés es contacto conmigo por WhatsApp y por la comunidad de Skool, y ahí te respondo consultas y te corrijo la técnica de los videos que subas. Si lo que buscás es trabajo en vivo y atención uno a uno, eso es la asesoría 1:1.",
  },
  {
    question: "¿Es un plan personalizado para mí?",
    answer:
      "No. El plan de entrenamiento es el mismo para todas las que hacen el Flex Program. Lo que sí es tuyo es la devolución sobre tu técnica y las respuestas a lo que preguntes. Si buscás un plan armado desde cero para tu caso, con más días de entrenamiento, objetivos puntuales y contacto directo conmigo, eso es la asesoría 1:1, y lo hablamos por WhatsApp.",
  },
];
