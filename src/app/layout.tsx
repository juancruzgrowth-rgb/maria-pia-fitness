import type { Metadata, Viewport } from "next";
import { Bodoni_Moda, Newsreader, Montserrat } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BuyBar } from "@/components/layout/BuyBar";
import { JsonLd } from "@/components/JsonLd";
import { SITE } from "@/lib/site";
import { CHALLENGE } from "@/lib/products";
import { homeDescription, organizationJsonLd } from "@/lib/seo";
import { publicEnv } from "@/lib/env";
import { THEME, THEME_ID } from "@/lib/theme";

/**
 * Sistema tipográfico de la identidad "Pía Moretto". Es el mismo en las tres
 * pieles: la tipografía es de la marca, el color es lo que está a prueba.
 *
 * El logotipo oficial usa Quiche (Adam Ladd) arriba y Montserrat abajo. Quiche
 * es comercial y viene incluida en Canva, pero usarla en la web necesita una
 * licencia de webfont aparte — así que acá se sustituye por Bodoni Moda, que
 * comparte el alto contraste y las serifas finas del logotipo.
 *
 * Tres roles, no dos:
 *   display → Bodoni Moda  · titulares. La voz del logotipo
 *   body    → Newsreader   · texto largo. Serif de lectura, bajo contraste
 *   ui      → Montserrat   · etiquetas, botones y navegación. Sale del logo
 *
 * Las dos serifas se distinguen por ROL y por contraste de trazo, que es lo que
 * evita que una combinación serif+serif se lea como un error.
 *
 * `axes: ["opsz"]` no es decorativo: es lo que permite engrosar las serifas en
 * la piel oscura, donde los trazos finos se desvanecen. Ver globals.css.
 *
 * Las tres se precargan porque las tres se usan en todas las páginas. Ojo si
 * alguna vez se agrega una cuarta familia para una sola piel: `next/font`
 * emite un `<link rel="preload">` por cada familia que se instancia en este
 * módulo, se renderice o no, y `preload` no admite una expresión condicional
 * — el cargador de fuentes exige valores literales.
 */
const bodoni = Bodoni_Moda({
  variable: "--font-bodoni",
  subsets: ["latin"],
  axes: ["opsz"],
  display: "swap",
});

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  axes: ["opsz"],
  display: "swap",
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  display: "swap",
});

const FONT_VARIABLES = `${bodoni.variable} ${newsreader.variable} ${montserrat.variable}`;

export const metadata: Metadata = {
  metadataBase: new URL(publicEnv.siteUrl),
  title: {
    default: `${CHALLENGE.name} · Entrenamiento online para mujeres con poco tiempo`,
    template: `%s · ${SITE.shortBrand}`,
  },
  description: homeDescription(),
  keywords: [
    "entrenamiento online para mujeres",
    "entrenar con poco tiempo",
    "rutina de gimnasio y de casa",
    "entrenar 3 veces por semana",
    "reto fitness 28 días",
    "entrenamiento y nutrición online Argentina",
    "Pía Moretto entrenadora",
  ],
  authors: [{ name: SITE.ownerName }],
  creator: SITE.ownerName,
  openGraph: {
    title: `${CHALLENGE.name} · ${SITE.shortBrand}`,
    description: CHALLENGE.promise,
    locale: "es_AR",
    type: "website",
    siteName: SITE.brand,
  },
  twitter: {
    card: "summary_large_image",
    title: `${CHALLENGE.name} · ${SITE.shortBrand}`,
    description: CHALLENGE.promise,
  },
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: THEME.canvas,
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="es-AR"
      data-theme={THEME_ID}
      className={`${FONT_VARIABLES} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-mp-canvas text-mp-ink">
        <a
          href="#contenido"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-mp-ink focus:px-4 focus:py-2 focus:text-sm focus:text-mp-canvas"
        >
          Saltar al contenido
        </a>
        <Navbar />
        <main id="contenido" className="flex-1 pt-16 md:pt-20">
          {children}
        </main>
        <Footer />
        <BuyBar />
        <JsonLd data={organizationJsonLd()} />
      </body>
    </html>
  );
}
