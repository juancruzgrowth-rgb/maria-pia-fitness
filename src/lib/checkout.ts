import { randomUUID } from "node:crypto";
import { z } from "zod";
import { publicEnv } from "@/lib/env";

/**
 * Datos que pedimos ANTES de mandarla a MercadoPago.
 *
 * El email es el punto crítico del circuito: es el que recibe la invitación a
 * Skool y el que cruza A30. No se reemplaza nunca por el que devuelve MP.
 * Ver docs/estrategia/24-acceso-skool-desde-mercadopago.md §4.
 */
export const checkoutSchema = z.object({
  nombre: z
    .string({ error: "Poné tu nombre" })
    .trim()
    .min(2, "Poné tu nombre")
    .max(80, "El nombre es demasiado largo"),
  email: z
    .email({ error: "Revisá el email" })
    .max(120, "El email es demasiado largo"),
});

export type CheckoutInput = z.infer<typeof checkoutSchema>;

/**
 * Id nuestro de la venta. Va como `external_reference` a MercadoPago y es la
 * clave con la que el webhook encuentra la fila en `ventas`.
 */
export function buildExternalReference(planId: string): string {
  return `${planId}-${randomUUID()}`;
}

/** URL absoluta del sitio. MercadoPago rechaza back_urls relativas. */
export function siteUrl(path: string): string {
  return new URL(path, publicEnv.siteUrl).toString();
}

/** Respuesta uniforme de los dos endpoints de checkout. */
export interface CheckoutResponse {
  initPoint: string;
}
