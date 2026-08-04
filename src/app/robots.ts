import type { MetadataRoute } from "next";
import { publicEnv } from "@/lib/env";

const BASE_URL = publicEnv.siteUrl.replace(/\/$/, "");

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/comprar",
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
