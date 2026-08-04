# Arquitectura Web — Análisis y Diseño Final

> Frente F2. Dueño: Juan Cruz.

---

## Parte 1 — Auditoría de tu propuesta

Veredicto general: **la estructura está bien pensada y el orden es mayormente correcto.** Hay un error de posicionamiento serio (el quiz), tres omisiones críticas y un riesgo técnico. Punto por punto.

---

### 1. Hero con VSL y CTAs — ✅ CORRECTO, con condiciones

**Qué está bien:** Es el estándar de las páginas que convierten. Video + promesa + acción.

**Qué corregir:**

- **Duración del VSL: 60-90 segundos, no 10 minutos.** El VSL largo es una técnica de high-ticket con tráfico frío. Tu tráfico viene de Instagram: ya vio a María Pía, ya la conoce, no necesita 10 minutos de convencimiento. Un VSL largo para tráfico templado y oferta low-ticket mata la conversión por abandono.
- **CTA persistente y visible desde el segundo cero.** La escuela clásica de VSL esconde el botón hasta que el video revela el precio. Eso funciona en high-ticket frío. En tu caso está documentado lo contrario: para audiencias templadas y precios bajos, el comprador listo no debe tener que buscar el botón.
- **Autoridad en los primeros 3 segundos.** El VSL abre con credenciales y números concretos ("soy María Pía, tengo un centro de entrenamiento en Rosario, entrené a X mujeres"), no con música y planos del gimnasio.
- **El video debe cargar sin bloquear.** Poster image + carga diferida. Hoy los MP4 locales pesan >50MB — eso es un problema de Lighthouse y de coste de datos en mobile.

**Guion sugerido para el VSL (60-90s):**
1. (0-5s) Quién sos y por qué te tienen que escuchar.
2. (5-20s) El problema específico de tu alumna ideal, dicho con sus palabras.
3. (20-35s) Por qué lo que probó hasta ahora no funcionó — y que no es culpa suya.
4. (35-60s) El método, en 3 o 4 pasos numerados y visibles en pantalla.
5. (60-80s) Qué va a pasar en 4 semanas.
6. (80-90s) Qué hacer ahora.

---

### 2. Precio inmediatamente después del hero — ⚠️ CASI

**Qué está bien:** El instinto es correcto para tráfico de Instagram. Ya te conocen; hacerlos scrollear 6 secciones antes de poder comprar pierde a los que ya estaban decididos.

**El problema:** El precio sin contexto de valor **siempre parece caro**. Si el bloque de precio aparece antes de que la persona sepa exactamente qué recibe y para quién es, el cerebro sólo procesa el número.

**La corrección — no es una sección, son 400px:**

Entre el hero y el precio, insertá dos bloques cortos:

- **"Esto es para vos si..." / "Esto no es para vos si..."** — dos columnas, 4 bullets cada una, se lee en 15 segundos. Cumple doble función: hace que la persona correcta se sienta identificada, y ahuyenta a la incorrecta antes de que compre y pida devolución.
- **"Qué recibís exactamente"** — desglose tangible y contable. No "acceso a la comunidad" sino "28 rutinas guiadas en video · 1 llamada 1:1 de bienvenida de 30 min · corrección de técnica semanal · guía de nutrición de 18 páginas · acceso a la comunidad por 4 semanas". Lo contable se valora; lo abstracto no.

Recién ahí, el precio. Con ese contexto, el mismo número se lee distinto.

---

### 3. Prueba social después del precio — ✅ CORRECTO, pero repartila

**Qué está bien:** El orden es el correcto. Precio genera duda → testimonio la disuelve.

**Qué agregar:** No la concentres en un solo bloque. La prueba social funciona mejor **distribuida en los puntos de fricción**:

| Ubicación | Formato |
|---|---|
| Debajo del hero | Barra fina: "+X alumnas · Rosario, Argentina" |
| **Inmediatamente debajo del botón de precio** | 2 testimonios cortos con foto. Este es el punto de máxima duda. |
| Sección grande (donde la pusiste) | 4-6 testimonios completos, con antes/después si hay permiso |
| Dentro de las FAQ | 1 testimonio que responda la objeción más dura |

**Requisito de calidad:** testimonios con nombre, foto real y resultado concreto. Un testimonio anónimo o genérico resta credibilidad en lugar de sumarla. Video > texto con foto > texto solo. Si sólo tenés capturas de WhatsApp, usalas — son las que más creíbles resultan en este nicho.

---

### 4. Formulario / quiz con PDF automático — ❌ ERROR DE UBICACIÓN

**Esta es la corrección más importante del documento.**

