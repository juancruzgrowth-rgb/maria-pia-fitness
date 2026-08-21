# De MercadoPago a Skool — el circuito de acceso

> **Escrito el 2026-08-20 (sesión 13).** Completa la parte que
> [`21-mercadopago-suscripciones.md`](21-mercadopago-suscripciones.md) deja abierta: ahí está
> resuelto **cómo se cobra**, acá está **cómo entra la clienta a la comunidad** una vez que pagó.
>
> Sobre producto y precios manda [`20-reto-siempre-abierto.md`](20-reto-siempre-abierto.md).
> Los textos que consume este circuito están en [`23-skool-copy.md`](23-skool-copy.md).

---

## 1. El circuito, de punta a punta

```
1. /comprar → elige plan, deja nombre + email
2. POST /api/checkout/suscripcion   (o /api/checkout/pack)
   crea el preapproval con external_reference = id nuestro
   → redirige al init_point de MercadoPago
3. Paga
4. MercadoPago dispara DOS cosas en paralelo:

   ├── back_url  → /bienvenida        ← la clienta ve el acceso EN PANTALLA
   └── webhook   → /api/webhooks/mercadopago
                     valida la firma (x-signature) → 401 y no escribe nada si no coincide
                     escribe la venta en la pestaña `ventas`
                     dispara A4

5. A4 (n8n): alta en Brevo · email de invitación · fila en `comunidad`
             acceso_skool = "invitada"

6. Ella hace clic en el link, crea su usuario de Skool y entra
```

Las dos salidas del paso 4 son deliberadas y no redundantes. **`/bienvenida` es el canal
principal, no el email.** Si el mail cae en spam, hay una clienta que pagó $55.000 y no entró, y
no nos enteramos hasta que reclama: plata cobrada más silencio, el peor modo de falla del
sistema. El email es el respaldo. Esto ya estaba escrito en el §4 del doc 21 y acá se confirma.

---

## 2. Dónde se corta la automatización

**Skool no tiene API.** Ni para invitar, ni para leer la lista de miembros, ni para dar de baja.
Todo el circuito de arriba es automático hasta el paso 5; del 6 en adelante hay manos humanas.
Tres consecuencias, y ninguna es cosmética.

### 2.1 El link de invitación es genérico, no personal

Cualquiera que lo tenga puede usarlo. Si una clienta se lo reenvía a una amiga, la amiga entra.

La única defensa real es que **la comunidad esté configurada como privada**: así unirse requiere
aprobación. Aprobar es abrir la pestaña `ventas` y ver si esa persona pagó. Son treinta segundos,
pero son treinta segundos de una persona por cada alta.

Es el precio de no usar el cobro de Skool — que sí daría acceso automático, pero cobrando en
dólares por Stripe a nombre de Skool, a alguien que ya pagó en pesos por MercadoPago. Ver §3 del
doc 21. **El doble cobro es peor que el trabajo manual**, así que el trabajo manual se queda.

### 2.2 Nadie se entera de que entró

Por eso la columna dice `invitada` y no `sí`: son estados distintos y la diferencia es accionable.
Quien sigue en `invitada` a las 48 horas necesita que le vuelvan a escribir. El texto de ese
recordatorio ya está redactado en el §12 de [`23-skool-copy.md`](23-skool-copy.md); **el
disparador no está construido**, y no puede dispararse solo mirando Skool porque Skool no se deja
leer. Se dispara por tiempo: 48 h desde el alta, salvo que alguien haya marcado la fila a mano.

### 2.3 Dar de baja a quien cancela es 100 % manual

Es el punto que menos suele estar pensado y el que más plata cuesta con el tiempo.

MercadoPago avisa la cancelación por webhook en el mismo segundo. Pero **sacarla de Skool lo hace
una persona a mano.** Sin una rutina fija, en tres meses hay gente adentro que dejó de pagar hace
ocho semanas, y nadie lo nota porque la comunidad no se queja de tener más miembros.

---

## 3. La pieza que falta: A30 · Conciliación semanal

Un flujo nuevo, semanal, que compara la lista de miembros de Skool contra la pestaña `ventas` y
devuelve **dos listas por email**:

| Lista | Criterio | Qué hace Daiana |
|---|---|---|
| **Sacar** | Está en Skool y su `estado_suscripcion` es `cancelled`, o su `acceso_vence` del pack ya pasó | La quita de la comunidad |
| **Repescar** | Pagó, `acceso_skool` sigue en `invitada` y pasaron más de 48 h | Le vuelve a mandar el link |

El cruce lo hace n8n. **La ejecución sobre Skool la hace una persona**, porque no hay otra forma.

La lista de miembros hay que sacarla a mano de Skool y subirla a algún lado que n8n pueda leer
—una pestaña más de la planilla alcanza—. Es un paso manual por semana, y es lo que sostiene que
el resto sea automático.

> **Prioridad.** A30 no bloquea el lanzamiento: el día 1 no hay nadie a quien dar de baja. Pero
> tiene que existir antes de que se cumpla el primer mes de la primera suscriptora, porque ese es
> el día en que empiezan las primeras cancelaciones. **Fecha límite real: 30 de septiembre.**

---

## 4. El detalle chico que rompe todo el cruce

