# Automatizaciones — Catálogo n8n

> Frente F4. Dueño: Juan Cruz.
> Motor: **n8n**. Las construimos juntos, una por una, en el orden de esta lista.

> ## ⚠️ CATÁLOGO DESACTUALIZADO — 2026-08-18
>
> Este documento es el catálogo original de los 26 flujos, de cuando el reto se vendía
> por cohortes y con Semana 0. **Se cancelaron A5, A24, A25 y A26** y entraron **A27**
> (renovación mensual), **A28** (triage de WhatsApp) y **A29** (testimonios y upsell).
> El esquema de la planilla que aparece más abajo también cambió.
>
> **Para saber qué está construido y cómo se pone a andar:**
> [`19-flujos-n8n-construidos.md`](19-flujos-n8n-construidos.md).
> **Para saber qué falta y en qué orden:**
> [`20-reto-siempre-abierto.md`](20-reto-siempre-abierto.md) §8.
> **Para el esquema real de la planilla:**
> [`13-base-de-datos-sheet.md`](13-base-de-datos-sheet.md).

---

## Arquitectura general

```
                    ┌─────────────────┐
   Instagram ──────►│                 │
   (ManyChat)       │                 ├──► Brevo (emails)
                    │                 │
   Web / Quiz ─────►│      n8n        ├──► Google Sheets (base de datos)
   (webhooks)       │   orquestador   │
                    │                 ├──► WhatsApp (Evolution / Meta API)
   WhatsApp ───────►│                 │
   (entrante)       │                 ├──► Skool (API / automatización)
                    │                 │
   Skool ──────────►│                 ├──► Notificaciones al equipo
   (eventos)        └─────────────────┘
```

**Principio:** n8n es el único cerebro. Ninguna herramienta habla directamente con otra. Todo pasa por n8n para que haya un solo lugar donde mirar cuando algo falla.

### Infraestructura

| Opción | Costo | Recomendación |
|---|---|---|
| n8n Cloud | ~USD 24/mes | **Arrancar acá.** Cero mantenimiento, backups incluidos |
| Self-hosted en VPS (Hetzner/Railway) | ~USD 6/mes | Migrar cuando el volumen lo justifique |

### Google Sheets — esquema de la base de datos

Un spreadsheet, cuatro pestañas. Es la base de datos del negocio hasta que justifique una real.

**`leads`**
`fecha | nombre | email | whatsapp | origen | keyword | arquetipo_quiz | estado | ultimo_contacto`

**`ventas`**
`fecha | nombre | email | whatsapp | producto | monto | moneda | metodo_pago | comprobante_url | estado | grupo | acceso_skool | fecha_llamada`

**`contenido`**
`fecha | tipo | tema | keyword | alcance | comentarios | opt_ins | ventas_atribuidas`

**`comunidad`**
`alumna | grupo | dia_actual | ultimo_checkin | rutinas_completadas | estado_riesgo`

> **Seguridad:** todas las pestañas contienen PII bajo Ley 25.326. Service account con acceso a este spreadsheet únicamente. Sanitizar todo input antes de escribir. Nunca loguear contenido de estas filas.

---

## Catálogo priorizado

Prioridad: **P0** = sin esto no se puede operar · **P1** = alto impacto · **P2** = optimización · **P3** = nice to have

---

### 🔴 P0 — Imprescindibles antes del lanzamiento

#### A1 · Captura de lead desde Instagram
**Trigger:** Webhook desde ManyChat cuando alguien completa el opt-in.

```
Webhook ManyChat
  → Normalizar datos (nombre, email, WhatsApp, keyword, ig_username)
  → ¿Existe el email en Sheets?
      SÍ  → actualizar fila, sumar keyword al historial, no duplicar
      NO  → crear fila en `leads` con estado = "nuevo"
  → Alta/actualización de contacto en Brevo (lista según keyword)
  → Disparar secuencia de nurturing de 5 días
  → Log
```
**Notas:** idempotente por email. Un lead que baja 3 lead magnets es una fila, no tres.

---

#### A2 · Quiz → PDF personalizado → entrega
**Trigger:** Webhook desde la web al enviar el quiz. **La automatización más valiosa del proyecto.**

```
Webhook /api/quiz (Next.js)
  → Validar payload con zod (en la API route, antes de llegar a n8n)
  → Calcular arquetipo según respuestas
       arquetipo A: "Arrancás de cero"
       arquetipo B: "Volvés después de una pausa"
       arquetipo C: "Entrenás pero no ves resultados"
       arquetipo D: "Tenés poco tiempo"        [MP debe confirmar estos 4]
  → Renderizar plantilla HTML con:
       nombre · diagnóstico del arquetipo
       3 recomendaciones de entrenamiento
       3 recomendaciones de nutrición
       próximo paso → link al reto
  → HTML → PDF
  → Subir a Vercel Blob (privado, link firmado con vencimiento)
  → Enviar email vía Brevo (plantilla "diagnostico-{arquetipo}")
  → Enviar WhatsApp con el PDF adjunto
  → Escribir en Sheets `leads` con arquetipo
  → Suscribir a la secuencia de email segmentada por arquetipo
  → Notificar a MP si el arquetipo indica lead de alto valor
```
**Tiempo objetivo de entrega: menos de 60 segundos.** Si tarda más, la persona ya se fue de la página y perdiste el momento.

