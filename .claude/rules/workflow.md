# Workflow — MP CEP

IMPORTANT: Las áreas listadas abajo manejan dinero real, datos personales y la imagen pública de la coach. Cualquier cambio requiere confirmación explícita del usuario antes de aplicarse.

## Áreas Sensibles (requieren confirmación extra)
- `src/app/api/checkout/**` — creación de preferencias MercadoPago / sessions Stripe
- `src/app/api/webhooks/**` — recepción de eventos de pago, validación de firma
- `src/app/api/leads/**` — escritura a Google Sheets (PII)
- `src/app/api/newsletter/**` — alta en Brevo
- `src/lib/products.ts` — precios y descripciones (single source of truth)
- `src/app/politica-privacidad/**` y `terminos-condiciones/**` — texto legal

## Notas de Deploy
- Plataforma: Vercel
- Branch productiva: `main`
- Previews automáticos en cada PR
- Variables de entorno cargadas en dashboard de Vercel — nunca en código
- Webhooks MercadoPago y Stripe deben configurarse con la URL de producción tras el primer deploy

## Antes de cualquier release
1. `npm run typecheck` sin errores
2. `npm run build` sin warnings críticos
3. Test manual de checkout en sandbox (ARS y USD)
4. Test manual del form de newsletter (verificar que llega a Brevo + Sheets)
5. Lighthouse mobile ≥ 90 en Performance, Accessibility, Best Practices
