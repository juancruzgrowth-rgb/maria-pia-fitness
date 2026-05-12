# Seguridad — MP CEP

## Variables de Entorno Requeridas

```bash
# .env.example
NEXT_PUBLIC_SITE_URL=
NEXT_PUBLIC_CALENDLY_URL=

# MercadoPago (ARS)
MERCADOPAGO_ACCESS_TOKEN=
NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY=
MERCADOPAGO_WEBHOOK_SECRET=

# Stripe (USD)
STRIPE_SECRET_KEY=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_WEBHOOK_SECRET=

# Brevo (newsletter)
BREVO_API_KEY=
BREVO_LIST_ID=

# Google Sheets (leads + ventas)
GOOGLE_SHEETS_SHEET_ID=
GOOGLE_SERVICE_ACCOUNT_EMAIL=
GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY=

# Públicas (contacto)
NEXT_PUBLIC_WHATSAPP_NUMBER=
NEXT_PUBLIC_INSTAGRAM_URL=
NEXT_PUBLIC_TIKTOK_URL=
NEXT_PUBLIC_YOUTUBE_URL=
```

## Áreas con Datos Sensibles (PII)
- Email, nombre y teléfono recolectados por el form de newsletter y de checkout
- Datos de pago — NUNCA tocamos los datos de tarjeta directamente. Tanto MercadoPago como Stripe manejan el formulario en su dominio (Checkout Pro / Checkout)
- Dirección IP de los visitantes — solo en logs efímeros, no persistir

## Reglas
1. NUNCA loguear `MERCADOPAGO_ACCESS_TOKEN`, `STRIPE_SECRET_KEY`, `BREVO_API_KEY` ni `GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY` (ni siquiera el primer/último carácter).
2. Toda escritura a Google Sheets va con datos sanitizados (sin HTML/markdown peligroso).
3. Los webhooks DEBEN validar firma antes de cualquier escritura. Sin firma válida, devolver `401` sin escribir nada.
4. Tokens públicos (`NEXT_PUBLIC_*`) están bien expuestos al cliente — NO incluir secretos ahí.
5. El service account de Google Sheets tiene permiso solo a 1 spreadsheet específico, nunca acceso a Drive completo.

## Bajo Ley 25.326 (Argentina)
- Identificar a Maria Pia como responsable del tratamiento (nombre + datos de contacto en Política de Privacidad)
- Permitir que cualquier titular ejerza derechos ARCO (Acceso, Rectificación, Cancelación, Oposición) — vía email
- Conservar PII solo el tiempo necesario para la finalidad declarada
- Reportar al usuario cómo se usan sus datos antes de recolectarlos (consentimiento informado en cada formulario)
