# El reto siempre abierto — precios, garantía y el fin de las cohortes

> **Decidido el 2026-08-18 con Pía. Este documento manda.** Donde contradiga a
> [`07-circuito-compra-y-garantia.md`](07-circuito-compra-y-garantia.md),
> [`08-grupos-y-cadencia.md`](08-grupos-y-cadencia.md),
> [`09-semana-cero.md`](09-semana-cero.md) o
> [`10-planes-y-niveles.md`](10-planes-y-niveles.md), vale lo que dice acá.
>
> **Fecha de lanzamiento: 31 de agosto de 2026.**

---

## 1. Las cuatro decisiones

| | Antes | Ahora |
|---|---|---|
| Un nivel (28 días) | $40.000 | **$55.000**, con renovación mensual |
| Los 3 niveles | $99.000 | **$130.000** (21% menos que comprarlos sueltos) |
| Garantía | 10 días, en la portada | **Fuera del marketing.** El derecho legal sigue en los T&C |
| Inicio | Por grupos, cada 14 días | **El día que compra** |
| Llamada 1:1 de bienvenida | Incluida | **No existe** |
| Sesión grupal de los viernes | Incluida | **No existe** |
| Semana 0 | 7 a 13 días de preparación | **No existe** |

El reto pasa a ser un producto digital grabado. Pía graba los videos que explican
el método, cómo se lee una rutina y cómo se usa la comunidad. Las consultas y la
corrección de técnica se responden de forma asincrónica por Skool y por WhatsApp.

---

## 2. Por qué se caen las cohortes

Un grupo servía porque las clientas compartían tres cosas: la fecha de inicio, la
llamada de bienvenida y la sesión de los viernes. Sacadas las dos últimas, sólo
queda la fecha — y esa fecha **cuesta hasta 13 días de espera** entre que alguien
decide comprar y puede empezar.

Ese hueco era el tramo más caro del embudo: la motivación con la que compró se
enfría, aparece el arrepentimiento, y la Semana 0 existía enteramente para tapar
un problema que nosotros mismos habíamos creado. Sin cohortes, el problema no se
tapa: desaparece.

**Lo que se pierde y hay que reponer a mano:** el efecto de ver que las demás van
por el día 12 igual que vos. Se repone desde la comunidad, no desde el calendario
— hilos por semana del reto, y que Pía celebre públicamente cada día 28.

---

## 3. Por qué la garantía sale del marketing pero no del sitio

El **art. 34 de la Ley 24.240** da 10 días corridos de revocación en toda compra
a distancia, y **es irrenunciable**. No depende del precio ni de que nosotros la
ofrezcamos: existe igual. Cualquier cliente que la pida dentro del plazo tiene
derecho a que se le devuelva el 100%.

Lo que sí es una decisión nuestra es si la usamos como argumento de venta. Hasta
hoy la web la promocionaba: badge en la portada, sección propia, página
`/garantia`. A este ticket eso no compra confianza, invita a probar.

**Qué se hizo:**

- Se borraron la página `/garantia`, la sección de la home, el badge del bloque
  de precio y todas las menciones en el copy de venta.
- El derecho de revocación **queda escrito en los Términos y Condiciones**
  (sección 5), que es donde corresponde.
- Se eliminó la "garantía comercial de satisfacción" que duplicaba el plazo
  legal, porque ya no la ofrecemos.

**Lo que no cambia:** si una clienta escribe en los primeros 10 días pidiendo la
devolución, se le devuelve. Sin excepciones y sin discutir.

> Si en algún momento aparece un producto de ticket medio o alto, la garantía
> vuelve a tener sentido como argumento y se puede reponer. Está probado que
> funciona a partir de cierto precio, donde el freno de la compra es el riesgo
> percibido y no el monto.

---

## 4. Qué reemplaza a la escasez

Sin cupos ni fecha de cierre, no hay razón para comprar hoy en vez de en tres
semanas. La reemplaza el **precio fundador**: $55.000 rige hasta el **30 de
septiembre** y después sube.

Es verdadero, es verificable y no depende de inventar un cupo. Tiene una sola
condición, y no es negociable: **el 1 de octubre el precio tiene que subir de
verdad.** Un precio promocional que no vence nunca es publicidad engañosa
(art. 8, Ley 24.240) y además quema la próxima fecha que anunciemos.

