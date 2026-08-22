# Tu cuenta de MercadoPago, paso a paso

Todo lo que hay que dejar configurado para que la web pueda cobrar el Reto sola, sin que toques nada cada vez que alguien se anota.

`Unos 25 minutos`  ·  `Desde la compu, no del celular`  ·  `6 pasos`

---

## Qué estamos armando, en criollo

Hoy, si alguien quiere entrar al Reto, te transfiere y vos tenés que mirar el homebanking, fijarte quién pagó y mandarle el acceso a mano. Cada mes, con cada una.

Lo que estamos conectando hace eso solo: la clienta pone su tarjeta una vez, MercadoPago le cobra todos los meses sin preguntarle nada, y la web se entera en el momento y le da el acceso.

Para que eso funcione, MercadoPago necesita saber que la web es tuya. Eso son **tres claves** que se generan en tu cuenta y me pasás. Nada más. Los pasos de abajo son para llegar a esas tres claves, y para que no te retengan plata de más en el camino.

---

## Antes de arrancar, tené a mano

- Tu usuario y contraseña de MercadoPago
- Tu CUIT o CUIL
- Los datos de tu monotributo (categoría) y, si tenés, la inscripción en Ingresos Brutos de Santa Fe
- El celular a mano, por si te piden confirmar con un código

---

## Paso 1 — Que la cuenta esté a tu nombre y verificada

`Lo hacés vos` · `5 minutos`

La cuenta tiene que ser tuya, con tu CUIT. No sirve la de un familiar ni una nueva creada para esto: cuando empiece a entrar plata y después se mueva a otro lado, MercadoPago frena todo y pide explicaciones.

Entrá a MercadoPago desde la computadora y fijate estas tres cosas:

1. Que figure tu nombre y tu CUIT o CUIL.
2. Que **no** te aparezca ningún cartel de "validá tu identidad". Si aparece, resolvelo ahora: son una foto del DNI y una selfie.
3. Que tengas cargado tu CBU, el de la cuenta del banco donde querés retirar la plata.

> **Ojo con esto.** Si la cuenta no está verificada, podés cobrar igual pero con topes, y las suscripciones automáticas pueden quedar bloqueadas. Es el paso más aburrido y el que más frena si se saltea.

---

## Paso 2 — Decirle a MercadoPago cómo estás inscripta

`Lo hacés vos` · `5 minutos`

Este es el paso que más plata te hace ganar o perder, así que va con nombre y apellido: **es la diferencia entre que te retengan alrededor del 3% de cada cobro, o más del 20%.**

**Dónde está:**

```
mercadopago.com.ar  ›  Tu perfil  ›  Configuración  ›  Situación fiscal
```

Los nombres de los menús cambian cada tanto. Si no lo encontrás, escribí "situación fiscal" en el buscador de la ayuda de MercadoPago.

**Qué completar:**

| Campo | Qué poner |
|---|---|
| Condición frente a ARCA (ex AFIP) | Monotributista, con tu categoría real |
| Ingresos Brutos | Santa Fe — local o Convenio Multilateral |

> **Por qué importa tanto.** Si figurás como "consumidor final", MercadoPago te retiene la alícuota más alta de todas, en cada cobro, todos los meses. Con veinte clientas eso es plata seria que no vuelve.

Y una pregunta para tu contador, sin apuro: **hasta cuántas clientas te aguanta tu categoría de monotributo.** MercadoPago le informa todo a ARCA automáticamente, así que mejor saberlo antes.

---

## Paso 3 — Crear la aplicación

`Esta parte la hacemos juntos` · `10 minutos`

Acá es donde se generan las tres claves. Está en una parte de MercadoPago pensada para programadores, así que está en un idioma medio marciano. **No la hagas sola.** En el paso 6 están las tres formas de resolverlo; elegís la que te resulte más cómoda y listo.

Para que sepas qué es lo que va a pasar, es esto:

```
mercadopago.com.ar/developers/panel  ›  Tus integraciones  ›  Crear aplicación
```

Se le pone un nombre —**Pia Moretto Web**—, se elige "pagos online", y de ahí salen dos cosas:

