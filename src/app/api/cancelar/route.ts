import { NextResponse } from "next/server";
import { z } from "zod";
import { appendCancellation } from "@/lib/sheets";

export const runtime = "nodejs";

const cancelSchema = z.object({
  tipo: z.enum(["baja", "arrepentimiento"]),
  nombre: z.string().trim().min(2).max(80),
  email: z.email().max(120),
  motivo: z.string().trim().max(500).optional().default(""),
});

/**
 * Registra el pedido de baja o de arrepentimiento en la pestaña `bajas`.
 *
 * No cancela la suscripción en MercadoPago desde acá: sin sesión iniciada,
 * un endpoint que cancela sabiendo sólo el email deja que cualquiera dé de
 * baja a otra clienta. La baja instantánea la hace ella desde su propia app
 * de MercadoPago —está explicada en /cancelar— y este pedido lo procesa una
 * persona dentro de las 24 h, que es lo que exige la Res. 424/2020.
 */
export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Cuerpo inválido." }, { status: 400 });
  }

  const parsed = cancelSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Revisá los datos del formulario." },
      { status: 400 },
    );
  }

  try {
    await appendCancellation({
      customerName: parsed.data.nombre,
      customerEmail: parsed.data.email,
      kind: parsed.data.tipo,
      reason: parsed.data.motivo,
    });
  } catch (error) {
    /* Sin el email de la clienta en el log: es PII bajo la Ley 25.326. */
    console.error("[api/cancelar] no se pudo registrar el pedido", error);
    return NextResponse.json(
      { error: "No pudimos registrar el pedido." },
      { status: 502 },
    );
  }

  return NextResponse.json({ received: true });
}
