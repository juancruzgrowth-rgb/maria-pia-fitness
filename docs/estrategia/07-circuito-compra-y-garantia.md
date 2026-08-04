# Circuito de Compra, Garantía y Cohortes

> Decisiones tomadas el 2026-08-04. Reemplaza lo que decía `01-web-arquitectura.md` sobre el quiz.

---

## 0. Qué cambió en esta sesión

| Tema | Decisión |
|---|---|
| Quiz en la web | **Descartado.** Queda como táctica ocasional de campaña, fuera del sitio |
| Newsletter en la web | **Descartado también** (ver §3 — el razonamiento) |
| Cobro | Transferencia + comprobante por WhatsApp |
| Activación del onboarding | **Opción 1: María Pía responde `OK 1234` por WhatsApp** (ver §2.2) |
| Garantía | **10 días** — alineada con el art. 34 de la Ley 24.240 (ver §4) |
| Cadencia de cohortes | **Cada 14 días** + Semana 0 (ver [`08-cohortes-y-cadencia.md`](08-cohortes-y-cadencia.md)) |
| CTAs | Uno solo flotante fijo (comprar) + uno de WhatsApp no flotante |
| VSL | 10 minutos (decisión del cliente) |
| Formato | Se vende como **reto** |
| Métrica principal | **Tasa de finalización** |
| Nicho | Mujeres que trabajan 8+ h/día y quieren sostener hábitos y estar en forma sin que les coma la vida |
| Prioridad de desarrollo | **Mobile primero** |
| Presencial en Rosario | Fuera del copy. El gimnasio se muestra sólo en su sección, como prueba de autoridad |

---

## 1. Qué son las cohortes (y por qué conviene)

### Las dos formas de vender el reto

**Acceso inmediato (evergreen)**
La persona paga y entra ese mismo día. Cada alumna está en un día distinto del programa: una arranca el 3, otra el 17, otra el 29.

**Cohortes**
Todas arrancan el mismo día. Se abre la inscripción, se cierra, y el grupo entero hace el día 1 el mismo lunes, el día 14 el mismo lunes, y termina junto.

### Comparación

| | Acceso inmediato | Cohortes |
|---|---|---|
| Facturación | Pareja todo el mes | Concentrada en la semana de apertura |
| Urgencia para comprar | Ninguna — "lo compro el mes que viene" | Real — "cierra el viernes" |
| Comunidad | Nadie está en el mismo punto, nadie se acompaña | Todas viven lo mismo el mismo día |
| **Tasa de finalización** | **Baja** | **Alta** |
| Llamadas de bienvenida de MP | Desparramadas todo el mes | Agrupadas en 2 días |
| Contenido de MP | Genérico | "Chicas, hoy es el día 14, sé que es la semana difícil" |
| Testimonios | Gotean | Llegan todos juntos → material para el próximo lanzamiento |
| Upsell | Uno por uno, manual | Una oferta al grupo entero el día 28 |

### Por qué te conviene, específicamente

**Elegiste la tasa de finalización como métrica principal. Las cohortes son la palanca más directa que existe sobre esa métrica.**

El motivo es simple: en un reto lo que sostiene a la gente no es el contenido, es ver que otras están en el mismo día que ella. Si tu alumna abandona el día 9 y en el grupo nadie está en el día 9, nadie lo nota y nadie la busca. Si las 20 están en el día 9, su ausencia se ve, y ella lo sabe.

Además te resuelve tres problemas operativos de un saque:
- **Las llamadas 1:1 de María Pía** se agrupan en dos días en vez de aparecer salteadas todo el mes.
- **La urgencia es genuina.** No tenés que inventar un contador falso: los cupos cierran de verdad porque las llamadas tienen un techo.
- **El upsell del día 28** se hace una vez, a todo el grupo, en vez de 20 conversaciones separadas.

### El costo de las cohortes

Es honesto decirlo: **entre cohorte y cohorte no facturás.** Si alguien llega a la web el día 6 de un ciclo cerrado, no puede comprar.

Eso se resuelve con **lista de espera**: el botón cambia de "Quiero entrar" a "Anotarme para la próxima", captura el contacto, y esa persona recibe el aviso el día que abre. En la práctica la lista de espera arranca el siguiente lanzamiento con demanda acumulada — es una ventaja disfrazada de problema.

### Recomendación concreta

**Superado por [`08-cohortes-y-cadencia.md`](08-cohortes-y-cadencia.md):** la decisión final fue **cohortes cada 14 días** con Semana 0, no mensuales. Se mantiene el razonamiento de abajo porque la lógica de por qué conviene cohortear sigue siendo válida.

