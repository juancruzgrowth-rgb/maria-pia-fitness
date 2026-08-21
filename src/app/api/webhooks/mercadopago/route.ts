import { NextResponse } from "next/server";
import { env } from "@/lib/env";
import {
  getAuthorizedPayment,
  getPayment,
  getSubscription,
  verifyWebhookSignature,
} from "@/lib/mercadopago";
import {
  type SaleUpdate,
  readSaleField,
  updateSaleByReference,
} from "@/lib/sheets";

export const runtime = "nodejs";

/**
 * Webhook de MercadoPago.
 *
 * Regla dura del proyecto: se valida la firma ANTES de tocar nada. Si no
 * coincide, 401 y no se escribe una sola celda. Sin eso, cualquiera que
 * adivine la URL se da de alta gratis.
 *
 * Siempre que la firma sea válida devolvemos 200, incluso si algo de adentro
 * falló: MercadoPago reintenta ante cualquier otro código y un reintento
 * infinito por una fila que no existe no arregla nada. Los errores quedan en
 * el log y los levanta la conciliación semanal (A30).
 */
export async function POST(request: Request) {
  const url = new URL(request.url);
  const dataId = url.searchParams.get("data.id") ?? url.searchParams.get("id");
  const topic =
    url.searchParams.get("type") ?? url.searchParams.get("topic") ?? "";

  if (!env.MERCADOPAGO_WEBHOOK_SECRET) {
    console.error("[webhook/mercadopago] falta MERCADOPAGO_WEBHOOK_SECRET");
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const valid = verifyWebhookSignature({
    signatureHeader: request.headers.get("x-signature"),
    requestIdHeader: request.headers.get("x-request-id"),
    dataId,
    secret: env.MERCADOPAGO_WEBHOOK_SECRET,
  });

  if (!valid) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  let body: { type?: string; action?: string; data?: { id?: string } } = {};
  try {
    body = await request.json();
  } catch {
    /* Algunas notificaciones llegan sin cuerpo: la query alcanza. */
  }

  const eventType = body.type ?? topic;
  const eventId = body.data?.id ?? dataId;

  if (!eventId) {
    console.error("[webhook/mercadopago] evento sin id", eventType);
    return NextResponse.json({ received: true });
  }

  try {
    switch (eventType) {
      case "subscription_preapproval":
        await handleSubscription(eventId);
        break;
      case "subscription_authorized_payment":
        await handleAuthorizedPayment(eventId);
        break;
      case "payment":
        await handlePayment(eventId);
        break;
      default:
        console.info("[webhook/mercadopago] topic ignorado", eventType);
    }
  } catch (error) {
    console.error("[webhook/mercadopago] fallo procesando", eventType, error);
  }

  return NextResponse.json({ received: true });
}

/** Alta y cambios de estado de la suscripción. */
async function handleSubscription(id: string) {
  const subscription = await getSubscription(id);
  const reference = subscription.external_reference;
  if (!reference) {
    console.error("[webhook/mercadopago] preapproval sin external_reference", id);
    return;
  }

  const patch: SaleUpdate = {
    suscripcion_id: subscription.id ?? "",
    estado_suscripcion: subscription.status ?? "",
    proximo_cobro: subscription.next_payment_date ?? "",
  };

  if (subscription.status === "authorized") {
    patch.estado = "pagado";
  } else if (subscription.status === "cancelled") {
    patch.estado = "cancelado";
  }

  const found = await updateSaleByReference(reference, patch);
  if (!found) {
    console.error("[webhook/mercadopago] sin fila para", reference);
    return;
  }

  /* El alta es el único momento en que se dispara el onboarding. Los cambios
     de estado posteriores no vuelven a invitarla a Skool. */
  if (subscription.status === "authorized") {
    await triggerOnboarding({
      externalReference: reference,
      plan: "nivel-mensual",
      subscriptionId: subscription.id ?? "",
    });
  }
}

/** Cada cobro mensual de una suscripción ya activa. */
async function handleAuthorizedPayment(id: string) {
  const authorized = await getAuthorizedPayment(id);
  const subscription = await getSubscription(authorized.preapproval_id);
  const reference = subscription.external_reference;
  if (!reference) {
    console.error(
      "[webhook/mercadopago] cobro sin external_reference",
      authorized.preapproval_id,
    );
    return;
  }

  const approved = authorized.status === "processed";

  const patch: SaleUpdate = {
    pago_id: String(authorized.payment?.id ?? authorized.id),
    estado_suscripcion: subscription.status ?? "",
    proximo_cobro: subscription.next_payment_date ?? "",
    estado: approved ? "pagado" : "cobro_rechazado",
  };

  if (approved) {
    const current = await readSaleField(reference, "renovaciones");
    patch.renovaciones = Number.parseInt(current ?? "0", 10) + 1 || 1;
  }

  const found = await updateSaleByReference(reference, patch);
  if (!found) {
    console.error("[webhook/mercadopago] sin fila para", reference);
  }
}

/** Pago único del plan trimestral. */
async function handlePayment(id: string) {
  const payment = await getPayment(id);
  const reference = payment.external_reference;
  if (!reference) {
    console.error("[webhook/mercadopago] payment sin external_reference", id);
    return;
  }

  const approved = payment.status === "approved";

  const found = await updateSaleByReference(reference, {
    pago_id: String(payment.id ?? id),
    estado: approved ? "pagado" : (payment.status ?? "pendiente"),
    metodo_pago: payment.payment_method_id ?? "mercadopago",
  });

  if (!found) {
    console.error("[webhook/mercadopago] sin fila para", reference);
    return;
  }

  if (approved) {
    await triggerOnboarding({
      externalReference: reference,
      plan: "trimestral",
      paymentId: String(payment.id ?? id),
    });
  }
}

/**
 * Dispara A4 (onboarding en n8n): alta en Brevo, email de invitación y fila en
 * `comunidad`. Si la variable no está cargada no se dispara y queda el aviso
 * en el log — la clienta igual ve el acceso en /bienvenida, que es el canal
 * principal. Ver docs/estrategia/21-mercadopago-suscripciones.md §4.
 */
async function triggerOnboarding(payload: Record<string, string>) {
  if (!env.N8N_ONBOARDING_WEBHOOK_URL) {
    console.warn(
      "[webhook/mercadopago] N8N_ONBOARDING_WEBHOOK_URL vacío: no se disparó A4",
    );
    return;
  }
  try {
    await fetch(env.N8N_ONBOARDING_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  } catch (error) {
    console.error("[webhook/mercadopago] no se pudo disparar A4", error);
  }
}
