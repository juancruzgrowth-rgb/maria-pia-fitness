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
    id: "transform",
    name: "MP Transform",
    tagline: "12 semanas para una recomposición real.",
    duration: "12 semanas",
    prices: { ARS: 120000, USD: 120 },
    goal: "Bajar grasa, ganar tono y aprender a sostenerlo sin volver atrás.",
    includes: [
      "Entrenamiento progresivo en bloques de 4 semanas",
      "Plan nutricional personalizado con ajustes quincenales",
      "Seguimiento semanal por chat con feedback técnico",
      "Mediciones y check-ins guiados al inicio, mitad y cierre",
      "Biblioteca de ejercicios con videos demostrativos",
      "Planilla de seguimiento semanal compartida",
      "Guía de alimentación pre y post entrenamiento",
      "Revisión de técnica por video a demanda",
    ],
    recommended: true,
    badge: "Más elegido",
    audioUrl: "",
  },
  {
    id: "elite",
    name: "MP Elite 1:1",
    tagline: "Mentoría premium con acceso directo.",
    duration: "16 semanas",
    prices: { ARS: 240000, USD: 240 },
    goal: "Alcanzar tu mejor versión con acompañamiento sin filtros.",
    includes: [
      "Entrenamiento + nutrición integrados y revisados semana a semana",
      "Chat directo con respuesta dentro de 24 hs hábiles",
      "Llamada quincenal de seguimiento por video",
      "Material adicional: sueño, manejo del estrés, hábitos diarios",
      "Corrección de técnica en tiempo real (en persona o por video)",
      "Planificación de alimentación para viajes o imprevistos",
      "Acceso prioritario a seminarios y clases en vivo",
      "Informe mensual detallado de progreso",
      "Plan de mantenimiento personalizado al finalizar el programa",
    ],
    badge: "1:1",
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
