# Próximos Pasos — MP CEP

> Actualizar este archivo al final de cada sesión de trabajo.
> Última actualización: **2026-08-21 (sesión 14)**
> **Estado del proyecto:** **MercadoPago pasa a ser la única pasarela y WhatsApp deja de estar automatizado** (2026-08-18, sesión 12). El plan completo está en [`docs/estrategia/21-mercadopago-suscripciones.md`](../docs/estrategia/21-mercadopago-suscripciones.md). Antes, en la sesión 11, el producto ya había cambiado de forma: precios nuevos, sin garantía en el marketing, sin cohortes y sin llamadas → [`docs/estrategia/20-reto-siempre-abierto.md`](../docs/estrategia/20-reto-siempre-abierto.md).
> **🚀 FECHA DE LANZAMIENTO: 31 de agosto de 2026.**
> **El checkout de MercadoPago está construido (sesión 14). Lo que falta para publicar son las credenciales (B20) y una compra de prueba en sandbox.**

---

## 🆕 Sesión 14 — el checkout existe

Construido y verificado con `typecheck`, `lint` y `build` en verde:

| Pieza | Nota |
|---|---|
| `POST /api/checkout/suscripcion` | `preapproval` **sin plan asociado**. El importe sale de `products.ts`, nunca del cuerpo de la request: si viniera del cliente, cualquiera se suscribe por $1 |
| `POST /api/checkout/pack` | `preference` de pago único para el trimestral |
| `POST /api/webhooks/mercadopago` | Firma validada en tiempo constante **antes de tocar nada**. Probado contra el server real: firma válida → 200, firma rota / ausente / `request-id` cambiado → 401 |
| `/comprar` | Reescrita. Formulario de nombre + email contra los dos endpoints |
| `/bienvenida` | El acceso se muestra en pantalla, que es el canal principal. El email es el respaldo |
| `/cancelar` + link en el footer | Res. 424/2020. Registra el pedido en la pestaña `bajas` y explica la baja instantánea desde MercadoPago |
| Stripe | Borrado: `src/lib/stripe.ts`, las cuatro variables de entorno y la dependencia del `package.json` |

**Cambia la planilla:** `ventas` suma la columna `external_reference` **al final**, y hay una pestaña nueva `bajas`. Encabezados en `docs/setup/sheets/`.

**Variables de entorno nuevas** (las tres opcionales, el sitio compila sin ellas): `N8N_ONBOARDING_WEBHOOK_URL`, `NEXT_PUBLIC_SKOOL_INVITE_URL`, `NEXT_PUBLIC_WHATSAPP_GROUP_URL`. Se fue `NEXT_PUBLIC_MERCADOPAGO_SUBSCRIPTION_URL`: ya no hay link manual, lo crea el endpoint.

**Lo que NO se pudo hacer sin vos:**
1. **Cargar las variables en Vercel** — el MCP de Vercel no está autorizado en esta sesión
2. **Probar una compra en sandbox** — hace falta B20
3. **Reconectar A4 en n8n** al webhook nuevo, y crear en la planilla la pestaña `bajas` y la columna nueva de `ventas`
4. **Cómo se da el acceso a Skool hoy** — sigue sin respuesta, y de eso depende `NEXT_PUBLIC_SKOOL_INVITE_URL`

---

## 🔴 LEER PRIMERO AL RETOMAR

| Documento | Qué contiene |
|---|---|
| **[`docs/MANUAL-DEL-PROYECTO.md`](../docs/MANUAL-DEL-PROYECTO.md)** | **Todo el proyecto explicado sin tecnicismos. Para Notion y para crear contenido.** |
| `docs/estrategia/00-plan-maestro.md` | Fases, roles, métricas |
| `docs/estrategia/01-web-arquitectura.md` | Auditoría de la home (⚠️ el quiz quedó descartado) |
| `docs/estrategia/02-investigacion-mercado.md` | Qué convierte en coaching fitness online |
| `docs/estrategia/03-lead-magnets-calendario.md` | Lead magnets + calendario |
| `docs/estrategia/04-automatizaciones-n8n.md` | Catálogo original de automatizaciones (⚠️ desactualizado — ver doc 20 §8) |
| `docs/estrategia/05-skool-estructura.md` | Classroom + guion de grabación |
| `docs/estrategia/06-comunidad-respuestas.md` | IG + WhatsApp automatizados |
| ~~`docs/estrategia/07-circuito-compra-y-garantia.md`~~ | ⚠️ **SUPERADO.** El cobro por transferencia se eliminó — ver doc 21 |
| ~~`docs/estrategia/08-grupos-y-cadencia.md`~~ | ⚠️ **SUPERADO.** Ya no hay grupos |
| ~~`docs/estrategia/09-semana-cero.md`~~ | ⚠️ **SUPERADO.** La Semana 0 no existe |
| `docs/estrategia/10-planes-y-niveles.md` | Precios, niveles, desbloqueo y qué pasa si tarda de más |
| **`docs/estrategia/11-metodo-4f.md`** | **Mi Método 4F — naming, pilares y dónde aparece cada nombre** |
| ~~`docs/estrategia/12-whatsapp-cloud-api.md`~~ | ⚠️ **SUPERADO (sesión 12).** No se usa WhatsApp Cloud API. WhatsApp queda como comunidad manual |
| **`docs/estrategia/13-base-de-datos-sheet.md`** | **La planilla: 4 pestañas, columnas y service account** |
| **`docs/estrategia/14-n8n-infraestructura.md`** | **n8n Cloud, credenciales y orden de construcción** |
| **`docs/estrategia/15-skool-arranque.md`** | **Armado + guion del video de 8 min para Pía** |
| **`docs/estrategia/16-lanzamiento-creativos-calendario.md`** | **Secuencia de lanzamiento, creativos y calendario. Para Daiana** |
| **`docs/estrategia/17-test-ab-diseno.md`** | **Cómo se sirven varias pieles del sitio a la vez** |
| **`docs/estrategia/18-identidad-pia-moretto.md`** | **LOGOTIPO, TIPOGRAFÍA Y LOS 3 TEMAS. La identidad vigente** |
| **`docs/estrategia/19-flujos-n8n-construidos.md`** | **LOS 5 FLUJOS YA CONSTRUIDOS: qué hace cada uno, qué configurar, cómo probarlos** |
| **`docs/estrategia/20-reto-siempre-abierto.md`** | **⭐ Producto: precios, fin de las cohortes, garantía y renovación** |
| **`docs/estrategia/21-mercadopago-suscripciones.md`** | **⭐ MANDA SOBRE EL COBRO. MercadoPago único, suscripciones, qué se demuele y los costos reales** |
| **`docs/estrategia/22-brief-skool.md`** | **Brief autocontenido de Skool: marca, avatar, producto, tono. Para pasarle a otra IA o a Daiana** |
| **`docs/estrategia/23-skool-copy.md`** | **Todos los textos de Skool listos para pegar: reglas, bienvenida, módulos, niveles, emails** |
| **`docs/estrategia/24-acceso-skool-desde-mercadopago.md`** | **⭐ Cómo entra la clienta a Skool después de pagar: el circuito, los tres puntos manuales y el orden de build** |
| `docs/setup/n8n/*.json` | Los flujos listos para importar a n8n |
| `docs/setup/n8n/verificar.mjs` | Test de la lógica de cobro. `node docs/setup/n8n/verificar.mjs` |
| `docs/setup/sheets/*.csv` | Encabezados listos para importar a la planilla |
| `docs/estrategia/MP-CEP-Plan-Lead-Magnets.xlsx` | Plan de contenido en Excel (6 hojas) |

---

## ✅ Decisiones cerradas

