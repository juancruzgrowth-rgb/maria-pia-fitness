# Próximos Pasos — MP CEP

> Actualizar este archivo al final de cada sesión de trabajo.
> Última actualización: 2026-05-12

---

## Estado del proyecto

**Fase actual:** MVP Web — Lanzamiento Low Ticket

**Dev server:** `npm run dev` → http://localhost:3001
**Repo:** https://github.com/juancruzgrowth-rgb/maria-pia-fitness

---

## Producto activo

**Programa 90 Días** — ARS 39.900/mes (lanzamiento)
- Pago: MercadoPago (ARS) + Stripe (USD)
- Entrega: Skool (comunidad paid, pendiente de crear)
- Precio final acordado: suscripción 3 pagos iguales + opción pago único con descuento (~15%)

---

## Pendientes inmediatos (próxima sesión)

### 1. Precio dual (suscripción + pago único)
- [ ] Agregar campo `pricingOptions` al tipo `ProductPackage` en `src/lib/products.ts`
- [ ] Mostrar en `ProductCard` los dos modos: "3 pagos de ARS 39.900" y "Pago único ARS 101.700 (15% off)"
- [ ] Crear preferencia MP con `installments: 3` para la opción cuotas
- [ ] Crear preferencia MP con `unit_price` único para la opción pago único
- [ ] Ruta: `src/app/api/checkout/mercadopago/route.ts`

### 2. Imagen del Gym
- [ ] María Pía debe proveer foto del centro para reemplazar el placeholder actual

### 3. VSL Hero — video real
- [ ] Pendiente de subir video real del método (ya colocado el placeholder local)

---

## Flujo de automatización post-pago (a implementar en Fase 2)

### Stack recomendado
- **n8n** (self-hosted o cloud) — orquestador principal
- **ManyChat** — DMs automáticos en Instagram
- **Brevo** — emails transaccionales + secuencias (ya integrado en el sitio)
- **Google Sheets** — base de datos leads/ventas (ya integrado)
- **Skool API** — invitación programática a la comunidad

### Diagrama del flujo completo

```
Pago MP aprobado (webhook)
  ├── Webhook valida firma → OK
  ├── n8n/Make recibe evento
  ├── → Email bienvenida → alumna (Brevo template: "bienvenida-programa")
  ├── → Email notificación → María Pía (nuevo pago + datos alumna)
  ├── → Email notificación → admin (Juan Cruz)
  ├── → Fila nueva en Sheets tab "ventas" (nombre, email, plan, monto, fecha, estado)
  ├── → Invitación a Skool (API: POST /api/v1/groups/{id}/members)
  └── → WhatsApp mensaje bienvenida (WA Business API o ManyChat)
```

### Secuencias de nurturing (a crear en Brevo)

| Trigger | Secuencia | Emails |
|---|---|---|
| Opt-in newsletter | Nurturing 5 días | Valor → Prueba social → Oferta |
| Compra realizada | Onboarding 7 días | Bienvenida → Acceso → Tip día 3 → Check-in día 7 |
| Día 45 activo | Testimonial request | Pedir feedback + historia |
| Día 80 | Pre-renovación | Oferta de renovación o upsell plan personalizado |
| Pago fallido | Recupero | 3 intentos en 72 hs |

### Funnel de captación (fuera del sitio — ManyChat + IG)

| Trigger | Automatización |
|---|---|
| Keyword en DM (ej: "quiero", "programa", "info") | ManyChat responde con link de pago |
| Story reply | ManyChat cualifica con 2 preguntas → link |
| Comentario en reel con keyword | DM automático con info |
| Link bio | Directo a landing con UTM tracking |

### Escalera de valor

```
Free content (IG, TikTok, YouTube)
  ↓
Newsletter (lead magnet pendiente)
  ↓
Programa 90 días — ARS 39.900/mes x3 [LOW TICKET]
  ↓
Plan personalizado 1:1 — price a definir [MID TICKET]
  ↓
Mentorship premium — price a definir [HIGH TICKET]
```

---

## Integraciones pendientes de configurar

| Integración | Estado | Acción necesaria |
|---|---|---|
| MercadoPago | Credenciales pendientes | Cargar en Vercel env vars |
| Stripe | Credenciales pendientes | Cargar en Vercel env vars |
| Brevo | API key pendiente | Cargar en Vercel env vars |
| Google Sheets | Service account pendiente | Crear SA + compartir sheet |
| Skool | Comunidad por crear | MP crea comunidad paid |
| Calendly | URL pendiente | Configurar `NEXT_PUBLIC_CALENDLY_URL` |
| WhatsApp | +34625443926 (TEST) | Confirmar número AR definitivo |
| Instagram | @mp.cep | OK |

---

## Próximos deploys

1. **Preview** — Vercel auto-deploy en cada push a `main`
2. **Producción** — Tras cargar todas las env vars en Vercel dashboard
3. **Webhooks** — Configurar en MP y Stripe con URL de producción

---

## Decisiones tomadas

- Precio lanzamiento: ARS 39.900/mes x 3 cuotas automáticas + opción pago único (~15% dto)
- Después del lanzamiento: ARS 49.900/mes x 3
- Skool será comunidad "paid" — acceso solo tras compra
- Pagos ARS → MercadoPago | Pagos USD → Stripe
- Skool NO integra MP → pago siempre por la web, acceso a Skool via invitación automática
- Funnel sin llamada previa en la mayoría de casos. Llamada solo para upsell/plan personalizado

---

## Contenido pendiente de María Pía

- [ ] Foto del centro de entrenamiento
- [ ] Video real del VSL (método en 10 min)
- [ ] Reels reales de Instagram para reemplazar placeholders
- [ ] Foto de perfil "Sobre mí" final (ya colocada `sobre-mi.png`, provisoria)
- [ ] Revisar y aprobar copy de todas las secciones
- [ ] Revisar páginas legales con abogado antes de publicar
- [ ] Confirmar número de WhatsApp definitivo (¿AR o mantener ES?)
- [ ] URL de Calendly real
- [ ] Crear comunidad en Skool
