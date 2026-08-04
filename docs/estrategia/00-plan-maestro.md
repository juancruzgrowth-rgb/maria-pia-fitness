# Plan Maestro — MP CEP

> Documento raíz de la estrategia. Todo lo demás cuelga de acá.
> Última actualización: 2026-08-03

---

## 1. Diagnóstico de situación

**Dónde estamos:**
- Web Next.js construida, con secciones que ya no corresponden al modelo de negocio actual.
- Producto configurado como "Programa 90 Días — ARS 39.900 x3". **Esto ya no aplica**: el producto de entrada ahora es un plan de 4 semanas, no personalizado.
- Checkout MercadoPago/Stripe implementado pero **desactivado por decisión de negocio** → cobro por transferencia + comprobante por WhatsApp.
- Skool: no creado.
- Automatizaciones: cero implementadas.
- Tráfico: cero (aún no hay lanzamiento).

**El cuello de botella real hoy no es la web. Es que no existe el producto entregable (Skool) ni el circuito de cobro.**
Una web perfecta con nada detrás no factura. El orden de trabajo debe respetar eso.

---

## 2. Modelo de negocio objetivo

### Escalera de valor

```
CONTENIDO GRATIS (Instagram / TikTok)
        │  Daiana produce · MP protagoniza
        ▼
LEAD MAGNET (comment-to-DM automático)
        │  entrega instantánea · captura email + WhatsApp
        ▼
QUIZ / DIAGNÓSTICO (PDF personalizado)
        │  segmenta y califica · nutre por email
        ▼
┌──────────────────────────────────────────────┐
│ RETO 4 SEMANAS — producto de entrada         │  ← EL FOCO DE ESTA FASE
│ No personalizado · cohortes · ARS 25-35k     │
│ Personalizado SÓLO: llamada de bienvenida    │
│ + corrección de técnica y ajuste nutricional │
└──────────────────────────────────────────────┘
        │  25-55% de los que terminan compran el siguiente escalón
        ▼
MEMBRESÍA MENSUAL / PROGRAMA 90 DÍAS
        │  recurrente · misma comunidad · más profundidad
        ▼
1:1 PERSONALIZADO (high ticket, cupos muy limitados)
```

### Por qué esta forma

La investigación de mercado 2026 es consistente en un punto: **los retos pagos de 14 a 30 días son el formato de mayor conversión desde tráfico social frío**, y quienes los completan convierten al escalón siguiente entre 25% y 55%. Precio bajo + compromiso acotado en el tiempo elimina las dos objeciones principales del comprador frío.

Tu instinto de arrancar con 4 semanas no personalizado está **alineado con lo que mejor funciona en el mercado**. El error habría sido lanzar directo el programa de 90 días a ARS 120k para tráfico de Instagram.

### Nota sobre el producto actual en código

`src/lib/products.ts` tiene el "Programa 90 Días" como único producto. Hay que reemplazarlo por el reto de 4 semanas y mover el de 90 días al escalón de upsell. **Necesito precio confirmado antes de tocarlo** (ver Preguntas Abiertas).

---

## 3. Estructura de trabajo — 5 frentes

Cada frente es independiente y tiene un dueño. Se atacan en el orden indicado, pero los frentes 1 y 2 corren en paralelo.

| # | Frente | Dueño | Objetivo |
|---|--------|-------|----------|
| **F1** | **Producto & Entrega** (Skool) | María Pía | Que exista algo que entregar |
| **F2** | **Web & Conversión** | Juan Cruz | Que el tráfico compre sin intervención humana |
| **F3** | **Contenido & Captación** | Daiana + MP | Que llegue tráfico calificado |
| **F4** | **Automatización** (n8n) | Juan Cruz | Que el negocio funcione con MP durmiendo |
| **F5** | **Comunidad & Retención** | MP (asistida por automatización) | Que no se vayan y compren el siguiente escalón |

Detalle de cada frente en los documentos numerados de esta carpeta.

---

## 4. Roadmap por fases

### FASE 0 — Fundaciones (semanas 1-2) — BLOQUEANTE

Nada se lanza hasta que esto esté.

