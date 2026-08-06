# Comunidad y Respuestas Automáticas — Instagram y WhatsApp

> Frente F5. Objetivo: sacarle a María Pía todo el trabajo de comunicación que no requiere su criterio.

---

## 1. El stack de comunidad — qué plataforma para qué

Un error frecuente es intentar tener comunidad en todos lados. **Cada plataforma tiene un trabajo y sólo uno.**

| Plataforma | Trabajo | Quién atiende |
|---|---|---|
| **Instagram** | Captación. Contenido público y comment-to-DM. | Automatización + Daiana |
| **WhatsApp 1:1** | Venta y soporte individual. El canal de mayor conversión en Argentina. | Automatización + escalado a MP |
| **WhatsApp grupal del grupo** | Pulso diario, urgencia, sensación de grupo | Automatización + MP en bloques |
| **Skool** | El producto. Contenido, accountability, progreso, comunidad de largo plazo. | MP en bloques |
| **Email (Brevo)** | Nurturing largo, gente que no compró todavía | 100% automatizado |

### Recomendación explícita sobre WhatsApp grupal vs Skool

**Los dos, con funciones distintas y sin superposición.**

- **WhatsApp grupal** genera el pulso diario. La gente ya lo tiene abierto; la notificación llega. Es el canal de la urgencia y del "hoy toca tren inferior".
- **Skool** es donde queda el registro: el contenido, el progreso, el leaderboard, las conversaciones que valen la pena releer.

El riesgo del grupo de WhatsApp es que se convierta en ruido y la gente lo silencie. **Se controla con reglas duras:**
- Sólo María Pía y el bot pueden iniciar temas.
- Las alumnas responden en el hilo, no abren conversaciones nuevas.
- Máximo 2 mensajes automáticos por día.
- Las preguntas largas se redirigen a Skool: *"Buena pregunta — subila a Preguntas en Skool y te la respondo el lunes."* Esto también empuja tráfico hacia Skool, que es donde querés que viva la comunidad.

### Lo que NO hay que hacer
- **Discord / Telegram:** audiencia equivocada. Mujeres de 30-45 en Argentina no van a instalar Discord.
- **Facebook Group:** duplica lo que ya hace Skool, con peor gamificación.
- **Un canal más "por si acaso":** cada canal adicional es trabajo diario de moderación. Con tres personas, tres canales es el límite.

---

## 2. Instagram — automatización de respuestas

### Herramienta: ManyChat (~USD 15/mes)

Es la opción correcta para el caso de uso principal: comment-to-DM con entrega de lead magnet. **Su límite conocido es la calificación de leads para venta consultiva** — no aplica al reto de 4 semanas (se vende sin llamada), pero sí aplicará al upsell 1:1. Ese caso se resuelve derivando a n8n.

### Los 4 flujos de Instagram

#### IG-1 · Comentario con keyword → DM
El flujo principal. Detalle en `03-lead-magnets-calendario.md` §6.

```
Comentario con la keyword
  → Responder el comentario en público ("¡Te lo mandé por DM! 📩")
  → DM con el lead magnet
  → Pedir email dentro del DM
  → Webhook a n8n (flujo A1)
```
La respuesta pública no es cosmética: es prueba social visible para todo el que lea los comentarios, y es señal de engagement para el algoritmo.

#### IG-2 · Respuesta a story
```
Alguien responde una story
  → Clasificar la intención
      Reacción/emoji  → responder con calidez, sin pitch
      Pregunta        → responder con FAQ + ofrecer el diagnóstico
      Interés directo → link a /comprar
  → Etiquetar el contacto
  → Sincronizar a n8n
```

#### IG-3 · DM entrante nuevo (primer contacto)
El flujo de mayor valor y el que más cuidado necesita.

```
DM entrante de alguien que nunca escribió
  → Respuesta en segundos:
    "¡Hola! Soy el asistente de María Pía 👋
     Contame qué estás buscando:
     1️⃣ Info del Reto 28 Días
     2️⃣ Saber por dónde empezar
     3️⃣ Otra cosa"
  → 1 → info + precio + link a /comprar
  → 2 → link al diagnóstico
  → 3 → ESCALAR a humano (Daiana en horario, MP fuera)
```

**Dos reglas no negociables:**

