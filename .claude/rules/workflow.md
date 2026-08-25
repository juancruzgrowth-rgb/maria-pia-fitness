# Workflow — MP CEP

IMPORTANT: Las áreas listadas abajo manejan dinero real, datos personales y la imagen pública de la coach. Cualquier cambio requiere confirmación explícita del usuario antes de aplicarse.

## Áreas Sensibles (requieren confirmación extra)
- `src/lib/products.ts` — precios, datos bancarios (`TRANSFER`) y descripciones.
  Single source of truth: el alias y el CBU son plata real.
- `src/app/comprar/**` — es donde se muestran esos datos bancarios
- `src/app/cancelar/**` — botón de arrepentimiento, obligatorio por Res. 424/2020
- `src/app/politica-privacidad/**` y `terminos-condiciones/**` — texto legal
- Cualquier endpoint de pago que se vuelva a construir (hoy no existe ninguno)

## Notas de Deploy
- Plataforma: Vercel
- Branch productiva: `main`
- Previews automáticos en cada PR
- Variables de entorno cargadas en dashboard de Vercel — nunca en código
- No hay webhooks que configurar: el cobro es manual

## Antes de cualquier release
1. `npm run typecheck` sin errores
2. `npm run build` sin warnings críticos
3. Verificar con Pía que el alias y el CBU de `/comprar` son los correctos
4. Probar el botón de comprobante: abre WhatsApp con el mensaje precargado
5. Lighthouse mobile ≥ 90 en Performance, Accessibility, Best Practices
