# La base de datos del negocio — Google Sheets

> **Para quién es este documento:** para vos, para Daiana y para María Pía.
> Explica qué es "el Sheet", por qué una planilla y no una base de datos de verdad,
> y qué significa cada columna.

---

## 1. Qué es y por qué una planilla

Toda empresa necesita un lugar donde esté escrito **quién es quién**: quién preguntó, quién
pagó, en qué grupo entró, qué día del reto va, y si está por abandonar. Ese lugar, para
nosotros, es **una única planilla de Google con seis pestañas**.

Podríamos armar una base de datos de verdad. No conviene todavía, por tres razones:

1. **María Pía y Daiana la pueden abrir y entender.** Una base de datos real necesitaría que
   alguien les construya una pantalla para mirarla, y eso es una semana de trabajo que hoy
   no tenemos.
2. **Arreglar algo a mano es escribir en una celda.** Cuando el negocio arranca, las cosas se
   rompen todos los días. Poder corregir a mano sin llamar a un programador vale muchísimo.
3. **Es gratis y ya la tenemos.**

**Cuándo dejará de servir:** alrededor de las 500-1000 filas por pestaña, o cuando dos
personas necesiten escribir al mismo tiempo seguido. A ese punto llegaremos en varios meses,
y para entonces el negocio va a poder pagar la migración. **No es deuda técnica: es la
decisión correcta para esta etapa.**

---

## 2. La regla que no se rompe

> **n8n escribe. Los humanos leen.**

Cualquier persona puede mirar la planilla cuando quiera. Pero **si alguien edita una celda a
mano, tiene que avisar**, porque n8n puede estar a punto de escribir ahí y las dos cosas se
pisan. La excepción son las columnas marcadas como *manual* más abajo.

---

## 3. Las pestañas

### `leads` — gente que mostró interés pero todavía no pagó

| Columna | Qué guarda | Quién la escribe |
|---|---|---|
| `fecha` | Cuándo entró | n8n |
| `nombre` | Como se presentó | n8n |
| `email` | | n8n |
| `whatsapp` | Con código de país, formato `+549341...` | n8n |
| `origen` | `instagram`, `whatsapp`, `web`, `referida` | n8n |
| `keyword` | La palabra que escribió en Instagram para pedir el material | n8n |
| `estado` | `nuevo` · `contactado` · `interesado` · `compró` · `frío` | n8n / manual |
| `ultimo_contacto` | Fecha del último mensaje | n8n |
| `notas` | Cualquier cosa que quieran anotar | **manual** |

> **Cambio respecto del plan original:** se eliminó la columna `arquetipo_quiz`. El quiz quedó
> descartado en la sesión 3 y no va a existir. Ver [`01-web-arquitectura.md`](01-web-arquitectura.md).

---

### `ventas` — quien pagó

Es la pestaña más importante. De acá salen la facturación, quién tiene el acceso activo y a
quién hay que avisarle que se le vence.

| Columna | Qué guarda | Quién la escribe |
|---|---|---|
| `fecha` | Cuándo llegó el comprobante | n8n |
| `nombre` | | n8n |
| `email` | | n8n |
| `whatsapp` | | n8n |
| `plan` | `nivel-mensual` o `pack-3-niveles` | n8n |
| `monto` | | n8n |
| `moneda` | `ARS` | n8n |
| `metodo_pago` | `mercadopago` | n8n |
| `pago_id` | El `id` del pago en MercadoPago | n8n |
| `suscripcion_id` | El `preapproval_id`. Vacío en el pack | n8n |
| `estado` | `pendiente` · `confirmado` · `rechazado` · `devuelto` | n8n |
| `estado_suscripcion` | `authorized` · `paused` · `cancelled`. Vacío en el pack | n8n |
| `proximo_cobro` | La fecha que informa MercadoPago | n8n |
| `acceso_skool` | `no` · `invitada` · `sí` | n8n |
| `acceso_vence` | **Sólo para el pack.** En el mensual, el acceso vale mientras la suscripción esté `authorized` | n8n |
| `renovaciones` | Cuántas veces renovó. Arranca en 0 | n8n |
| `notas` | | **manual** |