| Tema | Decisión |
|---|---|
| Producto | **Reto 28 Días**, no personalizado. Programa 90 días → upsell |
| Nicho | Mujeres que trabajan 8+ h/día |
| Formato | Se vende como **reto** |
| Métrica principal | **Tasa de finalización** |
| **Cobro** | ~~Transferencia + comprobante por WhatsApp~~ → **MercadoPago, y sólo MercadoPago (2026-08-18)** ✅ |
| **Modelo de cobro** | **Suscripción con débito automático** (`preapproval`) para el nivel mensual · **pago único** (`preference`) para el pack de 3 ✅ |
| **Plan de suscripción** | **Sin plan asociado.** Cada suscripción lleva su propio monto, así que **quien entró a $55.000 se queda en $55.000 para siempre** sin migraciones ✅ |
| **Activación del onboarding** | ~~Pía responde `OK 1234` por WhatsApp~~ → **el webhook de MercadoPago. Pía sale del circuito** ✅ |
| **WhatsApp** | **Sólo comunidad, operado a mano. No se automatiza.** Se cae toda la infraestructura de Meta ✅ |
| **ManyChat** | **Se queda, con alcance acotado:** lead magnets en Instagram y derivación al link de pago. El resto lo responde Pía ✅ |
| **Garantía** | ~~10 días como argumento de venta~~ → **fuera del marketing (2026-08-18).** El derecho del art. 34 sigue vigente y vive en los T&C ✅ |
| **Grupos** | ~~Cada 14 días + Semana 0~~ → **SIN COHORTES (2026-08-18).** Cada clienta arranca el día que compra ✅ |
| **Urgencia** | **Precio fundador con fecha: $55.000 hasta el 30/09**, después sube. Reemplaza a los cupos ✅ |
| **Renovación** | ~~Aviso el día 25 y el 28, corte el 30~~ → **automática: la cobra MercadoPago.** El circuito de avisos queda **sólo para el pack**, que sí vence en fecha ✅ |
| **Cancelación** | **Autoservicio obligatorio.** Con débito automático, dar de baja tiene que ser tan fácil como suscribirse, y la Resolución 424/2020 exige botón de arrepentimiento en la home ✅ |
| **Modalidad** | **100% grabado y asincrónico.** Sin llamada de bienvenida, sin sesión grupal ✅ |
| **Correcciones** | **En Skool, no en el grupo de WhatsApp.** Un lote por semana en día fijo. En WhatsApp se hunden en el scroll y exponen más, y las que no se animan no mandan nada ✅ |
| **Segmentación de grupos** | **Por nivel (1/2/3), no por plan.** Separar trimestrales crea dos castas; separar por nivel es útil de verdad. Dividir recién a las 40-50 ✅ |
| **Triage de canales** | **Skool = clientas (técnicas + administrativas) · WhatsApp = todavía no compraron (ventas + comprobantes).** Para escribir por Skool hay que ser miembro ✅ |
| **Fecha de lanzamiento** | **31 de agosto de 2026** ✅ |
| Quiz / newsletter / formularios | **Ninguno en la web.** Cero formularios ✅ |
| CTAs | Uno flotante (comprar) + uno de WhatsApp |
| VSL | 10 minutos |
| Prioridad | Mobile primero |
| Rosario | Sólo como prueba de autoridad |
| **Palabra "cohorte"** | **Reemplazada por "grupo"** en web, código y docs ✅ |
| ~~**Semana 0**~~ | ~~Prepara y mide, no entrena~~ → **ELIMINADA (2026-08-18).** Existía para llenar la espera entre el pago y el inicio del grupo. Sin grupos no hay espera ✅ |
| **Prueba social** | **Repartida:** franja bajo el video + carrusel después del precio ✅ |
| **Accesibilidad** | **Token `mp-ember` para texto.** El naranja de marca no pasa contraste ✅ |
| **Precios** | **$55.000 un nivel/mes · $130.000 los 3 niveles** (–21% real). Actualizado 2026-08-18 ✅ |
| **Corrección de técnica** | **Asincrónica: la clienta sube el video a Skool y responde Pía.** Ya no hay sesión grupal ✅ |
| **Guía de nutrición** | **Estándar, no personalizada.** Explicitado en FAQ y Términos ✅ |
| **Asesoría 1:1** | **$280.000/mes · $350.000 con nutrición · 5 cupos · sin precio público.** Es el único producto con WhatsApp directo y llamadas — esa es la línea que la separa del reto ✅ |
| **Acceso a los niveles** | **Ventana de 6 meses · desbloqueo al 80% · una pausa de 30 días** ✅ |
| **Nombre del método** | **"Mi Método 4F" (Fuerza, Función, Flexibilidad, Foco).** Convive con "Reto 28 Días": el método es el sistema, el reto es la oferta ✅ |
| **Proveedor de WhatsApp** | **Meta Cloud API (oficial).** Evolution descartado por riesgo de baneo ✅ |
| **Número de WhatsApp** | **Línea nueva dedicada.** El personal de MP queda intacto — un número en la API deja de funcionar en la app ✅ |
| **Publicidad paga en el lanzamiento 1** | **No. 100% orgánico.** Sin testimonios no hay con qué anunciar, y son 15 lugares ✅ |
| **Segunda web** | **Test A/B de diseño con sistema de temas**, no un repositorio clonado ✅ |
| **Nombre** | **"Pía", no "María Pía".** Marca: **Pía Moretto**. Logotipo `P│M` ✅ |
| **Tipografía** | **Fraunces (titulares) + Newsreader (texto) + Montserrat (utilidad)**. Quiche es comercial y no se puede usar en web sin licencia. Bodoni Moda se probó y se descartó: ilegible en cifras y texto chico ✅ |
| **Diseño publicado** | **Piel `pia`: fondo claro y naranja de la paleta original + tipografía del logotipo P│M.** Decidido mirando las tres en pantalla ✅ |
| **Pieles** | **`pia` (la que se publica, por defecto) + `moretto` y `moretto-dark` sólo para comparar.** La tipografía ya no cambia entre pieles ✅ |

---

## 🚧 BLOQUEANTES — 2 datos y publicamos

Todos viven en [`src/lib/products.ts`](../src/lib/products.ts).

- [x] ~~**B1 · Precio.**~~ **RESUELTO y actualizado el 2026-08-18:** $55.000 por nivel. Ya cargado en `PRICE_ARS`
- [x] ~~**B2 · Datos bancarios.**~~ **YA NO APLICA (sesión 12).** No se cobra por transferencia. `TRANSFER` se elimina de `products.ts`
- [x] ~~**B3 · WhatsApp AR.**~~ **RESUELTO 2026-08-21:** `+54 9 3416 13-4367`. Cargado en `.env.example` y en `.env.local`. **Falta cargarlo en Vercel** (`NEXT_PUBLIC_WHATSAPP_NUMBER=5493416134367`) y redeployar: hasta entonces producción sigue mandando al +34
- [x] ~~**B4 · Nombre del producto.**~~ **RESUELTO 2026-08-17.** "Reto 28 Días" se queda como nombre de la oferta. Se suma **"Mi Método 4F"** como nombre del método, por encima. Ver `11-metodo-4f.md`
- [x] ~~**B5 · Fechas del grupo fundador.**~~ **YA NO APLICA (2026-08-18).** Se eliminaron las cohortes: cada clienta arranca el día que compra. Esto desbloqueó de un saque A5, A25 y A26 — que en realidad se cancelaron, porque existían para sostener los grupos

- [ ] **B20 · Credenciales de MercadoPago.** Access token de **test y de producción**, public key, y el **secret del webhook** que se genera en "Tus integraciones". Van directo a Vercel y a n8n — nunca al chat. **Es el bloqueante nuevo para publicar:** sin esto no hay forma de cobrar
- [ ] **B21 · Condición fiscal de Pía en el panel de MercadoPago.** Es un campo, y separa que le retengan ~3% de que le retengan 20%+. Verificar además IIBB de Santa Fe: el monotributo es nacional y la provincia cobra Ingresos Brutos aparte. Y mirar el tope de la categoría — MercadoPago informa todo a ARCA automáticamente

- [ ] **B19 · ¿A cuánto sube el precio el 1 de octubre?** **Propuesto: $69.000 el nivel y $165.000 el pack** — +25% sobre el fundador, debajo de la barrera de los $70.000, y mantiene el descuento del pack en 20% exacto, así que el copy no cambia. **Falta que Pía lo apruebe.** No hace falta publicarlo, pero la suba tiene que ocurrir: una promo que no vence nunca es publicidad engañosa (art. 8, Ley 24.240) y quema la próxima fecha que anunciemos

### Bloqueantes de la sesión 4 — resueltos en la sesión 5

- [x] ~~**B6 · Precio del pack.**~~ **RESUELTO: $99.000.** Los $130.000 eran un error de cálculo. El pack ya está visible en la web y el `%` de descuento se calcula solo desde los dos precios (`PACK_DISCOUNT_PCT`)
- [x] ~~**B7 · Alcance del plan de $40.000.**~~ **RESUELTO.** Incluye todo lo que la web prometía: llamada 1:1 de bienvenida (Semana 0), guía de nutrición **estándar**, corrección de técnica en **sesión grupal semanal de 1 h los viernes**, comunidad en Skool + WhatsApp
- [x] ~~**B8 · Modelo de la asesoría 1:1.**~~ **RESUELTO.** $280.000/mes (mensual, no paquete), $350.000 con nutrición, **5 cupos** para la primera camada. **Sin precio público** — se vende sólo por conversación de WhatsApp
- [ ] **B9 · ¿Para cuándo está grabado el nivel 2?** Estimado: mediados de septiembre, **pendiente de confirmar con Pía**. El grupo fundador termina el nivel 1 a los 28 días del arranque: ese es el deadline real

### 🚨 Bloqueantes nuevos de la sesión 5

