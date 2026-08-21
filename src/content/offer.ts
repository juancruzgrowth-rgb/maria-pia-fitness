export const FOR_WHOM = {
  yes: {
    title: "Es para vos si...",
    items: [
      "Trabajás ocho horas o más y llegás a casa sin energía para nada.",
      "Ya intentaste empezar varias veces y siempre se te cayó a las dos semanas.",
      "Tenés gimnasio, o equipamiento en casa, para la parte que se entrena con peso.",
      "Preferís que alguien te diga qué hacer hoy, sin tener que decidirlo vos.",
      "Querés poder preguntar cuando algo no te sale, y no quedarte con la duda.",
    ],
  },
  no: {
    title: "No es para vos si...",
    items: [
      "No tenés ni gimnasio ni equipamiento en casa: del B2 en adelante te vas a quedar sin poder hacer la mayoría de los ejercicios.",
      "Buscás un plan hecho a medida sólo para tu caso: este es el mismo para todas.",
      "Querés bajar diez kilos en un mes. Acá no vendemos eso.",
      "No estás dispuesta a reservar tres horarios fijos por semana.",
      "Necesitás clases en vivo o alguien que te mire entrenar en tiempo real.",
    ],
  },
} as const;

export const WHAT_YOU_GET = [
  {
    title: "3 sesiones por semana",
    body: "Cada sesión te lleva de 30 a 60 minutos y te dice exactamente qué hacer: no tenés que decidir nada.",
  },
  {
    title: "Videos cortos, ejercicio por ejercicio",
    body: "En Skool ves el video de cada movimiento del día: duran un par de minutos, mirás cómo se hace y lo hacés. No son clases largas para seguir en tiempo real.",
  },
  {
    title: "Un camino por niveles",
    body: "Arrancás en el B1 y seguís con el B2, que ya está listo en Skool. Tres días de entrenamiento por nivel y tres sets por día. Vas subiendo a medida que avanzás, no cuando lo dice el calendario, y los niveles que siguen se van sumando.",
  },
  {
    title: "Casa y gimnasio, según el nivel",
    body: "El B1 alterna ejercicios que hacés en casa sin nada con otros de gimnasio. Del B2 en adelante la mayoría necesita mancuernas, barra o máquinas: lo más simple es entrenar en un gimnasio, y si tenés equipamiento en casa también funciona.",
  },
  {
    title: "Los videos donde te explico todo",
    body: "Cómo funciona el método, cómo usar la comunidad y qué hacer cada semana. Los mirás el primer día y ya sabés moverte sola.",
  },
  {
    title: "Corrección de técnica",
    body: "Grabás tu serie, la subís a la comunidad y te doy la devolución una vez por semana. Sin coordinar horarios, y aprendés tanto de tu video como del de las demás.",
  },
  {
    title: "Comunidad privada en Skool y WhatsApp",
    body: "Ahí preguntás lo que sea: un ejercicio que no te sale, una duda del plan, un día que no pudiste. WhatsApp para el día a día, Skool para las rutinas y tu progreso.",
  },
  {
    title: "Seguimiento y check-in diario",
    body: "Planilla simple para registrar lo que hacés y ver, semana a semana, que estás avanzando de verdad.",
  },
] as const;

export const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Te suscribís con MercadoPago",
    body: "Débito automático, en un par de clics. Sin transferencias, sin comprobantes y sin esperar a que alguien te confirme nada.",
  },
  {
    step: "02",
    title: "Entrás a Skool y mirás los videos de arranque",
    body: "Te explico el método y cómo usar la comunidad. Veinte minutos y ya sabés exactamente qué hacer.",
  },
  {
    step: "03",
    title: "Entrenás ese mismo día",
    body: "La sesión 1 está esperándote. Tres por semana, y cualquier duda la preguntás y te la respondo.",
  },
] as const;

export interface FaqItem {
  question: string;
  answer: string;
}