**El email de MercadoPago puede no ser el email de Skool.**

Ella paga con la cuenta de MP que tiene a mano —que a veces es la del marido, la de la madre o la
de una amiga— y después se crea el usuario de Skool con su correo personal. Si la clave del cruce
es el email, no matchea nada, y A30 devuelve dos listas llenas de falsos positivos: gente que
figura como que nunca entró y gente adentro que figura como que no pagó.

Se arregla de dos maneras, y hay que hacer las dos:

1. **Pedir el email en nuestro formulario**, antes de mandarla a MercadoPago. No confiar en el que
   devuelve MP. Ese es el que va a `ventas` y el que recibe la invitación.
2. **Decírselo explícitamente en el email de invitación:** *"creá tu cuenta de Skool con este
   mismo correo"*. Una línea en el §12 de `23-skool-copy.md`.

Ninguna de las dos garantiza el match, pero juntas lo llevan de "no funciona" a "falla en pocos
casos", y esos pocos casos aparecen en la lista de A30 para resolverlos a ojo.

---

## 5. Estado real del build al 2026-08-21

Los pasos 1 a 5 y el 7 de la §6 están construidos. Falta probarlos contra MercadoPago:
sin las credenciales de B20 no se puede correr una sola compra de sandbox.

| Pieza | Estado |
|---|---|
| [`src/lib/mercadopago.ts`](../../src/lib/mercadopago.ts) | ✅ `createSubscription` (preapproval sin plan), `createPreference`, `getPayment`, `getAuthorizedPayment`, `cancelSubscription` y `verifyWebhookSignature` |
| `POST /api/checkout/suscripcion` | ✅ Construido. El importe sale de `products.ts`, nunca del cuerpo de la request |
| `POST /api/checkout/pack` | ✅ Construido |
| `POST /api/webhooks/mercadopago` | ✅ Construido. Firma validada en tiempo constante — probado: firma válida 200, firma rota / ausente / `request-id` cambiado 401 |
| `/bienvenida` | ✅ Construida. Muestra el acceso en pantalla; los links salen de `NEXT_PUBLIC_SKOOL_INVITE_URL` y `NEXT_PUBLIC_WHATSAPP_GROUP_URL` |
| `/cancelar` | ✅ Construida, más el link en el footer de la home (Res. 424/2020) |
| [`src/app/comprar/page.tsx`](../../src/app/comprar/page.tsx) | ✅ Reescrita: formulario de nombre + email contra los dos endpoints |
| `A4-onboarding.json` | ⛔ Sigue con el disparador viejo. La web ya le pega a `N8N_ONBOARDING_WEBHOOK_URL` si está cargada |

**Lo que falta para cobrar de verdad:** las credenciales (B20), una compra de prueba en
sandbox, y las tres variables nuevas en Vercel.

### Lo que NO hace `/cancelar`, y por qué

No cancela la suscripción en el acto. Sin sesión iniciada, un formulario que da de baja
sabiendo sólo el email deja que cualquiera cancele la de otra. El pedido queda registrado
en la pestaña `bajas` y lo procesa una persona dentro de las 24 h —que es lo que exige la
Res. 424/2020—, y el camino instantáneo está a la vista arriba de todo en la página: la
propia app de MercadoPago.

### La pestaña `ventas` cambió

Se le suma una columna al final: **`external_reference`**. Es el id nuestro y es la clave
con la que el webhook encuentra la fila. Va al final para no correr los índices de las
columnas que los flujos ya leen. El encabezado nuevo está en
`docs/setup/sheets/ventas.csv`, y hay una pestaña nueva, `bajas`, en
`docs/setup/sheets/bajas.csv`.

La fila se escribe **al crear el checkout**, con estado `pendiente` y con el nombre y el
email de nuestro formulario. El webhook después la actualiza. Es lo que resuelve el §4:
el email que guardamos es el de ella, no el de la cuenta con la que pagó.

## 6. Orden sugerido para la próxima sesión

1. `preapproval` en `src/lib/mercadopago.ts` — y probarlo en sandbox para confirmar **qué medios
   de pago habilita realmente** en Argentina (la duda abierta del §2 del doc 21)
2. `POST /api/checkout/suscripcion` y `POST /api/checkout/pack`
3. Reescribir `/comprar` contra esos dos endpoints
4. `POST /api/webhooks/mercadopago` con validación de firma en tiempo constante
5. `/bienvenida` mostrando el acceso en pantalla
6. Reconectar A4 al webhook
7. `/cancelar` y el botón de arrepentimiento en la home
8. A30 · conciliación semanal — puede esperar al 30/09

Los pasos 1 a 6 son la venta. El 7 es la ley. El 8 es lo que evita la fuga silenciosa.

---

## Ver también

- [`21-mercadopago-suscripciones.md`](21-mercadopago-suscripciones.md) — el cobro, los topics del webhook, la firma y los costos reales
- [`23-skool-copy.md`](23-skool-copy.md) — el email de invitación (§12) y el recordatorio a las 48 h
- [`19-flujos-n8n-construidos.md`](19-flujos-n8n-construidos.md) — A4 y A99, los dos flujos que sobreviven
- [`13-base-de-datos-sheet.md`](13-base-de-datos-sheet.md) — las pestañas `ventas` y `comunidad`