| Tarea | Dueño | Detalle |
|---|---|---|
| Definir precio y nombre del reto 4 semanas | Juan Cruz + MP | Decisión comercial, no técnica |
| Grabar contenido del reto (videos de ejercicios) | MP + Daiana | Ver `05-skool-estructura.md` para el guion de qué grabar |
| Crear comunidad Skool + estructura de classroom | MP | Plantilla completa en `05-skool-estructura.md` |
| Definir circuito de cobro por transferencia | Juan Cruz | Alias/CBU, quién concilia, en cuánto tiempo se da acceso |
| WhatsApp Business definitivo (número AR) | MP | Hoy hay un número ES de prueba en el código |
| Instalar n8n (cloud o VPS) | Juan Cruz | Base de todo el frente F4 |

### FASE 1 — Máquina de venta (semanas 3-4)

| Tarea | Dueño |
|---|---|
| Rediseño de la home según `01-web-arquitectura.md` | Juan Cruz |
| Página `/comprar` con transferencia + WhatsApp precargado | Juan Cruz |
| Quiz diagnóstico en `/diagnostico` + PDF automático | Juan Cruz |
| Automatización A1-A4 en n8n (ver `04-automatizaciones-n8n.md`) | Juan Cruz |
| Grabar VSL del hero (60-90 seg) | MP + Daiana |
| Conseguir 3-5 testimonios reales con foto y permiso | MP |

### FASE 2 — Captación (semanas 5-8)

| Tarea | Dueño |
|---|---|
| Producir los primeros 4 lead magnets | Daiana + MP |
| Montar ManyChat con keywords comment-to-DM | Juan Cruz |
| Ejecutar calendario de contenido (`03-lead-magnets-calendario.md`) | Daiana |
| Secuencias de email en Brevo | Juan Cruz |
| **Lanzamiento cohorte 1** | Todos |

### FASE 3 — Retención y upsell (semanas 9-12)

| Tarea | Dueño |
|---|---|
| Automatizaciones de comunidad y check-ins | Juan Cruz |
| Recolección sistemática de testimonios | Automatizado |
| Definir y lanzar el escalón 2 (membresía / 90 días) | MP + Juan Cruz |
| Reactivar MercadoPago si el volumen lo justifica | Juan Cruz |

### FASE 4 — Escala (mes 4+)

Ads sobre creativos orgánicos ya validados. Nunca antes: pagar por tráfico hacia un embudo no validado es quemar plata.

---

## 5. Modelo de 3 personas — reparto de responsabilidades

El principio: **María Pía sólo hace lo que sólo ella puede hacer.** Todo lo demás se delega o se automatiza.

### María Pía — La cara y el criterio técnico
**Sí hace:**
- Aparecer en cámara (contenido y videos del programa)
- Llamadas 1:1 de bienvenida
- Corrección de técnica por video
- Presencia en la comunidad (bloques acotados, ver abajo)
- Aprobar copy y decisiones de producto

**No hace (nunca):**
- Responder DMs de primera línea → automatizado
- Editar videos → Daiana
- Conciliar pagos → automatizado + Juan Cruz
- Escribir emails → automatizado
- Publicar / programar → Daiana

**Presupuesto de tiempo objetivo: 12-15 h/semana.**
| Bloque | Horas/sem |
|---|---|
| Grabación de contenido (1 sesión, batch) | 3 h |
| Llamadas de bienvenida (agrupadas 2 días) | 3 h |
| Correcciones de técnica por video | 2 h |
| Comunidad (2 bloques de 45 min: L y J) | 1,5 h |
| Live semanal Q&A | 1 h |
| Excepciones / DMs escalados | 2 h |

### Daiana — Content Manager
- Guiones y planificación editorial (calendario en `03-...`)
- Grabación asistida y edición de reels
- Publicación y programación
- Diseño de los lead magnets (Canva)
- Primera línea de comentarios en IG (los que la automatización no cubre)
- Reporte semanal de métricas de contenido

### Juan Cruz — Estrategia y automatización
- Web, quiz, PDF automático
- n8n: todos los flujos
- ManyChat, Brevo, Skool API, WhatsApp
- Dashboard de métricas
- Decisiones de precio, oferta y embudo junto a MP

