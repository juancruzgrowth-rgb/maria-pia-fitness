import { z } from "zod";

const optionalString = z.string().optional().default("");

const envSchema = z.object({
  NEXT_PUBLIC_SITE_URL: z
    .string()
    .url()
    .optional()
    .default("http://localhost:3000"),
  NEXT_PUBLIC_CALENDLY_URL: optionalString,

  /** Link de invitación a la comunidad de Skool. Lo manda Pía a mano. */
  NEXT_PUBLIC_SKOOL_INVITE_URL: optionalString,
  /** Link de invitación al grupo de WhatsApp. Lo manda Pía a mano. */
  NEXT_PUBLIC_WHATSAPP_GROUP_URL: optionalString,

  BREVO_API_KEY: optionalString,
  BREVO_LIST_ID: optionalString,


  NEXT_PUBLIC_WHATSAPP_NUMBER: optionalString,
  NEXT_PUBLIC_INSTAGRAM_URL: optionalString,
  NEXT_PUBLIC_TIKTOK_URL: optionalString,
  NEXT_PUBLIC_YOUTUBE_URL: optionalString,
});

const parsed = envSchema.safeParse({
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  NEXT_PUBLIC_CALENDLY_URL: process.env.NEXT_PUBLIC_CALENDLY_URL,


  NEXT_PUBLIC_SKOOL_INVITE_URL: process.env.NEXT_PUBLIC_SKOOL_INVITE_URL,
  NEXT_PUBLIC_WHATSAPP_GROUP_URL: process.env.NEXT_PUBLIC_WHATSAPP_GROUP_URL,

  BREVO_API_KEY: process.env.BREVO_API_KEY,
  BREVO_LIST_ID: process.env.BREVO_LIST_ID,


  NEXT_PUBLIC_WHATSAPP_NUMBER: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER,
  NEXT_PUBLIC_INSTAGRAM_URL: process.env.NEXT_PUBLIC_INSTAGRAM_URL,
  NEXT_PUBLIC_TIKTOK_URL: process.env.NEXT_PUBLIC_TIKTOK_URL,
  NEXT_PUBLIC_YOUTUBE_URL: process.env.NEXT_PUBLIC_YOUTUBE_URL,
});

if (!parsed.success) {
  throw new Error(
    `Invalid environment variables:\n${parsed.error.issues
      .map((i) => `  - ${i.path.join(".")}: ${i.message}`)
      .join("\n")}`,
  );
}

export const env = parsed.data;

export const publicEnv = {
  siteUrl: env.NEXT_PUBLIC_SITE_URL,
  calendlyUrl: env.NEXT_PUBLIC_CALENDLY_URL,
  skoolInviteUrl: env.NEXT_PUBLIC_SKOOL_INVITE_URL,
  whatsappGroupUrl: env.NEXT_PUBLIC_WHATSAPP_GROUP_URL,
  whatsappNumber: env.NEXT_PUBLIC_WHATSAPP_NUMBER,
  instagramUrl: env.NEXT_PUBLIC_INSTAGRAM_URL,
  tiktokUrl: env.NEXT_PUBLIC_TIKTOK_URL,
  youtubeUrl: env.NEXT_PUBLIC_YOUTUBE_URL,
} as const;