```
Semana 1  ·  Contenido de calentamiento en IG
Semana 2  ·  APERTURA — inscripción abierta
Semana 3  ·  Cierre + llamadas de bienvenida agrupadas
Semana 4  ·  Arranca el reto (día 1, lunes)
+28 días  ·  Cierre del reto + oferta de upsell + testimonios
```

La web ya está construida para soportar las dos modalidades: el estado de la cohorte vive en `src/lib/products.ts` (`COHORT`), y cambiar `status` a `"waitlist"` transforma todos los CTAs automáticamente.

---

## 2. Circuito de compra por transferencia

### El flujo completo

```
[WEB]  Botón flotante "QUIERO ENTRAR"  (visible en toda la página, siempre)
                    │
                    ▼
[WEB]  /comprar
       · Resumen de lo que se lleva + precio
       · Alias, CBU y titular — con botón "copiar"
       · 3 pasos numerados, explícitos
       · Garantía de 10 días, visible
       · Botón grande: "YA TRANSFERÍ — ENVIAR COMPROBANTE"
                    │
                    ▼
[WHATSAPP]  Se abre con el mensaje ya escrito:
       "Hola María Pía! Quiero entrar al Reto 28 Días.
        Ya hice la transferencia y te adjunto el comprobante.
        Mi nombre: 
        Mi email: "
                    │
                    ▼
[n8n]  Detecta el mensaje entrante
       · Responde en segundos: "¡Recibí tu comprobante!..."
       · Guarda el adjunto
       · Crea fila en Sheets `ventas` → estado "pendiente_verificacion"
       · Notifica a MP
                    │
                    ▼
[BANCO]  María Pía entra al home banking y ve la transferencia
                    │
                    ▼
[ACTIVACIÓN]  MP confirma  ←──── ver §2.2, es la pregunta que hiciste
                    │
                    ▼
[n8n]  Onboarding automático completo
```

### Por qué el mensaje precargado importa tanto

El mensaje trae **nombre y email pedidos explícitamente**. Sin eso, MP recibe un comprobante de un número de teléfono desconocido y no sabe a quién darle acceso, ni a qué email mandar la invitación de Skool. Con el mensaje precargado, el 90% de los datos vienen solos y la automatización puede parsearlos.

El texto está en `src/lib/site.ts` → `RECEIPT_MESSAGE` (expuesto como `CONTACT.receiptUrl`). Un solo lugar para cambiarlo.

### Regla de oro del acuse de recibo

**La verificación del pago es manual. El acuse de recibo NO puede serlo.**

Si alguien transfiere a las 23:40 y no recibe señal hasta las 9 de la mañana, pasa nueve horas con plata transferida y sin confirmación. Eso genera ansiedad de compra, mensajes de reclamo y, en el peor caso, pedido de devolución antes de haber empezado.

La respuesta automática instantánea cuesta un nodo de n8n y elimina el problema entero.

---

### 2.2 · Cómo María Pía activa el onboarding después de mirar el banco

Esta era tu pregunta concreta. Hay tres formas, de menos a más automática. **Recomiendo empezar por la 1 y migrar a la 2 cuando haya volumen.**

---

#### Opción 1 — Respuesta con palabra clave por WhatsApp ✅ **ELEGIDA (2026-08-04)**

María Pía abre el home banking, ve la transferencia, y **responde el mensaje de la alumna en WhatsApp con una palabra clave**.

```
n8n envía a MP:
┌────────────────────────────────────────┐
│ 🔔 NUEVO COMPROBANTE                   │
│                                        │
│ Nombre: Carolina M.                    │
│ Email: caro@gmail.com                  │
│ WhatsApp: +54 9 341 555 1234           │
│ Monto declarado: $29.900               │
│ Comprobante: [ver imagen]              │
│                                        │
│ Verificá en el banco y respondé:       │
│ OK 4821   → confirmar y dar acceso     │
│ NO 4821   → rechazar                   │
└────────────────────────────────────────┘

MP mira el banco. Ve la plata. Responde: "OK 4821"
        ↓
n8n detecta el patrón OK + ID → dispara el onboarding completo
```

**Por qué es la mejor para arrancar:**
- María Pía no aprende ninguna herramienta nueva. Usa WhatsApp, que ya tiene abierto.
- Funciona desde el teléfono, parada en cualquier lado.
- Son dos segundos: mira el banco, escribe "OK 4821".
- El ID de 4 dígitos evita confusiones si llegan varios comprobantes juntos.

