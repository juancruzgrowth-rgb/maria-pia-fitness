# MercadoPago — qué tiene que hacer Pía en su cuenta

> Desbloquea **B20** (credenciales) y **B21** (condición fiscal). Sin esto el
> checkout construido no puede cobrar un peso.
> Contexto y decisiones: [`21-mercadopago-suscripciones.md`](../estrategia/21-mercadopago-suscripciones.md)

---

## Antes de empezar: quién hace qué

La cuenta de MercadoPago tiene que ser **de Pía**. Ahí aterriza la plata y ahí
se factura con su CUIT. No se puede usar una cuenta de otra persona ni una
cuenta creada para la ocasión: la primera transferencia a un tercero levanta
la bandera de MP y congela el saldo.

Dentro de esa misma cuenta vive el panel de desarrollo. Hay dos caminos:

- **A — Pía hace los pasos y manda 4 valores.** Es lo más rápido y no le da a
  nadie acceso a su plata. Recomendado.
- **B — Pía comparte pantalla 20 minutos** y se hace junto con ella. Sirve si
  el panel la marea. Mismo resultado.

En ningún caso hace falta la contraseña de su cuenta.

---

## Paso 1 — Que la cuenta esté verificada

En la app de MercadoPago: **Tu perfil → Datos de tu cuenta**.

- Cuenta de **MercadoPago Argentina**, a nombre de Pía, con su **CUIT/CUIL**
- Identidad verificada (DNI + selfie). Si aparece un cartel de "validá tu
  identidad", hay que resolverlo primero
- Que tenga cargado el **CBU propio** donde retira la plata

Una cuenta sin verificar puede cobrar, pero tiene límites de extracción y
puede quedar afuera de suscripciones.

---

## Paso 2 — Condición fiscal (esto es plata, no es trámite) · B21

**Panel de MercadoPago → Configuración → Situación fiscal / Facturación.**

Hay que declarar:

1. **Condición frente a AFIP/ARCA:** monotributista (categoría real) o
   responsable inscripta. Si figura como "consumidor final", MP retiene mucho
   más en cada cobro.
2. **Ingresos Brutos de Santa Fe:** cargar la inscripción (local o Convenio
   Multilateral). Sin esto se aplica la alícuota más alta de retención.

**Por qué importa:** entre estar bien declarada y no estarlo, la diferencia en
lo que MP retiene de cada cobro va de **~3% a más del 20%**. Sobre $55.000 por
clienta por mes, eso es la diferencia entre que el negocio cierre o no.

**Además, para chequear con su contador/a:** el monotributo tiene un techo de
facturación anual. Si el reto escala, hay que saber en qué categoría está y a
cuántas clientas se toca el techo. No es urgente para el 31 de agosto, pero es
mejor saberlo antes que después.

---

## Paso 3 — Crear la aplicación en el panel de desarrollo

Entrar a **https://www.mercadopago.com.ar/developers/panel** con la cuenta de
Pía → **Tus integraciones** → **Crear aplicación**.

| Campo | Qué poner |
|---|---|
| Nombre | `Pia Moretto Web` |
| ¿Qué producto estás integrando? | **Pagos online** |
| Modelo de integración | **Checkout Pro** |
| ¿Usás plataforma? | **No / Integración propia** |

Si el formulario deja marcar más de una solución, marcar también
**Suscripciones**. Si no aparece, no importa: la aplicación sirve igual, las
suscripciones se crean por API.

---

## Paso 4 — Copiar las credenciales

Dentro de la aplicación recién creada, en el menú de la izquierda:
**Credenciales de producción** y **Credenciales de prueba**.

De cada una hacen falta dos valores:

- **Public Key** (empieza con `APP_USR-` en producción, `TEST-` en prueba)
- **Access Token** (idem)

> Las credenciales de **producción** pueden pedir "activar la aplicación"
> primero: MP hace unas preguntas sobre el sitio (rubro, URL, si vende
> servicios). Se responde con la URL de la web y rubro *servicios / salud y
> bienestar*.

---

## Paso 5 — Configurar el webhook

Misma aplicación → **Webhooks** (o "Notificaciones").

- **URL del webhook:** `https://<dominio-de-produccion>/api/webhooks/mercadopago`
- **Eventos a marcar:**
  - `Pagos` (payment)
  - `Suscripciones — vinculación de plan` (subscription_preapproval)
  - `Suscripciones — pagos recurrentes` (subscription_authorized_payment)

Al guardar, MP muestra una **clave secreta**. Ese valor es
`MERCADOPAGO_WEBHOOK_SECRET` y **sólo se ve una vez**: hay que copiarlo en ese
momento. Si se pierde, se regenera (y hay que volver a cargarlo).

Ojo: el panel tiene un interruptor **Modo productivo / Modo prueba**, y cada
modo tiene su propia clave secreta y su propia URL. Configurar los dos.

---

## Paso 6 — Verificar que la cuenta puede hacer suscripciones

Este es el riesgo que puede mover la fecha del 31 de agosto.

No hay un botón que lo diga. Se comprueba creando una suscripción de prueba
con las credenciales `TEST-` desde el checkout, y viendo si MP devuelve un
link de pago o un error de permisos.

Lo hago yo apenas tenga las credenciales de prueba. Si la cuenta no está
habilitada, hay que pedirlo por el chat de soporte del panel de desarrollo, y
eso puede tardar días — por eso conviene tener las credenciales cuanto antes,
aunque lo fiscal todavía esté en trámite.

---

## Paso 7 — Usuarios de prueba (lo hago yo)

Con el access token de prueba se crean dos usuarios de test (una vendedora y
una compradora) para simular una compra completa sin plata real. No requiere
nada de Pía.

---

## Lo que hace falta que me llegue

Cuatro valores:

```
MERCADOPAGO_ACCESS_TOKEN            (producción, empieza con APP_USR-)
NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY  (producción, empieza con APP_USR-)
MERCADOPAGO_WEBHOOK_SECRET          (la clave secreta del webhook)
```

Más los dos de prueba (`TEST-...`) para probar sin cobrar de verdad.

**Cómo mandarlos.** El *Access Token* es la llave de la cuenta: con eso se
pueden generar cobros a nombre de Pía. No va por WhatsApp, ni por mail, ni en
una captura de pantalla en un grupo. Opciones sanas:

- Un mensaje que se autodestruye (`onetimesecret.com` o similar)
- Compartir pantalla y que lo lea de ahí
- Cargarlos ella misma directamente en Vercel, si tiene acceso

Si alguna vez se filtra: panel → aplicación → **regenerar credenciales**. El
token viejo muere en el acto.

---

## Lo que NO hay que tocar

- **Nada de alias / CBU / "cobrar con link".** El circuito de transferencia
  quedó eliminado el 2026-08-18 y volver a ofrecerlo rompe la atribución.
- **No crear un "Plan de suscripción" en el panel.** El cobro va sin plan
  asociado, a propósito, para que el precio fundador quede congelado. Un plan
  creado a mano no se usa y confunde.
- **No cambiar el nombre ni borrar la aplicación** una vez que esté cobrando:
  las credenciales cuelgan de ella.
