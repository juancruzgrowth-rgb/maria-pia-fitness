import { NextResponse } from "next/server";
import { createSubscription } from "@/lib/mercadopago";
import { appendPendingSale } from "@/lib/sheets";
import {
  buildExternalReference,
  checkoutSchema,
  siteUrl,
} from "@/lib/checkout";
import { CHALLENGE, ENROLLMENT_OPEN, PLANS } from "@/lib/products";

export const runtime = "nodejs";

const PLAN_ID = "nivel-mensual";

export async function POST(request: Request) {
  if (!ENROLLMENT_OPEN) {
    return NextResponse.json(
      { error: "La inscripción está cerrada." },
      { status: 409 },
    );
  }

  const plan = PLANS.find((candidate) => candidate.id === PLAN_ID);
  if (!plan) {
    return NextResponse.json(
      { error: "El plan mensual no está configurado." },
      { status: 500 },
    );
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Cuerpo inválido." }, { status: 400 });
  }

  const parsed = checkoutSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Datos inválidos." },
      { status: 400 },
    );
  }

  const externalReference = buildExternalReference(PLAN_ID);

  let subscription;
  try {
    /* El importe sale de products.ts, jamás del cuerpo de la request: si
       viniera del cliente, cualquiera se suscribe por $1. */
    subscription = await createSubscription({
      amountARS: plan.priceARS,
      reason: `${CHALLENGE.name} — ${plan.name}`,
      payerEmail: parsed.data.email,
      externalReference,
      backUrl: siteUrl(`/bienvenida?ref=${encodeURIComponent(externalReference)}`),
    });
  } catch (error) {
    console.error("[checkout/suscripcion] MercadoPago rechazó el alta", error);
    return NextResponse.json(
      { error: "No pudimos abrir el pago. Probá de nuevo en un minuto." },
      { status: 502 },
    );
  }

  if (!subscription.init_point) {
    console.error(
      "[checkout/suscripcion] MercadoPago no devolvió init_point",
      subscription.id,
    );
    return NextResponse.json(
      { error: "No pudimos abrir el pago. Probá de nuevo en un minuto." },
      { status: 502 },
    );
  }

  /* La fila se escribe DESPUÉS de que MP aceptó, y si falla no se corta el
     checkout: perder una fila es recuperable, perder la venta no. El webhook
     avisa igual y A30 levanta el huérfano. */
  try {
    await appendPendingSale({
      externalReference,
      customerName: parsed.data.nombre,
      customerEmail: parsed.data.email,
      planId: PLAN_ID,
      amountARS: plan.priceARS,
    });
  } catch (error) {
    console.error(
      "[checkout/suscripcion] no se pudo escribir la fila pendiente",
      externalReference,
      error,
    );
  }

  return NextResponse.json({ initPoint: subscription.init_point });
}
