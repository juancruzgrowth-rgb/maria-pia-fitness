import { FAQS } from "@/content/offer";
import {
  CHALLENGE,
  ENROLLMENT_OPEN,
  formatARS,
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
    taxID: SITE.cuit,
    founder: { "@type": "Person", name: SITE.ownerName },
    address: {
      "@type": "PostalAddress",
      ...(SITE.fiscalAddress ? { streetAddress: SITE.fiscalAddress } : {}),
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
      availability: ENROLLMENT_OPEN
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

/** Descripción usada en metadatos. Refleja el estado real de la inscripción. */
export function homeDescription(): string {
  const price = formatARS(CHALLENGE.priceARS);
  return ENROLLMENT_OPEN
    ? `Entrenamiento online para mujeres que trabajan 8 horas o más. Tres sesiones por semana, con el seguimiento de Pía. Empezás el día que entrás. ${price} por mes, precio de lanzamiento.`
    : `Entrenamiento online para mujeres que trabajan 8 horas o más. Tres sesiones por semana, con el seguimiento de Pía. Inscripción cerrada por ahora — anotate y te aviso.`;
}
