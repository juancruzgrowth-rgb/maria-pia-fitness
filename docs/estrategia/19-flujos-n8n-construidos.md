# Los flujos de n8n — construidos y listos para importar

> **Escrito el 2026-08-17.** Los archivos viven en [`docs/setup/n8n/`](../setup/n8n/).
> Este documento explica qué hace cada uno, qué hay que configurar antes de encenderlos y
> qué NO hacen.
>
> Para el porqué de la herramienta, ver [`14-n8n-infraestructura.md`](14-n8n-infraestructura.md).
> Para el circuito de compra como decisión de negocio, ver
> [`07-circuito-compra-y-garantia.md`](07-circuito-compra-y-garantia.md).

---

## 1. Qué hay construido

Cinco archivos. Los tres del medio son la venta entera.

| Archivo | Qué es | Nodos |
|---|---|---|
| [`A0-router-whatsapp.json`](../setup/n8n/A0-router-whatsapp.json) | La única puerta de entrada de WhatsApp | 8 |
| [`A3-recepcion-comprobante.json`](../setup/n8n/A3-recepcion-comprobante.json) | Recibe el comprobante, arma la venta, avisa a Pía | 18 |
| [`A3bis-confirmacion.json`](../setup/n8n/A3bis-confirmacion.json) | Lee el `OK 1234` de Pía y confirma o rechaza | 15 |
| [`A4-onboarding.json`](../setup/n8n/A4-onboarding.json) | Le da el acceso a la alumna | 13 |
| [`A99-centinela-de-errores.json`](../setup/n8n/A99-centinela-de-errores.json) | Avisa cuando cualquier otro se rompe | 5 |

**Con A0, A3, A3-bis y A4 encendidos, el negocio cobra y entrega solo.** Todo lo demás
—secuencias, recordatorios, detección de abandono— ahorra trabajo. Estos cuatro hacen la venta.

---

## 2. La decisión de arquitectura que cambió el plan

El plan original tenía A3 y A3-bis como dos flujos independientes, cada uno con su propio
disparador de WhatsApp. **No puede funcionar, y es mejor saberlo ahora que el día del
lanzamiento.**

Meta permite configurar **una sola URL de callback por aplicación**. Si dos flujos de n8n
levantan cada uno su webhook de WhatsApp, sólo uno de los dos recibe los mensajes; el otro
queda mudo sin dar ningún error.

Por eso existe **A0 · Router**. Es el único que escucha a Meta. Aplana el mensaje a una forma
estable, mira quién escribió y llama al flujo que corresponde:

```
                 ┌─────────────────────┐
  Meta ─────────►│   A0 · Router       │
  (un webhook)   │   ¿quién escribió?  │
                 └──────────┬──────────┘
                            │
        ┌───────────────────┼───────────────────┐
        ▼                   ▼                   ▼
  Pía, con              Una clienta        Cualquier otra
  "OK 1234"                                    cosa
        │                   │                   │
        ▼                   ▼                   ▼
     A3-bis                 A3              no hacer nada
        │
        ▼
       A4
```

**La regla que queda:** si algún día se agrega otro flujo que reaccione a WhatsApp, se le suma
una salida al switch de A0. **Nunca se le pone otro disparador de WhatsApp a nada.**

El beneficio de costado es que Meta ve una sola forma de mensaje y el resto del sistema
consume la forma normalizada. El día que Meta cambie el formato del webhook, se toca un
archivo.

---

## 3. A3 · Recepción del comprobante

### El problema real que resuelve

En el papel, la clienta manda un mensaje con su nombre, su email y la foto del comprobante.
En la vida real manda **dos mensajes**: primero el texto precargado que abre la web, y después
la foto. A veces al revés. A veces sólo la foto. A veces reenvía todo dos veces porque no
tuvo respuesta en treinta segundos.

Un flujo que asume "un mensaje = una venta" crea tres filas para la misma persona y le avisa
tres veces a Pía. Por eso A3 no piensa en mensajes: **piensa en el estado de la venta.**

```
(no existe)  ──primer mensaje──►  esperando
esperando    ──faltan datos────►  esperando
esperando    ──está completa───►  pendiente      ← recién acá se le avisa a Pía
pendiente    ──otro mensaje────►  pendiente      ← y no se le vuelve a avisar
pendiente    ──A3-bis──────────►  confirmado | rechazado
```

### La decisión que hace que todo lo demás funcione

**El código de 4 dígitos se asigna en el primer contacto, no cuando la venta se completa.**