export const FAQS: FaqItem[] = [
  {
    question: "Trabajo ocho horas por día. ¿De verdad me alcanza el tiempo?",
    answer:
      "Sí, y es exactamente para lo que está diseñado. Son tres sesiones por semana de 30 a 60 minutos: tres días, no siete. Podés hacerlas a la mañana temprano, al mediodía o cuando llegás. La idea no es que entrenes más: es que entrenes lo justo, bien y de forma sostenida.",
  },
  {
    question: "Nunca entrené o hace años que no lo hago. ¿Puedo hacerlo igual?",
    answer:
      "Sí, y el B1 está hecho exactamente para eso. Es el nivel de arranque: alterna ejercicios que hacés en casa sin equipamiento con otros de gimnasio, y cada uno tiene su video explicado. Los videos de arranque te explican cómo elegir la carga. La mayoría de las que entran al reto hace años que no entrenan de forma estructurada, así que estás en buena compañía.",
  },
  {
    question: "¿Necesito gimnasio o equipamiento?",
    answer:
      "Depende del nivel, y prefiero ser clara. El B1, que es donde arrancás, va alternando: hay días que resolvés en casa sin equipamiento y otros que son de gimnasio. Del B2 en adelante la mayoría de los ejercicios necesitan mancuernas, barra o máquinas para que la progresión tenga sentido, así que ahí sí vas a necesitar un gimnasio o equipamiento en casa. Si no tenés forma de acceder a ninguna de las dos cosas, te lo digo antes de que pagues: vas a poder hacer el B1 a medias y después te vas a trabar.",
  },
  {
    question: "Si me suscribo hoy, ¿cuándo empiezo?",
    answer:
      "Hoy. No hay fechas de inicio ni grupos que esperar: cuando se confirma el pago te llega el acceso a Skool y podés entrenar esa misma tarde. Lo primero que vas a ver son los videos donde te explico cómo funciona todo, y de ahí directo a la sesión 1.",
  },
  {
    question: "¿Hay clases en vivo o llamadas conmigo?",
    answer:
      "No, y prefiero decírtelo de entrada. El reto es 100% grabado, y eso es a propósito: entrenás cuando vos podés, no cuando puedo yo. Los videos son cortos —te muestran el ejercicio, no te acompañan en tiempo real—. Lo que sí tenés es contacto conmigo por WhatsApp y por la comunidad de Skool, y ahí te respondo consultas y te corrijo la técnica de los videos que subas. Si lo que buscás es trabajo en vivo y atención uno a uno, eso es la asesoría 1:1.",
  },
  {
    question: "¿Cómo hago si un ejercicio no me sale?",
    answer:
      "Lo grabás con el celular y lo subís a la comunidad de Skool. Ahí te contesto qué corregir. No hace falta que coordinemos ningún horario, y como las respuestas quedan en la comunidad, terminás aprendiendo también de las consultas de las demás.",
  },
  {
    question: "¿Es un plan personalizado para mí?",
    answer:
      "No. El plan de entrenamiento es el mismo para todas las que hacen el reto. Lo que sí es tuyo es la devolución sobre tu técnica y las respuestas a lo que preguntes. Si buscás un plan armado desde cero para tu caso, con más días de entrenamiento, objetivos puntuales y contacto directo conmigo, eso es la asesoría 1:1: son pocos lugares y lo hablamos por WhatsApp.",
  },
  {
    question: "¿Cómo pago?",
    answer:
      "Con MercadoPago, en la misma web. Es una suscripción con débito automático: elegís el medio de pago una vez y se cobra solo todos los meses. No hace falta que transfieras ni que me mandes ningún comprobante.",
  },
  {
    question: "¿Se renueva solo? ¿Me van a debitar todos los meses?",
    answer:
      "Sí. Es una suscripción, así que MercadoPago debita el importe cada mes y tu acceso sigue activo sin que tengas que hacer nada. Cancelás cuando quieras desde tu cuenta de MercadoPago, sin llamar a nadie y sin dar explicaciones. Si entrás con el precio del grupo fundador, ese precio te queda congelado mientras no canceles.",
  },
  {
    question: "¿Cómo está armado el plan y cómo avanzo de nivel?",
    answer:
      "El entrenamiento está dividido en niveles. Arrancás en el B1, que es el de entrada, seguís con el B2, que es bastante más exigente y ya se entrena con peso, y después viene el B3, todavía más avanzado. Cada nivel tiene tres días de entrenamiento, y cada día tres sets de ejercicios. No pasás de nivel por calendario: pasás cuando tu avance lo justifica, y eso lo vemos juntas. Hoy en Skool están el B1 y el B2, y los que siguen se van sumando.",
  },
  {
    question: "¿Cómo es el plan trimestral?",
    answer:
      "Pagás tres meses de una vez, a un precio menor que mes a mes, y entrenás a tu ritmo durante ese tiempo. No son tres niveles cerrados: los niveles se te van desbloqueando según cómo vayas avanzando, así que si necesitás más tiempo en el B1 no perdés nada, y si volás pasás antes al siguiente.",
  },
  {
    question: "¿Y si me voy de viaje o tengo una semana imposible?",
    answer:
      "Pasa, y no es un problema. Sé que hay semanas malas, viajes y laburo que se pone en contra. Escribime, lo hablamos y lo resolvemos juntas: la idea es que sostengas el proceso, no que abandones porque una semana no te salió.",
  },
];
