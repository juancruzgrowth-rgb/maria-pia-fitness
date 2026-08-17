# Próximos Pasos — MP CEP

> Actualizar este archivo al final de cada sesión de trabajo.
> Última actualización: **2026-08-17 (sesión 8)**
> **Estado del proyecto:** Diseño **cerrado y verificado en mobile**: identidad Pía Moretto (logotipo `P│M` + tipografía) sobre el fondo claro y el naranja de la paleta original. Método 4F integrado. Toda la infraestructura documentada paso a paso.
> **Semana de sprint: objetivo de tener todo listo para el 23/08. Plazo máximo comprometido: 30/08.**
> **Para publicar faltan 3 datos: B2 (datos bancarios), B3 (WhatsApp argentino) y B5 (fechas y cupos del grupo fundador).**

---

## 🔴 LEER PRIMERO AL RETOMAR

| Documento | Qué contiene |
|---|---|
| **[`docs/MANUAL-DEL-PROYECTO.md`](../docs/MANUAL-DEL-PROYECTO.md)** | **Todo el proyecto explicado sin tecnicismos. Para Notion y para crear contenido.** |
| `docs/estrategia/00-plan-maestro.md` | Fases, roles, métricas |
| `docs/estrategia/01-web-arquitectura.md` | Auditoría de la home (⚠️ el quiz quedó descartado) |
| `docs/estrategia/02-investigacion-mercado.md` | Qué convierte en coaching fitness online |
| `docs/estrategia/03-lead-magnets-calendario.md` | Lead magnets + calendario |
| `docs/estrategia/04-automatizaciones-n8n.md` | 22 automatizaciones (A1-A22) |
| `docs/estrategia/05-skool-estructura.md` | Classroom + guion de grabación |
| `docs/estrategia/06-comunidad-respuestas.md` | IG + WhatsApp automatizados |
| `docs/estrategia/07-circuito-compra-y-garantia.md` | Cobro, garantía, devoluciones |
| `docs/estrategia/08-grupos-y-cadencia.md` | Cadencia de 14 días |
| `docs/estrategia/09-semana-cero.md` | Qué hace la persona entre que paga y arranca |
| `docs/estrategia/10-planes-y-niveles.md` | Precios, niveles, desbloqueo y qué pasa si tarda de más |
| **`docs/estrategia/11-metodo-4f.md`** | **Mi Método 4F — naming, pilares y dónde aparece cada nombre** |
| **`docs/estrategia/12-whatsapp-cloud-api.md`** | **Paso a paso de Meta. LO PRIMERO A EJECUTAR** |
| **`docs/estrategia/13-base-de-datos-sheet.md`** | **La planilla: 4 pestañas, columnas y service account** |
| **`docs/estrategia/14-n8n-infraestructura.md`** | **n8n Cloud, credenciales y orden de construcción** |
| **`docs/estrategia/15-skool-arranque.md`** | **Armado + guion del video de 8 min para Pía** |
| **`docs/estrategia/16-lanzamiento-creativos-calendario.md`** | **Secuencia de lanzamiento, creativos y calendario. Para Daiana** |
| **`docs/estrategia/17-test-ab-diseno.md`** | **Cómo se sirven varias pieles del sitio a la vez** |
| **`docs/estrategia/18-identidad-pia-moretto.md`** | **LOGOTIPO, TIPOGRAFÍA Y LOS 3 TEMAS. La identidad vigente** |
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
| Cobro | Transferencia + comprobante por WhatsApp |
| **Activación del onboarding** | **Opción 1: MP responde `OK 1234` por WhatsApp** ✅ |
| **Garantía** | **10 días** (alineada con art. 34 Ley 24.240) ✅ |
| **Grupos** | **Cada 14 días** + Semana 0. Lanzamiento 1 = grupo fundador ✅ |
| Quiz / newsletter / formularios | **Ninguno en la web.** Cero formularios ✅ |
| CTAs | Uno flotante (comprar) + uno de WhatsApp |
| VSL | 10 minutos |
| Prioridad | Mobile primero |
| Rosario | Sólo como prueba de autoridad |
| **Palabra "cohorte"** | **Reemplazada por "grupo"** en web, código y docs ✅ |
| **Semana 0** | **Prepara y mide, no entrena.** Diseño completo en doc 09 ✅ |
| **Prueba social** | **Repartida:** franja bajo el video + carrusel después del precio ✅ |
| **Accesibilidad** | **Token `mp-ember` para texto.** El naranja de marca no pasa contraste ✅ |
| **Precios** | **$40.000 un nivel · $99.000 los 3 niveles** (–17,5% real) ✅ |
| **Corrección de técnica** | **Sesión grupal de 1 h, día fijo (viernes)** — no envíos individuales ✅ |
| **Guía de nutrición** | **Estándar, no personalizada.** Explicitado en FAQ y Términos ✅ |
| **Asesoría 1:1** | **$280.000/mes · $350.000 con nutrición · 5 cupos · sin precio público** ✅ |
| **Acceso a los niveles** | **Ventana de 6 meses · desbloqueo al 80% · una pausa de 30 días** ✅ |
| **Nombre del método** | **"Mi Método 4F" (Fuerza, Función, Flexibilidad, Foco).** Convive con "Reto 28 Días": el método es el sistema, el reto es la oferta ✅ |
| **Proveedor de WhatsApp** | **Meta Cloud API (oficial).** Evolution descartado por riesgo de baneo ✅ |
| **Número de WhatsApp** | **Línea nueva dedicada.** El personal de MP queda intacto — un número en la API deja de funcionar en la app ✅ |
| **Publicidad paga en el lanzamiento 1** | **No. 100% orgánico.** Sin testimonios no hay con qué anunciar, y son 15 lugares ✅ |
| **Segunda web** | **Test A/B de diseño con sistema de temas**, no un repositorio clonado ✅ |
| **Nombre** | **"Pía", no "María Pía".** Marca: **Pía Moretto**. Logotipo `P│M` ✅ |
| **Tipografía** | **Bodoni Moda (titulares) + Newsreader (texto) + Montserrat (utilidad)**. Quiche es comercial y no se puede usar en web sin licencia ✅ |
| **Diseño publicado** | **Piel `pia`: fondo claro y naranja de la paleta original + tipografía del logotipo P│M.** Decidido mirando las tres en pantalla ✅ |
| **Pieles** | **`pia` (la que se publica, por defecto) + `moretto` y `moretto-dark` sólo para comparar.** La tipografía ya no cambia entre pieles ✅ |

