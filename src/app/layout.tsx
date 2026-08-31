import type { Metadata, Viewport } from "next";
import { Fraunces, Newsreader, Montserrat } from "next/font/google";
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
 * licencia de webfont aparte, así que hay que sustituirla.
 *
 * Se probó Bodoni Moda y se descartó. Una Didone tiene los trazos finos casi sin
 * espesor: se ve preciosa a 56px y se desarma abajo de ~24px, que es donde vive
 * la mitad del texto de esta web. El "4" perdía la diagonal y se leía como "1",
 * la "F" perdía el brazo y "40.000" parecía "10.000" — en el precio, que es el
 * peor lugar posible para una ambigüedad.
 *
 * Fraunces es la sustituta correcta y de paso se parece más a Quiche: Quiche es
 * una serif suave de serifas flaradas, no una Didone. Fraunces trae ese mismo
 * gesto con contraste moderado, así que aguanta los 16px del precio sin perder
 * el aire editorial.
 *
 * Tres roles, no dos:
 *   display → Fraunces    · titulares y cifras. La voz del logotipo
 *   body    → Newsreader  · texto largo. Serif de lectura, bajo contraste
 *   ui      → Montserrat  · etiquetas, botones y navegación. Sale del logo
 *
 * Las dos serifas se distinguen por ROL y por contraste de trazo, que es lo que
 * evita que una combinación serif+serif se lea como un error.
 *
 * Se pide UN solo eje y sólo en la display: `opsz`, que es el que engrosa los
 * trazos de un precio de 16px sin tocar un titular de 56px — exactamente el
 * problema que se está arreglando. Cada eje extra engorda el archivo, así que
 * hay que poder justificar cada uno:
 *
 *   · Fraunces `SOFT` y `WONK` no se piden. Sus valores por defecto ya son los
 *     que queremos (0 y 0), y pedirlos para escribir el valor que ya tienen
 *     costaba 52 KB. Verificado comparando capturas: render idéntico.
 *   · Newsreader no lleva `opsz`. El texto de lectura vive a un solo tamaño,
 *     así que el eje no llegaba a trabajar. Son otros 72 KB, y también se
 *     verificó que el render no cambia.
 *
 * Entre las dos cosas, las fuentes precargadas pasan de 281 KB a 157 KB.
 *
 * Las tres se precargan porque las tres se usan en todas las páginas. Ojo si
 * alguna vez se agrega una cuarta familia para una sola piel: `next/font`
 * emite un `<link rel="preload">` por cada familia que se instancia en este
 * módulo, se renderice o no, y `preload` no admite una expresión condicional
 * — el cargador de fuentes exige valores literales.
 */
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["opsz"],
  display: "swap",
});

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  display: "swap",
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  display: "swap",
});

const FONT_VARIABLES = `${fraunces.variable} ${newsreader.variable} ${montserrat.variable}`;

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
    "rutina de gimnasio para mujeres",
    "entrenar 3 veces por semana",
    "programa fitness online",
    "entrenamiento online Argentina",
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
    // La pieza que se comparte es el monograma cuadrado: "summary" la muestra
    // entera, "summary_large_image" la recortaria a 2:1.
    card: "summary",
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
