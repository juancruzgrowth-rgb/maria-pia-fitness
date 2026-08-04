# Próximos Pasos — MP CEP

> Actualizar este archivo al final de cada sesión de trabajo.
> Última actualización: **2026-08-04 (sesión 2)**
> **Estado del proyecto:** Web terminada, compilando y subida a GitHub. Bloqueada sólo por 5 datos de negocio.

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
| **`docs/estrategia/08-cohortes-y-cadencia.md`** | **Cadencia de 14 días + Semana 0** |
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
| **Cohortes** | **Cada 14 días** + Semana 0. Lanzamiento 1 = cohorte fundadora ✅ |
| Quiz / newsletter / formularios | **Ninguno en la web.** Cero formularios ✅ |
| CTAs | Uno flotante (comprar) + uno de WhatsApp |
| VSL | 10 minutos |
| Prioridad | Mobile primero |
| Rosario | Sólo como prueba de autoridad |

---

## 🚧 BLOQUEANTES — 5 datos y desplegamos

Todos viven en [`src/lib/products.ts`](../src/lib/products.ts).

- [ ] **B1 · Precio.** Placeholder: ARS 29.900 → constante `PRICE_ARS`
- [ ] **B2 · Datos bancarios.** `TRANSFER`: alias, CBU, titular
- [ ] **B3 · WhatsApp AR.** Hoy hay un +34 español en `NEXT_PUBLIC_WHATSAPP_NUMBER`
- [ ] **B4 · Nombre del producto.** "Reto 28 Días" es working name → `CHALLENGE.name`
- [ ] **B5 · Fechas de la cohorte fundadora.** `COHORT`: `startsAt`, `closesAt`, `startsAtISO`, cupos

> **Recomendación sobre B5:** cupo de la fundadora en **12-15**, no 25. El primer grupo es donde se rompen cosas, y de ahí salen los testimonios que venden los seis grupos siguientes.

### Pendientes de contenido (no bloquean el deploy, sí la venta)
- [ ] Grabar los 40-50 videos de ejercicios (2 medias jornadas)
- [ ] Grabar módulos 0 y 1 (1 media jornada)
- [ ] Grabar el VSL de 10 min → hoy apunta a un YouTube placeholder en `src/content/hero.ts`
- [ ] Testimonios reales con foto y permiso escrito → `src/content/stories.ts`
- [ ] Crear la comunidad en Skool
- [ ] Revisión legal de las 4 páginas por abogado
- [ ] Foto real del centro → `/images/centro-entrenamiento.png`

---

## ✅ Hecho en la sesión 2 (2026-08-04)

**Verificado:** `lint`, `typecheck` y `build` sin errores. 9 rutas estáticas. Commiteado y subido a GitHub.

### Garantía a 10 días
Cambiada en `GUARANTEE.days` y propagada a toda la web y las legales. Se detectó que el art. 34 de la Ley 24.240 obliga a 10 días irrenunciables en ventas a distancia: ofrecer 7 no reducía la obligación, sólo generaba dos plazos distintos. Ahora coinciden y el mensaje es uno solo.

### Sistema de cohortes escalonadas
- `COHORT_CADENCE_DAYS = 14` → grupo nuevo cada dos semanas
- `COHORT.isFounding` → cambia el copy del hero para el primer lanzamiento
- **Semana 0** incorporada al copy: quien compra entra el mismo día a la preparación, así la espera hasta el día 1 no se siente como espera
- FAQ nueva: "Si compro hoy, ¿cuándo empiezo?"

### Circuito de compra
Confirmada la opción 1: MP mira el banco y responde `OK 1234` por WhatsApp. Documentado en `07` §2.2.

### Formularios
Cero. Verificado: no queda ningún `<form>`, `<input>` ni ruta de API en el proyecto.

### Documentación
- `docs/MANUAL-DEL-PROYECTO.md` — manual completo en lenguaje no técnico, con glosario, todo el razonamiento del negocio y un banco de ideas de contenido. Para Notion.
- `docs/estrategia/08-cohortes-y-cadencia.md` — la decisión de cadencia con su fundamento

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
- [ ] **A24** · Lista de espera entre cohortes
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
3. **La Semana 0 es lo que hace tolerable la espera entre cohortes.** Sin eso, 13 días de espera cuestan devoluciones.
4. **La espera nunca debe superar el plazo de la garantía.** Con 14 días de cadencia y 10 de garantía estamos justos: vigilar.
5. **El acuse de recibo del comprobante es automático aunque la verificación sea manual.**
6. **Una sola conversación por pedido de devolución.** Si insiste, se devuelve.
7. **La cohorte 1 no es para facturar, es para generar testimonios.**
8. **Automatizar la velocidad, no la relación.**
9. **Graba cada ejercicio una sola vez** — programación y biblioteca van separadas.

---

## 🔧 Notas técnicas

**Interruptor de cohorte:** `COHORT.status = "waitlist"` en `products.ts` convierte todos los CTAs del sitio en lista de espera y cambia `/comprar` por el mensaje de inscripción cerrada. Dos ediciones cada 14 días: una para cerrar, otra para abrir.

**Dependencias sin usar** (no molestan, no van al bundle, pero se pueden limpiar): `framer-motion`, `zustand`, `embla-carousel-autoplay`, `react-hook-form`, `@hookform/resolvers`, `mercadopago`, `stripe`, `googleapis`.

**Libs sin usar** que quedaron a propósito por si vuelve la pasarela: `src/lib/brevo.ts`, `sheets.ts`, `mercadopago.ts`, `stripe.ts`. Hoy esas integraciones las va a manejar n8n.

**Lint:** 0 errores. Se corrigió `RevealOnScroll` moviendo el manejo de `prefers-reduced-motion` a CSS.

---

## 💰 Números

| Concepto | Valor |
|---|---|
| Stack mensual | ~USD 160-185 |
| Punto de equilibrio | 7-8 ventas/mes |
| Objetivo cohorte 1 | 15 alumnas (cupo sugerido 12-15) |
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

### Sesión 2 — 2026-08-04
Garantía a 10 días · cohortes cada 14 días + Semana 0 · circuito de compra opción 1 confirmado · cero formularios · manual del proyecto para Notion · doc de cohortes · primer push a GitHub

### Sesión 1 — 2026-08-04
Web reconstruida completa: secciones nuevas, copy al nicho, CTA flotante único, carrusel de testimonios, `/comprar`, `/garantia`, legales argentinas, SEO técnico

### Sesión 0 — 2026-08-03
Investigación de mercado · 7 documentos de estrategia · modelo de negocio redefinido · Excel de lead magnets

### Mayo 2026
Landing inicial en Next.js con MercadoPago/Stripe/Brevo/Sheets (hoy removidos o desactivados) · branding aplicado