La idea del quiz es excelente. Los datos la respaldan con fuerza: los quiz convierten entre 30% y 47% de quienes los inician, contra 3-10% de un PDF descargable estático. En el nicho de belleza y bienestar el pico llega a 63,8%. Es tu mejor herramienta de captura.

**Pero ponerlo en el medio de la página de venta es una fuga.**

Si alguien está scrolleando hacia la compra y le ofrecés algo gratis, una parte importante toma lo gratis y se va. Le diste una salida a alguien que ya estaba en camino a pagar. Cambiaste una venta de ARS 29.900 por un email.

**Dónde va el quiz:**

1. **Landing propia: `/diagnostico`.** Este es su lugar principal. Es el destino del tráfico de lead magnets, del link en bio, de los comentarios automatizados. Página dedicada, sin distracciones, un solo objetivo.
2. **En la home: al final, después de las FAQ.** Como red de captura. Quien llegó hasta abajo y no compró, no va a comprar hoy — ahí sí, capturalo. Copy: "¿Todavía no estás segura? Hacé el diagnóstico gratis y te digo por dónde empezar."
3. **Como exit-intent en desktop** (opcional, fase 2).

**Diseño del quiz (basado en lo que mejor funciona):**
- 6 a 8 preguntas, no más. Cada pregunta extra baja la finalización.
- Preguntas de una sola opción, con botones grandes (mobile-first). Sin campos de texto libre en el medio.
- **Mostrar el resultado resumido gratis en pantalla. Gatear el PDF detallado con el email.** Esto es lo que mejor equilibra finalización y captura — pedir el email antes de dar valor derrumba la tasa de completado.
- El PDF debe ser **realmente personalizado**, no un genérico con el nombre pegado. Necesita 3-4 arquetipos definidos por María Pía, cada uno con su diagnóstico, sus 3 recomendaciones de entrenamiento y sus 3 de nutrición. Si el PDF es genérico, quema la confianza justo antes de la venta.
- El PDF cierra con una recomendación que apunta al reto de 4 semanas. Es un lead magnet, no un servicio gratuito.
- Pedir **email + WhatsApp**. En Argentina el WhatsApp convierte mucho más que el email; el email es para la secuencia larga.

**Implementación:** el quiz vive en Next.js (react-hook-form + zod, ya están en el stack). Al enviar, un webhook a n8n genera el PDF y lo despacha por email y WhatsApp. Detalle en `04-automatizaciones-n8n.md` (A2).

---

### 5. Historia de María Pía + centro en Rosario — ✅ CORRECTO, con un matiz

**Qué está bien:** La autoridad va después de la prueba social, no antes. Está en el lugar correcto.

**El matiz sobre Rosario:** cuidado con cómo se enmarca la ubicación. Estás vendiendo un producto **online, no presencial**. Si el mapa domina la sección, comunicás "servicio local" y una persona de Córdoba o de Madrid asume que no es para ella.

**Cómo usar Rosario correctamente:** como prueba de que es real. El diferencial de María Pía frente a los mil coaches de Instagram es que **tiene un centro físico y entrena gente de verdad todos los días**. Ese es el argumento:

> "No soy una coach de Instagram. Tengo un centro de entrenamiento en Rosario donde entreno personas todos los días. Lo que vas a hacer en estas 4 semanas es exactamente el método que uso ahí."

El mapa, chico y decorativo. La foto del centro, grande. Y una línea explícita: "El programa es 100% online — podés hacerlo desde donde estés."

---

### 6. Reels con reproducción automática — ⚠️ RIESGO TÉCNICO

**Qué está bien:** La prueba social en movimiento funciona y refuerza que hay contenido vivo detrás.

**Los problemas:**

1. **El embed oficial de Instagram (oEmbed) no permite autoplay.** Muestra una tarjeta que hay que clickear y que abre Instagram. Técnicamente no se puede hacer lo que pedís con el embed oficial.
2. La alternativa es **descargar los reels y servirlos self-hosted**. Funciona, pero: hay que re-subir cada vez que se publica algo nuevo (trabajo manual recurrente), y son varios videos cargando en simultáneo en mobile — impacto directo en Lighthouse y en el consumo de datos de la usuaria.
3. **Riesgo estratégico:** un carrusel de reels que linkea a Instagram **saca tráfico de tu página de venta**. Trajiste a la persona desde Instagram; devolverla a Instagram antes de que compre es un mal negocio.

**Recomendación:**

| Opción | Cuándo |
|---|---|
| **Recomendada:** 4-6 videos self-hosted (Vercel Blob o Mux), verticales, con poster. Autoplay muted **sólo el centrado**, el resto pausado. Sin link a Instagram — CTA de compra debajo. | Ahora |
| Automatizar la actualización: n8n detecta reel nuevo → descarga → sube a Blob → actualiza `src/content/reels.ts` | Fase 3, si el mantenimiento manual molesta |
| Embed oEmbed oficial | Sólo si el requisito legal/estético lo exige. Sin autoplay. |