Parece un detalle y es lo que sostiene el sistema: da una clave estable desde el minuto cero.
Todas las escrituras posteriores hacen match contra esa clave, así que reenviar un mensaje
actualiza la fila que ya existe en vez de crear una segunda. El código se le muestra a Pía
recién cuando la venta está completa, pero existe desde antes.

### Lo que hace en cada caso

| Situación | Qué hace |
|---|---|
| Faltan datos | Guarda lo que hay y le pide **sólo lo que falta**, por nombre |
| Está completa | Guarda el comprobante en Drive, la marca `pendiente`, le acusa recibo a la clienta y le manda a Pía el aviso con `OK`/`NO` |
| Ya está pendiente | Le dice que está en verificación. **No le vuelve a avisar a Pía** |
| Escribió Pía | Ni se entera: eso lo ruteó A0 a A3-bis |

### El comprobante va a Drive, no se queda en WhatsApp

Meta guarda los archivos de los mensajes **30 días**. Un comprobante de pago que desaparece a
los 30 días no sirve como respaldo de nada: ni para una discusión con una clienta, ni para la
contadora. A3 lo descarga y lo sube a una carpeta de Drive con el nombre
`comprobante-1234-Carolina`, y lo que va a la planilla es el link.

---

## 4. A3-bis · Cuando Pía responde

Pía abre el home banking, ve la plata y contesta `OK 4821`. Se aceptan `ok4821` y `OK  4821`
también: lo va a escribir con el pulgar, parada en cualquier lado.

**Los cuatro desenlaces, y por qué existe cada uno:**

| Desenlace | Cuándo | Qué hace |
|---|---|---|
| **Confirmar** | La venta está `pendiente` y escribió `OK` | Estado a `confirmado`, calcula el monto desde el plan, fija hasta cuándo tiene acceso y llama a A4 |
| **Rechazar** | Escribió `NO` | Estado a `rechazado` y **le escribe a la clienta pidiendo que aclare**. Nunca se la deja sin respuesta |
| **Ya procesado** | El código ya no está `pendiente` | No toca nada y se lo dice |
| **No existe** | Se equivocó de número | No toca nada y se lo dice |

### La guarda que importa

**"Ya procesado" es la que evita el desastre.** Sin eso, un `OK 4821` mandado dos veces —cosa
que va a pasar, porque Pía no va a estar mirando si el primero anduvo— genera dos accesos, dos
mails de bienvenida y dos filas en el tablero de comunidad. Con eso, el segundo `OK` responde
"ese código ya estaba en confirmado, no toqué nada".

Vale para las devoluciones también: una venta en `devuelto` no se reabre con un `OK`.

### El monto no lo escribe nadie

Se deriva del plan: `nivel-mensual` → $40.000, `pack-3-niveles` → $99.000. Los números viven
en el nodo de configuración y reflejan
[`src/lib/products.ts`](../../src/lib/products.ts), que sigue siendo la fuente de verdad.

Si el plan quedó vacío porque la clienta no lo escribió, **el monto queda vacío también**. Un
hueco visible en la fila de una venta es mejor que un número inventado.

### El acceso arranca en este momento

No hay fecha de inicio de grupo que esperar, así que el reloj empieza cuando Pía confirma.
`acceso_vence` sale de ahí: **28 días** para un nivel, **6 meses** para el pack de 3.

Esa columna es la que va a consumir A27 para mandar los recordatorios de renovación. Si
queda vacía, nadie avisa nada y la clienta se va sin que nos enteremos.

---

## 5. A4 · Onboarding

Desde que Pía escribe `OK` hasta que la clienta tiene todo: **menos de 30 segundos.**

1. WhatsApp con las tres cosas para hacer hoy, numeradas
2. Alta o actualización del contacto en Brevo, en la lista de alumnas
3. Email de bienvenida con los mismos links y la fecha exacta en que se le vence el acceso
4. Fila nueva en la pestaña `comunidad`, en cero
5. `acceso_skool` pasa a `invitada` en la pestaña `ventas`

### Dos cosas que A4 no hace, y no es por vagancia

**No crea el acceso a Skool.** Skool no tiene API. Se manda el link de invitación y ella hace
un clic. Por eso la columna dice **`invitada`** y no `sí`: son estados distintos, y la
diferencia es accionable — quien sigue en `invitada` a las 48 horas necesita que le vuelvan a
escribir. Eso lo va a hacer A5.

