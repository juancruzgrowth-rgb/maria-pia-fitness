import { NextResponse } from "next/server";
import { z } from "zod";
import { addContact } from "@/lib/brevo";
import { appendLead } from "@/lib/sheets";
import { env } from "@/lib/env";

const schema = z.object({
  firstName: z.string().min(2).max(60),
  email: z.string().email(),
  consent: z.boolean().refine((value) => value),
  utm: z.string().optional(),
});

export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = schema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Datos inválidos." },
      { status: 422 },
    );
  }

  const { firstName, email, utm } = parsed.data;

  const brevoConfigured = Boolean(env.BREVO_API_KEY && env.BREVO_LIST_ID);
  const sheetsConfigured = Boolean(
    env.GOOGLE_SHEETS_SHEET_ID &&
      env.GOOGLE_SERVICE_ACCOUNT_EMAIL &&
      env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY,
  );

  const errors: string[] = [];

  if (brevoConfigured) {
    try {
      const result = await addContact({ email, firstName });
      if (!result.ok) errors.push(`brevo:${result.status}`);
    } catch (error) {
      errors.push(
        `brevo:${error instanceof Error ? error.message : "unknown"}`,
      );
    }
  }

  if (sheetsConfigured) {
    try {
      await appendLead({ email, firstName, source: "newsletter", utm });
    } catch (error) {
      errors.push(
        `sheets:${error instanceof Error ? error.message : "unknown"}`,
      );
    }
  }

  if (!brevoConfigured && !sheetsConfigured) {
    console.warn(
      "[newsletter] Recibido sin integraciones configuradas — log only:",
      { email, firstName },
    );
  }

  if (errors.length > 0 && (brevoConfigured || sheetsConfigured)) {
    console.error("[newsletter] errors:", errors);
    return NextResponse.json(
      { error: "No pudimos completar la suscripción." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
