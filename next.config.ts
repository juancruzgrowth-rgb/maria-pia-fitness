import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /**
   * Permite compilar varios temas a la vez en carpetas distintas, para poder
   * levantar las tres pieles en paralelo y compararlas lado a lado:
   *   NEXT_DIST_DIR=.next-moretto NEXT_PUBLIC_THEME=moretto npm run build
   * En Vercel y en el día a día no se define y usa `.next` como siempre.
   */
  distDir: process.env.NEXT_DIST_DIR || ".next",
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.pexels.com" },
      { protocol: "https", hostname: "videos.pexels.com" },
      { protocol: "https", hostname: "scontent.cdninstagram.com" },
      { protocol: "https", hostname: "instagram.com" },
      { protocol: "https", hostname: "www.instagram.com" },
    ],
  },
  experimental: {
    optimizePackageImports: ["@phosphor-icons/react"],
  },
};

export default nextConfig;