**No la agrega al grupo de WhatsApp.** La Cloud API de Meta no administra grupos, ni con
permisos especiales. Se manda el link de invitación del grupo.

Las dos son limitaciones de las herramientas, están documentadas y tienen su plan B adentro
del flujo.

### También es idempotente

Lo primero que hace es mirar `acceso_skool`. Si ya dice algo distinto de `no`, no hace nada.
A3-bis ya protege esto, pero A4 se puede ejecutar a mano desde n8n y no puede confiar en que
quien lo apretó sepa lo que está haciendo.

---

## 6. A99 · El centinela

No se ejecuta solo. Se **asigna** en cada uno de los otros flujos: *Settings → Error Workflow →
A99*. Cuando cualquiera falla, llega un WhatsApp con el nombre del flujo, el nodo que se rompió
y el mensaje de error.

Sin esto, una automatización que falla no falla ruidosamente: **falla en silencio**, y la
primera señal es una clienta preguntando por qué no le llegó el acceso.

---

## 7. Qué hay que hacer antes de encenderlos

### Paso 1 — Importar

En n8n: **Workflows → Import from File**, uno por uno. Importalos en este orden, porque cada
uno necesita el ID del anterior: **A4 → A3-bis → A3 → A0 → A99**.

### Paso 2 — Elegir las credenciales

Los archivos vienen **sin credenciales adentro**, a propósito: una credencial exportada es una
llave viajando por un repositorio. Cada nodo que necesita una va a aparecer marcado en rojo, lo
que sirve de checklist. Se abre y se elige del desplegable.

| Credencial | La usan |
|---|---|
| WhatsApp API (envío) | A3, A3-bis, A4, A99 |
| WhatsApp Trigger | A0 |
| Google Sheets (service account) | A3, A3-bis, A4 |
| Google Drive (**OAuth2, no service account**) | A3 |
| Brevo | A4 |

> ⚠️ **Drive va con OAuth2 y no con la cuenta de servicio.** Una service account no tiene cuota
> de almacenamiento propia en Google Drive: al intentar subir el comprobante devuelve
> `Service Accounts do not have storage quota` y la venta se corta ahí. Sheets sí funciona con
> la cuenta de servicio, porque no crea archivos. Son dos credenciales de Google distintas y
> las dos hacen falta.

### Paso 3 — Completar el nodo "Configuración"

Cada flujo tiene un nodo `Configuración` al principio, y ahí está **todo** lo que hay que
cambiar. Está separado por dos razones: no hay que ir a buscar valores adentro de doce nodos, y
se puede probar cada flujo por separado sin tocar los demás.

| Valor | Dónde sacarlo | En qué flujos |
|---|---|---|
| `phoneNumberId` | Meta → WhatsApp → API Setup | A3, A3-bis, A4, A99 |
| `mpWhatsapp` | El celular personal de Pía, con código de país | A0, A3, A3-bis |
| `sheetId` | La URL de la planilla, entre `/d/` y `/edit` | A3, A3-bis, A4 |
| `driveFolderId` | La URL de la carpeta de comprobantes | A3 |
| `precioNivel` / `precioPack` | `55000` / `130000` | A3-bis |
| `accesoDias` | `28` — cuánto dura un nivel | A3-bis |
| `ventanaPackMeses` | `6` — cuánto dura el pack de 3 | A3-bis |
| `skoolInviteUrl` | Skool → Invite | A4 |
| `grupoWhatsappUrl` | El link de invitación del grupo de WhatsApp | A4 |
| `brevoListaAlumnas` | El ID numérico de la lista en Brevo | A4 |
| `avisarA` | El WhatsApp de Juan Cruz | A99 |

Y los tres IDs de flujo, que se copian de la URL de n8n una vez importados: `REEMPLAZAR_ID_DE_A3`
y `REEMPLAZAR_ID_DE_A3BIS` en A0, y `REEMPLAZAR_ID_DE_A4` en A3-bis.

### Paso 4 — Crear las dos plantillas de mensaje en Meta

**Esto es lo que más tarda y hay que empezarlo ya.** Meta las revisa y puede tardar de minutos
a un día.

La razón: WhatsApp sólo deja mandar un mensaje libre **dentro de las 24 horas** desde el último
mensaje de esa persona. Responderle a una clienta que acaba de escribir siempre entra en esa
ventana. Pero **avisarle a Pía no**: si hace dos días que no le escribe a la línea del negocio,
un mensaje libre falla. Por eso los avisos al equipo van con plantilla y los mensajes a las
clientas no.