---

## 🚧 BLOQUEANTES — 3 datos y publicamos

Todos viven en [`src/lib/products.ts`](../src/lib/products.ts).

- [x] ~~**B1 · Precio.**~~ **RESUELTO:** $40.000 por nivel (mes). Ya cargado en `PRICE_ARS`
- [ ] **B2 · Datos bancarios.** `TRANSFER`: alias, CBU, titular
- [ ] **B3 · WhatsApp AR.** Hoy hay un +34 español en `NEXT_PUBLIC_WHATSAPP_NUMBER`
- [x] ~~**B4 · Nombre del producto.**~~ **RESUELTO 2026-08-17.** "Reto 28 Días" se queda como nombre de la oferta. Se suma **"Mi Método 4F"** como nombre del método, por encima. Ver `11-metodo-4f.md`
- [ ] **B5 · Fechas del grupo fundador.** `GROUP`: `startsAt`, `closesAt`, `startsAtISO`, cupos

> **Recomendación sobre B5:** cupo de la fundadora en **12-15**, no 25. El primer grupo es donde se rompen cosas, y de ahí salen los testimonios que venden los seis grupos siguientes.

### Bloqueantes de la sesión 4 — resueltos en la sesión 5

- [x] ~~**B6 · Precio del pack.**~~ **RESUELTO: $99.000.** Los $130.000 eran un error de cálculo. El pack ya está visible en la web y el `%` de descuento se calcula solo desde los dos precios (`PACK_DISCOUNT_PCT`)
- [x] ~~**B7 · Alcance del plan de $40.000.**~~ **RESUELTO.** Incluye todo lo que la web prometía: llamada 1:1 de bienvenida (Semana 0), guía de nutrición **estándar**, corrección de técnica en **sesión grupal semanal de 1 h los viernes**, comunidad en Skool + WhatsApp
- [x] ~~**B8 · Modelo de la asesoría 1:1.**~~ **RESUELTO.** $280.000/mes (mensual, no paquete), $350.000 con nutrición, **5 cupos** para la primera camada. **Sin precio público** — se vende sólo por conversación de WhatsApp
- [ ] **B9 · ¿Para cuándo está grabado el nivel 2?** Estimado: mediados de septiembre, **pendiente de confirmar con Pía**. El grupo fundador termina el nivel 1 a los 28 días del arranque: ese es el deadline real