**Cómo lo implementamos en n8n:**
1. Nodo trigger de WhatsApp filtrando por el número de MP
2. Nodo de regex sobre el texto: `/^(OK|NO)\s+(\d{4})$/i`
3. Buscar ese ID en Sheets `ventas`
4. Si `OK` → actualizar estado a "pagado" → disparar A4 (onboarding)
5. Si `NO` → estado "rechazado" → mensaje a la alumna pidiendo aclaración
6. Si el ID no existe o ya fue procesado → avisar a MP y no hacer nada

**Guarda importante:** el flujo debe ser idempotente. Si MP manda "OK 4821" dos veces, la alumna no puede recibir dos invitaciones ni dos emails de bienvenida. Se chequea el estado actual antes de escribir.

---

#### Opción 2 — Checkbox en Google Sheets

MP abre el Sheet `ventas` desde el teléfono, encuentra la fila y tilda la casilla **Confirmado**.

```
| Fecha | Nombre     | Email          | Monto  | Comprobante | ✅ Confirmado |
|-------|------------|----------------|--------|-------------|---------------|
| 04/08 | Carolina M | caro@gmail.com | 29.900 | [link]      |     ☑         |
```

n8n corre cada 5 minutos, detecta filas nuevas con el tilde puesto y estado "pendiente", y dispara el onboarding.

**A favor:** vista completa de todas las ventas, fácil de auditar, sirve de panel de control.
**En contra:** MP tiene que abrir Sheets en el celular. Con 25 ventas concentradas en la semana de apertura es cómodo; con ventas salteadas es más fricción que el WhatsApp.

**Cuándo migrar acá:** cuando las ventas por cohorte pasen de ~30 y convenga procesarlas en lote sentada frente a la compu.

---

#### Opción 3 — Verificación bancaria automática

n8n lee las transferencias entrantes de la cuenta y las cruza contra los comprobantes recibidos. Si coinciden monto y fecha, activa el onboarding sin que MP toque nada.

**El problema:** los bancos argentinos no exponen API para cuentas personales. Las alternativas son scraping del home banking (frágil, se rompe con cada cambio de la web del banco, y hay que guardar credenciales bancarias — riesgo alto) o servicios de agregación tipo Open Banking, que en Argentina todavía tienen cobertura irregular.

**Recomendación: no lo hagamos.** El ahorro es de dos segundos por venta y el riesgo de guardar credenciales bancarias en un servidor no lo justifica. Si el volumen crece hasta que esto duela de verdad, la solución correcta no es automatizar la transferencia: **es volver a MercadoPago**, que confirma solo vía webhook.

---

### 2.3 · Qué dispara la confirmación (flujo A4)

Cuando MP responde "OK 4821", en cadena:

| # | Acción | Canal |
|---|---|---|
| 1 | Estado → "pagado" en Sheets `ventas` | Interno |
| 2 | Invitación a Skool | Email de Skool |
| 3 | "¡Estás adentro!" + link de Skool + qué hacer primero | WhatsApp |
| 4 | Email de bienvenida con acceso y link para agendar la llamada | Brevo |
| 5 | Alta en el grupo de WhatsApp de la cohorte | WhatsApp |
| 6 | Sale de todas las secuencias de venta | Brevo |
| 7 | Se programan los mensajes de las 48 h (flujo A5) | n8n |
| 8 | Arranca el reloj de la garantía (día 0) | Interno |

**Tiempo total desde que MP escribe "OK": menos de 30 segundos.**

---

## 3. ¿Newsletter en la web? — No

Preguntaste si el formulario de newsletter también desvía. **Sí, y por la misma razón que el quiz, pero peor.**

El quiz al menos daba algo valioso a cambio (un diagnóstico personalizado) y convertía al 30-47%. Un formulario de newsletter da algo abstracto ("recibí tips") y convierte al 3-10%. **Ocupa el mismo espacio, distrae la misma atención, y captura mucho menos.**

Hay un problema adicional: en una página de venta, el newsletter le ofrece a la visitante una forma de **postergar la decisión sin costo psicológico**. "Me suscribo y lo pienso" se siente como haber hecho algo. No lo es: la mayoría no vuelve.

### Entonces, ¿dónde se captura al que no compra?

**Fuera de la web, en Instagram.** Ese es el punto que cambia todo: tu tráfico no es anónimo. Viene de Instagram, donde ya te sigue. Si no compra hoy, no lo perdiste — sigue viendo el contenido de Daiana todos los días.