### Regla de escalado
Si una tarea la hace un humano **más de 3 veces por semana de la misma forma**, entra a la cola de automatización. Sin excepción.

---

## 6. Métricas — el tablero mínimo

Un solo Google Sheet con estas filas, actualizado automáticamente por n8n:

| Métrica | Dónde se mide | Objetivo cohorte 1 |
|---|---|---|
| Alcance de reels | IG Insights | — (baseline) |
| Comentarios con keyword | ManyChat | 100/semana |
| Opt-ins a lead magnet | ManyChat + Brevo | 40% de los comentarios |
| Quiz iniciados → completados | n8n | > 60% |
| Emails capturados | Brevo | 150 en 4 semanas |
| Clicks a `/comprar` | Vercel Analytics | — |
| Ventas | Sheet `ventas` | **15 alumnas** |
| Tasa de finalización del reto | Skool | > 50% |
| Upsell al escalón 2 | Sheet | > 25% de las que terminan |

**La métrica que manda en Fase 1-2 es "ventas de la cohorte 1". Todo lo demás es diagnóstico.**

---

## 7. Preguntas abiertas — necesito respuesta antes de construir

Bloquean tareas concretas. Las agrupé por urgencia.

### Bloquean YA (Fase 0)
1. **Precio del reto de 4 semanas.** Mi recomendación: ARS 29.900 pago único (USD 29). Rango sano: 25.000-35.000. ¿Confirmás?
2. **Nombre del producto.** "Reto 28 Días" / "Método 4 Semanas" / otro. Afecta dominio, copy y Skool.
3. **¿Cohortes con fecha de inicio fija, o acceso inmediato al comprar?** Cambia todo el embudo: cohortes permiten urgencia real y llamadas agrupadas; acceso inmediato vende más parejo pero pierde el gancho de escasez. **Recomiendo cohortes mensuales.**
4. **Cupo máximo por cohorte.** La llamada 1:1 de bienvenida es el límite real. Si son 20 min por llamada y MP dedica 3 h/semana → ~25 alumnas/mes es el techo.
5. **Datos de transferencia**: ¿alias/CBU a nombre de quién? ¿Se muestran en la web o sólo por WhatsApp?
6. **Número de WhatsApp AR definitivo.**

### Bloquean Fase 1
7. **Skool: ¿comunidad única o una por producto?** Recomiendo **una sola comunidad** con el classroom segmentado por nivel de acceso. Menos gestión, más masa crítica.
8. **Quiz: ¿cuántas preguntas y qué segmentos de salida?** Necesito que MP defina 3-4 arquetipos de alumna (ej. "arranca de cero", "vuelve después de una pausa", "entrena pero no ve resultados") para que el PDF diga algo real y no genérico.
9. **¿Hay presupuesto para WhatsApp Business API (Meta), o arrancamos con Evolution API self-hosted?** Meta tarda 1-4 semanas de aprobación; Evolution está operativo el mismo día pero es menos estable.
10. **¿Garantía de devolución?** Es el mayor driver de conversión en low-ticket. Recomiendo 7 días sin preguntas.

### Bloquean Fase 2
11. ¿Cuenta de Instagram convertida a Business? (requisito de ManyChat)
12. ¿TikTok se activa o se ignora en esta fase? Recomiendo ignorarlo hasta la cohorte 2 — foco.

---

## 8. Índice de documentos

| Doc | Contenido |
|---|---|
| `01-web-arquitectura.md` | Análisis crítico de tu estructura propuesta + arquitectura final |
| `02-investigacion-mercado.md` | Qué le da resultados a los coaches fitness online |
| `03-lead-magnets-calendario.md` | 12 semanas de lead magnets + cómo producirlos y entregarlos |
| `04-automatizaciones-n8n.md` | Catálogo priorizado de automatizaciones |
| `05-skool-estructura.md` | Arquitectura completa de la comunidad y el classroom |
| `06-comunidad-respuestas.md` | Plataformas de comunidad + automatización IG y WhatsApp |
