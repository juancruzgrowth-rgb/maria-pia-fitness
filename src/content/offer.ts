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
      "No estás dispuesta a reservar tres horarios fijos por semana.",
      "Preferís entrenar sin ningún tipo de seguimiento ni comunidad.",
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
    title: "Llamada 1:1 de bienvenida",
    body: "Media hora conmigo antes de arrancar. Revisamos tu punto de partida, tus horarios reales y ajustamos lo que haga falta.",
  },
  {
    title: "Corrección de técnica todos los viernes",
    body: "Hacés tus tres sesiones, grabás lo que quieras que mire y el viernes nos juntamos una hora a corregir. Se aprende tanto de tu video como del de las demás.",
  },
  {
    title: "Guía de nutrición para semanas cortas",
    body: "Desayunos de cinco minutos, cenas de quince y qué hacer cuando comés afuera. Sin contar calorías. Es la misma guía para todo el grupo, no un plan armado para tu caso.",
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
    body: "Arrancan todas el mismo día y van al mismo ritmo. El grupo de WhatsApp para el día a día y Skool para las rutinas, los videos y tu progreso.",
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
    body: "El día 1 entrenan todas juntas y van al mismo ritmo. A partir de ahí, tres sesiones por semana durante cuatro semanas.",
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
      "Sí, y es exactamente para lo que está diseñado. Son tres sesiones por semana de 50 a 60 minutos: tres días, no siete. Podés hacerlas a la mañana temprano, al mediodía o cuando llegás, y cada una viene en versión gimnasio y versión casa, así que no perdés el día si no llegás a salir. La idea no es que entrenes más: es que entrenes lo justo, bien y de forma sostenida."
  },
  {
    question: "Nunca entrené o hace años que no lo hago. ¿Puedo hacerlo igual?",
    answer:
      "Sí. Cada ejercicio tiene una versión más fácil y una más difícil, y arrancás por la que corresponda a tu punto de partida. En la llamada de bienvenida vemos juntas dónde estás parada. La mayoría de las que entran al reto hace años que no entrenan de forma estructurada.",
  },
  {
    question: "¿Necesito gimnasio o equipamiento?",
    answer:
      "No hace falta. Cada rutina viene en dos versiones: una para hacer en el gimnasio con máquinas y pesos libres, y otra para hacer en casa con el peso del cuerpo y, como mucho, una banda elástica o un par de mancuernas livianas. Elegís la que te sirva cada día.",
  },
  {
    question: "¿Es un plan personalizado para mí?",
    answer:
      "No, y prefiero decírtelo claro. El plan de entrenamiento y la guía de nutrición son los mismos para todas las que hacen el reto. Lo que sí es tuyo es la llamada de bienvenida y la corrección de tu técnica en la sesión de los viernes. Si buscás un plan armado desde cero para tu caso, con más días de entrenamiento, objetivos puntuales y contacto directo conmigo, eso es la asesoría 1:1: son pocos lugares y lo hablamos por WhatsApp.",
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
      "El reto es el nivel 1. Cuando lo completás se desbloquea el nivel 2, que sube la exigencia y trabaja sobre lo que ya construiste, y después el nivel 3. Podés seguir nivel por nivel o parar donde quieras: no hay renovación automática ni débito de nada. Si ya sabés que querés hacer el camino completo, podés llevarte los 3 niveles juntos y te sale bastante menos que comprarlos de a uno.",
  },
  {
    question: "Si compro los 3 niveles, ¿tengo que hacerlos en 3 meses?",
    answer:
      "No. Tenés 6 meses para completarlos, el doble del tiempo que necesitás en teoría, porque la vida real tiene semanas malas. El nivel siguiente se te habilita cuando completás el 80% del anterior, o sea 10 de las 12 sesiones: no hace falta que hayas hecho todo perfecto. Y si te pasa algo que te saca de juego, me escribís y te freno el reloj 30 días, sin tener que explicarme nada.",
  },
];