- [ ] **B10 · Contenido de la guía de nutrición estándar.** Está prometida en la web y en los Términos. Hay que poder entregarla el día 1
- [x] ~~**B11 · Horario fijo de la sesión de los viernes.**~~ **YA NO APLICA (2026-08-18).** No hay sesión grupal
- [ ] **B12 · Dónde termina Daiana y dónde empieza Pía en el WhatsApp de la asesoría.** Se vende como contacto directo con ella; hay que definir la línea antes de vender el primer lugar, no después. Ver `10-planes-y-niveles.md` §8

### 🚨 Bloqueante nuevo de la sesión 6

- [ ] **B13 · ¿Los 4F están de verdad en las rutinas?** La presentación de naming afirma que Fuerza, Función, Flexibilidad y Foco "son los ejes reales de cada rutina". **Es una promesa verificable en la primera semana.** Pregunta única para Pía: *"¿Podés mostrarme, en la rutina de una semana cualquiera, dónde está cada uno de los cuatro pilares?"* Hasta que responda, el copy los presenta como **principios que guían el método**, no como bloques de cada sesión. Ver `11-metodo-4f.md` §3

### 🚨 Bloqueantes nuevos de la sesión 7

- [x] ~~**B14 · ¿Claro u oscuro?**~~ **RESUELTO 2026-08-17.** Claro, y con el naranja de la paleta original. La piel `pia` combina eso con la tipografía del logotipo. Las dos monocromas quedan sólo como comparación
- [ ] **B15 · SVG oficial del logotipo.** Exportarlo desde Canva. Hoy el monograma está reconstruido con tipografía web; integrar el oficial son 10 minutos
- [ ] **B16 · Nombre fiscal real.** `SITE.fiscalName` dice "Pía Moretto", pero las páginas legales necesitan el nombre de la constancia de AFIP
- [ ] **B17 · Dominio.** El código ya dice `hola@piamoretto.com` y ese dominio **no existe todavía**. Registrarlo o cambiar el mail antes de publicar
- [ ] **B18 · ¿Se licencia Quiche para la web?** Hoy se usa Fraunces como sustituta. Las piezas de Canva seguirían con Quiche. Decisión de marca, no urgente

### Pendientes de contenido (no bloquean el deploy, sí la venta)
- [ ] **Grabar los videos explicativos del método y de cómo usar todo.** Nuevo el 2026-08-18: reemplazan a la llamada 1:1 de bienvenida y son lo primero que ve la clienta al entrar. Sin esto el onboarding queda mudo
- [ ] Grabar los 40-50 videos de ejercicios (2 medias jornadas)
- [ ] Grabar módulos 0 y 1 (1 media jornada)
- [ ] Grabar el VSL de 10 min → hoy apunta a un YouTube placeholder en `src/content/hero.ts`
- [ ] Testimonios reales con foto y permiso escrito → `src/content/stories.ts`
- [ ] Crear la comunidad en Skool
- [ ] Revisión legal de las 4 páginas por abogado
- [ ] Foto real del centro → `/images/centro-entrenamiento.png`

---



## ✅ Hecho en la sesión 7 (2026-08-17)

**Verificado:** `lint`, `typecheck` y `build` sin errores **en los tres temas**. Contraste WCAG verificado con luminancia real en las tres pieles, incluidas las opacidades.

Llegó el logotipo nuevo y con él un cambio de identidad, no un retoque.

### De "María Pía" a "Pía Moretto"
Renombrado en los 29 lugares del código: copy, mensajes precargados de WhatsApp, metadatos y datos estructurados. La marca pasa de la sigla "MP CEP" al nombre propio — que es lo que corresponde para vender a $40.000 y sostener una asesoría de $280.000.

### Sistema de logotipos, no un archivo
Cuatro piezas reutilizables en `Logo.tsx`: monograma, firma, lockup vertical y versión horizontal enlazada. **Reconstruido con tipografía en lugar de incrustar una imagen**, para que herede el color del tema, sea nítido a cualquier tamaño y sea texto real para lectores de pantalla y para Google. La barra del `P│M` es un elemento de 1px, no el carácter `|`.

### Tipografía: tres roles
**Quiche no se puede usar en la web.** Es comercial (Adam Ladd, vía Adobe Fonts/MyFonts) y la licencia de Canva cubre lo que diseñás dentro de Canva, no publicarla como webfont. Se sustituye por **Fraunces** *(en la sesión 8 se había elegido Bodoni Moda; ver sesión 9 abajo para por qué se cambió)*.

El sustituto más parecido era Playfair Display (~85%), pero es **la serif por defecto de todo sitio hecho con IA** y se reconoce de lejos.

Sistema: **Fraunces** (titulares) + **Newsreader** (texto) + **Montserrat** (utilidad, sale del propio logotipo). Dos serifas que se distinguen por rol y contraste de trazo — que es lo que evita que serif+serif se lea como un error de carga.

### Modo oscuro pensado, no invertido
Tres correcciones que un modo oscuro apurado no hace:
1. Ni `#000` de fondo ni `#FFF` de texto — vibra, cansa y produce halo en OLED
2. El cuerpo sube de peso 400 a 450 y suma tracking, porque el texto claro sobre oscuro florece ópticamente

### Accesibilidad — dos fallos encontrados y corregidos
Se verificó cada combinación de los tres temas **incluyendo las opacidades** (`text-mp-carbon/70`, `/80`), que es donde nadie mira. Aparecieron dos fallos reales en las etiquetas de 11px: **4,38:1** en el tema claro y **4,20:1** en el oscuro, los dos por debajo del 4,5 exigido. Corregidos a **4,94:1** y **4,83:1**. A ojo habrían pasado desapercibidos.

---

## ✅ Hecho en la sesión 8 (2026-08-17)

**Verificado:** `lint`, `typecheck` y `build` sin errores en las tres pieles. Y esta vez **verificado a ojo**: capturas reales a 390px de ancho (iPhone) y a 1280px, con Brave en modo headless.

### La decisión de diseño
Se miraron las tres versiones en pantalla y salió una cuarta, que es la que se publica: **fondo claro y naranja de la paleta original, con la tipografía y el logotipo nuevos encima**. Es la piel `pia`, y es la que compila Vercel sin configurar nada.

Las dos monocromas (`moretto`, `moretto-dark`) quedan en el repositorio sólo para comparar. **La tipografía ya no cambia entre pieles** — es de la marca, no de la variante. Lo único que las separa es el color, que es lo que hace honesta la comparación.

### Dos bugs reales encontrados al mirar el celular
Ninguno de los dos se veía compilando; los dos se veían en la captura.

1. **El guion de "50-60 min" era invisible.** Causa: el tamaño óptico estaba fijado a mano en 96 —el corte de display de la Bodoni— para *todo* el texto. A 20px eso adelgaza los trazos finos hasta hacerlos desaparecer. **Arreglo:** `font-optical-sizing: auto`, que es para lo que existe el eje: el navegador lo deriva del tamaño real de cada texto. La piel oscura sigue fijándolo en 11 a propósito, que es el único caso donde pisar el automático sirve.
2. **Restos de la tipografía anterior.** El `font-feature-settings: "ss01","cv11"` del CSS era de Inter, que ya no se usa. Un tag de OpenType no significa lo mismo en dos familias distintas, así que arrastrarlo es pedir un cambio de forma a ciegas. Eliminado.

### Limpieza
Manrope e Inter ya no las usa ninguna piel: se sacaron del `layout.tsx`. Con eso vuelve la precarga de fuentes —que había que desactivar cuando convivían cinco familias— y cada página baja tres, no cinco.

### Documentación puesta al día
`branding.md` y `rules/frontend/styles.md` decían Manrope + Inter y hablaban de un `tailwind.config.ts` que no existe. Corregidos, con las dos reglas nuevas que salieron de los bugs de arriba.

### ⚠️ Pendiente menor detectado
En **desktop**, la línea "Grupo fundador · quedan N lugares" de la barra de compra cae encima de la foto del hero y queda ilegible. Es anterior a estos cambios. Se arregla poniéndole fondo o moviéndola. → **Resuelto en la sesión 9.**

---

## ✅ Hecho en la sesión 9 (2026-08-17)

**Verificado:** `lint`, `typecheck` y `build` limpios en las tres pieles, más capturas a 390px y a 1280px de cada cambio.

### La Bodoni se cambió por Fraunces
Pía la vio en la web publicada y marcó lo mismo desde dos lados: **"40.000" parecía "10.000"**, el **4** de "Mi Método 4F" parecía un **1**, y las **F** de Fuerza / Función / Flexibilidad / Foco perdían el brazo.

No era un bug de configuración: es lo que hace una Didone. Bodoni tiene los trazos finos casi sin espesor — se ve preciosa a 56px y **se desarma abajo de ~24px**, que es donde vive la mitad del texto de esta web y, peor, donde vive el precio. Arreglarlo dentro de la Bodoni no se podía; había que cambiar de familia.

**Fraunces** conserva lo que a Pía le gustaba —minimalista, limpia, editorial— con contraste moderado, así que aguanta los 16px del precio. Y de paso **se parece más a Quiche que la Bodoni**: Quiche no es una Didone, es una serif suave de serifas flaradas, que es exactamente el gesto de Fraunces. Newsreader y Montserrat no se tocan.