> **El esquema cambió otra vez el 2026-08-18 (sesión 12), al pasar a MercadoPago como
> pasarela única.** Salieron `codigo` y `comprobante_url`: no hay comprobante que recibir ni
> `OK 1234` que parsear. Entraron `pago_id`, `suscripcion_id`, `estado_suscripcion` y
> `proximo_cobro`.
>
> El cambio conceptual importante: **`acceso_vence` deja de ser una fecha que calculamos
> nosotros.** En el plan mensual el acceso vale mientras la suscripción esté `authorized`, y
> de eso lleva la cuenta MercadoPago. La columna sobrevive sólo para el pack de 3 niveles,
> que sí vence en una fecha. Ver
> [`21-mercadopago-suscripciones.md`](21-mercadopago-suscripciones.md) §8.
>
> También salió el estado `esperando`: existía porque una venta se armaba de a pedazos entre
> varios mensajes de WhatsApp. Un pago de MercadoPago llega completo o no llega.

> **Tres columnas que se fueron el 2026-08-18:** `grupo`, `fecha_llamada` y
> `garantia_vence`. Ya no hay grupos, no hay llamada de bienvenida y la garantía dejó de
> ser una promesa comercial con fecha que haya que vigilar. En su lugar entraron
> **`acceso_vence`** —hasta cuándo pagó, que es lo que dispara el recordatorio de
> renovación— y **`renovaciones`**, el contador que dice si una clienta sigue.
> Ver [`20-reto-siempre-abierto.md`](20-reto-siempre-abierto.md).

> **Dos estados que se agregaron al construir los flujos (2026-08-17):**
>
> **`esperando`** en `estado`. Una venta empieza a existir con el primer mensaje, no con el
> comprobante: la clienta manda su nombre y su email en un mensaje y la foto en otro, y a veces
> al revés. `esperando` es esa venta a medio armar. Recién pasa a `pendiente` cuando está
> completa, que es cuando tiene sentido molestar a Pía.
>
> **`invitada`** en `acceso_skool`. Skool no tiene API: se manda la invitación y la clienta hace
> un clic. `invitada` y `sí` son estados distintos, y la diferencia es accionable — quien sigue
> en `invitada` a las 48 horas necesita que le vuelvan a escribir.
>
> Ver [`19-flujos-n8n-construidos.md`](19-flujos-n8n-construidos.md).

---

### `comunidad` — cómo va cada alumna dentro del reto

Es el tablero de la métrica principal del negocio: **la tasa de finalización**.

> La clave pasó de `whatsapp` a `email` el 2026-08-22. El checkout propio pide nombre
> y email nada más, así que `whatsapp` queda vacío y no sirve para cruzar filas.

| Columna | Qué guarda | Quién la escribe |
|---|---|---|
| `alumna` | Nombre | n8n |
| `email` | **La clave de la pestaña.** Es el email de nuestro formulario de checkout, el mismo que en `ventas` | n8n |
| `whatsapp` | Para poder escribirle. Hoy viene vacío: el formulario de checkout no lo pide | n8n |
| `fecha_inicio` | El día que entró. Sin cohortes, es lo único contra lo que se puede calcular `dia_actual` | n8n |
| `dia_actual` | Qué día del reto va | n8n |
| `ultimo_checkin` | Última vez que reportó una rutina | n8n |
| `rutinas_completadas` | De 12 | n8n |
| `estado_riesgo` | `ok` · `atención` · `en riesgo` · `abandonó` | n8n |

**`estado_riesgo` es la columna que salva el negocio.** La automatización A6 la recalcula
todos los días. Cuando alguien pasa a `en riesgo`, María Pía recibe un aviso y **le escribe
ella, como persona**. Ese mensaje es lo que convierte una devolución en una alumna que
termina — y una alumna que termina es el testimonio que vende el grupo siguiente.

---

### `contenido` — qué se publicó y qué trajo

| Columna | Qué guarda | Quién la escribe |
|---|---|---|
| `fecha` | | **manual (Daiana)** |
| `tipo` | `reel` · `historia` · `carrusel` · `email` | **manual** |
| `tema` | | **manual** |
| `keyword` | La palabra clave del comentario, si aplica | **manual** |
| `alcance` | | **manual** |
| `comentarios` | | **manual** |
| `opt_ins` | Cuánta gente pidió el material | n8n |
| `ventas_atribuidas` | Cuántas ventas salieron de ahí | n8n |

Esta pestaña es la única mayormente manual, y es la que responde la pregunta más cara del
marketing: **qué publicación trajo plata**. Sin ella se publica a ciegas.

### `bajas` — quién pidió cancelar

La escribe `/cancelar`. Existe por la Res. 424/2020: el pedido de baja tiene que quedar
registrado y resolverse dentro de las 24 h. Encabezado en
[`../setup/sheets/bajas.csv`](../setup/sheets/bajas.csv).

### `skool_miembros` — la foto de quién está adentro de la comunidad

