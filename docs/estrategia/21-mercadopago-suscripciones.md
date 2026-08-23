# MercadoPago como pasarela única — suscripciones y pago único

> **Este documento manda sobre el circuito de cobro de
> [`07-circuito-compra-y-garantia.md`](07-circuito-compra-y-garantia.md).**
> Todo lo que ahí dice sobre transferencia, comprobante por WhatsApp y `OK 1234`
> dejó de valer el 2026-08-18.
>
> Sobre producto, precios y renovación sigue mandando
> [`20-reto-siempre-abierto.md`](20-reto-siempre-abierto.md).

---

## 1. La decisión

**MercadoPago es la única forma de pagar.** Se elimina el cobro por transferencia a un
alias. Y **WhatsApp deja de estar automatizado**: queda como canal de comunidad, operado
a mano por Pía.

Las dos decisiones son la misma decisión mirada de dos lados. El circuito de transferencia
existía porque los bancos argentinos no exponen API para cuentas personales, así que hacía
falta un humano que mirara el home banking. Todo el aparato de WhatsApp —el router, el
código de 4 dígitos, el `OK 1234`— era la infraestructura que ese humano necesitaba para
confirmar sin equivocarse. Sacado el problema, sobra la infraestructura.

### Por qué el alias de MercadoPago tampoco servía

Vale dejarlo escrito porque es la pregunta que va a volver.

MercadoPago manda webhooks para **pagos**, no para **movimientos de cuenta**. Un pago es
algo que generaste vos: una preferencia, un link, un QR, una suscripción. Tiene un `id`, un
`external_reference` tuyo, y avisa. Una transferencia que alguien manda a tu CBU o alias es
plata que aterriza en el saldo: no la generaste vos, no está atada a tu aplicación, **y no
hay webhook**.

Pero el problema de fondo no es detectar la plata: es **saber de quién es**. Una
transferencia deja monto, fecha y un nombre. Con todas pagando el mismo importe, dos
clientas que transfieren el mismo martes son indistinguibles — y muchas veces el titular
de la cuenta no es la clienta, sino el marido, la madre o una amiga.

**El corte no es banco contra MercadoPago. Es transferencia anónima contra cobro
identificado.** Se puede pagar por transferencia y estar identificado, siempre que el pago
nazca de un link nuestro con `external_reference`.

---

## 2. Suscripción, no pago único

Para el nivel mensual de $55.000 se usa la API de **Suscripciones** (`preapproval`):
débito automático mensual. El pack de 3 niveles a $130.000 sigue siendo un **pago único**
(`preference`), porque no es recurrente.

Así que el build incluye las dos APIs. Eso tiene una ventaja lateral: si la suscripción
falla en producción, el pago único queda como salida sin construir nada nuevo.

### Sin plan asociado — y por qué importa

MercadoPago ofrece dos caminos: `preapproval_plan` (un plan con el precio adentro, al que
se suscriben las clientas) o `preapproval` **sin plan asociado** (cada suscripción lleva su
propio monto).

**Vamos sin plan asociado, por el precio fundador.** Con un plan, el monto vive en el plan,
y subirlo el 1 de octubre obligaría a migrar a todas las suscriptoras existentes. Sin plan,
**quien entró a $55.000 se queda en $55.000 sin que hagamos nada**.

Eso convierte la promesa del precio fundador en algo literalmente cierto, y "el precio que
pagás hoy es el que vas a pagar siempre" vende bastante mejor que "aprovechá antes que
suba".

### `pending`, no `authorized`

Dentro de "sin plan asociado" hay todavía dos sabores, y la diferencia no es de detalle.

| `status` | Quién muestra el formulario de tarjeta | Qué necesita |
|---|---|---|
| **`pending`** | MercadoPago, en su dominio | nada nuestro |
| `authorized` | **nosotros, en nuestro sitio** | un `card_token_id` que tokenizamos nosotros |

**Vamos con `pending`.** MP devuelve un `init_point` y la clienta pone la tarjeta del lado
de ellos. Con `authorized` el formulario sería nuestro, lo que nos mete adentro del alcance
PCI y rompe la regla de no tocar datos de tarjeta nunca. Está escrito en el código, en
`createSubscription()`, para que nadie lo "optimice" más adelante.

**Al suscribirse, MercadoPago hace un cobro mínimo para validar la tarjeta y después lo
devuelve.** Genera consultas: la clienta ve un cargo raro de unos pesos. Está contestado en
las FAQ, y Pía tiene que saberlo para no asustarse cuando lo vea en su cuenta.

### Medios de pago

La API acepta **dinero en cuenta de MercadoPago, tarjeta de crédito y tarjeta de débito**.
La objeción de que la suscripción excluye a quien no tiene tarjeta de crédito es menor de
lo que parecía: con débito o con saldo de MP alcanza.

> **A verificar en sandbox:** qué medios habilita realmente el `preapproval` en Argentina.
> La documentación general lista también efectivo (Rapipago, Pago Fácil), que por
> definición no puede sostener un débito recurrente. Hay que confirmarlo con una
> suscripción de prueba antes de prometer nada en la web.