Y ubicala **después** de la sección de María Pía, no antes: los reels refuerzan autoridad, no venden por sí solos.

---

### 7. Preguntas frecuentes — ✅ CORRECTO, pero no es un FAQ

Las FAQ de una página de venta no son soporte al cliente. **Son manejo de objeciones disfrazado.** Cada pregunta debe desactivar un motivo real de no compra.

Las 8 que necesitás (adaptar el copy con MP):

1. "Nunca entrené en mi vida, ¿es para mí?" → miedo al ridículo
2. "No tengo gimnasio ni equipamiento, ¿sirve igual?" → barrera logística
3. "¿Cuánto tiempo por día necesito?" → objeción de tiempo, la más frecuente
4. "¿Y si no puedo seguir el ritmo o me atraso?" → miedo al fracaso
5. "¿Cómo pago y cómo entro?" → fricción del circuito de transferencia (crítica en tu caso)
6. "¿Qué pasa si no me sirve?" → garantía
7. "¿Es personalizado?" → **respondela con honestidad**: el plan es el mismo para todas, pero la llamada de bienvenida, la corrección de técnica y los ajustes de nutrición son tuyos. Esa honestidad vende más que fingir personalización.
8. "¿Qué pasa cuando terminan las 4 semanas?" → siembra el upsell

**Cerrá el FAQ con un CTA.** Es el último punto de la página donde alguien está decidiendo.

---

### 8. Footer — ✅

Sin observaciones. Legales, contacto, redes, y un CTA final.

---

## Parte 2 — Lo que falta (crítico)

Ordenado por impacto en conversión.

### F1. Circuito de compra por transferencia — **EL AGUJERO MÁS GRANDE**

Sin MercadoPago, hoy no hay forma de comprar. Este es el punto que más plata cuesta y no está en tu lista.

El diseño mínimo viable:

```
Botón "Quiero entrar" en la home
        ↓
Página /comprar (no un modal — necesita URL propia para trackear)
   · Resumen de lo que se lleva + precio, otra vez
   · Alias / CBU / titular, con botón "copiar"
   · 3 pasos numerados y explícitos:
       1. Transferí ARS 29.900 al alias mp.cep
       2. Mandame el comprobante por WhatsApp (botón)
       3. En menos de 2 horas te llega el acceso a Skool
   · Botón WhatsApp con mensaje precargado:
     "Hola María Pía, quiero entrar al Reto 4 Semanas.
      Acá va mi comprobante 👇"
   · Aviso claro: "El acceso es manual. Si transferís de noche,
     lo recibís a la mañana siguiente."
        ↓
n8n detecta el mensaje → registra en Sheets → alerta a MP
        ↓
MP confirma el pago (una respuesta, un click)
        ↓
Automatización: invitación a Skool + email de bienvenida + link a la llamada
```

**Advertencia honesta:** este circuito cuesta conversión frente a un checkout automático. Se pierde gente entre "quiero" y "transferí", y más aún de noche o fin de semana. Es una decisión válida para validar sin trámites, pero **cuando la cohorte 1 valide el producto, reactivar MercadoPago debería ser prioridad uno.** Mientras tanto, minimizá la fricción: alias fácil de recordar y copiable, monto exacto en pantalla, y respuesta de WhatsApp en minutos (automatizable — ver A3).

### F2. Barra de CTA fija en mobile

80% del tráfico es mobile. Una barra inferior fija con el precio y el botón, que aparece al pasar el hero. Es de las mejoras de mayor retorno por hora de trabajo en toda la página.

### F3. Garantía / reversión de riesgo

No está en tu estructura y es el mayor driver de conversión en low-ticket. "7 días de garantía: si hacés el programa y no es para vos, te devuelvo el 100%." El costo real es bajísimo y el efecto sobre la conversión es grande. Requiere decisión de MP.

### F4. "Cómo funciona" en 3 pasos

Después del precio. Reduce la ansiedad de "¿y después de pagar qué?": Comprás → Entrás a Skool y hacés tu llamada de bienvenida → Empezás el lunes con el grupo.

### F5. Urgencia real

Si vas por cohortes (recomendado), tenés escasez genuina: la llamada 1:1 limita el cupo. "Cohorte de septiembre — 25 lugares, quedan 8." **Nunca falsees esto.** La urgencia falsa se detecta y destruye la confianza en un nicho donde la confianza es todo el activo.