### La barra de compra: la escasez se movió adentro
La línea "quedan N lugares" estaba **debajo** de la barra, sin fondo propio, así que flotaba sobre lo que hubiera detrás: sobre la foto del hero desaparecía, sobre una sección clara reaparecía. Se movió **adentro del botón**, sobre el fondo tinta, donde siempre se lee. Se acortó a "Quedan N lugares" para que entre en un renglón en mobile.

Lo que ocupaba ese lugar —"sin renovación automática"— no se pierde: ya estaba en la sección de qué incluye y en el FAQ, que es donde alguien lo busca.

### Rendimiento: las fuentes precargadas bajaron 44%
De **281 KB a 157 KB** en cada primera visita, sin cambiar un píxel. Dos hallazgos, los dos verificados comparando capturas antes y después:

1. **Los ejes `SOFT` y `WONK` de Fraunces no hacían falta** — sus valores por defecto ya eran los que queríamos. Pedirlos sólo para escribir el valor que ya tenían costaba **52 KB**
2. **Newsreader no necesita el eje `opsz`** — el texto de lectura vive a un solo tamaño, así que el eje no llegaba a trabajar. Otros **72 KB**

Regla nueva en `rules/frontend/styles.md`: cada eje variable que se pide en `next/font` hay que poder justificarlo, porque lo paga toda visitante.

### La lección que quedó escrita
Los tres bugs de tipografía de este proyecto pasaron `typecheck`, `lint`, `build` y la auditoría de contraste **sin que saltara nada**. Compilar no es ver. Ahora está como regla: cualquier cambio de tipografía, de color de texto o de elemento flotante se mira en captura a 390px de ancho real antes de commitear.

---

## ✅ Hecho en la sesión 10 (2026-08-17)

**Verificado:** los 5 flujos pasan el validador de archivos y **27 casos de lógica de negocio**, con `node docs/setup/n8n/verificar.mjs`. La web no se tocó.

Sesión de automatizaciones. Se construyeron los flujos que hacen la venta, listos para importar: `docs/setup/n8n/*.json`. El detalle está en **`docs/estrategia/19-flujos-n8n-construidos.md`**.

### Apareció un flujo que no estaba en el plan: A0 · Router
El plan tenía A3 y A3-bis como dos flujos independientes, cada uno con su disparador de WhatsApp. **No puede funcionar:** Meta permite **una sola URL de callback por aplicación**, así que uno de los dos habría quedado mudo — y sin dar ningún error, que es lo peor. A0 es ahora el único que escucha a Meta y reparte hacia adentro.

**Regla nueva:** si algún día se agrega otro flujo que reaccione a WhatsApp, se le suma una salida al switch de A0. Nunca otro disparador de WhatsApp.

### Lo que se construyó
| Flujo | Qué hace |
|---|---|
| **A0** | La única puerta de entrada de WhatsApp. Reparte según quién escribió |
| **A3** | Recibe el comprobante, arma la venta, la guarda en Drive, avisa a Pía |
| **A3-bis** | Lee el `OK 1234` de Pía, confirma o rechaza, fija hasta cuándo tiene acceso |
| **A4** | Le da el acceso a la alumna: WhatsApp + Brevo + fila en `comunidad` |
| **A99** | Avisa por WhatsApp cuando cualquier otro se rompe |

### Tres decisiones de diseño que vale recordar
1. **El código de 4 dígitos se asigna en el primer contacto**, no cuando la venta se completa. Es lo que da una clave estable desde el minuto cero, y es lo que hace que reenviar un mensaje actualice la fila que ya existe en vez de crear una segunda. Sin eso, la clienta que manda el texto y después la foto genera dos ventas.
2. **El comprobante se sube a Drive.** Meta borra los archivos a los 30 días: un comprobante de pago que desaparece no sirve ni para discutir con una clienta ni para la contadora.
3. **A3 no piensa en mensajes, piensa en el estado de la venta.** `esperando → pendiente → confirmado`. En la vida real la clienta manda dos o tres mensajes en cualquier orden, y a veces los reenvía.

### La idempotencia quedó probada, no prometida
`verificar.mjs` corre la lógica sin n8n, sin credenciales y sin internet: extrae los dos nodos que piensan y los ejecuta contra casos armados a mano. Los que importan de verdad:
- Un segundo `OK 1234` **no** genera un segundo acceso ni un segundo mail
- Un mensaje vacío **no** borra el email que llegó en el anterior
- Una venta devuelta **no** se reabre con un `OK`
- El generador no repite un código en uso en 300 intentos seguidos

### Dos trampas encontradas y documentadas
- **Google Drive no funciona con la cuenta de servicio.** Una service account no tiene cuota de almacenamiento propia: la subida del comprobante devuelve `Service Accounts do not have storage quota` y la venta se corta ahí. Drive va con OAuth2. Sheets sí funciona con la cuenta de servicio, porque no crea archivos. **Son dos credenciales de Google distintas y las dos hacen falta.**
- **WhatsApp sólo deja mandar mensajes libres dentro de las 24 h** desde el último mensaje de esa persona. Responderle a una clienta siempre entra en la ventana; **avisarle a Pía no**. Por eso los avisos al equipo van con plantilla aprobada por Meta y los mensajes a las clientas no.

### Lo urgente que sale de acá
**Crear las 2 plantillas de mensaje en Meta es lo primero**, porque Meta las revisa y puede tardar un día. Los textos exactos están en el doc 19 §7.

---

## ✅ Hecho en la sesión 11 (2026-08-18) — el producto cambió de forma

Pía cambió cuatro cosas del producto y **eso movió la web entera, los flujos y seis documentos**. Todo el porqué está en **[`docs/estrategia/20-reto-siempre-abierto.md`](../docs/estrategia/20-reto-siempre-abierto.md), que manda sobre cualquier documento anterior.**

**Verificado:** `npm run build` limpio, `npm run lint` limpio, y `node docs/setup/n8n/verificar.mjs` pasa **29 casos de lógica** (dos nuevos: la ventana de 6 meses del pack y el contador de renovaciones).

### Las cuatro decisiones

| | Antes | Ahora |
|---|---|---|
| Un nivel | $40.000 | **$55.000/mes** |
| Los 3 niveles | $99.000 | **$130.000** (–21% real) |
| Garantía | En la portada | **Fuera del marketing** |
| Inicio | Por grupos, cada 14 días | **El día que compra** |

Y con las cohortes se cayeron la llamada 1:1 de bienvenida, la sesión grupal de los viernes y la Semana 0. El reto pasa a ser **100% grabado**.

### Tres cosas que se le marcaron a Juan Cruz antes de tocar nada

1. **La garantía no se puede quitar del todo: es ley.** El art. 34 de la Ley 24.240 da 10 días de revocación en toda compra a distancia y **es irrenunciable**, no importa el ticket. Lo que se quitó es la garantía como *argumento de venta* — badge, sección, página `/garantia`. El derecho quedó escrito en los T&C, sección 5. Si una clienta la pide en plazo, se le devuelve igual.
2. **Sin cohortes se cae el motor de urgencia de toda la web.** "25 lugares" y "cierra el viernes" estaban en el hero, la barra de compra, el CTA final y los datos estructurados. Borrarlos sin reemplazo deja la oferta sin ninguna razón para comprar hoy. Se reemplazó por el **precio fundador con fecha**.
3. **Se estaba borrando la línea entre el Reto y la Asesoría 1:1.** Si en el reto de $55.000 hay corrección por WhatsApp directo con Pía, la asesoría de $280.000 se queda sin nada que la justifique — y 40 clientas mandando videos al teléfono personal es exactamente el trabajo que se estaba tratando de eliminar. **En el reto la consulta va a Skool.** Es la regla operativa que sostiene los dos productos.

### Lo que reemplazó a la escasez: precio fundador
$55.000 rige **hasta el 30 de septiembre** y después sube. Es verdadero y verificable, a diferencia de un cupo inventado. **Condición no negociable: el 1 de octubre tiene que subir de verdad** (B19).

### Renovación mensual — lo que faltaba en el plan
El plan de un nivel da 28 días. No hay débito automático, así que la sostiene una automatización nueva: aviso el día 25, aviso el 28, baja de Skool y del grupo el 31. Está en los T&C sección 3 y en `RENEWAL`.

### Cambió el esquema de la planilla
| Pestaña | Qué pasó |
|---|---|
| `ventas` | Se fueron `grupo`, `fecha_llamada` y `garantia_vence`. Entraron **`acceso_vence`** y **`renovaciones`** |
| `comunidad` | `grupo` → **`fecha_inicio`** |

`fecha_inicio` no es cosmético: sin cohortes ya no hay una fecha de arranque compartida, así que **el día del reto en que va cada alumna sólo se puede calcular contra el día en que entró ella**. Sin esa columna, A6 no puede detectar abandono.

