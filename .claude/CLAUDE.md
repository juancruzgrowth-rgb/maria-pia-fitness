# MP CEP — Constitución del Proyecto

## North Star
Convertir tráfico web y de redes en clientas high-ticket de Maria Pia (MP — Centro de Entrenamiento Personalizado), vendiendo paquetes de entrenamiento/nutrición y agendando llamadas 1:1 vía Calendly.

## Tipo
Web (landing + e-commerce). Fase 2 futura: Automatizaciones de marketing y ventas.

## Stack
- Next.js 14+ (App Router), TypeScript strict
- Tailwind CSS con tokens MP
- Manrope (titulares + CTAs) + Inter (body/UI) — `next/font/google`
- MercadoPago Checkout Pro (ARS) + Stripe Checkout (USD)
- Brevo (newsletter, doble opt-in)
- Google Sheets API (leads + ventas + contactos)
- Calendly (embed)
- Phosphor Icons, Embla Carousel, Framer Motion, Zustand, react-hook-form, zod

## Integraciones
- MercadoPago — pagos ARS
- Stripe — pagos USD
- Brevo — newsletter
- Google Sheets — base de datos de leads/ventas
- Calendly — agenda 1:1
- WhatsApp — botón flotante (`wa.me`)
- Instagram — handle `@mp.cep`, embed de reels (oEmbed)

## Branding (oficial — guía recibida)
- Lienzo: Blanco Suave `#F5F5F2`
- Texto / CTA primario: Negro Profundo `#050505` y Carbón `#161616`
- Acento principal: Naranja `#F2A31B` y Ámbar Cálido `#D98A17`
- Acento secundario: Celeste `#BFDFFF`
- Tipografía: **Manrope** (display) + **Inter** (texto)
- Tono: Sobrio, motivador, profesional, directo. Hablamos de vos, con empatía.
- Motivos visuales: trazo de pulso (línea), líneas finas 1px, alto contraste, formas simples

## Restricciones
- Contenido en español rioplatense (audiencia argentina)
- NUNCA commitear `.env`, credenciales MercadoPago, Stripe, Brevo o service account de Google
- PII de leads/clientas (nombre, email, teléfono) tratada como datos sensibles bajo Ley 25.326
- Mobile-first obligatorio (audiencia ≈ 80% mobile)
- Las páginas legales son DRAFTS — requieren revisión por abogado antes de publicar
- No hardcodear precios fuera de `src/lib/products.ts` (single source of truth)
- Webhooks (MP / Stripe) DEBEN validar firma antes de escribir a Sheets

## Comandos clave
```bash
npm run dev        # http://localhost:3000
npm run build
npm run typecheck
npm run lint
```

## Datos identitarios
- Coach: Maria Pia
- Ubicación: Rosario, Santa Fe, Argentina
- WhatsApp: +34 625 443 926 (provisorio — confirmar si querés número AR)
- Instagram: https://www.instagram.com/mp.cep
- TikTok / YouTube: pendientes
- Calendly: pendiente → configurar en `NEXT_PUBLIC_CALENDLY_URL`

## Estado del contenido
- Logo: tipográfico provisional "MP" hasta recibir SVG oficial
- Fotos: stock de Pexels — Maria Pia las reemplazará
- VSL hero: placeholder — pendiente subir video real
- Reels: provisorios — embeber reales cuando estén disponibles
- Copy: invención inicial alineada al tono de marca — Maria Pia revisa y ajusta
- Productos: 4 paquetes inventados editables en `src/lib/products.ts`