---

## 3. Las piezas a construir

| # | Pieza | Qué hace |
|---|---|---|
| 1 | `POST /api/checkout/suscripcion` | Crea el `preapproval` con `external_reference` y devuelve el `init_point` |
| 2 | `POST /api/checkout/pack` | La preferencia de pago único de los $130.000 |
| 3 | `POST /api/webhooks/mercadopago` | Recibe los eventos. **Valida la firma antes de tocar nada** |
| 4 | `/bienvenida` | Retorno de MP con el acceso a la vista |
| 5 | `/cancelar` | Botón de arrepentimiento y baja de la suscripción |

### Los topics del webhook

| Topic | Cuándo llega | Qué hacemos |
|---|---|---|
| `subscription_preapproval` | Alta y cambios de estado de la suscripción | Alta: dispara el onboarding. Cancelación: corta el acceso |
| `subscription_authorized_payment` | Cada cobro mensual | Aprobado: suma una renovación. Rechazado: ver §5 |
| `payment` | El pack de 3 niveles | Aprobado: dispara el onboarding con ventana de 6 meses |

### La validación de firma

Es obligatoria por las reglas del proyecto y no es opcional en la práctica: sin ella,
cualquiera que adivine la URL puede darse de alta gratis.

MercadoPago manda el header `x-signature` con el formato `ts=...,v1=...`. Se arma el
manifiesto `id:{data.id};request-id:{x-request-id};ts:{ts};`, se le calcula HMAC-SHA256 con
el secret de "Tus integraciones", y se compara contra `v1` **con comparación en tiempo
constante**. Si no coincide: `401` y no se escribe absolutamente nada.

---

## 4. El modo de falla que hay que prevenir

Con WhatsApp fuera, el onboarding queda en **email más Skool**. Eso es más frágil que
antes: si el mail cae en spam, una clienta pagó y no entró, y no nos enteramos hasta que
reclama. Es el peor caso posible, porque combina plata cobrada con silencio.

**La mitigación es la página de retorno.** MercadoPago devuelve a la clienta al sitio
después de pagar, así que `/bienvenida` tiene que mostrar el acceso ahí mismo —link a
Skool, link al grupo de WhatsApp, primeros pasos— y no limitarse a decir "revisá tu
correo". El email pasa a ser el respaldo, no el canal principal.

Media hora de trabajo contra el modo de falla más caro del sistema.

---

## 5. Qué le pasa a la renovación

**A27 se encoge a la mitad.** Ya no avisa el día 25 y el 28 pidiendo que renueven:
MercadoPago cobra solo y reintenta si la tarjeta falla.

### Cómo reintenta MercadoPago, exactamente

Importa porque define cuándo se le escribe a la clienta, y el primer diseño de A27 lo tenía
mal.

- La primera cuota **se acredita hasta 1 hora después** de suscribirse. No la esperamos: el
  onboarding se dispara cuando la suscripción queda `authorized`, no cuando entra la plata.
  Si esperáramos, la clienta miraría una pantalla en blanco durante una hora.
- Un cobro rechazado pasa a `recycling` y se reintenta **hasta 4 veces dentro de una ventana
  de 10 días**. Agotados los reintentos, la cuota queda `processed` contra un pago rechazado.
- **A las 3 cuotas con pagos rechazados, MercadoPago da de baja la suscripción solo** y le
  avisa a la cuenta vendedora por email.

Esa baja automática llega como `subscription_preapproval` con status `cancelled`, el webhook
la escribe como `cancelado` en `ventas`, y A30 la levanta el lunes siguiente en la lista de
"sacar de Skool". **El churn involuntario cierra de punta a punta sin que nadie mire nada.**

Lo que queda de A27:

- **Cobro rechazado** → escribirle a la clienta para que actualice el medio de pago.
  **A las 48 h del primer rechazo, no al instante:** al instante le estaríamos escribiendo
  por algo que los reintentos resuelven solos en dos días. Y tampoco esperar a los 10 días
  de la ventana completa, porque ahí ya la perdimos. El corte del acceso lo hace MercadoPago
  por su cuenta a la tercera cuota impaga; nosotros sólo intentamos recuperarla antes.
- **El pack de 3 niveles**, que sí vence en una fecha y necesita el circuito completo de
  aviso y corte.

La tabla de días 25 / 28 / 30 de [`20-reto-siempre-abierto.md`](20-reto-siempre-abierto.md)
§5 sigue valiendo **sólo para el pack**.

---

## 6. La obligación legal que aparece con el débito automático

Con renovación automática, **cancelar tiene que ser tan fácil como suscribirse**, y la
**Resolución 424/2020** de la Secretaría de Comercio Interior exige un **botón de
arrepentimiento visible en la home**. Con transferencia el tema era discutible; con débito
recurrente deja de serlo.

Va al build, no es opcional:

- Botón de arrepentimiento en la home, visible sin scroll infinito
- `/cancelar` — la clienta da de baja sin tener que escribirle a nadie
- Documentar además que puede cancelar desde su propia app de MercadoPago
- La baja corta el acceso al final del período ya pagado, no al instante

