# n8n — Infraestructura y puesta en marcha

> **Para quién es este documento:** para vos con las manos, y para que María Pía y Daiana
> entiendan qué es esta herramienta que va a manejar medio negocio.

---

## 1. Qué es n8n, explicado sin tecnicismos

n8n es **el empleado que hace las tareas repetitivas**. No piensa, no decide, no improvisa:
hace exactamente lo que se le dijo, siempre igual, a cualquier hora, gratis.

Se programa dibujando. Cada tarea es una cadena de cajitas conectadas:

```
[Llegó un mensaje de WhatsApp]
        ↓
[¿Tiene una imagen adjunta?]  ── no ──→ [No hacer nada]
        ↓ sí
[Generar un código de 4 dígitos]
        ↓
[Escribir la fila en la pestaña "ventas"]
        ↓
[Responderle a la clienta: "Recibido, tu código es 1234"]
        ↓
[Avisarle a María Pía]
```

Cada cajita es un paso. Si algo falla, n8n te muestra **en qué cajita se rompió y con qué
datos**. Eso es lo que lo hace mantenible: no hay que adivinar.

**El principio del proyecto:** n8n es el único cerebro. Ninguna herramienta le habla
directamente a otra. Instagram no le habla a Skool, WhatsApp no le habla a la planilla —
todo pasa por n8n, para que cuando algo se rompa **haya un solo lugar donde mirar**.

---

## 2. Dónde lo hospedamos

| | **n8n Cloud** (elegido) | Servidor propio |
|---|---|---|
| Costo | ~USD 24/mes | ~USD 6/mes |
| Mantenimiento | Ninguno | Actualizaciones, backups, certificados, caídas |
| URL pública para webhooks | Viene incluida | Hay que configurarla |
| Si se cae a las 3 AM | Lo arreglan ellos | Lo arreglás vos |

**Arrancamos en Cloud.** Los 18 dólares de diferencia no compensan ser el sysadmin de un
servidor durante el lanzamiento. Cuando el volumen lo justifique se migra, y migrar es
exportar los flujos en un archivo e importarlos del otro lado — un rato, no un proyecto.

---

## 3. Qué tenés que hacer vos

Calculá **20 minutos**.

1. Entrá a **n8n.io** → **Get started** → prueba gratuita.
   → Usá la **cuenta del proyecto**, no la personal.
2. Elegí la región **Europa** si te la ofrece (la latencia contra Meta y Google es
   irrelevante para nuestro volumen; lo que importa es que sea estable).
3. Anotá la **URL de tu instancia**. Va a ser algo como `https://mpcep.app.n8n.cloud`.
   De ahí salen las direcciones de webhook que necesita Meta.
4. **Configuración → Usuarios → Invitar** → invitame con mi email, rol **Admin**.

Con eso ya puedo empezar a construir.

---

## 4. Las credenciales — cómo las cargás sin pasármelas

Esta es la parte importante. n8n guarda las llaves **encriptadas** y, una vez guardadas,
**ni siquiera yo las puedo volver a leer** desde la interfaz. Puedo usarlas en un flujo, pero
no verlas. Por eso las cargás vos y nunca pasan por un chat.

En n8n: panel izquierdo → **Credentials** → **Add credential**.

| Credencial | Tipo a elegir en n8n | Qué pegás |
|---|---|---|
| ~~WhatsApp~~ | — | **Ya no hace falta (sesión 12).** WhatsApp no está automatizado |
| **Google Sheets** | `Google Service Account` | El `client_email` y la `private_key` del archivo JSON |
| **Brevo** | `Brevo API` | La API key de Brevo |
| **ManyChat** | `HTTP Header Auth` | La API key de ManyChat |
| **Skool** | pendiente | Skool no tiene API oficial. Ver §6 |

> Para Google Sheets, n8n te pide dos campos por separado. Abrí el archivo JSON con un editor
> de texto y copiá `client_email` y `private_key` **enteros, incluidas las líneas que dicen
> `BEGIN PRIVATE KEY` y `END PRIVATE KEY`**. Es el error más común.

---

## 5. Orden de construcción — lo que hago yo

> **Actualización del 2026-08-18 (sesión 12):** al pasar a **MercadoPago como pasarela
> única** y sacar la automatización de WhatsApp, **murieron A0, A3 y A3-bis** —que ya estaban
> construidos— y se canceló **A28**. La confirmación de pago dejó de ser un flujo de n8n y
> pasó a ser el webhook de MercadoPago, que vive en la web. Ver
> [`21-mercadopago-suscripciones.md`](21-mercadopago-suscripciones.md).
>
> **Actualización del 2026-08-18 (sesión 11):** se cayeron A5, A25, A26 y A24 — dependían de
> las cohortes y de la Semana 0, que dejaron de existir. Entraron **A27** (renovación
> mensual) y **A28** (triage de WhatsApp). Ver
> [`20-reto-siempre-abierto.md`](20-reto-siempre-abierto.md).
>
> **Actualización del 2026-08-17:** A0, A3, A3-bis, A4 y A99 ya están construidos y
> verificados. Los archivos están en [`../setup/n8n/`](../setup/n8n/) y el detalle de cada uno
> en [`19-flujos-n8n-construidos.md`](19-flujos-n8n-construidos.md).
>
> **Apareció un flujo que no estaba en este plan: A0 · Router.** Meta permite una sola URL de
> callback por aplicación, así que A3 y A3-bis **no pueden** tener cada uno su disparador de
> WhatsApp: sólo uno de los dos recibiría los mensajes, y el otro quedaría mudo sin dar error.
> A0 es el único que escucha a Meta y reparte hacia adentro.