1. Las **claves** que conectan la web con tu cuenta.
2. Un **aviso automático** que MercadoPago le manda a la web cada vez que alguien paga. Eso es lo que hace que la clienta reciba el acceso en el momento, sin que vos hagas nada.

> **El detalle que se pierde si parpadeás.** Cuando se configura ese aviso, MercadoPago muestra una **clave secreta una sola vez**. Si se cierra la ventana sin copiarla, hay que generarla de nuevo. Por eso conviene hacer este paso acompañada.

---

## Paso 4 — Pasarme las claves sin que se filtren

`Lo hacés vos` · `2 minutos`

Una de esas claves —la que se llama **access token**— es como una llave de tu cuenta: quien la tiene puede generar cobros a tu nombre. No es tu contraseña, y no sirve para sacarte plata, pero igual se trata con el mismo cuidado.

**No va por WhatsApp, ni por mail, ni en una captura en un grupo.** Cualquiera de estas tres sirve:

- Un mensaje que se autodestruye después de leerse, tipo **onetimesecret.com**. Pegás la clave, te da un link, me pasás el link.
- Videollamada compartiendo pantalla, y la leo de ahí.
- La cargás vos misma donde va, y no me la pasás nunca.

> **Si alguna vez se te escapa.** Se entra a la aplicación, se aprieta **regenerar credenciales**, y la clave vieja deja de funcionar en el acto. No es un desastre irreversible.

---

## Paso 5 — Lo que no hay que tocar

Tres cosas que parecen buena idea y rompen el sistema:

- **No vuelvas a ofrecer transferencia al alias.** Una transferencia deja monto, fecha y un nombre —que muchas veces es el del marido o la madre—, así que no hay forma de saber quién pagó. Todo el circuito automático se cae.
- **No crees un "plan de suscripción" en el panel.** Suena a que hace falta y no: lo armamos de otra forma, justamente para que a las primeras veinte el precio les quede congelado cuando suba.
- **No cambies el nombre ni borres la aplicación** una vez que esté cobrando. Las claves cuelgan de ahí.

---

## Paso 6 — Cómo resolvemos el paso 3

`Elegís vos`

Las tres llegan al mismo lugar. Cambia cuánto tenés que hacer vos y cuánto acceso me das.

### Me sumás como colaborador — *la mejor*

MercadoPago tiene una función para que trabajes en equipo sin compartir nada: me invitás con mi mail, yo me creo mi propio usuario con mi propia contraseña, y vos elegís que sólo pueda tocar la parte técnica. **No veo tu plata ni puedo retirarla.** Y cuando termina el trabajo, me sacás con un clic.

### Videollamada de veinte minutos

Compartís pantalla, yo te voy diciendo dónde hacer clic y vos hacés. No me das acceso a nada y queda hecho en una sentada. Es lo más rápido si tenés el rato.

### Me prestás tu usuario y contraseña

Funciona, pero es la peor de las tres y no hace falta: te obliga a confiarme la cuenta entera, y después conviene cambiar la clave igual. Las dos de arriba logran lo mismo sin ese problema.

---

## La lista, para ir tildando

Los tres primeros los podés hacer hoy mismo sin esperarme.

- [ ] Cuenta a mi nombre, con mi CUIT, identidad verificada
- [ ] CBU cargado para retirar
- [ ] Condición fiscal y categoría de monotributo declaradas
- [ ] Ingresos Brutos de Santa Fe cargado
- [ ] Aplicación creada en el panel
- [ ] Aviso automático configurado y clave secreta copiada
- [ ] Las tres claves en manos de Juan Cruz
- [ ] Compra de prueba hecha, sin plata real

---

## Y después de esto, qué

Con las claves cargadas hago una compra de prueba de punta a punta: me suscribo yo con una tarjeta falsa que da MercadoPago, y verifico que la clienta reciba el acceso, que la venta quede anotada en la planilla y que se pueda cancelar. Todo eso sin que se mueva un peso de verdad.

Recién cuando eso funciona, se publica y se puede vender.

---

*Guía interna para Pía Moretto · agosto de 2026. Los nombres de los menús de MercadoPago cambian seguido: si algo no aparece igual que acá, sacale una foto a la pantalla y mandámela.*