1. **Declarar que es un asistente.** No hacer pasar el bot por María Pía. En un negocio construido sobre confianza personal, que alguien descubra que hablaba con un bot creyendo hablar con la coach es un daño que no se repara.
2. **Escalado agresivo.** Si el mensaje no encaja en el guion, va a un humano. Un lead que escribe algo propio vale 10 veces más que uno que aprieta un botón. **El objetivo del bot no es responder todo: es responder rápido lo obvio y pasarle a los humanos lo que importa.**

#### IG-4 · Seguimiento de leads sin respuesta
```
Recibió el lead magnet y no respondió en 24 h → "¿Pudiste verlo?"
72 h → soft-pitch del reto
7 días → última consulta, después pasa sólo a email
```
Máximo 3 toques. Más que eso genera bloqueos y reportes, que dañan el alcance de la cuenta.

---

## 3. WhatsApp — automatización de respuestas

### Decisión de infraestructura (pendiente, ver Plan Maestro §7 punto 9)

| Opción | Puesta en marcha | Costo | Riesgo |
|---|---|---|---|
| **Evolution API** (self-hosted) | Mismo día | ~USD 6/mes VPS | No oficial. Riesgo de baneo del número. Menos estable. |
| **Meta WhatsApp Business API** | 1-4 semanas de aprobación | Por conversación | Oficial y estable. Plantillas requieren aprobación previa. |

**Recomendación:** arrancar con Evolution API para validar los flujos durante el grupo 1, y migrar a Meta cuando el volumen lo justifique. Es el camino habitual de las PyMEs argentinas. **Usar un número dedicado al negocio, nunca el personal de María Pía** — si el número se bloquea, no querés perder tus contactos personales.

**Formato de número para Argentina:** `549` + código de área sin 0 + número sin 15. Ej: `5493411234567`.

### Los 6 flujos de WhatsApp

#### WA-1 · Primer contacto (menú)
```
Mensaje entrante de un número desconocido
  → "¡Hola! Soy el asistente de María Pía 👋
     ¿En qué te ayudo?
     1 · Info del Reto 28 Días
     2 · Ya transferí, te mando el comprobante
     3 · Ya soy alumna, tengo una consulta
     4 · Hablar con María Pía"
  → 1 → info + precio + garantía + link
  → 2 → activa WA-2
  → 3 → activa WA-4
  → 4 → escala a humano + avisa el horario de respuesta
```

#### WA-2 · Recepción de comprobante (crítico)
Ver `04-automatizaciones-n8n.md` A3. El punto clave: **acuse de recibo inmediato**, aunque la verificación sea manual.

#### WA-3 · Onboarding post-pago
Ver A4 y A5. Los mensajes de las primeras 48 h.

#### WA-4 · FAQ de alumnas activas
Clasificador sobre el mensaje entrante que responde las consultas repetidas:

| Consulta | Respuesta automática |
|---|---|
| "No puedo entrar a Skool" | Instrucciones paso a paso + link |
| "¿Qué rutina toca hoy?" | Link al día actual según su grupo |
| "Me duele X" | Guía general + **derivación obligatoria a MP**. Nunca dar consejo médico automatizado. |
| "No pude entrenar hoy" | Mensaje de aliento + cómo retomar |
| "¿Cuándo es el live?" | Fecha, hora y link |
| "¿Cómo mando mi video de técnica?" | Instrucciones |
| Cualquier otra cosa | Escala a MP con contexto |

**Límite duro:** todo lo que roce dolor, lesión, embarazo, medicación o condición médica **escala a humano siempre**, sin excepción y sin intentar responder. Es un límite de responsabilidad profesional, no de calidad del bot.

#### WA-5 · Grupo de WhatsApp del grupo
```
07:00 · Rutina del día + link
20:00 · (sólo L/M/V) Recordatorio de check-in
Miércoles 18:00 · Recordatorio del live
Domingo · Resumen de la semana + destacadas
```
Máximo 2 mensajes automáticos diarios.

#### WA-6 · Recuperación de carrito
```
Visitó /comprar y no llegó comprobante en 24 h
  → "Vi que estabas por entrar al reto. ¿Te quedó alguna duda?"
48 h → responder la objeción más común + testimonio
72 h → "Cierro los cupos el [fecha]" (sólo si es cierto)
```
**Con pago por transferencia este flujo es especialmente rentable:** mucha gente dice "después transfiero" y se olvida genuinamente. No es rechazo, es fricción.

