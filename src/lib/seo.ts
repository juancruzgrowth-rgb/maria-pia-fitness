import { FAQS } from "@/content/offer";
import {
  CHALLENGE,
  GROUP,
  GUARANTEE,
  formatARS,
  isGroupOpen,
} from "@/lib/products";
import { publicEnv } from "@/lib/env";
import { SITE, CONTACT } from "@/lib/site";

const BASE_URL = publicEnv.siteUrl.replace(/\/$/, "");

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "HealthAndBeautyBusiness",
    name: SITE.brand,
    alternateName: SITE.shortBrand,
    url: BASE_URL,
    email: SITE.email,
    founder: { "@type": "Person", name: SITE.ownerName },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Rosario",
      addressRegion: "Santa Fe",
      addressCountry: "AR",
    },
    areaServed: { "@type": "Country", name: "Argentina" },
    sameAs: [CONTACT.instagramUrl, CONTACT.tiktokUrl, CONTACT.youtubeUrl].filter(
      Boolean,
    ),
  };
}

export function challengeJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: CHALLENGE.name,
    description: CHALLENGE.promise,
    brand: { "@type": "Brand", name: SITE.shortBrand },
    category: "Entrenamiento online",
    audience: { "@type": "Audience", audienceType: CHALLENGE.forWhom },
    offers: {
      "@type": "Offer",
      price: CHALLENGE.priceARS,
      priceCurrency: "ARS",
      availability: isGroupOpen
        ? "https://schema.org/InStock"
        : "https://schema.org/PreOrder",
      url: `${BASE_URL}/comprar`,
      seller: { "@type": "Person", name: SITE.ownerName },
    },
  };
}

export function faqJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

/** Descripción usada en metadatos. Refleja el estado real del grupo. */
export function homeDescription(): string {
  const price = formatARS(CHALLENGE.priceARS);
  return isGroupOpen
    ? `Reto de 28 días online para mujeres que trabajan 8 horas o más. Tres sesiones por semana, en gimnasio o en casa, con el seguimiento de Pía. ${GROUP.label}: arranca el ${GROUP.startsAt}. ${price}, con ${GUARANTEE.days} días de garantía.`
    : `Reto de 28 días online para mujeres que trabajan 8 horas o más. Tres sesiones por semana, en gimnasio o en casa, con el seguimiento de Pía. Inscripción cerrada — anotate para el próximo grupo.`;
}