### 🚨 Bloqueantes nuevos de la sesión 5

- [ ] **B10 · Contenido de la guía de nutrición estándar.** Está prometida en la web y en los Términos. Hay que poder entregarla el día 1
- [ ] **B11 · Horario fijo de la sesión de los viernes.** Se anuncia antes de vender: es parte de lo que la persona compra. Cargar en `TECHNIQUE_SESSION`
- [ ] **B12 · Dónde termina Daiana y dónde empieza Pía en el WhatsApp de la asesoría.** Se vende como contacto directo con ella; hay que definir la línea antes de vender el primer lugar, no después. Ver `10-planes-y-niveles.md` §8

### 🚨 Bloqueante nuevo de la sesión 6

- [ ] **B13 · ¿Los 4F están de verdad en las rutinas?** La presentación de naming afirma que Fuerza, Función, Flexibilidad y Foco "son los ejes reales de cada rutina". **Es una promesa verificable en la primera semana, justo mientras corre la garantía de 10 días.** Pregunta única para Pía: *"¿Podés mostrarme, en la rutina de una semana cualquiera, dónde está cada uno de los cuatro pilares?"* Hasta que responda, el copy los presenta como **principios que guían el método**, no como bloques de cada sesión. Ver `11-metodo-4f.md` §3

### 🚨 Bloqueantes nuevos de la sesión 7

- [x] ~~**B14 · ¿Claro u oscuro?**~~ **RESUELTO 2026-08-17.** Claro, y con el naranja de la paleta original. La piel `pia` combina eso con la tipografía del logotipo. Las dos monocromas quedan sólo como comparación
- [ ] **B15 · SVG oficial del logotipo.** Exportarlo desde Canva. Hoy el monograma está reconstruido con tipografía web; integrar el oficial son 10 minutos
- [ ] **B16 · Nombre fiscal real.** `SITE.fiscalName` dice "Pía Moretto", pero las páginas legales necesitan el nombre de la constancia de AFIP
- [ ] **B17 · Dominio.** El código ya dice `hola@piamoretto.com` y ese dominio **no existe todavía**. Registrarlo o cambiar el mail antes de publicar
- [ ] **B18 · ¿Se licencia Quiche para la web?** Hoy se usa Bodoni Moda como sustituta. Las piezas de Canva seguirían con Quiche. Decisión de marca, no urgente

### Pendientes de contenido (no bloquean el deploy, sí la venta)
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
**Quiche no se puede usar en la web.** Es comercial (Adam Ladd, vía Adobe Fonts/MyFonts) y la licencia de Canva cubre lo que diseñás dentro de Canva, no publicarla como webfont. Se sustituye por **Bodoni Moda**.

El sustituto más parecido era Playfair Display (~85%), pero es **la serif por defecto de todo sitio hecho con IA** y se reconoce de lejos. Bodoni Moda además tiene eje de tamaño óptico, que es lo que hace posible el modo oscuro.

Sistema: **Bodoni Moda** (titulares) + **Newsreader** (texto) + **Montserrat** (utilidad, sale del propio logotipo). Dos serifas que se distinguen por rol y contraste de trazo — que es lo que evita que serif+serif se lea como un error de carga.

### Modo oscuro pensado, no invertido
Tres correcciones que un modo oscuro apurado no hace:
1. Ni `#000` de fondo ni `#FFF` de texto — vibra, cansa y produce halo en OLED
2. **Las hairlines de la Bodoni se engrosan bajando el tamaño óptico de 96 a 11.** Sobre fondo oscuro los trazos finos de una serif de alto contraste directamente se desvanecen: es el error clásico. Se corrige con una línea de CSS, no agrandando el texto
3. El cuerpo sube de peso 400 a 450 y suma tracking, porque el texto claro sobre oscuro florece ópticamente

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
En **desktop**, la línea "Grupo fundador · quedan N lugares" de la barra de compra cae encima de la foto del hero y queda ilegible. Es anterior a estos cambios. Se arregla poniéndole fondo o moviéndola.

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

