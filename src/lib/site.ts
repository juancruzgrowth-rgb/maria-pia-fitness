import { publicEnv } from "@/lib/env";

export const SITE = {
  brand: "MP — Centro de Entrenamiento Personalizado",
  shortBrand: "MP CEP",
  tagline: "Entrenamiento personalizado. Resultados con método.",
  ownerName: "Maria Pia",
  city: "Rosario, Santa Fe",
  country: "Argentina",
  email: "hola@mpcep.com",
  fiscalName: "Maria Pia — MP Centro de Entrenamiento Personalizado",
} as const;

export const NAV_SECTIONS = [
  { id: "servicios", label: "Servicios" },
  { id: "casos", label: "Casos" },
  { id: "sobre-mi", label: "Sobre mí" },
  { id: "newsletter", label: "Newsletter" },
] as const;

const cleanedNumber = publicEnv.whatsappNumber.replace(/[^\d]/g, "");

export const CONTACT = {
  whatsappNumber: cleanedNumber,
  whatsappUrl: cleanedNumber
    ? `https://wa.me/${cleanedNumber}?text=${encodeURIComponent(
        "Hola Maria Pia, vi tu web y quiero saber más sobre tus programas.",
      )}`
    : "#",
  instagramUrl: publicEnv.instagramUrl || "https://www.instagram.com/mp.cep",
  tiktokUrl: publicEnv.tiktokUrl,
  youtubeUrl: publicEnv.youtubeUrl,
  calendlyUrl: publicEnv.calendlyUrl,
} as const;