> **B19 — propuesto el 2026-08-18, pendiente de que Pía lo apruebe:**
> **$69.000 el nivel y $165.000 el pack.** Es +25% sobre el precio fundador —el
> rango donde una suba se lee como "me perdí la promo" y no como un abuso— queda
> debajo de la barrera de los $70.000, y mantiene el descuento del pack en 20%
> exacto, así que el copy de la web no cambia. Subir a $75.000 sería agresivo
> para una primera suba sin testimonios todavía.
>
> No hace falta publicarlo, pero tiene que estar decidido antes de que la web
> anuncie la fecha.

---

## 5. Renovación mensual

El plan de un nivel da **28 días de acceso**. No hay débito automático — el cobro
es por transferencia — así que la renovación la sostiene la automatización:

| Día | Qué pasa |
|---|---|
| 25 | Primer aviso: se te vence el acceso en 3 días |
| 28 | Vence. Segundo aviso |
| 30 | Si no pagó, se da de baja de Skool y del grupo de WhatsApp |

El pack de 3 niveles no renueva: se paga una vez y da la ventana de 6 meses.

Esto está escrito en los T&C (sección 3) porque es una condición del servicio, y
vive en `RENEWAL` dentro de `src/lib/products.ts`.

---

## 6. La línea entre el Reto y la Asesoría 1:1

Al sacar las llamadas del reto, el riesgo es que la asesoría de $280.000 se quede
sin nada que la justifique. La línea que las separa:

| | Reto ($55.000) | Asesoría 1:1 ($280.000/mes) |
|---|---|---|
| Plan | El mismo para todas | Armado para tu caso |
| Consultas | Comunidad de Skool | WhatsApp directo con Pía |
| Corrección de técnica | Subís el video a Skool | Se la mandás a Pía |
| Llamadas | Ninguna | Una a los 20 días |

**La regla operativa:** en el reto, la consulta va a Skool. Es asincrónica, queda
publicada y sirve para las demás. Si las consultas del reto empiezan a llegar al
WhatsApp personal de Pía, la asesoría deja de valer lo que sale y el producto
"fácil de operar" le come el día igual.

La asesoría también pasa a ser **mensual**, igual que el reto.

---

## 7. Qué se rompió en el código y ya está arreglado

| Archivo | Qué cambió |
|---|---|
| `src/lib/products.ts` | Precios; `GROUP`/`GUARANTEE` fuera; entran `FOUNDING`, `RENEWAL`, `WITHDRAWAL_RIGHT`, `ENROLLMENT_OPEN` |
| `src/app/garantia/page.tsx` | Borrada |
| `src/components/sections/Guarantee.tsx` | Borrado |
| `src/app/terminos-condiciones` | Sección 3 reescrita (renovación), sección 4 (modalidad), sección 6 eliminada |
| `src/app/politica-privacidad` | Ya no dice que recolectamos datos "en la llamada de bienvenida" |
| `src/content/offer.ts` | Qué recibís, cómo funciona y FAQ reescritos |
| `docs/setup/sheets/ventas.csv` | `grupo`, `fecha_llamada`, `garantia_vence` → `acceso_vence`, `renovaciones` |
| `docs/setup/sheets/comunidad.csv` | `grupo` → `fecha_inicio` |
| `docs/setup/n8n/*.json` | A3, A3-bis y A4 actualizados. Ver §8 |

Sobre `comunidad.fecha_inicio`: sin cohortes ya no hay una fecha de arranque
compartida, así que el día del reto en que va cada alumna sólo se puede calcular
contra el día en que entró ella. Sin esa columna, A6 no puede detectar abandono.

---

## 8. Las automatizaciones antes del 31/08

Lo que pidió Juan Cruz, más lo que falta y por qué.

| # | Flujo | Estado | Por qué |
|---|---|---|---|
| **1** | Comprobante → código → `OK` de Pía → onboarding | **Construido**, actualizado a los precios nuevos | Es la venta |
| **2** | CRM de leads y clientas: seguimientos, recordatorios, consultas | Falta | Es lo que hace que Pía pueda operarlo sin nosotros |
| **3** | Lead magnets por pieza de contenido | Falta | Alimenta el CRM |
| **4** | Fulfillment · testimonios · upsell | **Después del lanzamiento** | Son tres cosas distintas y ninguna existe sin clientas |

### Las tres que faltaban en la lista

