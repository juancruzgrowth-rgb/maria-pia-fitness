export const HERO = {
  eyebrow: "FLEX PROGRAM · 100% ONLINE",
  headlineLead: "No te falta voluntad.",
  headlineAccent: "Te falta un plan que entre en tu semana.",
  description:
    "El Flex Program es un entrenamiento online para mujeres que buscan optimizar su tiempo diario. Tres sesiones semanales, con seguimiento y acompañamiento profesional. Obtenés un nuevo nivel cuando completás al que estás suscripta.",
  /**
   * Version corta para mobile. Ahi el hero se reduce a titulo, una linea y el
   * video: el texto largo empujaba la miniatura abajo del pliegue.
   */
  descriptionShort:
    "Entrenamiento online para mujeres que disponen de poco tiempo.",
  videoBadge: "Te lo explico en 2 minutos",
  videoPosterUrl: "/images/miniatura-presentacion.jpg",
  /** Art direction: en mobile va otra foto de Pía. Ver Hero.tsx. */
  videoPosterUrlMobile: "/images/miniatura-presentacion-mobile.jpg",
  videoUrl: "/videos/presentacion.mp4",
  trustPoints: [
    { label: "3 días", caption: "por semana, no más" },
    { label: "30-60 min", caption: "por sesión, a tu horario" },
    { label: "Nivel a nivel", caption: "avanzás cuando estás lista" },
  ],
} as const;
