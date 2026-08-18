# WhatsApp Cloud API — Guía de puesta en marcha

> **Para quién es este documento:** para vos, Juan Cruz, con las manos en el teclado.
> Escrito sin dar por sabido nada. Si algo no se entiende, es culpa del documento.
> **Decidido el 2026-08-17:** proveedor Meta Cloud API (oficial), línea nueva dedicada.

> ## ⚠️ SUPERADO — 2026-08-18 (sesión 12). NO EJECUTAR NADA DE ACÁ
>
> **WhatsApp dejó de estar automatizado.** Queda como canal de comunidad, operado a mano por
> Pía. No hace falta WhatsApp Cloud API: ni app de Meta, ni token, ni plantillas de mensaje,
> ni número dedicado, ni verificación del negocio.
>
> Este documento existía porque el comprobante de transferencia llegaba por WhatsApp y había
> que confirmarlo. Con **MercadoPago como pasarela única**, el webhook confirma solo y todo
> este aparato sobra. Ver
> [`21-mercadopago-suscripciones.md`](21-mercadopago-suscripciones.md) §7.
>
> Se conserva por si alguna vez se retoma la automatización de WhatsApp. **Hoy: no ejecutar.**

---

## 1. Qué estamos armando y por qué

WhatsApp es el centro del negocio. Ahí llega el comprobante de transferencia, ahí se
confirma la compra, y ahí arranca el onboarding. Hoy todo eso lo haría María Pía a mano.
Queremos que **la velocidad sea automática y la relación siga siendo humana**.

Concretamente, esto es lo que va a pasar solo:

```
Clienta manda el comprobante  →  llega a Meta
                              →  Meta se lo pasa a n8n
                              →  n8n responde en 5 segundos:
                                 "Recibido. Tu código es 1234, en menos de 2 horas te confirmo."
                              →  n8n avisa a María Pía: "Comprobante de Ana, $40.000, código 1234"
                              →  María Pía mira el banco y escribe: OK 1234
                              →  n8n crea el acceso a Skool, manda el mail,
                                 la suma al grupo y arranca el reloj de la garantía
```

Lo único que hace un humano es mirar el banco y escribir cuatro caracteres.

---

## 2. Las dos maneras de conectarse a WhatsApp, y por qué elegimos ésta

| | **Meta Cloud API** (elegida) | Evolution / API no oficial |
|---|---|---|
| Quién la opera | Meta, oficialmente | Un servidor propio que simula un celular |
| Riesgo de baneo | Ninguno | Real. Si Meta lo detecta, el número muere |
| Costo | Por mensaje, centavos | Sólo el servidor |
| Tiempo de armado | 1-2 horas | 1 tarde |
| Aguanta crecer | Sí | No |

Elegimos Cloud API porque el número de WhatsApp **es el activo más valioso del negocio**.
Si se cae, no hay ventas, no hay onboarding y no hay comunidad. Ahorrar veinte dólares al
mes no justifica poner eso en manos de una herramienta que Meta puede cortar cualquier día.

---

## 3. La decisión de fondo: qué número usamos

**Esto hay que entenderlo antes de tocar nada.**

Un número de teléfono está en la app de WhatsApp **o** está en la API. Nunca en las dos.
En el momento en que registrás un número en Cloud API, ese número **deja de funcionar en el
celular**. No hay chats, no hay app, no hay nada: sólo entra y sale por la API.

Si usáramos el número personal de María Pía, ella perdería WhatsApp en su teléfono. Y el
circuito de compra depende de que ella responda `OK 1234` — se rompería solo.

**Decisión tomada:** una **línea nueva y dedicada**, que es "el WhatsApp de MP CEP".

- El personal de María Pía queda intacto.
- El de negocio lo operan ella y Daiana desde una **bandeja de entrada** (una app, en el
  mismo celular, donde ven y responden los chats del número de negocio).
- En la web y en Instagram publicamos **sólo el número de negocio**.

### Qué hace falta para la línea nueva

Un chip argentino común. Prepago sirve. **No la actives en la app de WhatsApp** — si la
activás, después hay que borrar esa cuenta antes de poder registrarla en la API, y son
pasos de más. Sólo tiene que poder recibir un SMS o una llamada una vez, para verificarse.

> **Pendiente de definir (no bloquea las pruebas):** con qué bandeja opera María Pía.
> Las dos candidatas son **ManyChat** (ya está en el stack para Instagram, tiene inbox en el
> celular) y **Chatwoot** (gratis si lo hospedamos nosotros, más trabajo de mantenimiento).
> Se decide cuando el circuito ya esté probado.

---

## 4. La fase de pruebas: cómo probamos sin tener nada

Acá está la buena noticia. **No hace falta el chip, ni el número de María Pía, ni verificar
un negocio, ni poner una tarjeta.** Meta presta todo eso gratis para probar.

