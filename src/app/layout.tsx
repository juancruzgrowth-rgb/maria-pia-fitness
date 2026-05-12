import type { Metadata, Viewport } from "next";
import { Manrope, Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFab } from "@/components/layout/WhatsAppFab";
import { CartDrawer } from "@/components/ui/CartDrawer";
import { SITE } from "@/lib/site";
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
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(publicEnv.siteUrl),
  title: {
    default: `${SITE.brand} · Entrenamiento personalizado en ${SITE.city}`,
    template: `%s · ${SITE.shortBrand}`,
  },
  description:
    "Programas de entrenamiento y nutrición personalizados con Maria Pia. Método, seguimiento real y resultados sostenibles.",
  openGraph: {
    title: SITE.brand,
    description:
      "Entrenamiento y nutrición personalizados con método y seguimiento real.",
    locale: "es_AR",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
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
      <body className="min-h-full flex flex-col bg-mp-canvas text-mp-ink">
        <Navbar />
        <main className="flex-1 pt-16 md:pt-20">{children}</main>
        <Footer />
        <CartDrawer />
        <WhatsAppFab />
      </body>
    </html>
  );
}