Esto es independiente del derecho de revocación de 10 días del art. 34, que sigue vigente
y vive en los Términos.

---

## 7. Lo que se demuele

Flujos construidos y verificados en la sesión 10 que quedan sin razón de ser:

| Archivo | Por qué muere |
|---|---|
| `A0-router-whatsapp.json` | Existía porque Meta permite una sola URL de callback por app |
| `A3-recepcion-comprobante.json` | No hay comprobante que recibir |
| `A3bis-confirmacion.json` | Era el `OK 1234`. El webhook lo reemplaza |

No es trabajo perdido: eran la respuesta correcta a "no hay API bancaria". La pregunta
cambió.

**A4 (onboarding) sobrevive** pero cambia el disparador —ahora es el webhook— y pierde el
brazo de WhatsApp.

**A99 (centinela) sobrevive** pero cambia de canal: avisaba por WhatsApp, ahora avisa por
email. Lo mismo A6 cuando detecte una alumna en riesgo.

**Y se cae toda la infraestructura de Meta:** ni app de WhatsApp Cloud API, ni token, ni
plantillas de mensaje, ni número dedicado. Con eso desaparece el trámite más lento que
teníamos por delante.

### En la web

`/comprar` es hoy una pantalla que muestra alias, CBU y titular para copiar y manda a
WhatsApp con el comprobante. Se reescribe entera. Lo mismo la sección `HowItWorks` y la
cláusula de pago de los Términos.

`src/lib/mercadopago.ts` deja de ser una lib desactivada y pasa a ser el centro del sistema.

---

## 8. Cambia el modelo de datos

`acceso_vence` deja de ser una fecha que calculamos nosotros. **El acceso vale mientras la
suscripción esté `authorized`** — es MercadoPago quien lleva la cuenta.

En la pestaña `ventas`:

| Columna | Cambio |
|---|---|
| `codigo` | **Sale.** Era el identificador del `OK 1234` |
| `comprobante_url` | **Sale.** No hay comprobante |
| `metodo_pago` | Pasa a `mercadopago` |
| `suscripcion_id` | **Entra.** El `preapproval_id` |
| `estado_suscripcion` | **Entra.** `authorized` · `paused` · `cancelled` |
| `proximo_cobro` | **Entra.** Lo informa MercadoPago |
| `acceso_vence` | Se queda, pero **sólo aplica al pack** |

---

## 9. Los costos, y el número que más los mueve

Las comisiones de MercadoPago se publican **sin IVA**, y el 21% se paga igual.

| Medio / acreditación | Publicado | Real |
|---|---|---|
| Crédito, acreditación inmediata | 6,29% + IVA | ~7,6% |
| Débito, inmediato | 3,25% + IVA | ~3,9% |
| Crédito, acreditación a 35 días | 1,79% + IVA | ~2,2% |

Sobre $55.000 con crédito inmediato son unos $4.180 de comisión.

Encima van las **retenciones**, que no son de MercadoPago sino del fisco y dependen de la
condición fiscal. Acá está casi toda la variabilidad: bien declarada, alrededor del 3%; mal
declarada o sin declarar, **20% o más**.

> **Presupuestá 10-12% all-in.** Y entrá al panel de MercadoPago a confirmar que la
> condición fiscal de Pía esté correctamente declarada: es un campo, y son varios puntos de
> margen. Ojo con IIBB — el monotributo es nacional y Santa Fe cobra Ingresos Brutos aparte.

**Dos costos que se olvidan:** las cuotas sin interés las paga el vendedor (en 3 cuotas,
otro 10-15% — arrancar con cuotas con interés), y los contracargos, que en producto digital
con entrega inmediata son la categoría más difícil de defender.

### Y una conversación que hay que tener con Pía

MercadoPago informa todo a ARCA automáticamente. No es un problema —es lo correcto— pero si
Pía está en monotributo, conviene mirar el tope de la categoría **antes** de que 30 clientas
mensuales la empujen fuera del régimen sin que se dé cuenta a mitad de año.

---

## 10. Instagram y ManyChat

ManyChat se queda, con alcance acotado: **respuestas automáticas en Instagram para entregar
lead magnets y para derivar al link de pago**. El resto de las conversaciones las responde
Pía a mano.

Es la decisión correcta para el lanzamiento. Automatizar la conversación de venta antes de
haber tenido cien conversaciones de venta es escribir guiones sin saber qué pregunta la
gente.

---

## Ver también

- [`20-reto-siempre-abierto.md`](20-reto-siempre-abierto.md) — producto, precios y renovación
- [`07-circuito-compra-y-garantia.md`](07-circuito-compra-y-garantia.md) — el circuito viejo, superado por éste
- [`13-base-de-datos-sheet.md`](13-base-de-datos-sheet.md) — el esquema de la planilla
- [`19-flujos-n8n-construidos.md`](19-flujos-n8n-construidos.md) — qué flujos sobreviven
