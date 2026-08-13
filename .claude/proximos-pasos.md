# Próximos Pasos — MP CEP

> Actualizar este archivo al final de cada sesión de trabajo.
> Última actualización: **2026-08-06 (sesión 4)**
> **Estado del proyecto:** Web terminada, accesible (Lighthouse) y subida a GitHub. Bloqueada sólo por 5 datos de negocio.

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
| **`docs/estrategia/08-grupos-y-cadencia.md`** | **Cadencia de 14 días** |
| **`docs/estrategia/09-semana-cero.md`** | **Qué hace la persona entre que paga y arranca** |
| **`docs/estrategia/10-planes-y-niveles.md`** | **Precios, niveles, desbloqueo y qué pasa si tarda de más** |
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

---

## 🚧 BLOQUEANTES — 5 datos y desplegamos

Todos viven en [`src/lib/products.ts`](../src/lib/products.ts).

- [x] ~~**B1 · Precio.**~~ **RESUELTO:** $40.000 por nivel (mes). Ya cargado en `PRICE_ARS`
- [ ] **B2 · Datos bancarios.** `TRANSFER`: alias, CBU, titular
- [ ] **B3 · WhatsApp AR.** Hoy hay un +34 español en `NEXT_PUBLIC_WHATSAPP_NUMBER`
- [ ] **B4 · Nombre del producto.** "Reto 28 Días" es working name → `CHALLENGE.name`
- [ ] **B5 · Fechas del grupo fundador.** `GROUP`: `startsAt`, `closesAt`, `startsAtISO`, cupos

> **Recomendación sobre B5:** cupo de la fundadora en **12-15**, no 25. El primer grupo es donde se rompen cosas, y de ahí salen los testimonios que venden los seis grupos siguientes.

### Bloqueantes de la sesión 4 — resueltos en la sesión 5

- [x] ~~**B6 · Precio del pack.**~~ **RESUELTO: $99.000.** Los $130.000 eran un error de cálculo. El pack ya está visible en la web y el `%` de descuento se calcula solo desde los dos precios (`PACK_DISCOUNT_PCT`)
- [x] ~~**B7 · Alcance del plan de $40.000.**~~ **RESUELTO.** Incluye todo lo que la web prometía: llamada 1:1 de bienvenida (Semana 0), guía de nutrición **estándar**, corrección de técnica en **sesión grupal semanal de 1 h los viernes**, comunidad en Skool + WhatsApp
- [x] ~~**B8 · Modelo de la asesoría 1:1.**~~ **RESUELTO.** $280.000/mes (mensual, no paquete), $350.000 con nutrición, **5 cupos** para la primera camada. **Sin precio público** — se vende sólo por conversación de WhatsApp
- [ ] **B9 · ¿Para cuándo está grabado el nivel 2?** Estimado: mediados de septiembre, **pendiente de confirmar con María Pía**. El grupo fundador termina el nivel 1 a los 28 días del arranque: ese es el deadline real

### 🚨 Bloqueantes nuevos de la sesión 5

- [ ] **B10 · Contenido de la guía de nutrición estándar.** Está prometida en la web y en los Términos. Hay que poder entregarla el día 1
- [ ] **B11 · Horario fijo de la sesión de los viernes.** Se anuncia antes de vender: es parte de lo que la persona compra. Cargar en `TECHNIQUE_SESSION`
- [ ] **B12 · Dónde termina Daiana y dónde empieza María Pía en el WhatsApp de la asesoría.** Se vende como contacto directo con ella; hay que definir la línea antes de vender el primer lugar, no después. Ver `10-planes-y-niveles.md` §8

### Pendientes de contenido (no bloquean el deploy, sí la venta)
- [ ] Grabar los 40-50 videos de ejercicios (2 medias jornadas)
- [ ] Grabar módulos 0 y 1 (1 media jornada)
- [ ] Grabar el VSL de 10 min → hoy apunta a un YouTube placeholder en `src/content/hero.ts`
- [ ] Testimonios reales con foto y permiso escrito → `src/content/stories.ts`
- [ ] Crear la comunidad en Skool
- [ ] Revisión legal de las 4 páginas por abogado
- [ ] Foto real del centro → `/images/centro-entrenamiento.png`

---



## ✅ Hecho en la sesión 4 (2026-08-06)

**Verificado:** `lint`, `typecheck` y `build` sin errores.

### Modelo de producto actualizado con los datos de María Pía
- **Precio: $40.000 por nivel** (antes había un placeholder de $29.900)
- **3 sesiones semanales de 50 a 60 minutos**, no 4 de 30 → corregido en todo el copy
- **Cada rutina en versión gimnasio y versión casa** → agregado como diferencial
- Estructura de niveles y reglas de acceso cargadas en `products.ts`: `LEVEL_ACCESS`, `PLANS`, `SESSIONS_PER_LEVEL`

### Copy realineado
El hero pasa de *"Treinta minutos para vos"* a **"Tres días para vos"**. Para alguien con jornada de 8+ horas, tres días fijos es un gancho más fuerte que la duración de cada sesión — y ahora además es verdad. Actualizados hero, about, testimonios, FAQ, SEO y keywords.

### Lo que NO se tocó, a propósito
La llamada 1:1 de bienvenida y la guía de nutrición **siguen en el copy con un TODO en el código**, porque María Pía no las confirmó para el plan de $40.000 y tampoco las descartó. No las saqué para no adivinar, pero **no se puede publicar el sitio hasta resolver B7**.

### Doc nuevo
`10-planes-y-niveles.md`: escalera completa, reglas de desbloqueo, las 5 reglas para quien tarda de más, y los dos bloqueantes de precio y alcance.

---

## ✅ Hecho en la sesión 5 (2026-08-13)

**Verificado:** `lint`, `typecheck` y `build` sin errores.

María Pía confirmó los 9 puntos que estaban abiertos. Los dos bloqueantes que impedían publicar (**B6** precio del pack, **B7** alcance del plan) quedaron cerrados.

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

### 1. Desplegar (bloqueado por B1-B5)
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

### 3. Producto (María Pía)
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

- **María Pía** — cámara, llamadas 1:1, corrección de técnica, comunidad en bloques (L y J 18-19h + live miércoles 19h). ~12-15 h/sem.
- **Daiana** — guiones, edición, publicación, lead magnets, primera línea de comentarios.
- **Juan Cruz** — web, n8n, ManyChat, Brevo, métricas, estrategia y precio.

**Regla:** si un humano hace la misma tarea >3 veces por semana, entra a la cola de automatización.

---

## ✅ Historial

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