> ⚠️ **Si la planilla ya se creó, hay que rehacer los encabezados** de `ventas` y `comunidad` desde `docs/setup/sheets/*.csv`.

### Tres automatizaciones que faltaban en la lista
**A27 · Renovación.** Sin esto, cobrar $55.000 por mes es cobrar $55.000 una vez. **Es el siguiente flujo a construir** y no depende de ningún bloqueante: la fecha contra la que cuenta ya la escribe A3-bis. Circuito confirmado por Juan Cruz: **aviso el día 25, aviso el día 28, corte de acceso el día 30.**
**A6 · Retención.** Producto grabado, sin llamadas: si una clienta desaparece el día 9 nadie se entera. Y sin finalización no hay renovación, ni testimonio, ni upsell.
**A28 · Triage de WhatsApp.** Sin llamadas, todo desemboca en el teléfono de Pía.

**Testimonios y upsell van después del lanzamiento** — no por prioridad, sino porque no hay clientas todavía. El primer testimonio existe el día 28 de la primera compra, a fines de septiembre.

### Se cancelaron cuatro flujos
A5 (Semana 0), A25 (aviso 48 h), A26 (día 1) y A24 (lista de espera). Los cuatro existían para sostener las cohortes. **Efecto colateral bueno:** B5 —las fechas del grupo fundador— dejó de ser bloqueante.

### Documentos que quedaron obsoletos
`08-grupos-y-cadencia.md` y `09-semana-cero.md` llevan aviso de **SUPERADO**. `07` lleva aviso parcial (el circuito de cobro sigue valiendo, la garantía y los grupos no). `04` y `MANUAL-DEL-PROYECTO.md` llevan aviso de desactualizado con el detalle de qué capítulos ya no valen.

### Lo que hay que hacer ya
1. **Las 2 plantillas de Meta** — sigue siendo lo primero, Meta tarda hasta un día en revisarlas
2. **Rehacer los encabezados de la planilla** si ya se creó
3. **Construir A27** — es lo único que separa un negocio mensual de una venta única
4. Decidir **B19**: a cuánto sube el precio el 1 de octubre

---

## ✅ Hecho en la sesión 12 (2026-08-18) — MercadoPago único, WhatsApp fuera

**No se tocó una línea de `src/`.** Esta sesión fue decisión y documentación: el build del
checkout arranca en la próxima, con aprobación explícita, porque toca áreas de dinero.

### Las dos decisiones

1. **MercadoPago es la única forma de pagar.** Se elimina el cobro por transferencia.
2. **WhatsApp deja de estar automatizado.** Queda como canal de comunidad, a mano.

Son la misma decisión mirada de dos lados: todo el aparato de WhatsApp existía para que un
humano pudiera confirmar transferencias sin equivocarse. Sacado el problema, sobra la
infraestructura.

### La pregunta que hay que dejar contestada

*"¿Y si Pía da el alias de su MercadoPago, no se automatiza igual?"* **No.** MercadoPago
manda webhooks para **pagos** (algo que generaste vos, con `external_reference`), no para
**movimientos de cuenta**. Una transferencia al alias no dispara nada.

Y el problema de fondo no es detectar la plata: es **saber de quién es**. Con todas pagando
el mismo importe, dos clientas que transfieren el mismo martes son indistinguibles, y muchas
veces el titular no es la clienta. **El corte no es banco contra MercadoPago: es
transferencia anónima contra cobro identificado.**

### Se eligió suscripción, no pago único

Débito automático desde el arranque. Se descartó "pago único ahora, suscripción en octubre".
Consecuencia buena: **A27 se encoge a la mitad** — MercadoPago cobra y reintenta solo, y lo
que queda es manejar el rechazo definitivo, más el circuito completo para el pack.

Decisión de diseño registrada: **`preapproval` sin plan asociado**, para que quien entró al
precio fundador lo conserve sin migraciones. Convierte la promesa en algo literalmente
cierto.

### Se cancela el trámite más lento que teníamos

**Las 2 plantillas de mensaje en Meta ya no van.** Tampoco la app de WhatsApp Cloud API, ni
el token, ni el número dedicado. Era lo que había que empezar primero por los tiempos de
revisión de Meta; ahora no existe.

### Se demuelen tres flujos construidos

`A0-router-whatsapp.json`, `A3-recepcion-comprobante.json` y `A3bis-confirmacion.json`.
Estaban construidos y verificados en la sesión 10. No es trabajo perdido: eran la respuesta
correcta a "no hay API bancaria para cuentas personales". La pregunta cambió.

**A4 sobrevive** con disparador nuevo (el webhook) y sin el brazo de WhatsApp. **A99 y A6
sobreviven** pero avisan por email.

### El modo de falla nuevo, y su mitigación

Sin WhatsApp, el onboarding queda en email más Skool. Si el mail cae en spam, **una clienta
pagó y no entró**, y no nos enteramos hasta que reclama. Por eso `/bienvenida` tiene que
mostrar el acceso ahí mismo —links a Skool y al grupo, primeros pasos— y no decir "revisá tu
correo". El email pasa a ser respaldo. Media hora de trabajo contra el peor caso del sistema.

### Apareció una obligación legal

Con débito automático, **cancelar tiene que ser tan fácil como suscribirse**, y la
**Resolución 424/2020** exige **botón de arrepentimiento visible en la home**. Con
transferencia era discutible; ahora no. Va al build.

### Los costos, verificados

~7,6% real con crédito inmediato (6,29% + IVA), ~3,9% con débito, ~2,2% difiriendo a 35
días. **Presupuestar 10-12% all-in** contando retenciones. Detalle y fuentes en el doc 21 §9.

---

## 📊 Rendimiento — el informe de PageSpeed, leído

Juan Cruz pasó las capturas del informe mobile. Lo que dicen, y qué hacer con eso.

**Las fuentes no eran el problema.** En el informe **no aparece ninguna auditoría de fuentes**: están precargadas y con `display: swap`, así que no bloquean el renderizado. Los 124 KB que se ahorraron en la sesión 9 son ancho de banda real —y en un 4G argentino se notan— pero no van a mover mucho la puntuación.

**Accionable, por orden:**

1. **JavaScript antiguo — 14 KiB.** El más claro. Se están mandando polyfills de `Array.at`, `Array.flat`, `Object.fromEntries`, `Object.hasOwn` y `String.trimStart` a todo el mundo. Todos existen en cualquier navegador desde 2021. Next los incluye porque **no hay `browserslist` en `package.json`** (verificado). Declarar uno moderno: 14 KiB menos, cero riesgo con una audiencia de móviles argentinos
2. **CSS que bloquea el renderizado — 450 ms estimados.** 9,6 KiB de Tailwind en un viaje aparte antes de dibujar nada. Next 16 puede incrustarlo en el HTML (`experimental.inlineCss`). Verificar que la opción esté estable en 16.2.4 antes de darlo por hecho
3. **La animación no compuesta.** Es el halo del CTA (`mp-cta-ring` en `globals.css`): anima `box-shadow`, que obliga a repintar en cada cuadro. Se reescribe con `opacity` sobre un pseudo-elemento. Cosmético
4. **Los 79 KiB de "JavaScript sin usar" — no perseguir.** Son React y el runtime de Next. Lighthouse los marca en toda aplicación Next del planeta. 134 KiB totales de JS es magro para lo que hace este sitio

**Aparte:** hay **seis dependencias instaladas que no se importan en ningún lado** — `framer-motion`, `embla-carousel-autoplay`, `react-calendly`, `zustand`, `react-hook-form` y `@hookform/resolvers`. No pesan en el navegador, pero engordan la instalación. Y `framer-motion` está en `optimizePackageImports` del `next.config.ts` optimizando algo que no existe.

- [ ] Aplicar 1 y 2 (quince minutos entre las dos)
- [ ] Sacar las 6 dependencias sin usar
- [ ] Volver a medir después del deploy de la sesión 9, que es posterior al informe

---

## ✅ Hecho en la sesión 6 (2026-08-17)

**Verificado:** `lint`, `typecheck` y `build` sin errores, **en las dos variantes de tema**. 9 rutas estáticas.

Sesión de arranque del sprint. El objetivo era desbloquear la ejecución paralela: que Juan Cruz pueda crear todas las cuentas sin esperar, y que Daiana pueda empezar a producir contenido sin esperar tampoco.

### Mi Método 4F entró al producto
Naming aprobado (propuesta de Daiana). **El método y la oferta conviven:** "Mi Método 4F" es el sistema, "Reto 28 Días" es lo que se compra. Los dos nombres hacen trabajos distintos — un reto genera urgencia y fecha de arranque, un método sobrevive al cambio de formato. Sacar uno rompía algo.