| Columna | Qué guarda | Quién la escribe |
|---|---|---|
| `email` | **La clave de la pestaña.** El correo con el que se creó la cuenta de Skool | **manual** |
| `nombre` | Opcional, para leer el informe sin descifrar emails | **manual** |
| `fecha_ingreso` | Opcional | **manual** |
| `notas` | Opcional | **manual** |

Es la única pestaña que se llena copiando y pegando, y es a propósito: **Skool no tiene API
pública en el plan Hobby**, así que la lista de miembros se exporta a mano una vez por
semana. Sin ella, A30 no tiene contra qué comparar: no hay forma de saber quién está adentro
de la comunidad.

Sólo la lee [A30 · conciliación semanal](../setup/n8n/A30-conciliacion-semanal.json). Si se
queda desactualizada el informe llega igual, pero mirando la foto vieja —por eso el propio
email lo aclara al pie—.

---

## 4. Qué tenés que hacer vos

### Paso 1 — Crear la planilla

1. Entrá a Google Drive **con la cuenta del proyecto**, no con la personal. Esta planilla va
   a tener datos personales de las clientas y no puede vivir en la cuenta de nadie.
2. Nueva hoja de cálculo. Nombre: **`MP CEP — Base de datos`**.
3. Creá las pestañas con estos nombres exactos, **en minúscula y sin acentos**:
   `leads` · `ventas` · `comunidad` · `contenido` · `bajas` · `skool_miembros`
4. En [`../setup/sheets/`](../setup/sheets/) hay un CSV por pestaña con los encabezados ya
   escritos. Abrí cada uno y **copiá la fila de encabezados a la fila 1** de su pestaña.
   Alternativamente: **Archivo → Importar → Subir**, y elegí *Reemplazar hoja actual*.
5. Pasame el **ID de la planilla**: es el pedazo largo de la URL entre `/d/` y `/edit`.

### Paso 2 — El robot que va a escribir (service account)

n8n no puede entrar con tu usuario de Google. Necesita **su propio usuario robot**, que se
llama *service account*. Suena complicado; son cinco clics.

1. Entrá a **console.cloud.google.com** con la misma cuenta.
2. Creá un proyecto nuevo llamado `mp-cep`.
3. **APIs y servicios → Biblioteca** → buscá **Google Sheets API** → **Habilitar**.
4. **APIs y servicios → Credenciales → Crear credenciales → Cuenta de servicio**.
   Nombre: `n8n-sheets`. Sin roles — no hacen falta.
5. Entrá a la cuenta de servicio recién creada → pestaña **Claves** → **Agregar clave → Crear
   clave nueva → JSON**. Se descarga un archivo.
6. **Abrí ese archivo y buscá el campo `client_email`.** Es una dirección larga que termina
   en `.iam.gserviceaccount.com`.
7. Volvé a la planilla → **Compartir** → pegá ese email → permiso de **Editor**.

> 🔒 **Ese archivo JSON es una llave.** Quien lo tenga puede leer y escribir la planilla
> entera, con todos los datos personales de las clientas adentro. **No lo mandes por chat, no
> lo subas al repositorio, no lo guardes en Drive.** Se carga directo en las credenciales de
> n8n y después se borra de la carpeta de Descargas.
>
> El proyecto tiene `.gitignore` configurado, pero la regla es no depender de eso.

### Paso 3 — Qué me pasás

| Dato | ¿Se puede pegar en el chat? |
|---|---|
| ID de la planilla | Sí |
| `client_email` de la cuenta de servicio | Sí |
| **El archivo JSON completo** | **No. Lo cargás vos en n8n.** |

---

## 5. Sobre los datos personales (Ley 25.326)

Esta planilla tiene nombre, email y teléfono de personas reales. Eso son **datos personales**
y la ley argentina impone obligaciones concretas:

- **Acceso restringido.** Sólo María Pía, Daiana y vos. Nunca se comparte con "cualquiera con
  el link". Nunca se descarga a una computadora personal.
- **La cuenta de servicio ve esta planilla y ninguna otra cosa.** Por eso no le pusimos roles
  en Google Cloud: no tiene acceso a Drive, sólo a lo que se le comparta explícitamente.
- **Se guarda mientras haga falta.** Los leads que quedaron fríos hace un año se borran.
- **Si una clienta pide sus datos, o que los borremos, hay que poder hacerlo.** Está prometido
  en la Política de Privacidad de la web. En la práctica: buscar su fila y borrarla.

---

## Ver también

- [`04-automatizaciones-n8n.md`](04-automatizaciones-n8n.md) — qué flujo escribe en cada pestaña
- [`14-n8n-infraestructura.md`](14-n8n-infraestructura.md) — dónde se cargan estas credenciales
