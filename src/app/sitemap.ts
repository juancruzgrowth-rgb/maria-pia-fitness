import type { MetadataRoute } from "next";
import { publicEnv } from "@/lib/env";

const BASE_URL = publicEnv.siteUrl.replace(/\/$/, "");

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    { url: BASE_URL, lastModified, changeFrequency: "weekly", priority: 1 },
    {
      /* Obligatorio y tiene que ser fácil de encontrar (Res. 424/2020). */
      url: `${BASE_URL}/cancelar`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.4,
    },
    {
      url: `${BASE_URL}/terminos-condiciones`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/politica-privacidad`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/proteccion-datos`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
