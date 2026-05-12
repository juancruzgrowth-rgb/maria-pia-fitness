export interface ReelPlaceholder {
  id: string;
  caption: string;
  embedUrl: string;
}

export const REELS: ReelPlaceholder[] = [
  {
    id: "reel-1",
    caption: "Cómo activar el core antes de cualquier sentadilla.",
    embedUrl: "https://www.youtube.com/embed/wWO2WESF6ZE?autoplay=1&mute=1&loop=1&playlist=wWO2WESF6ZE",
  },
  {
    id: "reel-2",
    caption: "Tres comidas reales para una semana exigente.",
    embedUrl: "https://www.youtube.com/embed/lNOrC2pzVaA?autoplay=1&mute=1&loop=1&playlist=lNOrC2pzVaA",
  },
  {
    id: "reel-3",
    caption: "El error más común al hacer peso muerto.",
    embedUrl: "https://www.youtube.com/embed/GBfYssqUnpI?autoplay=1&mute=1&loop=1&playlist=GBfYssqUnpI",
  },
  {
    id: "reel-4",
    caption: "Por qué dormir menos de 7 hs frena tu progreso.",
    embedUrl: "https://www.youtube.com/embed/ksV-J94rhic?autoplay=1&mute=1&loop=1&playlist=ksV-J94rhic",
  },
];
