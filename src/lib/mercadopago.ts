import { MercadoPagoConfig, Preference } from "mercadopago";
import { env } from "@/lib/env";

let cachedClient: MercadoPagoConfig | null = null;

export function getMercadoPagoClient(): MercadoPagoConfig {
  if (!env.MERCADOPAGO_ACCESS_TOKEN) {
    throw new Error("MERCADOPAGO_ACCESS_TOKEN is not configured");
  }
  if (!cachedClient) {
    cachedClient = new MercadoPagoConfig({
      accessToken: env.MERCADOPAGO_ACCESS_TOKEN,
      options: { timeout: 10000 },
    });
  }
  return cachedClient;
}

export interface CreatePreferenceItem {
  id: string;
  title: string;
  quantity: number;
  unitPrice: number;
}

export interface CreatePreferenceInput {
  items: CreatePreferenceItem[];
  payer: { name: string; email: string };
  externalReference: string;
  successUrl: string;
  failureUrl: string;
  pendingUrl: string;
  notificationUrl: string;
}

export async function createPreference(input: CreatePreferenceInput) {
  const client = getMercadoPagoClient();
  const preference = new Preference(client);
  return preference.create({
    body: {
      items: input.items.map((item) => ({
        id: item.id,
        title: item.title,
        quantity: item.quantity,
        unit_price: item.unitPrice,
        currency_id: "ARS",
      })),
      payer: {
        name: input.payer.name,
        email: input.payer.email,
      },
      external_reference: input.externalReference,
      back_urls: {
        success: input.successUrl,
        failure: input.failureUrl,
        pending: input.pendingUrl,
      },
      auto_return: "approved",
      notification_url: input.notificationUrl,
    },
  });
}
