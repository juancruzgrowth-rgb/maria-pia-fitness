export interface SuccessStory {
  id: string;
  name: string;
  age: number;
  job: string;
  duration: string;
  imageUrl: string;
  caseSummary: string;
  testimonial: string;
}

/**
 * TODO(contenido): testimonios provisorios. Reemplazar por casos reales
 * con foto propia y permiso de uso escrito antes de publicar.
 */
export const STORIES: SuccessStory[] = [
  {
    id: "lucia",
    name: "Lucía F.",
    age: 32,
    job: "Contadora · 9 h por día",
    duration: "28 días",
    imageUrl:
      "https://images.pexels.com/photos/3768916/pexels-photo-3768916.jpeg?auto=compress&cs=tinysrgb&w=900",
    caseSummary:
      "Dos hijos y jornada completa. Hacía tres años que no entrenaba. Terminó el reto con cuatro sesiones semanales sostenidas.",
    testimonial:
      "Pensé que era cuestión de fuerza de voluntad. Era cuestión de que alguien me dijera qué hacer en los 30 minutos que tenía.",
  },
  {
    id: "carolina",
    name: "Carolina M.",
    age: 41,
    job: "Abogada · 10 h por día",
    duration: "28 días",
    imageUrl:
      "https://images.pexels.com/photos/3768722/pexels-photo-3768722.jpeg?auto=compress&cs=tinysrgb&w=900",
    caseSummary:
      "Agenda imposible y dolor lumbar de estar sentada todo el día. Trabajó técnica y fuerza sin salir de casa.",
    testimonial:
      "Lo que más me sirvió fue el plan B de 10 minutos. Los días que no llegaba a nada, igual hacía algo. Eso fue lo que hizo que no abandonara.",
  },
  {
    id: "romina",
    name: "Romina V.",
    age: 31,
    job: "Diseñadora · trabajo remoto",
    duration: "28 días",
    imageUrl:
      "https://images.pexels.com/photos/3764013/pexels-photo-3764013.jpeg?auto=compress&cs=tinysrgb&w=900",
    caseSummary:
      "Doce horas frente a la pantalla y cero movimiento. Empezó con tres días y terminó el reto pidiendo el programa largo.",
    testimonial:
      "Entrenar 30 minutos me devolvió la energía para el resto del día. No lo hago por el espejo, lo hago porque llego a las 7 de la tarde entera.",
  },
  {
    id: "valentina",
    name: "Valentina S.",
    age: 29,
    job: "Enfermera · turnos rotativos",
    duration: "28 días",
    imageUrl:
      "https://images.pexels.com/photos/3768724/pexels-photo-3768724.jpeg?auto=compress&cs=tinysrgb&w=900",
    caseSummary:
      "Horarios que cambian cada semana. Aprendió a acomodar el entrenamiento a turnos irregulares sin perder continuidad.",
    testimonial:
      "Con mis turnos ningún plan me había servido nunca. Este se adaptó a mi caos en vez de pedirme que yo me adaptara a él.",
  },
  {
    id: "paula",
    name: "Paula B.",
    age: 38,
    job: "Gerenta comercial · 9 h por día",
    duration: "28 días",
    imageUrl:
      "https://images.pexels.com/photos/3822356/pexels-photo-3822356.jpeg?auto=compress&cs=tinysrgb&w=900",
    caseSummary:
      "Viajes de trabajo constantes y comidas afuera casi todos los días. Ordenó la alimentación sin dejar de comer en restaurantes.",
    testimonial:
      "La guía de cómo comer afuera me cambió la semana. Dejé de sentir que cada almuerzo de trabajo arruinaba todo.",
  },
  {
    id: "micaela",
    name: "Micaela G.",
    age: 34,
    job: "Docente · doble turno",
    duration: "28 días",
    imageUrl:
      "https://images.pexels.com/photos/3757942/pexels-photo-3757942.jpeg?auto=compress&cs=tinysrgb&w=900",
    caseSummary:
      "Doble turno y correcciones a la noche. Encontró su ventana a las 6 de la mañana y sostuvo las cuatro semanas completas.",
    testimonial:
      "Arrancar todas juntas el mismo día fue clave. Ver en el grupo que las demás también estaban en el día 12 me hizo no faltar.",
  },
];