En el código: constante `METHOD` en `products.ts` con los cuatro pilares, y sección nueva `Method.tsx` entre "para quién" y "qué recibís". **Los CTA siguen hablando del reto**, no del método: "Comprá Mi Método 4F" deja el "mi" ambiguo justo en el botón que cobra.

**Se detectó un riesgo y quedó como B13.** La presentación dice que los 4F son "los ejes reales de cada rutina". Eso es verificable por cualquier alumna en la primera semana, mientras corre la garantía. Hasta que Pía confirme, el copy los presenta como principios, no como bloques de cada sesión.

### Cuatro guías de infraestructura, escritas para ejecutar sin conocimiento técnico
- **`12-whatsapp-cloud-api.md`** — el paso a paso completo de Meta. Incluye la parte que sorprende a todos: **un número en la API deja de funcionar en la app de WhatsApp**, por eso va línea nueva. Y las pruebas salen gratis con el número prestado de Meta contra el teléfono español de Juan Cruz.
- **`13-base-de-datos-sheet.md`** — las 4 pestañas columna por columna, más `docs/setup/sheets/*.csv` para importar. Se agregaron dos columnas que el plan original no tenía: `codigo` (los 4 dígitos del `OK 1234`) y `garantia_vence`, sin la cual nadie puede responder "¿está en plazo?" sin sacar la cuenta a mano.
- **`14-n8n-infraestructura.md`** — n8n Cloud, cómo se cargan las credenciales sin que pasen por un chat, y el orden de construcción de los 10 flujos. **A3 y A3-bis son el corazón:** con esos dos solos el negocio ya funciona.
- **`15-skool-arranque.md`** — checklist de armado, **guion minuto a minuto del video de 8 min** para Pía, y el PDF de 1 página.

### Estrategia de lanzamiento — la decisión fuerte
**`16-lanzamiento-creativos-calendario.md`.** El lanzamiento del grupo fundador va **100% orgánico, sin un peso en anuncios**, por tres razones: no hay testimonios con qué anunciar, son 15 lugares que se llenan con la audiencia actual, y todavía no sabemos cuánto vale una clienta — sin ese número, cualquier presupuesto es una apuesta.

Cuatro fases contadas en días antes del Día 1 (calendario relativo, porque B5 sigue abierto). Se hablan tres semanas del problema **antes** de mencionar el producto.

**Detectado un problema en las fechas provisorias:** con cierre el 4/9 y arranque el 7/9, la Semana 0 queda en dos días, cuando está diseñada como una semana. Recomendación: correr el Día 1 al 14/9. Se decide junto con B5.

### Sistema de temas para el test A/B
Segunda web resuelta **como tema, no como repositorio clonado**. Mismo copy, misma estructura, mismo `products.ts` — cambia color, tipografía y forma del logo vía `NEXT_PUBLIC_THEME`.

Fue barato (un par de horas) porque el sitio ya estaba tokenizado: **un solo hex hardcodeado en todo `src/`**. Variante B "Editorial": papel cálido + verde profundo + Fraunces/Karla, con contraste de texto de **7,1:1** (mejor que la variante A). Se aparta del manual de marca a propósito y **necesita el OK de Pía antes de ver tráfico real**.

Las dos compilan. Falta el segundo proyecto en Vercel (10 min) y el reparto por cookie (sólo si se va a medir en serio, cosa que con este tráfico todavía no tiene sentido estadístico).

### Corrección de documentación
`05-skool-estructura.md` §6 decía que las correcciones de técnica eran **jueves 18-18:45, 45 min**. Contradecía la decisión de la sesión 5 (**sesión grupal de 1 h los viernes**), que es la que está prometida en la web y en los Términos. Corregido, con la nota de por qué.

---

## ✅ Hecho en la sesión 4 (2026-08-06)

**Verificado:** `lint`, `typecheck` y `build` sin errores.

### Modelo de producto actualizado con los datos de Pía
- **Precio: $40.000 por nivel** (antes había un placeholder de $29.900)
- **3 sesiones semanales de 50 a 60 minutos**, no 4 de 30 → corregido en todo el copy
- **Cada rutina en versión gimnasio y versión casa** → agregado como diferencial
- Estructura de niveles y reglas de acceso cargadas en `products.ts`: `LEVEL_ACCESS`, `PLANS`, `SESSIONS_PER_LEVEL`

### Copy realineado
El hero pasa de *"Treinta minutos para vos"* a **"Tres días para vos"**. Para alguien con jornada de 8+ horas, tres días fijos es un gancho más fuerte que la duración de cada sesión — y ahora además es verdad. Actualizados hero, about, testimonios, FAQ, SEO y keywords.

### Lo que NO se tocó, a propósito
La llamada 1:1 de bienvenida y la guía de nutrición **siguen en el copy con un TODO en el código**, porque Pía no las confirmó para el plan de $40.000 y tampoco las descartó. No las saqué para no adivinar, pero **no se puede publicar el sitio hasta resolver B7**.

### Doc nuevo
`10-planes-y-niveles.md`: escalera completa, reglas de desbloqueo, las 5 reglas para quien tarda de más, y los dos bloqueantes de precio y alcance.

---

## ✅ Hecho en la sesión 5 (2026-08-13)

**Verificado:** `lint`, `typecheck` y `build` sin errores.

Pía confirmó los 9 puntos que estaban abiertos. Los dos bloqueantes que impedían publicar (**B6** precio del pack, **B7** alcance del plan) quedaron cerrados.

### Precios
- **Pack de 3 niveles: $99.000**, visible en la web. Los $130.000 eran un error de cálculo
- El porcentaje de descuento **no se escribe a mano**: `PACK_DISCOUNT_PCT` lo deriva de los dos precios. Si mañana cambia alguno, el descuento anunciado se corrige solo y nunca puede quedar mintiendo
- La página `/comprar` pasa de mostrar un precio único a dejar **elegir entre los dos planes**
- La barra flotante dice **"Desde $40.000"**, porque ahora hay dos precios

### Alcance confirmado — y un cambio de copy importante
Todo lo que la web prometía está incluido, con **una diferencia de fondo**: la corrección de técnica no es "grabás y te devuelvo", es una **sesión grupal de 1 hora, día fijo (viernes)**.

Reescrito como argumento de venta: *"se aprende tanto de tu video como del de las demás"*. Y es la decisión operativa correcta — la corrección individual asincrónica no escala (25 alumnas = 25 conversaciones abiertas toda la semana), la sesión grupal tiene costo fijo, genera comunidad y le da ritual a la semana.

La guía de nutrición queda explicitada como **estándar, no personalizada**, tanto en el FAQ como en los Términos. Esa frase corta la única devolución previsible en ese punto.

### Asesoría 1:1
$280.000/mes y $350.000 con nutrición, **5 cupos**, **sin precio público**. Se menciona sólo dentro del FAQ "¿es personalizado?" y deriva a WhatsApp (`CONTACT.advisoryUrl`, mensaje precargado listo).

### Términos y Condiciones actualizados
Ya no describen un producto que no existe: dos planes con sus precios, ventana de 6 meses, desbloqueo al 80%, pausa de 30 días, corrección grupal y no individual, y la asesoría 1:1 declarada como servicio aparte.

---

## ✅ Hecho en la sesión 3 (2026-08-06)

**Verificado:** `lint`, `typecheck` y `build` sin errores.

### "Cohorte" → "grupo"
Renombrado en todo: copy de la web, identificadores del código (`GROUP`, `GROUP_CADENCE_DAYS`, `isGroupOpen`), legales y los 12 documentos. `COHORT` ya no existe en el repo.

### Accesibilidad — los 3 errores de Lighthouse, corregidos
1. **Contraste.** El naranja de marca `#F2A31B` sobre el fondo da **1,92:1** — muy por debajo del 4,5:1 exigido. Se creó el token **`mp-ember` `#8F5600` (5,49:1)** exclusivamente para texto. El naranja sigue en botones, íconos y bordes, donde sí pasa. Verificado con cálculo de luminancia real, no a ojo.
2. **Listas.** `HowItWorks` metía un `<div>` entre el `<ol>` y los `<li>`. Se resolvió con `RevealOnScroll as="li"`.
3. **Áreas táctiles.** Los dots del carrusel eran de 6px. Ahora son botones de 44×44 con el punto visual adentro.

### Los 10 checks manuales, revisados
Encabezados sin saltos (h1→h2→h3 verificado sobre el HTML renderizado), 1 `main` / 1 `header` / 1 `footer` / 2 `nav` / 1 `aside`, cero secciones sin `aria-label`, cero imágenes sin `alt`, cero `<li>` huérfanos, `lang="es-AR"`, skip-link presente.

**Agregado además:** `aside` con label para la barra flotante, roles ARIA de carrusel (`aria-roledescription`), Escape para cerrar el menú mobile, y **foco visible global** en `:focus-visible`.

### Prueba social reordenada
Nuevo componente `SocialProofBar` (2 citas cortas) justo debajo del video, y el carrusel completo **movido a después del precio**. Fundamento y fuentes al final de `01-web-arquitectura.md`.

