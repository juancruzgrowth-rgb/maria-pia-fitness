import { NextResponse } from "next/server";
import { createPreference } from "@/lib/mercadopago";
import { appendPendingSale } from "@/lib/sheets";
import {
  buildExternalReference,
  checkoutSchema,
  siteUrl,
} from "@/lib/checkout";
import { CHALLENGE, ENROLLMENT_OPEN, PLANS } from "@/lib/products";

export const runtime = "nodejs";

const PLAN_ID = "trimestral";

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
      { error: "El plan trimestral no está configurado." },
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

  let preference;
  try {
    preference = await createPreference({
      itemId: PLAN_ID,
      title: `${CHALLENGE.name} — ${plan.name}`,
      amountARS: plan.priceARS,
      payer: { name: parsed.data.nombre, email: parsed.data.email },
      externalReference,
      successUrl: siteUrl(
        `/bienvenida?ref=${encodeURIComponent(externalReference)}`,
      ),
      pendingUrl: siteUrl(
        `/bienvenida?ref=${encodeURIComponent(externalReference)}`,
      ),
      failureUrl: siteUrl("/comprar?error=pago"),
      notificationUrl: siteUrl("/api/webhooks/mercadopago"),
    });
  } catch (error) {
    console.error("[checkout/pack] MercadoPago rechazó la preferencia", error);
    return NextResponse.json(
      { error: "No pudimos abrir el pago. Probá de nuevo en un minuto." },
      { status: 502 },
    );
  }

  if (!preference.init_point) {
    console.error(
      "[checkout/pack] MercadoPago no devolvió init_point",
      preference.id,
    );
    return NextResponse.json(
      { error: "No pudimos abrir el pago. Probá de nuevo en un minuto." },
      { status: 502 },
    );
  }

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
      "[checkout/pack] no se pudo escribir la fila pendiente",
      externalReference,
      error,
    );
  }

  return NextResponse.json({ initPoint: preference.init_point });
}