---

#### A3 · Cobro por transferencia — recepción y confirmación
**Trigger:** Mensaje entrante de WhatsApp que contiene imagen/PDF, o texto con la palabra "comprobante".

```
WhatsApp entrante con adjunto
  → Respuesta automática INMEDIATA:
     "¡Recibí tu comprobante! Lo estoy verificando.
      En menos de 2 h te mando el acceso.
      (Si es de noche, te llega a primera hora)"
  → Guardar el adjunto en Drive/Blob
  → Crear fila en `ventas` con estado = "pendiente_verificacion"
  → Notificar a MP y a Juan Cruz (WhatsApp + email) con:
       nombre · monto detectado · link al comprobante
       botón/comando para aprobar
  → ESPERA verificación humana
  → Al aprobar → dispara A4
```
**Por qué la respuesta inmediata no es negociable:** la ventana de 5 minutos vale 100x más que la de 30. Una persona que transfiere y no recibe señal durante horas entra en ansiedad de compra y pide devolución. La verificación es manual; **el acuse de recibo no debe serlo.**

**Mejora futura:** OCR sobre el comprobante para extraer monto y CBU destino, y auto-aprobar si coinciden. Reduce la verificación a cero. Dejarlo para después del grupo 1.

---

#### A4 · Onboarding post-pago
**Trigger:** Aprobación manual del pago (desde A3).

```
Pago aprobado
  → Actualizar `ventas` a estado = "pagado"
  → Invitar a Skool (API o automatización de navegador)
  → Email de bienvenida (Brevo, plantilla "bienvenida-reto")
       · Cómo entrar a Skool
       · Qué hacer en las próximas 24 h (paso 1 concreto)
       · Link para agendar la llamada de bienvenida
  → WhatsApp de bienvenida con el link de Skool
  → Agregar al grupo de WhatsApp del grupo
  → Notificar a MP: "Nueva alumna: [nombre]"
  → Sacarla de todas las secuencias de venta
  → Programar los mensajes de las primeras 48 h (ver A5)
```
**Las primeras 48 h determinan la retención.** Este flujo no puede tener huecos.

---

### 🟠 P1 — Alto impacto, semanas 3-6

#### A5 · Onboarding de 48 horas
**Trigger:** T+0 desde A4. Secuencia programada.

| Momento | Canal | Mensaje |
|---|---|---|
| +0 h | WhatsApp | Bienvenida + link de Skool + "hacé esto primero" |
| +2 h | WhatsApp | "¿Pudiste entrar? Contame si tuviste algún problema" |
| +24 h | Email | "Tu primera rutina está lista" + link directo |
| +48 h | WhatsApp | "¿Ya hiciste el día 1? Contame cómo te fue" |
| +48 h | Skool | Post automático de presentación en el feed |

Si no hay actividad en Skool a las 48 h → escalar a MP para contacto personal. **Es el momento de mayor retorno de la intervención humana en todo el ciclo.**

---

#### A6 · Check-ins y detección de abandono
**Trigger:** Cron diario. La automatización que más protege el ingreso.

```
Cada día 09:00
  → Leer actividad de Skool por alumna
  → Calcular días sin actividad
  → 2 días sin actividad → WhatsApp automático de aliento
  → 4 días sin actividad → marcar "en riesgo" + alertar a MP
  → 7 días sin actividad → mensaje personal de MP (manual, alertado)
  → Actualizar `comunidad` con estado de riesgo
  → Resumen diario a MP: quiénes van bien, quiénes están en riesgo
```
**Cada abandono cuesta dos veces:** el testimonio que no vas a tener y el 25-55% de probabilidad de upsell que se pierde.

---

#### A7 · Recordatorio y gestión de la llamada de bienvenida
```
Alumna compró y no agendó en 48 h → recordatorio automático
Llamada agendada → recordatorio 24 h antes y 1 h antes (WhatsApp)
No-show → reagendar automático con link
Post-llamada → email con el resumen y los próximos pasos
```
Los no-shows en llamadas gratuitas son altísimos sin recordatorio. Con recordatorio doble bajan drásticamente. Protege directamente las horas de María Pía.

---

#### A8 · Secuencias de nurturing y venta
**Trigger:** Alta en Brevo desde A1 o A2.

| Segmento | Secuencia | Emails |
|---|---|---|
| Lead magnet genérico | Nurturing 5 días | Ver `03-lead-magnets-calendario.md` §6 |
| Quiz completado | Nurturing segmentado por arquetipo | 5 emails con copy distinto por arquetipo |
| Carrito abandonado (`/comprar` visitado, sin comprobante en 24 h) | Recupero | 3 mensajes en 72 h (email + WhatsApp) |
| Grupo cerrada | Lista de espera | 1 email/semana hasta la próxima apertura |