Van en este orden porque cada uno usa lo que armó el anterior.

| # | Flujo | Qué hace | Depende de |
|---|---|---|---|
| **A4** | Onboarding | Acceso a Skool + email + fila en `comunidad` | El webhook de MercadoPago |
| **A27** | Renovación | Rechazo definitivo del débito → corta acceso. Y el circuito completo **para el pack** | A4 |
| **A6** | Detección de abandono | Recalcula `estado_riesgo` todos los días y avisa por email | A4 |
| **A23** | Circuito de devolución | Registra el pedido del art. 34, da de baja la suscripción, corta accesos | A4 |
| **A1** | Captura de lead desde Instagram | ManyChat → fila en `leads` → secuencia | ManyChat |


**El corazón ya no es un flujo de n8n: es el webhook de MercadoPago**, que vive en la web
(`/api/webhooks/mercadopago`) y no en n8n. n8n pasa a encargarse de lo que viene después del
cobro. Si sólo llegáramos a tener el webhook y A4 antes del lanzamiento, el negocio
funcionaría.

### La regla que va en todos los flujos

**Idempotencia.** Palabra fea, idea simple: **correr algo dos veces no puede duplicar el
resultado**. Si María Pía manda `OK 1234` dos veces porque no vio que ya había andado, no se
pueden crear dos accesos, ni mandar dos mails de bienvenida, ni cobrar dos veces.

En la práctica: antes de escribir, cada flujo revisa si esa fila ya existe y en qué estado
está. Es aburrido de programar y es lo que separa una automatización que se puede dejar sola
de una que hay que vigilar.

---

## 6. El problema de Skool

**Skool no tiene una API oficial.** No se le puede pedir "creá este acceso" por programa.
Las opciones son:

1. **Invitación por email automática.** n8n manda el link de invitación a la comunidad; la
   clienta hace un clic y entra sola. **Es la recomendada:** funciona hoy, no depende de nada
   frágil, y el clic extra no es un problema real.
2. **Automatización de navegador.** Un robot que abre Skool y hace clic como una persona. Se
   rompe cada vez que Skool cambia un botón. **No.**
3. **Zapier / Make como puente.** Tienen algo de integración con Skool. Agrega otra
   herramienta, otro costo y otro lugar donde mirar cuando falla. Sólo si la 1 no alcanza.

**Vamos con la 1.** Consecuencia práctica: en la pestaña `ventas`, la columna `acceso_skool`
va a decir `invitada`, no `sí`. Si alguien no acepta la invitación en 48 horas, hay que
volver a escribirle — eso lo hace A6, que es el flujo que vigila a quien no aparece.

---

## 7. Cuando algo falle (porque va a fallar)

n8n guarda el registro de cada ejecución: qué entró, qué salió, dónde se rompió.
**Executions**, en el panel izquierdo.

Configuro además un **flujo centinela**: si cualquier automatización falla, llega un mensaje
al WhatsApp del equipo con el nombre del flujo y el error. Nadie tiene que acordarse de mirar.

**Lo que nunca automatizamos:** si el circuito de cobro se cae, el sistema **no** improvisa.
Le avisa a un humano y se queda quieto. Una automatización que adivina con la plata de la
gente es peor que una que se detiene.

---

## 8. Costo mensual del stack

| Herramienta | Costo |
|---|---|
| n8n Cloud | ~USD 24 |
| Skool | ~USD 99 |
| ManyChat Pro | ~USD 15 |
| Brevo | Gratis hasta 300 emails/día |
| Google Sheets | Gratis |
| Vercel (la web) | Gratis en el plan hobby |
| **Total** | **~USD 115-140/mes** |

Bajó respecto de la versión anterior: **se cayó WhatsApp Cloud API** al dejar de automatizar
WhatsApp (sesión 12).

Con el reto a $55.000, el punto de equilibrio del stack está en **5-6 ventas al mes**. A eso
hay que sumarle la comisión de MercadoPago, que no es costo fijo sino variable: **~7,6% real
con tarjeta de crédito, y conviene presupuestar 10-12% all-in** contando retenciones. Ver
[`21-mercadopago-suscripciones.md`](21-mercadopago-suscripciones.md) §9.

---

## Ver también

- [`04-automatizaciones-n8n.md`](04-automatizaciones-n8n.md) — el catálogo completo de los 26 flujos
- [`12-whatsapp-cloud-api.md`](12-whatsapp-cloud-api.md) — la credencial de WhatsApp
- [`13-base-de-datos-sheet.md`](13-base-de-datos-sheet.md) — la credencial de Google
