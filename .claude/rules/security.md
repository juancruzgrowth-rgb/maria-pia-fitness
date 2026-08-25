# Seguridad — Pía Moretto

## Variables de Entorno Requeridas

```bash
# .env.example
NEXT_PUBLIC_SITE_URL=
NEXT_PUBLIC_THEME=

# Acceso a la comunidad (respaldo — hoy lo manda Pía a mano por WhatsApp)
NEXT_PUBLIC_SKOOL_INVITE_URL=
NEXT_PUBLIC_WHATSAPP_GROUP_URL=

# Brevo (newsletter) — sin usar todavía
BREVO_API_KEY=
BREVO_LIST_ID=

# Públicas (contacto)
NEXT_PUBLIC_WHATSAPP_NUMBER=
NEXT_PUBLIC_INSTAGRAM_URL=
NEXT_PUBLIC_TIKTOK_URL=
NEXT_PUBLIC_YOUTUBE_URL=
```

No hay credenciales de pasarela de pago ni service account de Google: desde el
2026-08-25 el cobro es por transferencia y el alta la hace Pía a mano. Si algún
día vuelven, están en el historial de git (commit `fc8b826`).

## Datos bancarios
El alias, el CBU y el titular viven en `TRANSFER`, en `src/lib/products.ts`.
**No son secretos** —se muestran en `/comprar`— pero sí son críticos: un CBU
equivocado manda la plata de una clienta a la cuenta de otra persona.
Verificarlos con Pía antes de cada deploy que los toque.

## Áreas con Datos Sensibles (PII)
- Nombre, email y teléfono llegan por WhatsApp, no por un formulario web. El
  sitio **no recolecta ni almacena PII**: no hay base de datos ni endpoints.
- Datos de pago — nunca tocamos tarjetas. La transferencia se hace desde el
  banco o la billetera de la clienta, fuera de este sitio.
- Dirección IP de los visitantes — solo en logs efímeros, no persistir.

## Reglas
1. NUNCA loguear datos de clientas: son PII bajo la Ley 25.326.
2. Ningún secreto en código. Todo lo que sea `NEXT_PUBLIC_*` es público por
   definición: no meter nada sensible ahí.
3. Si se vuelve a construir un endpoint de pago, los webhooks DEBEN validar
   firma antes de cualquier escritura. Sin firma válida, `401` y nada más.
4. Toda escritura futura a Google Sheets va con datos sanitizados contra
   inyección de fórmulas (`=`, `+`, `-`, `@` al inicio de celda).

## Bajo Ley 25.326 (Argentina)
- Identificar a Pía como responsable del tratamiento (nombre + contacto en la
  Política de Privacidad)
- Permitir derechos ARCO (Acceso, Rectificación, Cancelación, Oposición) por email
- Conservar PII solo el tiempo necesario para la finalidad declarada
- Consentimiento informado antes de recolectar cualquier dato

## Res. 424/2020 — Botón de arrepentimiento
`/cancelar` es obligatorio y tiene que estar enlazado desde la home. No
borrarlo ni esconderlo aunque el cobro sea manual.
