export const FOR_WHOM = {
  yes: {
    title: "Es para vos si...",
    items: [
      "Trabajás ocho horas o más y llegás a casa sin energía para nada.",
      "Ya intentaste empezar varias veces y siempre se te cayó a las dos semanas.",
      "Vas a un gimnasio, o tenés equipamiento en casa, para la parte que se entrena con peso.",
      "Preferís que alguien te diga qué hacer hoy, sin tener que decidirlo vos.",
      "Querés poder preguntar cuando algo no te sale, y no quedarte con la duda.",
      "Estás dispuesta a construir hábitos nuevos y sostenerlos: sabés que los cambios que duran se ven a los meses, no a los diez días.",
    ],
  },
  no: {
    title: "No es para vos si...",
    items: [
      "No vas a un gimnasio ni tenés equipamiento en casa: del B2 en adelante te vas a quedar sin poder hacer la mayoría de los ejercicios.",
      "Buscás un plan hecho a medida sólo para tu caso: este es el mismo para todas.",
      "Querés bajar diez kilos en un mes. Acá no vendemos eso.",
      "No estás dispuesta a reservarte tres momentos de una hora por semana, sólo para vos.",
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
    body: "Vas subiendo de nivel a medida que avanzás, no cuando lo dice el calendario, y los niveles que siguen se van sumando.",
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
    title: "Tu progreso, a la vista",
    body: "No hay planillas que llenar: tu avance se ve en la comunidad. Lo que vas subiendo, lo que te sale hoy y no te salía hace un mes, y lo que vamos ajustando juntas por el camino.",
  },
] as const;

export const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Transferís y me mandás el comprobante",
    body: "Los datos de la cuenta están en la página de compra. Me pasás el comprobante por WhatsApp con tu nombre y tu email, y te contesto yo.",
  },
  {
    step: "02",
    title: "Te doy el acceso a Skool",
    body: "Te mando la invitación a la comunidad y te explico por dónde arrancar. Ahí están las rutinas, los videos de cada ejercicio y el grupo.",
  },
  {
    step: "03",
    title: "Entrenás ese mismo día",
    body: "Mirás los videos de arranque y abrís la sesión 1. Tres por semana, y cualquier duda la preguntás y te la respondo.",
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
      "Sí, y el B1 está hecho exactamente para eso. Es el nivel de arranque: alterna ejercicios que hacés en casa sin equipamiento con otros de gimnasio, y cada uno tiene su video explicado. Los videos de arranque te explican cómo elegir la carga. La mayoría de las que entran al Flex Program hace años que no entrenan de forma estructurada, así que estás en buena compañía.",
  },
  {
    question: "¿Necesito gimnasio o equipamiento?",
    answer:
      "Depende del nivel, y prefiero ser clara. El B1, que es donde arrancás, va alternando: hay días que resolvés en casa sin equipamiento y otros que son de gimnasio. Del B2 en adelante la mayoría de los ejercicios necesitan mancuernas, barra o máquinas para que la progresión tenga sentido, así que ahí sí vas a necesitar un gimnasio o equipamiento en casa. Si no tenés forma de acceder a ninguna de las dos cosas, te lo digo antes de que pagues: vas a poder hacer el B1 a medias y después te vas a trabar.",
  },
  {
    question: "Si transfiero hoy, ¿cuándo empiezo?",
    answer:
      "Prácticamente en el día. No hay fechas de inicio ni grupos que esperar: apenas veo tu comprobante te mando el acceso a Skool —tardo menos de 24 horas y casi siempre mucho menos— y arrancás. Lo primero que vas a ver son los videos donde te explico cómo funciona todo, y de ahí directo a la sesión 1.",
  },
  {
    question: "¿Hay clases en vivo o llamadas conmigo?",
    answer:
      "No, y prefiero decírtelo de entrada. El Flex Program es 100% grabado, y eso es a propósito: entrenás cuando vos podés, no cuando puedo yo. Los videos son cortos —te muestran el ejercicio, no te acompañan en tiempo real—. Lo que sí tenés es contacto conmigo por WhatsApp y por la comunidad de Skool, y ahí te respondo consultas y te corrijo la técnica de los videos que subas. Si lo que buscás es trabajo en vivo y atención uno a uno, eso es la asesoría 1:1.",
  },
  {
    question: "¿Cómo hago si un ejercicio no me sale?",
    answer:
      "Lo grabás con el celular y lo subís a la comunidad de Skool. Ahí te contesto qué corregir. No hace falta que coordinemos ningún horario, y como las respuestas quedan en la comunidad, terminás aprendiendo también de las consultas de las demás.",
  },
  {
    question: "¿Es un plan personalizado para mí?",
    answer:
      "No. El plan de entrenamiento es el mismo para todas las que hacen el Flex Program. Lo que sí es tuyo es la devolución sobre tu técnica y las respuestas a lo que preguntes. Si buscás un plan armado desde cero para tu caso, con más días de entrenamiento, objetivos puntuales y contacto directo conmigo, eso es la asesoría 1:1: son pocos lugares y lo hablamos por WhatsApp.",
  },
  {
    question: "¿Cómo pago?",
    answer:
      "Por transferencia. En la página de compra están el alias y el CVU de mi cuenta de Mercado Pago: transferís el monto del plan que elegiste y me mandás el comprobante por WhatsApp con tu nombre y tu email. Con eso te doy el acceso yo misma. No hay tarjetas ni débito automático: por ahora prefiero hacerlo así, hablando con cada una.",
  },
  {
    question: "¿Se renueva solo? ¿Me van a debitar todos los meses?",
    answer:
      "No, y es a propósito. No hay débito automático ni tarjeta guardada en ningún lado: cuando se acerca el vencimiento te escribo, y si querés seguir hacés la transferencia del mes siguiente. Si no querés seguir, no hacés nada y listo. Si entrás con el precio de lanzamiento, ese precio te lo respeto mientras no cortes.",
  },
  {
    question: "¿Cuánto tardás en darme el acceso?",
    answer:
      "Menos de 24 horas, y en general mucho menos. El único caso en el que puede demorar un poco más es si transferís de madrugada o un domingo: te contesto igual, apenas veo el mensaje.",
  },
  {
    question: "¿Y si quiero dar de baja?",
    answer:
      "No tenés que cancelar nada: como no hay débito automático, si no transferís el mes siguiente simplemente se termina. Si querés avisarme, escribime por WhatsApp y listo, sin explicaciones y sin que te intente convencer de lo contrario.",
  },
  {
    question: "¿Cómo está armado el plan y cómo avanzo de nivel?",
    answer:
      "El entrenamiento está dividido en niveles. Arrancás en el B1, que es el de entrada, seguís con el B2, que es bastante más exigente y ya se entrena con peso, y después viene el B3, todavía más avanzado. Cada nivel tiene tres días de entrenamiento, y cada día tres sets de ejercicios. No pasás de nivel por calendario: pasás cuando tu avance lo justifica, y eso lo vemos juntas. Hoy en Skool están el B1 y el B2, y los que siguen se van sumando.",
  },
  {
    question: "¿Cómo es el plan trimestral?",
    answer:
      "Transferís tres meses de una vez, a un precio menor que mes a mes, y entrenás a tu ritmo durante ese tiempo. No son tres niveles cerrados: los niveles se te van desbloqueando según cómo vayas avanzando, así que si necesitás más tiempo en el B1 no perdés nada, y si volás pasás antes al siguiente.",
  },
  {
    question: "¿Y si me voy de viaje o tengo una semana imposible?",
    answer:
      "Pasa, y no es un problema. Sé que hay semanas malas, viajes y laburo que se pone en contra. Escribime, lo hablamos y lo resolvemos juntas: la idea es que sostengas el proceso, no que abandones porque una semana no te salió.",
  },
];