En **Meta Business Suite → WhatsApp Manager → Plantillas de mensaje**, categoría *Utilidad*,
idioma *Español (Argentina)*:

**`nuevo_comprobante`**
```
Nuevo comprobante del Reto 28 Días.

Nombre: {{1}}
Email: {{2}}
Plan: {{3}}
Comprobante: {{4}}

Verificá la transferencia en el banco y respondé:
OK {{5}} para confirmar
NO {{5}} para rechazar
```

**`falla_automatizacion`**
```
Se rompió una automatización.

Flujo: {{1}}
Nodo: {{2}}
Error: {{3}}
```

### Paso 5 — Asignar el centinela

En cada flujo: **Settings → Error Workflow → A99 · Centinela de errores**.

---

## 8. Cómo se prueba sin gastar plata ni molestar a nadie

```bash
node docs/setup/n8n/verificar.mjs
```

No necesita n8n, ni credenciales, ni internet. Hace dos cosas:

1. **Revisa que los archivos sean importables:** JSON válido, conexiones que apuntan a nodos
   que existen, y el JavaScript de cada nodo de código sintácticamente correcto. Un error de
   tipeo adentro de un nodo de código no se ve hasta que el flujo corre en producción con una
   venta real adentro.
2. **Corre la lógica de negocio contra casos armados a mano.** Los dos nodos que piensan
   —`Decidir` de A3 y `Buscar la venta` de A3-bis— se extraen del JSON y se ejecutan con los
   ayudantes de n8n reemplazados por datos de prueba.

Hoy pasa **29 casos de lógica**, más la validación de los cinco archivos. Entre ellos los que
importan de verdad: que un segundo `OK` no genere un
segundo acceso, que un mensaje vacío no borre el email que llegó en el anterior, que una venta
devuelta no se reabra, y que el generador de códigos no repita uno en uso en 300 intentos
seguidos.

**Si se toca cualquiera de esos dos nodos, esto se corre antes de subir el flujo.**

### Y después, la prueba de verdad

El verificador no reemplaza probar contra Meta. Con el número prestado de Meta contra el
teléfono de Juan Cruz, y sin gastar un peso:

1. Mandar el texto precargado sin foto → tiene que pedir sólo la foto
2. Mandar la foto → tiene que llegar el aviso a Pía con el código, y el archivo a Drive
3. Reenviar la foto → **no** tiene que llegar un segundo aviso
4. Responder `OK` con el código → tiene que llegar el onboarding
5. Responder `OK` otra vez → tiene que responder "ya estaba en confirmado"
6. Responder `OK` con un código inventado → tiene que responder "no encuentro esa venta"

Los pasos 3, 5 y 6 son los que separan un sistema que se puede dejar solo de uno que hay que
vigilar.

---

## 9. Lo que todavía no está

| Flujo | Qué hace | Depende de |
|---|---|---|
| **A27** | Renovación mensual: avisa el 25 y el 28, corta el 31 | Nada. Se puede construir ya |
| **A6** | Detección de abandono | Que exista la comunidad en Skool |
| **A2** | CRM de leads y clientas | Nada. Se puede construir ya |
| **A28** | Triage de WhatsApp entrante | A0 |
| **A1** | Captura de lead desde Instagram | ManyChat |
| **A23** | Circuito de devolución del art. 34 | — |
| **A29** | Captura de testimonios y upsell | Que haya clientas en el día 28 |

**A27 es el siguiente.** Sin él, cobrar $55.000 por mes es cobrar $55.000 una vez: nadie
avisa que se vence, nadie cobra de nuevo y nadie corta el acceso. Y no depende de ningún
bloqueante — la fecha contra la que cuenta ya la escribe A3-bis en `acceso_vence`.

**A5, A25, A26 y A24 se cancelaron** el 2026-08-18: los cuatro dependían de las cohortes y
de la Semana 0. Ver [`20-reto-siempre-abierto.md`](20-reto-siempre-abierto.md).

---

## Ver también

- [`14-n8n-infraestructura.md`](14-n8n-infraestructura.md) — por qué n8n, dónde se hospeda, las credenciales
- [`13-base-de-datos-sheet.md`](13-base-de-datos-sheet.md) — las cuatro pestañas, columna por columna
- [`12-whatsapp-cloud-api.md`](12-whatsapp-cloud-api.md) — el trámite de Meta paso a paso
- [`07-circuito-compra-y-garantia.md`](07-circuito-compra-y-garantia.md) — el circuito como decisión de negocio