**Tuyo (Juan Cruz), con las manos, en este orden:**
- [ ] **Meta Business + app + número de prueba + tu español verificado** → `12-whatsapp-cloud-api.md` §5. Es lo primero porque el trámite de verificación del negocio tarda días
- [ ] **Planilla de Google + service account** → `13-base-de-datos-sheet.md` §4
- [ ] **n8n Cloud + invitarme como Admin** → `14-n8n-infraestructura.md` §3
- [ ] **Cuenta de Skool + esqueleto + video de 8 min** → `15-skool-arranque.md` §5 y §6
- [ ] **Conseguir de Pía:** B2, B5, B10, B11, B12, B13 y el chip de la línea nueva

**Mío:** los 10 flujos de n8n, cargar los datos en el código, ManyChat, el segundo proyecto en Vercel.

**De Daiana:** ejecutar `16-lanzamiento-creativos-calendario.md`.

**De Pía, urgente:** los **4 reels del método** (uno por pilar). Van antes que los 40-50 videos de ejercicios — son los que traen gente al grupo fundador.

> ⚠️ **La prueba gratis de Skool vence a los 14 días de crearla.** Si la creás hoy, vence el 31/08 — antes del lanzamiento. Anotá la fecha.

### 1. Desplegar (bloqueado por B2, B3, B5)
- [ ] Cargar los 5 datos en `products.ts` y `.env`
- [ ] Cargar env vars en Vercel (`NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_WHATSAPP_NUMBER`, `NEXT_PUBLIC_INSTAGRAM_URL`)
- [ ] Smoke test en celular real: barra flotante, copiar alias, abrir WhatsApp con el mensaje precargado

### 2. Automatizaciones n8n — orden de construcción
- [ ] Instalar n8n + crear el Sheet con 4 pestañas (`leads`, `ventas`, `contenido`, `comunidad`)
- [ ] **A1** · Captura de lead desde Instagram
- [ ] **A3** · Recepción de comprobante + acuse automático + ID de 4 dígitos
- [ ] **A3-bis** · Parser de `OK 1234` / `NO 1234` (idempotente: dos "OK" no pueden generar dos altas)
- [ ] **A4** · Onboarding: Skool + email + WhatsApp + grupo + reloj de garantía
- [ ] **A5** · Secuencia de 48 h (ahora es de Semana 0, no del reto)
- [ ] **A6** · Detección de abandono — diario los primeros 10 días, cuenta desde el día 1 del reto
- [ ] **A23** · Circuito de devolución
- [ ] **A24** · Lista de espera entre grupos
- [ ] **A25** · Aviso 48 h antes del día 1
- [ ] **A26** · Al día 1: activar módulo 2 y arrancar el check-in del grupo

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
3. **La Semana 0 es lo que hace tolerable la espera entre grupos.** Sin eso, 13 días de espera cuestan devoluciones.
4. **La espera nunca debe superar el plazo de la garantía.** Con 14 días de cadencia y 10 de garantía estamos justos: vigilar.
5. **El acuse de recibo del comprobante es automático aunque la verificación sea manual.**
6. **Una sola conversación por pedido de devolución.** Si insiste, se devuelve.
7. **El grupo 1 no es para facturar, es para generar testimonios.**
8. **Automatizar la velocidad, no la relación.**
9. **Graba cada ejercicio una sola vez** — programación y biblioteca van separadas.

---

## 🔧 Notas técnicas

**Interruptor de grupo:** `GROUP.status = "waitlist"` en `products.ts` convierte todos los CTAs del sitio en lista de espera y cambia `/comprar` por el mensaje de inscripción cerrada. Dos ediciones cada 14 días: una para cerrar, otra para abrir.

**Dependencias sin usar** (no molestan, no van al bundle, pero se pueden limpiar): `framer-motion`, `zustand`, `embla-carousel-autoplay`, `react-hook-form`, `@hookform/resolvers`, `mercadopago`, `stripe`, `googleapis`.

**Libs sin usar** que quedaron a propósito por si vuelve la pasarela: `src/lib/brevo.ts`, `sheets.ts`, `mercadopago.ts`, `stripe.ts`. Hoy esas integraciones las va a manejar n8n.

**Lint:** 0 errores. Se corrigió `RevealOnScroll` moviendo el manejo de `prefers-reduced-motion` a CSS.

---

## 💰 Números

| Concepto | Valor |
|---|---|
| Stack mensual | ~USD 160-185 |
| Punto de equilibrio | 7-8 ventas/mes |
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
