# Pía Moretto — Constitución del Proyecto

## North Star
Convertir tráfico web y de redes en clientas del **Flex Program** de Pía
Moretto: entrenamiento online por suscripción para mujeres con poco tiempo,
más una asesoría 1:1 de ticket alto que se vende conversando por WhatsApp.

## Tipo
Web (landing + página de compra). Fase 2 futura: automatizaciones de marketing
y ventas, cuando Pía pida escalar.

## Cómo se vende hoy (2026-08-25 — decisión de Pía)
**Todo manual y a propósito.** El primer grupo lo atiende ella misma:

1. La clienta transfiere a la cuenta que muestra `/comprar`.
2. Manda el comprobante por WhatsApp con nombre, email y plan.
3. Pía verifica, le manda la invitación a Skool y anota el contacto a mano.
4. Antes del vencimiento le escribe para renovar. No hay renovación automática.

No hay pasarela de pago, ni webhooks, ni onboarding automatizado, ni CRM. El
checkout de MercadoPago llegó a estar construido y se borró del código: vive en
el historial de git (commit `fc8b826`) para cuando haga falta escalar.

## Stack
- Next.js 16 (App Router), TypeScript strict
- Tailwind CSS v4 con tokens de marca
- Fraunces (titulares) + Newsreader (texto) + Montserrat (etiquetas/CTAs) — `next/font/google`
- Phosphor Icons, zod
- Sin pasarela de pago, sin base de datos, sin dependencias de terceros en runtime

## Integraciones
- WhatsApp — es el canal de venta, de alta y de soporte (`wa.me`)
- Skool — donde vive el programa; el acceso lo manda Pía a mano
- Instagram — handle `@mp.cep`
- Brevo — newsletter (código presente en `src/lib/brevo.ts`, sin usar todavía)

## Branding (oficial — guía recibida)
- Lienzo: Blanco Suave `#F5F5F2`
- Texto / CTA primario: Negro Profundo `#050505` y Carbón `#161616`
- Acento principal: Naranja `#EAA959` y Ámbar Cálido `#D0904C`
- Acento secundario: Celeste `#BFDFFF`
- Tipografía: **Fraunces** (titulares) + **Newsreader** (texto) + **Montserrat** (etiquetas y CTAs)
- Tono: Sobrio, motivador, profesional, directo. Hablamos de vos, con empatía.
- Motivos visuales: trazo de pulso (línea), líneas finas 1px, alto contraste, formas simples

## Restricciones
- Contenido en español rioplatense (audiencia argentina)
- NUNCA commitear `.env`, credenciales MercadoPago, Stripe, Brevo o service account de Google
- PII de leads/clientas (nombre, email, teléfono) tratada como datos sensibles bajo Ley 25.326
- Mobile-first obligatorio (audiencia ≈ 80% mobile)
- Las páginas legales fueron revisadas y aprobadas (2026-08-27). Cualquier cambio de fondo vuelve a pedir revisión
- No hardcodear precios ni datos bancarios fuera de `src/lib/products.ts` (single source of truth)
- El alias y el CBU de `TRANSFER` son plata real: verificarlos con Pía antes de cada deploy

## Comandos clave
```bash
npm run dev        # http://localhost:3000
npm run build
npm run typecheck
npm run lint
```

## Datos identitarios
- Coach: Pía Moretto
- Ubicación: Rosario, Santa Fe, Argentina
- WhatsApp: el de `NEXT_PUBLIC_WHATSAPP_NUMBER` (número AR de Pía, confirmado)
- Instagram: https://www.instagram.com/mp.cep
- TikTok / YouTube: pendientes
- Calendly: fuera de alcance — la asesoría 1:1 se agenda por WhatsApp

## Estado del contenido
- Logo: monograma `P│M` oficial, ya implementado
- Fotos y video de presentación: propios de Pía, ya subidos
- Copy: escrito y revisado con Pía; el naming del producto es **Flex Program** desde 2026-08-25
- Producto: 2 planes (mensual y trimestral) en `src/lib/products.ts`

## Pendientes bloqueantes para publicar
- `TRANSFER.alias` y `TRANSFER.cbu` en `src/lib/products.ts` son placeholders.
  Sin los datos reales de Pía la web no se deploya.
- Precio del plan trimestral sin confirmar (TODO B21 en `products.ts`).
- Páginas legales: revisión cerrada el 2026-08-27.
