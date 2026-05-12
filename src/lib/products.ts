export type Currency = "ARS" | "USD";

export interface ProductPackage {
  id: string;
  name: string;
  tagline: string;
  duration: string;
  prices: Record<Currency, number>;
  goal: string;
  includes: string[];
  badge?: string;
  recommended?: boolean;
  audioUrl?: string;
}

export const PRODUCTS: ProductPackage[] = [
  {
    id: "programa-90-dias",
    name: "Programa 90 Días",
    tagline: "Mejorar hábitos, subir energía y tonificar el cuerpo en 90 días, sin depender de la motivación.",
    duration: "90 días",
    prices: { ARS: 39900, USD: 39 },
    goal: "Un solo curso, un solo método, una sola promesa clara.",
    includes: [
      "Acceso a Skool por 90 días (comunidad + contenido)",
      "Curso pregrabado paso a paso: Fase 1 Orden, Fase 2 Nutrición, Fase 3 Entrenamiento, Fase 4 Sostener",
      "Llamada inicial 1:1 de bienvenida con María Pía",
      "Comunidad en Skool + WhatsApp grupal",
      "Planillas de seguimiento y rutinas semanales",
      "Guías prácticas de nutrición y checklist diario",
      "Rutinas grabadas con progresión por semanas",
      "Corrección semanal de técnica por video (Loom o WhatsApp)",
      "Recordatorios automáticos y check-ins de avance",
    ],
    recommended: true,
    badge: "Lanzamiento",
    audioUrl: "",
  },
];

export function getProductById(id: string): ProductPackage | undefined {
  return PRODUCTS.find((p) => p.id === id);
}

const ARS_FORMATTER = new Intl.NumberFormat("es-AR", {
  style: "currency",
  currency: "ARS",
  maximumFractionDigits: 0,
});

const USD_FORMATTER = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

export function formatPrice(amount: number, currency: Currency): string {
  return currency === "ARS"
    ? ARS_FORMATTER.format(amount)
    : USD_FORMATTER.format(amount);
}