### Semana 0 diseñada
`docs/estrategia/09-semana-cero.md`: 5 entregables obligatorios, 5 mini-retos, qué se mide, cronograma según cuántos días falten, y el caso de quien compra 1-3 días antes del inicio.

---

## ✅ Hecho en la sesión 2 (2026-08-04)

**Verificado:** `lint`, `typecheck` y `build` sin errores. 9 rutas estáticas. Commiteado y subido a GitHub.

### Garantía a 10 días
Cambiada en `GUARANTEE.days` y propagada a toda la web y las legales. Se detectó que el art. 34 de la Ley 24.240 obliga a 10 días irrenunciables en ventas a distancia: ofrecer 7 no reducía la obligación, sólo generaba dos plazos distintos. Ahora coinciden y el mensaje es uno solo.

### Sistema de grupos escalonadas
- `GROUP_CADENCE_DAYS = 14` → grupo nuevo cada dos semanas
- `GROUP.isFounding` → cambia el copy del hero para el primer lanzamiento
- **Semana 0** incorporada al copy: quien compra entra el mismo día a la preparación, así la espera hasta el día 1 no se siente como espera
- FAQ nueva: "Si compro hoy, ¿cuándo empiezo?"

### Circuito de compra
Confirmada la opción 1: MP mira el banco y responde `OK 1234` por WhatsApp. Documentado en `07` §2.2.

### Formularios
Cero. Verificado: no queda ningún `<form>`, `<input>` ni ruta de API en el proyecto.

### Documentación
- `docs/MANUAL-DEL-PROYECTO.md` — manual completo en lenguaje no técnico, con glosario, todo el razonamiento del negocio y un banco de ideas de contenido. Para Notion.
- `docs/estrategia/08-grupos-y-cadencia.md` — la decisión de cadencia con su fundamento

---

## 📋 Próximo bloque de trabajo

### 0. Sprint de la semana — quién hace qué

> ⚠️ **Cancelado en la sesión 12:** Meta Business, la app de WhatsApp Cloud API, las 2
> plantillas de mensaje, el número dedicado y la carpeta de Drive para comprobantes. Si no
> lo empezaste, no lo empieces. Si ya lo empezaste, no sigas.

**Tuyo (Juan Cruz), con las manos, en este orden:**
- [ ] **B20 · Credenciales de MercadoPago** — access token de test y de producción, public key, secret del webhook. **Es lo primero: sin esto no se puede cobrar**
- [ ] **B21 · Condición fiscal de Pía en el panel de MercadoPago** — vale varios puntos de margen
- [ ] **Planilla de Google + service account** → `13-base-de-datos-sheet.md` §4
- [ ] **n8n Cloud + invitarme como Admin** → `14-n8n-infraestructura.md` §3
- [ ] **Cuenta de Skool + esqueleto + video de 8 min** → `15-skool-arranque.md` §5 y §6
- [ ] **Conseguir de Pía:** B10, B12, B13, B19
- [ ] **B3 · WhatsApp AR** — ya no es bloqueante técnico, pero el grupo de comunidad lo necesita

**Mío:** ~~los flujos de cobro y onboarding~~ **hechos (sesión 10), y demolidos en la 12** · ~~A5, A25, A26, A24~~ **cancelados (sesión 11)** · **el checkout de MercadoPago (lo próximo)** · reescribir `/comprar`, `HowItWorks` y la cláusula de pago de los Términos · reconectar A4 al webhook · A27 (sólo el pack), A2 (CRM), A6, A1, A23 · ManyChat · el segundo proyecto en Vercel.

**De Daiana:** ejecutar `16-lanzamiento-creativos-calendario.md`.

**De Pía, urgente:** los **videos explicativos del método y de cómo funciona todo** — reemplazan a la llamada de bienvenida y son lo primero que ve una clienta al entrar, así que sin ellos el onboarding queda mudo. Después, los **4 reels del método** (uno por pilar), que son los que traen gente.

> ⚠️ **La prueba gratis de Skool vence a los 14 días.** El lanzamiento es el **31/08**: si la creás hoy (18/08) vence el 1/09, justo después. Está justo, pero da. Anotá la fecha.

### 1. El checkout de MercadoPago (bloqueado por B20) — objetivo 31/08

**Es el camino del dinero y hoy no existe: no hay una sola ruta de API en el proyecto.**
`src/lib/mercadopago.ts` tiene el wrapper de preferencias y nada más. Plan completo en
[`docs/estrategia/21-mercadopago-suscripciones.md`](../docs/estrategia/21-mercadopago-suscripciones.md) §3.

- [ ] `POST /api/checkout/suscripcion` — crea el `preapproval` con `external_reference`, devuelve el `init_point`
- [ ] `POST /api/checkout/pack` — la preferencia de pago único de los $130.000
- [ ] `POST /api/webhooks/mercadopago` — **valida `x-signature` antes de tocar nada.** HMAC-SHA256 sobre `id:{data.id};request-id:{x-request-id};ts:{ts};`, comparación en tiempo constante, `401` sin escribir si no coincide
- [ ] `/bienvenida` — el acceso a la vista, para que no dependa del email
- [ ] `/cancelar` + **botón de arrepentimiento en la home** (Resolución 424/2020)
- [ ] Reescribir `/comprar` (hoy muestra alias y CBU) y `HowItWorks`
- [ ] Eliminar `TRANSFER` de `products.ts` y actualizar la cláusula de pago de los Términos
- [ ] Nuevo esquema de `ventas`: salen `codigo` y `comprobante_url`, entran `suscripcion_id`, `estado_suscripcion` y `proximo_cobro`
- [ ] Cargar env vars en Vercel + probar en **sandbox**: alta, cobro recurrente, rechazo y cancelación
- [ ] **Verificar en sandbox qué medios de pago habilita realmente el `preapproval` en Argentina** antes de prometerlo en la web
- [ ] Smoke test en celular real, de punta a punta

### 2. Automatizaciones n8n

**Demolidos en la sesión 12.** Estaban construidos y verificados, y quedaron sin razón de
ser al salir el cobro por transferencia. Los archivos siguen en `docs/setup/n8n/` como
referencia, pero **no se importan a n8n**:

- [x] ~~**A0** · Router de WhatsApp~~ — **MUERE.** Existía porque Meta permite una sola URL de callback por app
- [x] ~~**A3** · Recepción de comprobante~~ — **MUERE.** No hay comprobante que recibir
- [x] ~~**A3-bis** · Parser de `OK 1234`~~ — **MUERE.** El webhook de MercadoPago lo reemplaza

**Sobreviven, con cambios:**
- [x] ~~**A4** · Onboarding~~ — **disparador nuevo (el webhook) y sin el brazo de WhatsApp.** Queda Skool + Brevo + fila en `comunidad`
- [x] ~~**A99** · Centinela de errores~~ — **cambia de canal: avisa por email**, no por WhatsApp

**Para encenderlos:**
- [ ] Importar A4 y A99 en n8n
- [ ] Cargar las credenciales de Google Sheets y Brevo (**ya no hace falta Drive ni WhatsApp**)
- [ ] **Rehacer los encabezados de `ventas` y `comunidad`** — el esquema cambió en la sesión 11 y otra vez en la 12

**Lo que falta construir, por orden:**
- [ ] **A27** · Renovación — **alcance reducido a la mitad.** MercadoPago cobra y reintenta solo. Queda: (a) manejar el rechazo definitivo → cortar acceso y pedir que actualice el medio de pago; (b) el circuito completo de aviso y corte **para el pack**, que sí vence en fecha
- [ ] **A2** · CRM de leads y clientas: seguimientos, recordatorios, consultas, encuestas. *Sin bloqueantes*
- [ ] **A6** · Detección de abandono — cuenta desde `comunidad.fecha_inicio`, avisa por email. *Necesita la comunidad en Skool*
- [ ] **A1** · Captura de lead desde Instagram — *necesita ManyChat*
- [ ] **A23** · Circuito de devolución del art. 34 — ahora incluye la baja de la suscripción
- [ ] **A29** · Captura de testimonios y upsell — *después del lanzamiento: el primer testimonio existe a fines de septiembre*

**Cancelados en la sesión 11:** A5 (Semana 0), A25, A26 y A24. Dependían de las cohortes.
**Cancelado en la sesión 12:** A28 (triage de WhatsApp) — sin automatización de WhatsApp no hay nada que clasificar.

### 3. Producto (Pía)
- [ ] Skool: estructura completa en `05-skool-estructura.md` §3
- [ ] Grabación por tandas — formato de video en `05` §4

### 4. Contenido (Daiana)
- [ ] Los 4 lead magnets ancla (Excel, hoja 1)
- [ ] Plantilla base de PDF en Canva con tokens de marca
- [ ] Arrancar el calendario (Excel, hoja 2)

