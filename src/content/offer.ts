export const FOR_WHOM = {
  yes: {
    title: "Es para vos si...",
    items: [
      "Trabajás ocho horas o más y llegás a casa sin energía para nada.",
      "Ya intentaste empezar varias veces y siempre se te cayó a las dos semanas.",
      "No querés vivir en el gimnasio: querés algo que entre en tu día.",
      "Preferís que alguien te diga qué hacer hoy, sin tener que decidirlo vos.",
      "Querés hacerlo acompañada, no sola con un PDF.",
    ],
  },
  no: {
    title: "No es para vos si...",
    items: [
      "Buscás un plan hecho a medida sólo para tu caso: este es el mismo para todas.",
      "Querés bajar diez kilos en un mes. Acá no vendemos eso.",
      "No estás dispuesta a reservar 30 minutos, cuatro veces por semana.",
      "Preferís entrenar sin ningún tipo de seguimiento ni comunidad.",
    ],
  },
} as const;

export const WHAT_YOU_GET = [
  {
    title: "28 días de entrenamiento guiado",
    body: "Cuatro sesiones por semana de 30 minutos. Cada día te digo exactamente qué hacer: no tenés que decidir nada.",
  },
  {
    title: "Llamada 1:1 de bienvenida",
    body: "Media hora conmigo antes de arrancar. Revisamos tu punto de partida, tus horarios reales y ajustamos lo que haga falta.",
  },
  {
    title: "Corrección de técnica semanal",
    body: "Grabás tu ejercicio, me lo mandás y te devuelvo qué corregir. Todas las semanas, durante todo el reto.",
  },
  {
    title: "Guía de nutrición para semanas cortas",
    body: "Desayunos de cinco minutos, cenas de quince y qué hacer cuando comés afuera. Sin contar calorías.",
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
    title: "Comunidad privada de tu cohorte",
    body: "Arrancan todas el mismo día y van al mismo ritmo. Check-in diario y respuesta a tus dudas dos veces por semana.",
  },
  {
    title: "Seguimiento y check-in diario",
    body: "Planilla simple para registrar lo que hacés. Si dejás de aparecer, te escribo.",
  },
] as const;

export const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Reservás tu lugar",
    body: "Transferís y me mandás el comprobante por WhatsApp. Te confirmo el acceso en menos de dos horas.",
  },
  {
    step: "02",
    title: "Empezás la Semana 0 ese mismo día",
    body: "No esperás sin hacer nada. Entrás a la preparación, hacemos tu llamada de bienvenida y dejás tu semana armada para arrancar sin fricción.",
  },
  {
    step: "03",
    title: "Arranca el reto con tu grupo",
    body: "El día 1 entrenan todas juntas y van al mismo ritmo. A partir de ahí, 30 minutos por día durante cuatro semanas.",
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
      "Sí, y es exactamente para lo que está diseñado el reto. Son cuatro sesiones semanales de 30 minutos, que podés hacer a la mañana temprano, al mediodía o cuando llegás. Además tenés rutinas de 10 minutos para los días en que el tiempo directamente no aparece. La idea no es que entrenes más: es que entrenes lo justo, bien y de forma sostenida.",
  },
  {
    question: "Nunca entrené o hace años que no lo hago. ¿Puedo hacerlo igual?",
    answer:
      "Sí. Cada ejercicio tiene una versión más fácil y una más difícil, y arrancás por la que corresponda a tu punto de partida. En la llamada de bienvenida vemos juntas dónde estás parada. La mayoría de las que entran al reto hace años que no entrenan de forma estructurada.",
  },
  {
    question: "¿Necesito gimnasio o equipamiento?",
    answer:
      "No. El reto está pensado para hacerse en casa con el peso del cuerpo y, como mucho, una banda elástica o un par de mancuernas livianas. Si tenés gimnasio, también te dejo las variantes con máquinas y pesos libres.",
  },
  {
    question: "¿Es un plan personalizado para mí?",
    answer:
      "No, y prefiero decírtelo claro. El plan de entrenamiento y nutrición es el mismo para todas las que hacen el reto. Lo que sí es tuyo es la llamada de bienvenida, la corrección de tu técnica y los ajustes que te haga durante las cuatro semanas. Si buscás un plan diseñado desde cero para tu caso, eso es otro servicio y podemos hablarlo por WhatsApp.",
  },
  {
    question: "¿Qué pasa si una semana no puedo seguir el ritmo?",
    answer:
      "Pasa, y está contemplado. Tenés el plan B de 10 minutos y una guía específica sobre cómo retomar sin sentir que perdiste todo. El objetivo del reto no es la semana perfecta: es que llegues al día 28 habiendo sostenido el hábito.",
  },
  {
    question: "Si compro hoy, ¿cuándo empiezo?",
    answer:
      "El acceso lo tenés el mismo día. Arrancás enseguida con la Semana 0: la preparación, tu llamada de bienvenida conmigo y el armado de tu semana. El día 1 del reto arranca con tu grupo en la fecha de inicio, porque hacemos todas el mismo día y eso es justamente lo que hace que la gente termine. Abrimos un grupo nuevo cada dos semanas, así que nunca esperás más de trece días para el día 1, y ese tiempo no lo pasás esperando: lo pasás preparándote.",
  },
  {
    question: "¿Cómo pago y cómo entro?",
    answer:
      "Por transferencia bancaria. En la página de compra tenés los datos de la cuenta y un botón que abre WhatsApp con el mensaje ya escrito para que me mandes el comprobante. Cuando verifico el pago te llega el acceso y el link para agendar tu llamada de bienvenida, todo en menos de dos horas.",
  },
  {
    question: "¿Y si lo compro y no es para mí?",
    answer:
      "Tenés 10 días de garantía. Entrás, lo probás, y si no es lo que esperabas me escribís antes del día 10 y te devuelvo el 100% del dinero. Sin condiciones, sin tener que justificar nada y sin que te insista para que te quedes. Los 10 días son además el plazo que te da la Ley 24.240 para arrepentirte de cualquier compra online, así que ese derecho lo tenés siempre.",
  },
  {
    question: "¿Qué pasa cuando terminan los 28 días?",
    answer:
      "Terminás el reto con el hábito instalado y sabiendo entrenar sola. Si querés seguir acompañada, al final te ofrezco el programa largo para profundizar, con un precio preferencial por haber completado el reto. No es obligatorio ni hay renovación automática de nada.",
  },
];
