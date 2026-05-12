# Testing — MP CEP

## Comandos
- `npm run typecheck` después de cada serie de cambios
- `npm run build` antes de cada commit grande
- `npm run lint` para verificar reglas de estilo

## Tests críticos (escribir antes de cualquier release)
- **Checkout MercadoPago:** crear preferencia con 1, 2 y 4 items distintos del carrito
- **Checkout Stripe:** crear session USD con los mismos casos
- **Webhook MercadoPago:** validar firma + actualización de estado en Sheets
- **Webhook Stripe:** validar firma + actualización de estado en Sheets
- **Form newsletter:** flujo completo (form → Brevo + Sheets `leads`)
- **Toggle ARS/USD:** cambiar moneda recalcula totales correctamente
- **Carrito persistente:** items sobreviven a reload (localStorage)

## Reglas de tests
- No mockear las pasarelas de pago en tests de integración: usar credenciales sandbox/test reales
- No mockear Google Sheets: usar una hoja de prueba dedicada
- La tarea NO está completa si los tests fallan
- Un cambio en `src/lib/products.ts` exige correr todos los tests de checkout

## Smoke test manual antes de cada deploy
1. Cargar la home en mobile y desktop
2. Sumar 2 paquetes al carrito
3. Cambiar de ARS a USD y verificar precios
4. Iniciar checkout (sandbox) — completar pago test exitoso
5. Verificar fila nueva en Sheets `ventas`
6. Suscribirse al newsletter — verificar contacto en Brevo
7. Click en agendar → Calendly abre
8. Click en WhatsApp FAB → wa.me abre con mensaje precargado
9. Reels carrusel: scroll automático y reproducción del centro
10. Páginas legales accesibles desde footer