La captura de emails ocurre en el circuito de lead magnets con ManyChat (comment-to-DM), que es donde tiene sentido: la persona está en modo "explorar contenido", no en modo "decidir una compra".

**La web tiene un solo trabajo: vender el reto.** Quien no está listo se va con el WhatsApp, y ese es el canal de recuperación:

| Camino | Destino |
|---|---|
| Está lista | Botón flotante → `/comprar` |
| Tiene dudas | CTA de WhatsApp → conversación (donde se recupera mejor que por email) |
| Sólo mirando | Vuelve a Instagram, sigue en el ciclo de contenido |

Esto además es coherente con lo que pediste: **dos CTAs y nada más.**

---

## 4. Garantía de 10 días

> **Cambio del 2026-08-04:** originalmente se planteó una garantía de 7 días. Se extendió a 10 al detectar que el **art. 34 de la Ley 24.240** obliga a otorgar 10 días corridos de revocación en toda venta a distancia, y ese derecho es irrenunciable. Ofrecer 7 no reducía la obligación legal: sólo generaba dos plazos distintos y letra chica innecesaria. Ahora coinciden.

### 4.1 · Cómo se define

| Parámetro | Definición |
|---|---|
| **Plazo** | 10 días corridos desde el acceso (no desde la transferencia) |
| **Alcance** | Devolución del 100%, sin repreguntas |
| **Requisito** | Ninguno. Sin condiciones de "haber completado X" |
| **Cómo se pide** | Un mensaje por WhatsApp o un email |
| **Plazo de devolución** | Hasta 5 días hábiles, por transferencia a la misma cuenta de origen |
| **Después de la devolución** | Se retira el acceso a Skool y al grupo |

**Por qué sin condiciones.** La tentación es pedir "que haya hecho al menos 5 entrenamientos". Es un error por dos motivos: primero, la garantía condicionada no reduce la conversión ansiosa, la aumenta — la persona compra igual pero desconfiando; segundo, gestionar la prueba de cumplimiento cuesta más tiempo que devolver la plata.

**El número real de devoluciones en low-ticket con producto decente ronda el 2-5%.** La conversión que agrega una garantía sin letra chica es muy superior a ese costo.

### 4.2 · Dónde aparece en la web

| Ubicación | Formato |
|---|---|
| Bloque de oferta, debajo del precio | Línea con ícono: "10 días de garantía. Si no es para vos, te devuelvo todo." |
| Sección propia después de "Cómo funciona" | Bloque completo con las 3 condiciones |
| FAQ | Pregunta dedicada: "¿Y si no me sirve?" |
| `/comprar` | Visible antes del botón de enviar comprobante |
| `/garantia` | Página con los términos completos |
| Términos y Condiciones | Cláusula formal |

### 4.3 · El circuito de devolución

```
Alumna pide la devolución (WhatsApp o email)
        │
        ▼
[n8n] Respuesta automática inmediata:
      "Recibí tu pedido. María Pía te escribe hoy."
      → Crea fila en Sheets `devoluciones`
      → Notifica a MP con contexto:
          · Días desde el acceso
          · Actividad en Skool (entró / no entró / cuántas rutinas)
          · Si hizo la llamada de bienvenida
        │
        ▼
[MP] UNA conversación. Una sola.      ← ver §4.4
        │
        ├── Se resuelve la objeción → sigue en el programa
        │                              → nota en Sheets, seguimiento a 7 días
        │
        └── Quiere la devolución igual → SE DEVUELVE, sin insistir
                    │
                    ▼
            [MP] Transferencia de vuelta (≤5 días hábiles)
                    │
                    ▼
            [n8n] · Estado "devuelto" en `ventas`
                  · Baja de Skool y del grupo
                  · Email de cierre cordial
                  · Encuesta de 1 pregunta: ¿por qué?
                  · Sale de secuencias de venta, entra a nurturing largo
```

**El punto crítico está en la última rama.** Si la persona insiste, se devuelve y se termina. Una alumna a la que le costó salir habla mal de la marca en el mismo lugar donde vos vendés — Instagram. El costo reputacional de retener a la fuerza es varias veces el precio del producto.

### 4.4 · Atención de objeciones — el guion de la única conversación

**Marco mental para María Pía:** el objetivo NO es evitar la devolución. Es **entender por qué**, y ofrecer una solución sólo si el motivo real tiene arreglo. Si no lo tiene, devolver rápido y bien.