Cuando creás la app, Meta te da:

- **Un número de prueba propio.** No es tuyo, es de Meta. Desde ahí salen los mensajes.
- **Hasta 5 números destinatarios** que vos verificás. Acá metés **tu número español**, y si
  querés el de Daiana y el de María Pía.

Con eso probamos el circuito **completo y real**: mandás un comprobante desde tu español,
te llega el acuse automático, respondés `OK 1234`, y ves si el onboarding se dispara.
Mensajes reales de WhatsApp, en tu teléfono, gratis.

**Cuando funciona todo, pasar a producción es cambiar un solo dato en n8n** (el
identificador del número). Los flujos no se tocan. Eso es exactamente lo que queremos:
probar con lo prestado, y que el cambio al número real sea aburrido.

---

## 5. Paso a paso — lo que tenés que hacer vos

Calculá **60 a 90 minutos**. Si algo no coincide exactamente con lo que ves en pantalla, es
porque Meta cambia la interfaz seguido: el orden de los conceptos es el que vale.

### Paso 1 — Cuenta de negocio (Business Portfolio)

1. Entrá a **business.facebook.com** con una cuenta de Facebook personal.
   → Si no tenés Facebook, creá una. Es un requisito de Meta, no hay vuelta.
   → **Usá una cuenta que no vayas a perder.** Esta cuenta va a ser la dueña del WhatsApp
   del negocio. No uses una cuenta vieja que no sabés si podés recuperar.
2. Creá un **portfolio de negocio** (antes se llamaba Business Manager).
   Nombre: `MP CEP`. Email: uno del proyecto, no personal.

### Paso 2 — La app de desarrollador

1. Entrá a **developers.facebook.com** con la misma cuenta.
2. **Mis apps → Crear app**.
3. Cuando pregunte el caso de uso, elegí la opción de **Otro** y después tipo **Empresa**.
4. Vinculala al portfolio `MP CEP` que creaste recién.

### Paso 3 — Agregar WhatsApp

1. En el panel de la app: **Agregar producto → WhatsApp → Configurar**.
2. Meta crea sola una cuenta de WhatsApp Business de prueba y te muestra una pantalla con:
   - **"De"** (`From`): el número de prueba que te presta. **Anotá el número y, sobre todo,
     el `Phone number ID`** — ese identificador largo es el dato que va a n8n.
   - **"Para"** (`To`): acá agregás destinatarios.
   - Un **token de acceso temporal** (dura 24 h).

### Paso 4 — Agregar tu número español como destinatario

1. En el desplegable **"Para"**, elegí **Administrar lista de números de teléfono**.
2. Agregá tu número español en formato internacional: `+34XXXXXXXXX`.
3. Te llega un **código por WhatsApp** a tu celular. Metelo.
4. Repetí con el de Daiana y el de María Pía si querés que ellas también vean las pruebas.

**Probá ahora mismo:** en esa misma pantalla hay un botón para enviar un mensaje de prueba.
Si te llega a tu español, la mitad del trabajo está hecho.

### Paso 5 — Token que no expire

El token de la pantalla anterior **vence en 24 horas**. Sirve para el primer test, no para
que n8n funcione. Para el definitivo:

1. **business.facebook.com → Configuración del negocio → Usuarios → Usuarios del sistema**.
2. **Agregar** → nombre `n8n-mpcep` → rol **Administrador**.
3. **Agregar activos** → asigná la **app** y la **cuenta de WhatsApp**, con **control total**
   en las dos.
4. **Generar nuevo token** → elegí la app → marcá estos dos permisos:
   - `whatsapp_business_messaging`
   - `whatsapp_business_management`
5. **Copiá el token en ese momento.** No se vuelve a mostrar nunca. Si lo perdés, generás otro.

> 🔒 Ese token es la llave del WhatsApp del negocio. **No lo pegues en un chat, ni en un
> documento, ni en el código.** Va en las credenciales de n8n y en ningún otro lado.
> Si alguna vez se filtra, se revoca desde esta misma pantalla y se genera uno nuevo.

### Paso 6 — El webhook (esto lo hacemos juntos)

El webhook es la dirección a la que Meta le avisa a n8n que entró un mensaje. Sin esto,
podemos mandar mensajes pero **no recibirlos** — y todo el circuito depende de recibir.

Necesito primero la URL de n8n, así que este paso queda para cuando tengas n8n andando.
Cuando llegue el momento: **App → WhatsApp → Configuración → Webhook → Editar**, se pega la
URL, una palabra clave de verificación, y se suscribe al campo **`messages`**.

---

## 6. Qué me tenés que pasar a mí

Cuando termines los pasos 1 a 5:

