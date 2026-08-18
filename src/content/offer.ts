export const FOR_WHOM = {
  yes: {
    title: "Es para vos si...",
    items: [
      "Trabajás ocho horas o más y llegás a casa sin energía para nada.",
      "Ya intentaste empezar varias veces y siempre se te cayó a las dos semanas.",
      "No querés vivir en el gimnasio: querés algo que entre en tu día.",
      "Preferís que alguien te diga qué hacer hoy, sin tener que decidirlo vos.",
      "Querés poder preguntar cuando algo no te sale, y no quedarte con la duda.",
    ],
  },
  no: {
    title: "No es para vos si...",
    items: [
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
    body: "De 50 a 60 minutos cada una, durante 28 días. Cada sesión te dice exactamente qué hacer: no tenés que decidir nada.",
  },
  {
    title: "Versión gimnasio y versión casa",
    body: "La misma rutina, adaptada a lo que tengas. Si un día no llegás al gym, hacés la de casa y seguís igual.",
  },
  {
    title: "Los videos donde te explico todo",
    body: "Cómo funciona el método, cómo leer tu rutina, cómo usar la comunidad y qué hacer cada semana. Los mirás el primer día y ya sabés moverte sola.",
  },
  {
    title: "Corrección de técnica",
    body: "Grabás tu serie, la subís a la comunidad y te contesto yo. Sin coordinar horarios, y aprendés tanto de tu video como del de las demás.",
  },
  {
    title: "Guía de nutrición para semanas cortas",
    body: "Desayunos de cinco minutos, cenas de quince y qué hacer cuando comés afuera. Sin contar calorías. Es la misma guía para todas, no un plan armado para tu caso.",
  },
  {
    title: "Biblioteca de ejercicios en video",
    body: "Cada movimiento explicado, con los errores más comunes y una variante más fácil y otra más difícil.",
  },
  {
    title: "Plan B para los días imposibles",
    body: "Rutinas de 10 minutos para cuando el día se rompe. Porque se va a romper, y eso no puede tirar abajo el proceso.",
  },
  {
    title: "Comunidad privada en Skool y WhatsApp",
    body: "Ahí preguntás lo que sea: un ejercicio que no te sale, una duda de la guía, un día que no pudiste. WhatsApp para el día a día, Skool para las rutinas y tu progreso.",
  },
  {
    title: "Seguimiento y check-in diario",
    body: "Planilla simple para registrar lo que hacés. Si dejás de aparecer, te escribo.",
  },
] as const;

export const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Transferís y me mandás el comprobante",
    body: "Por WhatsApp, con el mensaje ya escrito. Te confirmo el acceso en menos de dos horas.",
  },
  {
    step: "02",
    title: "Entrás y mirás los videos de arranque",
    body: "Te explico el método, cómo se lee tu rutina y cómo usar la comunidad. Veinte minutos y ya sabés exactamente qué hacer.",
  },
  {
    step: "03",
    title: "Entrenás ese mismo día",
    body: "La sesión 1 está esperándote. Tres por semana durante cuatro semanas, y cualquier duda la preguntás y te la respondo.",
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
      "Sí, y es exactamente para lo que está diseñado. Son tres sesiones por semana de 50 a 60 minutos: tres días, no siete. Podés hacerlas a la mañana temprano, al mediodía o cuando llegás, y cada una viene en versión gimnasio y versión casa, así que no perdés el día si no llegás a salir. La idea no es que entrenes más: es que entrenes lo justo, bien y de forma sostenida.",
  },
  {
    question: "Nunca entrené o hace años que no lo hago. ¿Puedo hacerlo igual?",
    answer:
      "Sí. Cada ejercicio tiene una versión más fácil y una más difícil, y arrancás por la que corresponda a tu punto de partida. Los videos de arranque te explican cómo elegir. La mayoría de las que entran al reto hace años que no entrenan de forma estructurada, así que estás en buena compañía.",
  },
  {
    question: "¿Necesito gimnasio o equipamiento?",
    answer:
      "No hace falta. Cada rutina viene en dos versiones: una para hacer en el gimnasio con máquinas y pesos libres, y otra para hacer en casa con el peso del cuerpo y, como mucho, una banda elástica o un par de mancuernas livianas. Elegís la que te sirva cada día.",
  },
  {
    question: "Si compro hoy, ¿cuándo empiezo?",
    answer:
      "Hoy. No hay fechas de inicio ni grupos que esperar: cuando confirmo tu transferencia te llega el acceso completo y podés entrenar esa misma tarde. Lo primero que vas a ver son los videos donde te explico cómo funciona todo, y de ahí directo a la sesión 1.",
  },
  {
    question: "¿Hay clases en vivo o llamadas conmigo?",
    answer:
      "No, y prefiero decírtelo de entrada. El reto es 100% grabado, y eso es a propósito: entrenás cuando vos podés, no cuando puedo yo. Lo que sí tenés es contacto conmigo por WhatsApp y por la comunidad de Skool, y ahí te respondo consultas y te corrijo la técnica de los videos que me mandes. Si lo que buscás es trabajo en vivo y atención uno a uno, eso es la asesoría 1:1.",
  },
  {
    question: "¿Cómo hago si un ejercicio no me sale?",
    answer:
      "Lo grabás con el celular y lo subís a la comunidad, o me lo mandás por WhatsApp. Te contesto qué corregir. No hace falta que coordinemos ningún horario, y como las respuestas quedan en la comunidad, terminás aprendiendo también de las consultas de las demás.",
  },
  {
    question: "¿Es un plan personalizado para mí?",
    answer:
      "No. El plan de entrenamiento y la guía de nutrición son los mismos para todas las que hacen el reto. Lo que sí es tuyo es la devolución sobre tu técnica y las respuestas a lo que preguntes. Si buscás un plan armado desde cero para tu caso, con más días de entrenamiento, objetivos puntuales y contacto directo conmigo, eso es la asesoría 1:1: son pocos lugares y lo hablamos por WhatsApp.",
  },
  {
    question: "¿Qué pasa si una semana no puedo seguir el ritmo?",
    answer:
      "Pasa, y está contemplado. Tenés el plan B de 10 minutos y una guía específica sobre cómo retomar sin sentir que perdiste todo. El objetivo del reto no es la semana perfecta: es que llegues al día 28 habiendo sostenido el hábito.",
  },
  {
    question: "¿Cómo pago?",
    answer:
      "Por transferencia bancaria. En la página de compra tenés los datos de la cuenta y un botón que abre WhatsApp con el mensaje ya escrito para que me mandes el comprobante. Cuando verifico el pago te llega todo el acceso, en menos de dos horas.",
  },
  {
    question: "¿Se renueva solo? ¿Me van a debitar todos los meses?",
    answer:
      "No. No hay débito automático de nada, porque el pago es por transferencia: para que te cobren tenés que transferir vos. Un nivel te da 28 días de acceso. Unos días antes de que se termine te escribo para avisarte, y ahí decidís si seguís con el nivel siguiente o lo dejás. Si no hacés nada, se termina y ya está.",
  },
  {
    question: "¿Qué pasa cuando terminan los 28 días?",
    answer:
      "El reto es el nivel 1. Cuando lo completás se desbloquea el nivel 2, que sube la exigencia y trabaja sobre lo que ya construiste, y después el nivel 3. Podés seguir nivel por nivel, renovando cada mes, o parar donde quieras. Si ya sabés que querés hacer el camino completo, podés llevarte los 3 niveles juntos, te sale bastante menos y no tenés que renovar nada.",
  },
  {
    question: "Si compro los 3 niveles, ¿tengo que hacerlos en 3 meses?",
    answer:
      "No. Tenés 6 meses para completarlos, el doble del tiempo que necesitás en teoría, porque la vida real tiene semanas malas. El nivel siguiente se te habilita cuando completás el 80% del anterior, o sea 10 de las 12 sesiones: no hace falta que hayas hecho todo perfecto. Y si te pasa algo que te saca de juego, me escribís y te freno el reloj 30 días, sin tener que explicarme nada.",
  },
];