### F6. Página puente para el link en bio

Instagram permite un link. No lo mandes a la home. Una `/ig` minimalista con 3 opciones: hacer el diagnóstico, entrar al reto, hablar por WhatsApp. Con UTMs para saber qué contenido trae qué.

---

## Parte 3 — Lo que hay que quitar

El código actual tiene secciones que ya no corresponden al modelo de negocio.

| Sección actual | Acción | Por qué |
|---|---|---|
| `LiveEvents` | **Quitar** | No hay eventos en vivo en el producto de entrada |
| `Gym` | **Fusionar** con `About` | Es parte del argumento de autoridad, no una sección propia |
| `Services` | **Reescribir** como bloque de oferta única | Un producto no necesita una grilla de servicios |
| `Newsletter` genérico | **Reemplazar** por el quiz | "Suscribite al newsletter" convierte ~3%; el quiz, 30-47% |
| Carrito (`CartDrawer`, `CartButton`, `store.ts`) | **Quitar de la home** | Un solo producto no necesita carrito. Cada click extra entre el botón y la compra pierde gente. Botón directo a `/comprar`. |
| Toggle ARS/USD | **Ocultar por ahora** | Sin pasarela activa, sólo agrega confusión. Volverá con Stripe. |
| `Stories` | **Evaluar** | Si duplica a los testimonios, unificar |

**Principio rector:** una página que vende una sola acción convierte; una que ofrece todo, no vende nada. Todo elemento que no empuja a "quiero entrar" o "hacé el diagnóstico" está restando.

---

## Parte 4 — Arquitectura final de la home

```
┌─ NAVBAR ──────────────────────────────────────────┐
│ Logo · [Diagnóstico gratis] · [QUIERO ENTRAR]     │
└───────────────────────────────────────────────────┘

1.  HERO
    H1 con la promesa concreta (resultado + plazo + para quién)
    Subtítulo: qué es, en una línea
    VSL 60-90s con poster
    [QUIERO ENTRAR]  ·  [Hacer el diagnóstico gratis]
    Barra fina de prueba social

2.  ¿ES PARA VOS?            ← NUEVO
    Dos columnas: "Sí, si..." / "No, si..."

3.  QUÉ RECIBÍS               ← NUEVO
    Desglose contable de entregables

4.  LA OFERTA
    Precio, qué incluye, cupos restantes
    [QUIERO ENTRAR] → /comprar
    2 testimonios cortos justo debajo del botón

5.  CÓMO FUNCIONA             ← NUEVO
    3 pasos: comprás → entrás → empezás

6.  TESTIMONIOS
    4-6 casos con foto, nombre y resultado

7.  QUIÉN ES MARÍA PÍA
    Historia + centro de Rosario (autoridad, no localidad)
    [QUIERO ENTRAR]

8.  REELS
    4-6 videos self-hosted, sin salida a Instagram

9.  FAQ
    8 objeciones + CTA de cierre

10. DIAGNÓSTICO GRATIS        ← el quiz, acá y no antes
    "¿Todavía no estás segura?"

┌─ FOOTER ──────────────────────────────────────────┐
│ Legales · Contacto · Redes · CTA final            │
└───────────────────────────────────────────────────┘

[ Barra fija mobile: ARS 29.900 · QUIERO ENTRAR ]
[ FAB WhatsApp ]
```

### Páginas adicionales

| Ruta | Función |
|---|---|
| `/comprar` | Circuito de transferencia + WhatsApp |
| `/diagnostico` | Quiz standalone — destino de todo el tráfico de lead magnets |
| `/ig` | Página puente del link en bio |
| `/gracias` | Post-quiz. Confirmación + oferta del reto |
| Legales | Ya existen — pendiente revisión de abogado |

---

## Fuentes

- [Best VSL Landing Page Examples of 2026 — Swipe Pages](https://swipepages.com/blog/7-best-vsl-landing-page-examples-of-2026/)
- [Fitness landing page examples — Unbounce](https://unbounce.com/landing-page-examples/fitness/)
- [High-Converting Landing Pages for Personal Trainers and Gyms](https://www.speckdesigns.com/sd-insights/high-converting-landing-pages-for-personal-trainers-and-gyms)
- [Quiz Conversion Rate Report 2026 — Interact](https://www.tryinteract.com/blog/quiz-conversion-rate-report/)
- [Quiz Funnels vs Lead Magnets — KyLeads](https://www.kyleads.com/blog/quiz-funnels-vs-lead-magnets/)
- [Quiz Funnels vs Static Lead Magnets 2026 — Dashform](https://getaiform.com/blog/quiz-funnels-vs-static-lead-magnets-interactive-content-conversion-2026)
