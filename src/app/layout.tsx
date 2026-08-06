import type { Metadata, Viewport } from "next";
import { Manrope, Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BuyBar } from "@/components/layout/BuyBar";
import { JsonLd } from "@/components/JsonLd";
import { SITE } from "@/lib/site";
import { CHALLENGE } from "@/lib/products";
import { homeDescription, organizationJsonLd } from "@/lib/seo";
import { publicEnv } from "@/lib/env";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

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
    "María Pía entrenadora",
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
  themeColor: "#F5F5F2",
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
      className={`${manrope.variable} ${inter.variable} h-full antialiased`}
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
