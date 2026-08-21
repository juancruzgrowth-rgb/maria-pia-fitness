import { createHmac, timingSafeEqual } from "node:crypto";
import { MercadoPagoConfig, Payment, PreApproval, Preference } from "mercadopago";
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

/* -------------------------------------------------------------------------- */
/*  Suscripción — preapproval SIN plan asociado                               */
/* -------------------------------------------------------------------------- */

export interface CreateSubscriptionInput {
  /** Importe mensual en ARS. Sale de products.ts, nunca de la request. */
  amountARS: number;
  /** Texto que la clienta ve en el resumen de su tarjeta. */
  reason: string;
  payerEmail: string;
  externalReference: string;
  backUrl: string;
}

/**
 * Crea la suscripción con débito automático.
 *
 * Va SIN `preapproval_plan_id` a propósito: cada suscripción lleva su propio
 * `transaction_amount`, así que subir el precio para las nuevas no toca a las
 * que ya están adentro. Es lo que hace literalmente cierta la promesa del
 * precio fundador. Ver docs/estrategia/21-mercadopago-suscripciones.md §2.
 */
export async function createSubscription(input: CreateSubscriptionInput) {
  const preapproval = new PreApproval(getMercadoPagoClient());
  return preapproval.create({
    body: {
      reason: input.reason,
      external_reference: input.externalReference,
      payer_email: input.payerEmail,
      back_url: input.backUrl,
      /* `pending` es lo que hace que MP devuelva un init_point al que mandar
         a la clienta. Con `authorized` esperaría un card_token_id nuestro. */
      status: "pending",
      auto_recurring: {
        frequency: 1,
        frequency_type: "months",
        transaction_amount: input.amountARS,
        currency_id: "ARS",
      },
    },
  });
}

export async function getSubscription(id: string) {
  const preapproval = new PreApproval(getMercadoPagoClient());
  return preapproval.get({ id });
}

/** Baja de la suscripción. Es irreversible: MP no reactiva un `cancelled`. */
export async function cancelSubscription(id: string) {
  const preapproval = new PreApproval(getMercadoPagoClient());
  return preapproval.update({ id, body: { status: "cancelled" } });
}

/* -------------------------------------------------------------------------- */
/*  Pago único — preference (plan trimestral)                                 */
/* -------------------------------------------------------------------------- */

export interface CreatePreferenceInput {
  itemId: string;
  title: string;
  amountARS: number;
  payer: { name: string; email: string };
  externalReference: string;
  successUrl: string;
  failureUrl: string;
  pendingUrl: string;
  notificationUrl: string;
}

export async function createPreference(input: CreatePreferenceInput) {
  const preference = new Preference(getMercadoPagoClient());
  return preference.create({
    body: {
      items: [
        {
          id: input.itemId,
          title: input.title,
          quantity: 1,
          unit_price: input.amountARS,
          currency_id: "ARS",
        },
      ],
      payer: { name: input.payer.name, email: input.payer.email },
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

export async function getPayment(id: string) {
  const payment = new Payment(getMercadoPagoClient());
  return payment.get({ id });
}

/* -------------------------------------------------------------------------- */
/*  Cobro mensual de una suscripción — authorized_payment                     */
/* -------------------------------------------------------------------------- */

export interface AuthorizedPayment {
  id: number;
  preapproval_id: string;
  status: string;
  transaction_amount: number;
  payment?: { id?: number; status?: string } | null;
  external_reference?: string;
}

/**
 * El SDK v2 no expone un cliente para `authorized_payments`, así que va por
 * REST. Es el evento de cada cobro mensual: de acá sale si la renovación
 * entró o si la tarjeta rebotó.
 */
export async function getAuthorizedPayment(
  id: string,
): Promise<AuthorizedPayment> {
  if (!env.MERCADOPAGO_ACCESS_TOKEN) {
    throw new Error("MERCADOPAGO_ACCESS_TOKEN is not configured");
  }
  const response = await fetch(
    `https://api.mercadopago.com/authorized_payments/${encodeURIComponent(id)}`,
    {
      headers: { Authorization: `Bearer ${env.MERCADOPAGO_ACCESS_TOKEN}` },
      cache: "no-store",
    },
  );
  if (!response.ok) {
    throw new Error(
      `authorized_payments/${id} respondió ${response.status}`,
    );
  }
  return (await response.json()) as AuthorizedPayment;
}

/* -------------------------------------------------------------------------- */
/*  Firma del webhook                                                          */
/* -------------------------------------------------------------------------- */

/**
 * Valida el header `x-signature` de MercadoPago.
 *
 * Manifiesto: `id:{data.id};request-id:{x-request-id};ts:{ts};`
 * HMAC-SHA256 con el secret de "Tus integraciones", comparado en tiempo
 * constante. Sin esto cualquiera que adivine la URL se da de alta gratis.
 *
 * Devuelve false —nunca lanza— para que la ruta responda 401 sin escribir nada.
 */
export function verifyWebhookSignature(params: {
  signatureHeader: string | null;
  requestIdHeader: string | null;
  dataId: string | null;
  secret: string;
}): boolean {
  const { signatureHeader, requestIdHeader, dataId, secret } = params;
  if (!signatureHeader || !secret || !dataId) return false;

  let ts = "";
  let v1 = "";
  for (const part of signatureHeader.split(",")) {
    const separator = part.indexOf("=");
    if (separator === -1) continue;
    const key = part.slice(0, separator).trim();
    const value = part.slice(separator + 1).trim();
    if (key === "ts") ts = value;
    if (key === "v1") v1 = value;
  }
  if (!ts || !v1) return false;

  /* MP documenta que el id va en minúsculas cuando es alfanumérico. */
  const normalizedId = dataId.toLowerCase();
  const manifest = `id:${normalizedId};request-id:${requestIdHeader ?? ""};ts:${ts};`;
  const expected = createHmac("sha256", secret).update(manifest).digest("hex");

  const expectedBuffer = Buffer.from(expected, "utf8");
  const receivedBuffer = Buffer.from(v1, "utf8");
  if (expectedBuffer.length !== receivedBuffer.length) return false;
  return timingSafeEqual(expectedBuffer, receivedBuffer);
}