**Apertura, siempre igual:**

> "Hola [nombre]. Vi tu mensaje y ya está en marcha, quedate tranquila. Antes de procesarlo te quería preguntar una sola cosa, más para mí que para vos: ¿qué fue lo que no funcionó? Me sirve muchísimo para mejorar el reto."

Esto hace tres cosas a la vez: confirma que la devolución no está en discusión (baja la defensa), pide la información, y encuadra la respuesta como un favor. La tasa de respuesta honesta con esta apertura es muy alta.

**Los 6 motivos reales y qué hacer con cada uno:**

| Motivo | Qué decir | Solución posible |
|---|---|---|
| **"No tengo tiempo"** | El motivo más común, y es exactamente lo que el reto promete resolver. | "Te entiendo. ¿Probaste las rutinas de 20 min del módulo express? Están pensadas justo para las semanas imposibles. Si querés, armamos tu semana juntas en 10 minutos." → **Ofrecer una llamada corta.** Si dice que no, devolver. |
| **"Es más difícil de lo que esperaba"** | Miedo, no producto. | "Todas empiezan por la versión más fácil de cada ejercicio. ¿Viste las variantes del módulo 1? Te mando cuáles hacer esta semana." → **Ajuste concreto.** |
| **"No entendí cómo funciona"** | Falla de onboarding, es tuya. | "Eso es culpa mía, no tuya. Te hago un video de 2 minutos ahora mismo mostrándote dónde está todo." → **Resolver en el momento.** |
| **"Esperaba que fuera personalizado"** | Falla de expectativa en la venta. **Revisar el copy.** | "Tenés razón en que el plan es el mismo para todas — eso lo aclaro en la web, y si no quedó claro es un problema mío. Lo tuyo es la llamada y las correcciones. ¿Querés que hagamos la llamada ahora y vemos?" → Si igual no le sirve, **devolver sin discutir**. |
| **"Problema de plata"** | No es objeción de producto. | "Sin problema, te lo devuelvo hoy. Cuando puedas, la puerta queda abierta y te aviso de la próxima cohorte." → **Devolver, y dejarla en la lista.** Suele volver. |
| **"No me gustó / no es lo que buscaba"** | Sin arreglo. | "Gracias por probarlo. Te lo devuelvo hoy." → **Devolver, cero fricción.** |

**Las cuatro reglas:**

1. **Un solo intento.** Se ofrece una solución. Si la persona repite el pedido, se devuelve. Nunca dos vueltas.
2. **Nunca culpa ni presión.** Ni "pero si no lo intentaste", ni "mirá todo lo que te perdés". Es la forma más rápida de convertir una devolución en un mal comentario público.
3. **Menos de 24 horas.** Desde el pedido hasta la resolución.
4. **Todo se registra.** Cada devolución va a Sheets con su motivo. **Tres devoluciones por el mismo motivo son un problema del producto o del copy, no de las clientas.** Ese registro es el mejor feedback que vas a tener del reto.

### 4.5 · Cómo la garantía protege la métrica principal

Elegiste la tasa de finalización como métrica. La garantía juega a favor por una razón poco evidente: **la ventana de 10 días cubre justo el período donde más gente abandona.**

Eso convierte el pedido de devolución en un **sistema de alerta temprana**: te avisa quién está por abandonar, a tiempo para intervenir. Una alumna que pide la devolución el día 5 y se queda tras una llamada de 10 minutos es una que iba a abandonar en silencio el día 9.

Por eso el flujo A6 (detección de abandono) debe correr **con más frecuencia durante los primeros 10 días** — chequeo diario en vez de cada dos días. Quien no entró a Skool en 72 horas recibe contacto humano antes de que se le ocurra pedir la devolución.

---

## 5. Cambios pendientes en n8n derivados de estas decisiones

| Flujo | Cambio |
|---|---|
| **A2** | Ya no es "quiz → PDF". Pasa a ser "entrega de lead magnet desde ManyChat" |
| **A3** | Agregar el generador de ID de 4 dígitos y la notificación con formato OK/NO |
| **A3-bis** | **NUEVO** — parser de la respuesta de MP (`OK 1234` / `NO 1234`), idempotente |
| **A4** | Agregar el arranque del reloj de garantía |
| **A6** | Chequeo diario durante los primeros 10 días, cada 2 días después |
| **A23** | **NUEVO** — circuito de devolución completo |
| **A24** | **NUEVO** — lista de espera entre cohortes |
