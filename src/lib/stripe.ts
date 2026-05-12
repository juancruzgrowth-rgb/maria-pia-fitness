import Stripe from "stripe";
import { env } from "@/lib/env";

let cachedClient: Stripe | null = null;

export function getStripeClient(): Stripe {
  if (!env.STRIPE_SECRET_KEY) {
    throw new Error("STRIPE_SECRET_KEY is not configured");
  }
  if (!cachedClient) {
    cachedClient = new Stripe(env.STRIPE_SECRET_KEY, {
      apiVersion: "2026-04-22.dahlia",
      typescript: true,
    });
  }
  return cachedClient;
}

export interface CreateSessionItem {
  id: string;
  title: string;
  quantity: number;
  unitPriceUsd: number;
}

export interface CreateSessionInput {
  items: CreateSessionItem[];
  customerEmail: string;
  externalReference: string;
  successUrl: string;
  cancelUrl: string;
}

export async function createCheckoutSession(input: CreateSessionInput) {
  const client = getStripeClient();
  return client.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],
    customer_email: input.customerEmail,
    client_reference_id: input.externalReference,
    line_items: input.items.map((item) => ({
      quantity: item.quantity,
      price_data: {
        currency: "usd",
        unit_amount: Math.round(item.unitPriceUsd * 100),
        product_data: {
          name: item.title,
          metadata: { product_id: item.id },
        },
      },
    })),
    success_url: input.successUrl,
    cancel_url: input.cancelUrl,
    metadata: {
      external_reference: input.externalReference,
    },
  });
}
