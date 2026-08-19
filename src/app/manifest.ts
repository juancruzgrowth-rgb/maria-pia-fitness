import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
import { THEME } from "@/lib/theme";

/**
 * Manifest de la web app. Reemplaza al `site.webmanifest` estático que venía
 * con el paquete de favicons: acá el nombre sale de `site.ts` y el color de
 * `theme.ts`, así que renombrar la marca o cambiar de piel no deja el manifest
 * desactualizado.
 *
 * Los íconos del manifest son los únicos que viven en `public/`. El resto
 * (favicon.ico, icon.png, apple-icon.png) los sirve Next por convención de
 * archivo desde `src/app/`, con hash de contenido y caché inmutable.
 *
 * `theme_color` es el canvas del sitio, no el negro del ícono: pinta la barra
 * del navegador en mobile y tiene que continuar la página, no el logotipo.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SITE.brand} · ${SITE.tagline}`,
    short_name: SITE.brand,
    description: SITE.tagline,
    lang: "es-AR",
    start_url: "/",
    display: "standalone",
    background_color: THEME.canvas,
    theme_color: THEME.canvas,
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