| Dato | Dónde estaba | Cómo me lo pasás |
|---|---|---|
| `Phone number ID` (número de prueba) | Pantalla de WhatsApp → Configuración de la API | Se puede pegar en el chat, no es secreto |
| `WhatsApp Business Account ID` | Misma pantalla | Se puede pegar en el chat |
| **Token del usuario del sistema** | Paso 5 | **Nunca en el chat.** Lo cargás vos directo en las credenciales de n8n |
| Números destinatarios verificados | Los que agregaste | Se puede pegar en el chat |

---

## 7. Las plantillas: la parte que sorprende a todo el mundo

Esto confunde siempre, así que va explicado con calma.

WhatsApp distingue **quién habló primero**:

**Si la clienta escribe primero**, se abre una **ventana de 24 horas** en la que le podés
contestar lo que quieras, con el texto que quieras, sin pedirle permiso a nadie.
→ El acuse del comprobante, la confirmación de pago y todo el ida y vuelta del onboarding
caen acá. **No necesitan plantilla.**

**Si arrancamos nosotros**, fuera de esa ventana, sólo se puede mandar una **plantilla
aprobada por Meta**: un texto fijo, cargado de antemano, con huecos para el nombre y poco más.
→ El aviso de 48 horas antes del día 1, los recordatorios y la reactivación de quien abandonó
caen acá. **Sí necesitan plantilla.**

Las plantillas se cargan en el **WhatsApp Manager** y se aprueban en minutos u horas.
Se rechazan por prometer resultados, sonar a spam o hablar de plata sin contexto.

**Yo te escribo los textos de las plantillas** cuando armemos los flujos A5, A25 y A26.
Son unas seis o siete. Conviene cargarlas temprano: si una se rechaza, hay que reescribirla
y esperar de nuevo, y no querés descubrir eso el día del lanzamiento.

---

## 8. Costos

- **Mensajes dentro de la ventana de 24 h que abrió la clienta: gratis.**
  Ahí cae la mayor parte de lo nuestro.
- **Plantillas que iniciamos nosotros: se pagan por mensaje.** Son centavos de dólar, y el
  precio cambia según el país y según si la plantilla es de utilidad o de marketing.
- Con el volumen del grupo fundador (12-15 personas), esto es **ruido**: unos pocos dólares
  al mes. No hace falta presupuestarlo todavía, pero sí cargar un medio de pago en Meta
  antes de mandar la primera plantilla, o no salen.

Los precios vigentes están en la documentación de precios de WhatsApp de Meta. **No los des
por sabidos** — los cambian cada tanto.

---

## 9. Pasar a producción: qué falta cuando terminen las pruebas

1. **Conseguir el chip** de la línea nueva. No activarlo en la app de WhatsApp.
2. **Agregar el número** en la app de Meta y verificarlo por SMS o llamada.
3. **Cambiar el `Phone number ID`** en n8n. Un dato. Nada más.
4. **Cargar el número real** en `NEXT_PUBLIC_WHATSAPP_NUMBER` y desplegar la web.
5. **Elegir y configurar la bandeja** de entrada para María Pía y Daiana.
6. **Cargar y aprobar las plantillas** con el número real.

### Dos cosas a tener presentes antes del lanzamiento

**Límite de la cuenta sin verificar.** Mientras el negocio no esté verificado ante Meta, la
cuenta puede iniciar conversación con **250 personas distintas cada 24 horas**. Para el grupo
fundador sobra muchísimo. Pero la **verificación del negocio** exige documentación de una
empresa registrada (en Argentina, CUIT y constancia de inscripción). Hay que averiguar qué
tiene María Pía y arrancar ese trámite **sin apuro pero sin olvidarlo**, porque tarda días.

**El nombre que ve la clienta.** El nombre que le pongas a la cuenta de WhatsApp Business es
el que aparece en el chat. Que sea el nombre comercial definitivo, no un borrador — cambiarlo
después es otro trámite con Meta.

---

## 10. Qué hacer si algo falla

| Síntoma | Causa más probable |
|---|---|
| El mensaje de prueba no llega | El destinatario no está verificado, o lo escribiste sin `+` y código de país |
| Funcionaba y de golpe da error de autorización | Estás usando el token temporal de 24 h. Andá al paso 5 |
| Meta no le avisa nada a n8n | El webhook no está suscrito al campo `messages`, o la URL de n8n no es pública |
| La plantilla se rechaza | Promete resultados, o suena a venta directa. Reescribir más neutro |
| No podés registrar el número real | Está activo en la app de WhatsApp. Hay que borrar esa cuenta primero |

---

## Ver también

- [`04-automatizaciones-n8n.md`](04-automatizaciones-n8n.md) — los flujos que van a usar esto
- [`07-circuito-compra-y-garantia.md`](07-circuito-compra-y-garantia.md) — el circuito de compra completo
- [`14-n8n-infraestructura.md`](14-n8n-infraestructura.md) — dónde vive n8n