**Renovación (A27).** Sin esto el modelo mensual es una venta única disfrazada:
nadie avisa, nadie cobra de nuevo y nadie corta el acceso. Es la automatización
que convierte $55.000 una vez en $55.000 por mes. Va antes del 31/08 aunque no
se dispare hasta el día 25 de la primera clienta.

**Retención (A6).** Producto grabado, sin llamadas y sin grupo: si una clienta
desaparece el día 9, nadie se entera. Y sin finalización no hay renovación, ni
testimonio, ni upsell — o sea, se caen 1 y 4. Necesita `fecha_inicio` en
`comunidad`, que ya está.

**Triage de WhatsApp (A28).** Sin llamadas, todo desemboca en el teléfono de
Pía. Clasificar antes de que llegue —consulta técnica, administrativa, venta— es
lo que hace que el producto "fácil de operar" lo sea de verdad.

### Por qué testimonios y upsell van después

No se pueden construir antes del lanzamiento porque **no hay clientas todavía**.
El primer testimonio existe el día 28 de la primera compra, o sea a fines de
septiembre. Construir el flujo en agosto es trabajar sobre datos imaginarios.

---

## 9. Dónde vive cada conversación

Decidido el 2026-08-18, después de sacar las llamadas. Sin llamadas, **todo lo
que antes se resolvía hablando ahora cae en algún canal escrito**, y si no se
define cuál, cae en el celular de Pía.

### Las correcciones de técnica van a Skool, no al grupo de WhatsApp

Se evaluó hacerlas en el grupo de WhatsApp. No conviene, por dos razones:

**Una corrección en WhatsApp se pierde en un día.** Se hunde en el scroll y la
próxima clienta con la misma duda vuelve a preguntar. En Skool queda buscable, y
a los tres meses hay una biblioteca de correcciones que se armó sola.

**Y la que más pesa:** mandar un video del propio cuerpo entrenando a un grupo de
WhatsApp con cuarenta desconocidas es mucho más expuesto que publicarlo en la
comunidad. **Las que no se animan no mandan nada** — y son justo las que más
necesitan la corrección. Es un problema de retención disfrazado de problema de
canal.

**Cómo funciona:** la clienta sube su video cuando quiere, y Pía responde **una
vez por semana, en día fijo**. Es un lote, no una reunión: no hay horario que
coordinar y no es una sesión en vivo. Es grupal en el sentido de que las
respuestas quedan a la vista de todas, no en el de que haya que juntarse.

### Los grupos se separan por nivel, no por plan

Cuando el volumen obligue a dividir, la línea va por **nivel 1 / nivel 2 /
nivel 3**, no por quién compró mensual y quién compró el pack de 3.

Separar a las trimestrales crea dos categorías de clienta, donde la que pagó
menos ve una sala en la que no está. Separar por nivel es útil de verdad: a
alguien del nivel 2 no le sirven las dudas del nivel 1. Y una clienta que renueva
mes a mes hasta llegar al nivel 2 termina en la misma sala que una trimestral,
que es lo que corresponde.

**Cuándo dividir:** el disparador es **cuánto tarda Pía en responder**, no un
número de cabezas. Dividir temprano fragmenta la comunidad justo cuando está más
chica, y lo que la hace sentir viva es la densidad. Estimado: no partir antes de
las 40-50.

### El triage: Skool para clientas, WhatsApp para las que todavía no lo son

| Canal | Quién | Qué |
|---|---|---|
| **Skool** | Clientas | Dudas técnicas, correcciones y consultas administrativas |
| **WhatsApp** | Todavía no compraron | Ventas y envío de comprobantes |

> **Ojo con un detalle que rompe el plan si no se ve a tiempo:** para escribir por
> Skool hay que ser miembro, y **una persona que todavía no compró no lo es**. Las
> consultas de venta van a seguir cayendo en WhatsApp inevitablemente. Lejos de ser
> un problema, esto simplifica el triage: WhatsApp queda como el canal de la venta
> y Skool como el de la post-venta, que es una línea que se explica sola.

Esto reduce mucho el alcance de A28: ya no tiene que clasificar entre tres
intenciones, sino distinguir entre *comprobante de pago* y *todo lo demás*.

---

## Ver también

- [`19-flujos-n8n-construidos.md`](19-flujos-n8n-construidos.md) — cómo importar y configurar lo que ya está
- [`13-base-de-datos-sheet.md`](13-base-de-datos-sheet.md) — el esquema de la planilla
- [`11-metodo-4f.md`](11-metodo-4f.md) — el método, que no cambió