El **recupero de carrito abandonado es especialmente crítico en tu caso**: con pago por transferencia, la gente dice "después transfiero" y se olvida. Sin este flujo, esa venta se pierde entera.

---

#### A9 · Solicitud automática de testimonios
```
Día 21 del reto + alumna con buena adherencia
  → WhatsApp: "¿Cómo venís? ¿Te animás a contarme en un audio de 1 min?"
  → Si responde → guardar en Drive + notificar a Daiana
  → Si manda foto → pedir permiso de uso explícito por escrito
  → Registrar el permiso en Sheets (respaldo legal)
```
Los testimonios son el activo que más escasea al principio. Pedirlos sistemáticamente en el pico de motivación (día 21, no al final) es la diferencia entre tener 2 y tener 15.

---

#### A10 · Upsell al finalizar el reto
```
Día 26 → email + WhatsApp: "¿Qué sigue después del día 28?"
Día 28 → mensaje de felicitación + oferta del escalón 2
         (precio preferencial por 72 h — sólo para quienes terminaron)
Día 31 → último recordatorio
Si no compra → pasa a lista de nurturing de largo plazo
```
**Acá está el 25-55% de conversión.** Es la automatización de mayor retorno económico directo de todo el catálogo.

---

### 🟡 P2 — Optimización, semanas 7-12

#### A11 · Dashboard de métricas automático
Cron diario que consolida IG Insights + Brevo + Sheets + Vercel Analytics en la pestaña de métricas, y envía un resumen semanal por WhatsApp a los tres. Sin esto, las decisiones se toman por intuición.

#### A12 · Atribución de contenido
Cruza qué reel generó qué keyword, qué keyword generó qué lead, y qué lead compró. Responde la única pregunta que le importa a Daiana: **qué contenido trae compradoras, no likes.**

#### A13 · Respuesta automática a FAQ en WhatsApp
Clasificador (IA o keywords) sobre mensajes entrantes → responde las 10 preguntas frecuentes con la respuesta de MP. Escala a humano si no hay match o si detecta intención de compra. Ver `06-comunidad-respuestas.md`.

#### A14 · Gestión del grupo de WhatsApp del grupo
Alta automática al comprar, mensaje diario de la rutina del día, baja automática al cerrar el grupo, recordatorio del live semanal.

#### A15 · Recordatorio de contenido a Daiana
Cron semanal con el calendario editorial: qué toca esta semana, qué keyword configurar en ManyChat, qué lead magnet enlazar.

#### A16 · Backup de la base
Cron semanal: copia del spreadsheet a Drive con fecha. La base del negocio en un Google Sheet sin backup es un riesgo inaceptable.

---

### 🟢 P3 — Cuando haya volumen

| # | Automatización |
|---|---|
| A17 | OCR de comprobantes con auto-aprobación |
| A18 | Sincronización automática de reels de IG a la web |
| A19 | Reactivación de leads fríos (>90 días) |
| A20 | Encuesta NPS automática al finalizar cada grupo |
| A21 | Generación automática de clips a partir de los lives |
| A22 | Migración de Sheets a base real (Supabase/Neon) cuando supere ~2.000 filas |

---

## Orden de construcción sugerido

```
Semana 1  →  Infraestructura n8n + Sheets + A1
Semana 2  →  A2 (quiz + PDF)        ← la pieza más grande
Semana 3  →  A3 + A4 (cobro y onboarding)
Semana 4  →  A5 + A8 (48h + nurturing)
Semana 5  →  A6 + A7 (retención y llamadas)
Semana 6  →  LANZAMIENTO DEL GRUPO 1
Semana 8  →  A9 + A10 (testimonios y upsell)
Semana 10 →  A11 + A12 (métricas)
Semana 12 →  A13-A16
```

---

## Reglas de construcción

Aplican a todos los flujos, sin excepción.

1. **Idempotencia.** Correr un flujo dos veces no puede duplicar un lead, una venta ni un mensaje. Chequear por email o por ID antes de escribir.
2. **Sin secretos en los nodos.** Todo por credenciales de n8n o variables de entorno. Nunca en el JSON del workflow.
3. **Sin PII en los logs.** Loguear IDs y estados, nunca emails, teléfonos ni contenido de mensajes.
4. **Manejo de error explícito en cada flujo.** Nodo de error → notificación a Juan Cruz. Un flujo que falla en silencio es peor que no tenerlo.
5. **Reintentos con backoff** en toda llamada a API externa.
6. **Todo flujo se prueba con datos reales** antes de activarse. Un WhatsApp mal formateado a una clienta real cuesta más que una hora de testing.
7. **Sanitizar antes de escribir a Sheets.** Input de usuaria = input hostil.
8. **Un flujo, un trabajo.** Si un workflow hace tres cosas, son tres workflows conectados.
