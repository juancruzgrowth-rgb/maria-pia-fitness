export interface ReelPlaceholder {
  id: string;
  caption: string;
  videoUrl: string;
}

export const REELS: ReelPlaceholder[] = [
  {
    id: "reel-1",
    caption: "Cómo activar el core antes de cualquier sentadilla.",
    videoUrl: "/videos/reel-uno.mp4",
  },
  {
    id: "reel-2",
    caption: "Tres comidas reales para una semana exigente.",
    videoUrl: "/videos/reel-dos.mp4",
  },
  {
    id: "reel-3",
    caption: "El error más común al hacer peso muerto.",
    videoUrl: "/videos/reel-tres.mp4",
  },
  {
    id: "reel-4",
    caption: "Por qué dormir menos de 7 hs frena tu progreso.",
    videoUrl: "/videos/reel-cuatro.mp4",
  },
];