---

## 4. Diseño de las respuestas automáticas — reglas transversales

### Las 8 reglas

1. **Identificarse como asistente.** Siempre, en el primer mensaje de cada conversación.
2. **Velocidad ante todo.** La ventana de 5 minutos vale 100x la de 30. Una respuesta imperfecta en 8 segundos supera a una perfecta en 4 horas.
3. **Escalar generosamente.** Ante la duda, humano. El costo de escalar de más es un minuto de Daiana; el de escalar de menos es una venta.
4. **Tono de marca.** Rioplatense, de vos, directo, sin clichés motivacionales. Las respuestas automáticas las escribe María Pía o Juan Cruz con su voz, no se generan genéricas.
5. **Nunca más de 3 toques automáticos** sin respuesta humana.
6. **Cero consejo médico automatizado.** Dolor, lesión, embarazo, medicación → humano.
7. **Horario visible.** "María Pía responde de 18 a 19, lunes y jueves." La expectativa gestionada elimina la ansiedad.
8. **Todo se registra.** Cada conversación deja rastro en Sheets: quién, cuándo, qué intención, si escaló. Sin eso no sabés qué automatizar después.

### La regla que define el proyecto

> **Automatizar la velocidad, no la relación.**

El bot existe para que nadie espere. La conversación que decide una compra o retiene a una alumna la tiene un humano. Un negocio de coaching que automatiza la relación deja de ser coaching y se convierte en un curso — y los cursos no sostienen ARS 30.000 ni generan upsell.

---

## 5. Cuánto tiempo humano queda después de automatizar

Estimación con 25 alumnas activas y ~100 leads/mes:

| Tarea | Sin automatización | Con automatización | Quién |
|---|---|---|---|
| Responder DMs de IG | 8 h/sem | 1 h/sem | Daiana |
| Responder WhatsApp | 10 h/sem | 2 h/sem | Daiana + MP |
| Onboarding de alumnas | 3 h/sem | 0,2 h/sem | Automático |
| Seguimiento y check-ins | 5 h/sem | 0,5 h/sem | MP (sólo casos en riesgo) |
| Conciliación de pagos | 2 h/sem | 0,5 h/sem | Juan Cruz |
| Comunidad Skool | 4 h/sem | 2 h/sem | MP |
| Pedido de testimonios | 2 h/sem | 0 h/sem | Automático |
| **Total** | **34 h/sem** | **6,2 h/sem** | |

**El objetivo del frente F4 es exactamente esa diferencia: 28 horas semanales recuperadas.** Es lo que hace viable el modelo de 3 personas, y lo que permite que María Pía dedique su tiempo a lo que sólo ella puede hacer: entrenar, corregir y estar presente.

---

## 6. Costo mensual del stack

| Herramienta | Costo |
|---|---|
| n8n Cloud | USD 24 |
| ManyChat Pro | USD 15 |
| Skool | USD 99 |
| Brevo (hasta 500 contactos) | USD 0 |
| Vercel (Hobby/Pro) | USD 0-20 |
| Canva Pro | USD 12 |
| VPS Evolution API | USD 6 |
| Google Workspace | USD 0-7 |
| **Total** | **~USD 160-185/mes** |

**Punto de equilibrio: 7-8 ventas mensuales del reto a ARS 29.900.** Todo lo que supere eso es margen.

---

## Fuentes

- [ManyChat for Instagram: Is It Worth It in 2026? — SetSmart](https://setsmart.io/blog/manychat-instagram)
- [Stop Losing Leads in the DMs — Manychat](https://manychat.com/blog/lead-qualification-funnel/)
- [Automatizar WhatsApp Business con N8N en Argentina 2026 — Duotach](https://duotach.com/blog/automatizar-whatsapp-business-n8n-guia-completa)
- [WhatsApp Business API en Argentina: guía de costos — Estudio Creativo](https://www.estudiocreativo.agency/blog/whatsapp-business-api-argentina-guia-completa)
- [n8n WhatsApp Business API: Automatización Completa 2026 — n8n Hispano](https://n8nhispano.com/n8n-whatsapp-business-api/)
- [Instagram Funnel for Fitness Coaches: 2026 Playbook — Creatorflow](https://creatorflow.so/blog/instagram-funnel-fitness-coaches/)
