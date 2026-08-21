import { z } from "zod";

const optionalString = z.string().optional().default("");

const envSchema = z.object({
  NEXT_PUBLIC_SITE_URL: z
    .string()
    .url()
    .optional()
    .default("http://localhost:3000"),
  NEXT_PUBLIC_CALENDLY_URL: optionalString,

  MERCADOPAGO_ACCESS_TOKEN: optionalString,
  NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY: optionalString,
  MERCADOPAGO_WEBHOOK_SECRET: optionalString,

  /** Webhook de n8n que dispara A4 (onboarding). Vacío = no se dispara. */
  N8N_ONBOARDING_WEBHOOK_URL: optionalString,

  /** Link de invitación a la comunidad de Skool. Se muestra en /bienvenida. */
  NEXT_PUBLIC_SKOOL_INVITE_URL: optionalString,
  /** Link de invitación al grupo de WhatsApp. Se muestra en /bienvenida. */
  NEXT_PUBLIC_WHATSAPP_GROUP_URL: optionalString,

  BREVO_API_KEY: optionalString,
  BREVO_LIST_ID: optionalString,

  GOOGLE_SHEETS_SHEET_ID: optionalString,
  GOOGLE_SERVICE_ACCOUNT_EMAIL: optionalString,
  GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY: optionalString,

  NEXT_PUBLIC_WHATSAPP_NUMBER: optionalString,
  NEXT_PUBLIC_INSTAGRAM_URL: optionalString,
  NEXT_PUBLIC_TIKTOK_URL: optionalString,
  NEXT_PUBLIC_YOUTUBE_URL: optionalString,
});

const parsed = envSchema.safeParse({
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  NEXT_PUBLIC_CALENDLY_URL: process.env.NEXT_PUBLIC_CALENDLY_URL,

  MERCADOPAGO_ACCESS_TOKEN: process.env.MERCADOPAGO_ACCESS_TOKEN,
  NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY:
    process.env.NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY,
  MERCADOPAGO_WEBHOOK_SECRET: process.env.MERCADOPAGO_WEBHOOK_SECRET,

  N8N_ONBOARDING_WEBHOOK_URL: process.env.N8N_ONBOARDING_WEBHOOK_URL,

  NEXT_PUBLIC_SKOOL_INVITE_URL: process.env.NEXT_PUBLIC_SKOOL_INVITE_URL,
  NEXT_PUBLIC_WHATSAPP_GROUP_URL: process.env.NEXT_PUBLIC_WHATSAPP_GROUP_URL,

  BREVO_API_KEY: process.env.BREVO_API_KEY,
  BREVO_LIST_ID: process.env.BREVO_LIST_ID,

  GOOGLE_SHEETS_SHEET_ID: process.env.GOOGLE_SHEETS_SHEET_ID,
  GOOGLE_SERVICE_ACCOUNT_EMAIL: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
  GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY:
    process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY,

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
  mercadopagoPublicKey: env.NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY,
  skoolInviteUrl: env.NEXT_PUBLIC_SKOOL_INVITE_URL,
  whatsappGroupUrl: env.NEXT_PUBLIC_WHATSAPP_GROUP_URL,
  whatsappNumber: env.NEXT_PUBLIC_WHATSAPP_NUMBER,
  instagramUrl: env.NEXT_PUBLIC_INSTAGRAM_URL,
  tiktokUrl: env.NEXT_PUBLIC_TIKTOK_URL,
  youtubeUrl: env.NEXT_PUBLIC_YOUTUBE_URL,
} as const;