---

## 🧠 A no olvidar

1. **Nada de formularios en la web.** La captura va en Instagram vía ManyChat.
2. **Vender "reto", no "curso".**
3. **Nadie espera para empezar.** Se compra y se entrena el mismo día. Si alguna vez vuelve a aparecer una espera entre el pago y el día 1, vuelve con ella el problema que la Semana 0 trataba de tapar.
4. **El derecho de revocación de 10 días existe aunque no lo promocionemos.** No es una política nuestra: es el art. 34 de la Ley 24.240 y es irrenunciable. Si una clienta lo pide en plazo, se devuelve, sin discutir.
5. **En el reto, la consulta va a Skool.** Si empiezan a llegar al WhatsApp personal de Pía, la asesoría de $280.000 deja de justificarse y el producto "fácil de operar" le come el día igual.
6. **El precio fundador tiene que subir el 1 de octubre.** Una promoción que no vence nunca es publicidad engañosa y quema la próxima fecha que anunciemos.
7. **Una transferencia al alias de MercadoPago no dispara ningún webhook.** MercadoPago avisa de *pagos* (los que generás vos, con `external_reference`), no de *movimientos de cuenta*. Y aunque avisara, no sabrías de quién es. El corte es transferencia anónima contra cobro identificado.
8. **La firma del webhook se valida antes de escribir una sola celda.** Sin `x-signature` válida: `401` y nada más. Si no, cualquiera que adivine la URL se da de alta gratis.
9. **`/bienvenida` muestra el acceso, no dice "revisá tu correo".** Sin WhatsApp, el email es el único canal, y un mail en spam es una clienta que pagó y no entró.
10. **Cancelar tiene que ser tan fácil como suscribirse.** Con débito automático es obligación legal, no cortesía (Resolución 424/2020).
11. **El acuse de recibo del comprobante es automático aunque la verificación sea manual.**
12. **Una sola conversación por pedido de devolución.** Si insiste, se devuelve.
13. **Las primeras clientas no son para facturar, son para generar testimonios.**
14. **Automatizar la velocidad, no la relación.**
15. **Graba cada ejercicio una sola vez** — programación y biblioteca van separadas.

---

## 🔧 Notas técnicas

**Interruptor de grupo:** `GROUP.status = "waitlist"` en `products.ts` convierte todos los CTAs del sitio en lista de espera y cambia `/comprar` por el mensaje de inscripción cerrada. Dos ediciones cada 14 días: una para cerrar, otra para abrir.

**Dependencias sin usar** — verificado contando imports en `src/` el 2026-08-17. Cero imports: `framer-motion`, `zustand`, `embla-carousel-autoplay`, `react-calendly`, `react-hook-form`, `@hookform/resolvers`. No van al bundle, pero engordan la instalación y `framer-motion` figura en `optimizePackageImports` optimizando algo que no existe. **`mercadopago`, `stripe` y `googleapis` SÍ se importan** (3, 3 y 1 vez) desde las libs desactivadas de abajo — sacarlas rompe el typecheck.

**Libs sin usar.** `src/lib/brevo.ts` y `sheets.ts` los maneja n8n. **`mercadopago.ts` deja de estar desactivado y pasa a ser el centro del sistema (sesión 12)** — hoy sólo tiene el wrapper de `Preference`; le falta todo el lado de `preapproval`. **`stripe.ts` se puede borrar:** no hay cobro en USD y MercadoPago es la única pasarela.

**Lint:** 0 errores. Se corrigió `RevealOnScroll` moviendo el manejo de `prefers-reduced-motion` a CSS.

---

## 💰 Números

| Concepto | Valor |
|---|---|
| Stack mensual | ~USD 115-140 (bajó: se cae WhatsApp Cloud API) |
| Comisión de MercadoPago | ~7,6% real con crédito · **presupuestar 10-12% all-in** con retenciones |
| Punto de equilibrio | 5-6 ventas/mes |
| Objetivo grupo 1 | 15 alumnas (cupo sugerido 12-15) |
| Techo actual | ~25/mes (limitado por las llamadas 1:1) |
| Horas manuales | 34 h/sem → 6 h/sem automatizado |

---

## 👥 Equipo

- **Pía** — cámara, llamadas 1:1, corrección de técnica, comunidad en bloques (L y J 18-19h + live miércoles 19h). ~12-15 h/sem.
- **Daiana** — guiones, edición, publicación, lead magnets, primera línea de comentarios.
- **Juan Cruz** — web, n8n, ManyChat, Brevo, métricas, estrategia y precio.

**Regla:** si un humano hace la misma tarea >3 veces por semana, entra a la cola de automatización.

---

## ✅ Historial

### Sesión 12 — 2026-08-18
**MercadoPago pasa a ser la única pasarela y WhatsApp deja de estar automatizado.** Se elimina el cobro por transferencia · el onboarding lo dispara el webhook, Pía sale del circuito · suscripción con débito automático (`preapproval` **sin plan asociado**, para que el precio fundador se conserve sin migraciones) + pago único para el pack · **se demuelen A0, A3 y A3-bis**, construidos en la sesión 10 · A4 y A99 sobreviven con cambios · A28 cancelado · **se cancela toda la infraestructura de Meta**, incluidas las plantillas de mensaje · aparece el botón de arrepentimiento como obligación legal (Resolución 424/2020) · B2 muerto, B3 degradado, **B20 y B21 nuevos** · doc 21 como fuente de verdad del cobro · **no se tocó `src/`: el build arranca en la sesión 13**

### Sesión 11 — 2026-08-18
El producto cambió de forma: precios a $55.000 / $130.000 · garantía fuera del marketing (el derecho del art. 34 queda en los T&C) · **sin cohortes**, cada clienta arranca el día que compra · sin llamada 1:1 ni sesión grupal · precio fundador hasta el 30/09 como reemplazo de la escasez · renovación mensual con corte de acceso · esquema de la planilla actualizado · A5/A24/A25/A26 cancelados, A27/A28/A29 agregados · doc 20 como fuente de verdad · **lanzamiento fijado para el 31/08**

### Sesión 10 — 2026-08-17
Flujos de cobro y onboarding construidos (A0, A3, A3-bis, A4, A99) · A0 · Router aparece porque Meta permite un solo webhook por app · idempotencia probada con 27 casos en `verificar.mjs` · comprobantes a Drive porque Meta los borra a los 30 días · dos trampas documentadas (Drive necesita OAuth2, WhatsApp necesita plantillas fuera de las 24 h) · informe de PageSpeed leído

### Sesión 9 — 2026-08-17
Fraunces en vez de Bodoni (la Didone se desarmaba en cifras chicas: "40.000" parecía "10.000") · la escasez se movió adentro de la barra de compra · fuentes precargadas −44% (281→157 KB) · regla nueva: compilar no es ver

### Sesión 8 — 2026-08-17
Diseño elegido mirando capturas reales · piel `pia` (claro + naranja + tipografía nueva) como la que se publica · guion invisible por tamaño óptico fijado a mano, corregido · restos de Inter eliminados · docs de branding al día

### Sesión 7 — 2026-08-17
Identidad Pía Moretto · sistema de logotipos · tipografía de 3 roles · modo oscuro con corrección de tamaño óptico · 2 fallos de contraste corregidos

### Sesión 6 — 2026-08-17
Mi Método 4F en producto y código · 6 documentos nuevos (WhatsApp, Sheet, n8n, Skool, lanzamiento, A/B) · sistema de temas para el test A/B · lanzamiento definido como 100% orgánico · B4 resuelto, B13 abierto

### Sesión 5 — 2026-08-13
Pack a $99.000 · alcance del plan confirmado · corrección de técnica grupal los viernes · asesoría 1:1 sin precio público · Términos reescritos

### Sesión 4 — 2026-08-06
Modelo de niveles · precio $40.000 · 3 sesiones de 50-60 min · gym o casa · detectadas dos inconsistencias (pack más caro que mensual, y alcance del plan sin confirmar)

### Sesión 3 — 2026-08-06
Cohorte → grupo · accesibilidad (contraste, listas, áreas táctiles, checks manuales) · prueba social repartida · diseño de la Semana 0

### Sesión 2 — 2026-08-04
Garantía a 10 días · grupos cada 14 días + Semana 0 · circuito de compra opción 1 confirmado · cero formularios · manual del proyecto para Notion · doc de grupos · primer push a GitHub

### Sesión 1 — 2026-08-04
Web reconstruida completa: secciones nuevas, copy al nicho, CTA flotante único, carrusel de testimonios, `/comprar`, `/garantia`, legales argentinas, SEO técnico

### Sesión 0 — 2026-08-03
Investigación de mercado · 7 documentos de estrategia · modelo de negocio redefinido · Excel de lead magnets

### Mayo 2026
Landing inicial en Next.js con MercadoPago/Stripe/Brevo/Sheets (hoy removidos o desactivados) · branding aplicado
