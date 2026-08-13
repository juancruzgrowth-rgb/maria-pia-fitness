# Planes, Niveles y Reglas de Desbloqueo

> Basado en el mensaje de María Pía del 2026-08-06.
> **Actualizado el 2026-08-13: los 2 bloqueantes que tenía este documento están resueltos.**

---

## 1. La escalera de precios — CONFIRMADA

| Producto | Precio | Qué incluye | En la web |
|---|---|---|---|
| **Un nivel** (4 semanas) | **$40.000** | 3 sesiones semanales de 50-60 min · gimnasio o casa · llamada 1:1 de bienvenida · corrección de técnica semanal · guía de nutrición estándar · Skool + WhatsApp | ✅ Precio visible |
| **Los 3 niveles** | **$99.000** | Los 3 niveles, desbloqueados a medida que se completan · 6 meses de ventana | ✅ Precio visible |
| **Asesoría 1:1** | **$280.000/mes** | Plan personalizado · más días · WhatsApp ilimitado · llamada a los 20 días | ❌ **Sin precio público** |
| **Asesoría 1:1 + nutrición** | **$350.000/mes** | Lo anterior + plan nutricional personalizado | ❌ **Sin precio público** |

---

## 2. ✅ RESUELTO — el precio del pack

El "trimestral" de $130.000 costaba **más** que pagar 3 niveles sueltos ($120.000): un 8,3% de recargo vendido como 20% de descuento. Anunciarlo así habría sido publicidad engañosa bajo el art. 8 de la Ley 24.240.

**Decisión (2026-08-13): $99.000.** Es un 17,5% de descuento real y verificable contra pagar nivel por nivel.

> El porcentaje no se escribe a mano en ningún lado: `PACK_DISCOUNT_PCT` en `src/lib/products.ts` lo calcula desde los dos precios. Si mañana cambia alguno, el descuento anunciado se corrige solo y nunca puede quedar desfasado de la realidad.

---

## 3. ✅ RESUELTO — el alcance del plan de $40.000

Confirmado punto por punto con María Pía. **El plan incluye más de lo que temíamos**, así que no hubo que recortar la propuesta de valor:

| Componente | Estado | Detalle |
|---|---|---|
| 3 sesiones semanales de 50-60 min | ✅ Incluido | 12 sesiones por nivel |
| Versión gimnasio y versión casa | ✅ Incluido | Diferencial fuerte |
| **Llamada 1:1 de bienvenida** | ✅ Incluido | En la Semana 0. Sostiene el diseño de la Semana 0 y el techo de cupos |
| **Guía de nutrición** | ✅ Incluido | **Estándar, no personalizada.** A definir en detalle con María Pía |
| **Corrección de técnica** | ✅ Incluido | **Sesión grupal semanal de 1 h, día fijo (viernes)** — no envíos individuales |
| Comunidad | ✅ Incluido | Skool (contenido, progreso) + grupo de WhatsApp (día a día) |
| Biblioteca de ejercicios en video | ✅ Incluido | Con variante fácil y difícil |
| Plan B de rutinas de 10 minutos | ✅ Incluido | Para los días que se rompen |

### El cambio de copy que trajo esto

La corrección de técnica **no es** "grabás y te devuelvo", como decía la web: es una **sesión grupal en día fijo**. El copy quedó reescrito así, y además se convirtió en argumento de venta: *"se aprende tanto de tu video como del de las demás"*.

**Por qué el día fijo es la decisión correcta:** la corrección individual asincrónica no escala — con 25 alumnas son 25 conversaciones abiertas toda la semana. Una hora grupal los viernes tiene costo fijo, genera comunidad y crea un ritual semanal que sostiene la asistencia. Además le da a la semana una estructura clara: lunes a jueves entrenás, viernes revisamos.

**La guía de nutrición es estándar.** Está dicho explícitamente en la web y en los Términos: *"Es la misma guía para todo el grupo, no un plan armado para tu caso"*. Esa frase protege de la única devolución previsible en este punto.

---

## 4. El modelo de niveles

Confirmado el funcionamiento con vos:

```
NIVEL 1 (mes 1) = Reto 28 Días
   · Arranca por grupos, cada 14 días
   · Semana 0 antes del día 1
        ↓  al completarlo
NIVEL 2 (mes 2) — se desbloquea
        ↓  al completarlo
NIVEL 3 (mes 3) — se desbloquea
```

**Dos formas de comprar:**
- **Mensual:** paga el nivel 1. Al completarlo recibe el recordatorio de renovación para el nivel 2.
- **3 niveles:** paga los tres de una. Se desbloquean igual, a medida que completa.

**El beneficio operativo que buscabas:** el desbloqueo progresivo le da a María Pía el tiempo para grabar el nivel 2 mientras el primer grupo cursa el nivel 1.

### ⏱ El deadline real de producción

Con grupos cada 14 días y niveles de 28 días, **el primer grupo termina el nivel 1 a los 28 días del arranque.** Ese es el plazo que tiene María Pía para tener el nivel 2 grabado y montado — no un mes calendario, 28 días desde el día 1 del grupo fundador.

Si el nivel 2 no está listo, quienes compraron el pack de 3 niveles se quedan mirando una pantalla que dice "próximamente" después de haber pagado. **Es el riesgo operativo más grande de todo el modelo.** Sugerencia: tener el nivel 2 grabado *antes* de abrir la venta del pack de 3.

---

## 5. La pregunta concreta: ¿y si tarda más de 3 meses?

### Paso 0 — el problema empieza en el nombre

**Dejá de venderlo como "trimestral". Vendelo como "3 niveles".**

No es un detalle de marketing. "Trimestral" promete un calendario: si la persona tarda cinco meses, o le regalaste dos meses (y sentaste un precedente) o le cortaste el acceso (y generaste un conflicto). **"3 niveles" no promete calendario: promete contenido.** Compraste tres niveles, los usás a tu ritmo dentro de una ventana.

Con ese solo cambio, el 80% del problema desaparece.

### Las 5 reglas

**1. Desbloqueo al completar el 80% del nivel anterior, no el 100%.**
Con 12 sesiones por nivel, son 10 de 12. Exigir perfección genera un ticket de soporte por cada persona que faltó un día por una gripe, y castiga justo a la que más necesita que la acompañen.

**2. Ventana de 6 meses desde la compra** para usar los 3 niveles.
Es el doble del tiempo nominal: generoso, pero acotado. **Se informa en la página de compra y en el email de bienvenida, no en letra chica.** Una condición que aparece recién cuando se incumple es una condición que no existía.

**3. Una pausa de hasta 30 días, sin preguntas.**
Se pide por WhatsApp y congela el reloj. Cubre enfermedad, viaje, mudanza, cambio de trabajo. Es barato de dar y evita casi todos los conflictos.

**4. Avisos automáticos a los 30 y a los 7 días del vencimiento.**
Nunca se corta un acceso sin aviso previo. Ese mensaje además funciona como reactivación: *"te quedan 30 días y todavía tenés el nivel 3 sin abrir"* recupera gente.

**5. Al vencer, no se borra: se ofrece reactivación.**
Una reactivación gratis por persona, o a precio simbólico. El costo de dejarla entrar de nuevo es cero; el costo de un mal comentario en Instagram no.

### El razonamiento que lo justifica

> **El contenido es generoso porque no cuesta. La atención es acotada porque sí cuesta.**

Que alguien tarde seis meses en ver los videos tiene un costo marginal de cero: ya están grabados. Lo que sí cuesta es **el tiempo de María Pía** — corrección de técnica, presencia en la comunidad, responder. Por eso la ventana de 6 meses acota lo caro, y ser generoso con el acceso al contenido no te cuesta nada.

### El caso extremo

Alguien que a los 6 meses hizo sólo el nivel 1 no es un problema de reglas: **es una falla de retención que había que detectar el día 9, no el mes 6.** Para eso existe el flujo A6 de detección de abandono. Si esto pasa seguido, el problema no es la política de vencimiento — es el onboarding.

### Umbral operativo

Si alguien no completó el nivel 1 en **60 días**, deja de contar como alumna activa en las métricas y pasa a un flujo de reactivación. No pierde el acceso: pierde el lugar en el reporte semanal, para que los números reflejen la realidad.

---

## 6. Qué pasa con los grupos en los niveles 2 y 3

**El nivel 1 arranca por grupos. Los niveles 2 y 3, no.**

Es deliberado. Después del nivel 1 la gente ya está desfasada — una completó en 28 días, otra en 40 — y forzar grupos ahí sería inventar una sincronía que no existe. Además el hábito ya está instalado, que era exactamente para lo que servía el grupo.

**Cómo se resuelve en Skool:** un canal de "veteranas" donde conviven las que están en niveles 2 y 3. Menos check-in diario, más conversación entre pares y consultas puntuales. Y sirve de prueba social permanente para las que están en el nivel 1 y ven que hay gente más adelante.

---

## 7. Renovación de las mensuales

Para quien compró un solo mes:

| Cuándo | Qué |
|---|---|
| **Día 24-26** | Oferta de renovación. **No el día 30** — se ofrece mientras la motivación está alta, no cuando ya se desconectó |
| Día 28 (completa) | Se desbloquea la posibilidad de comprar el nivel 2 |
| Día 31 | Último recordatorio |
| Día 45 | Pasa a nurturing de largo plazo |

**El día 24-26 no es arbitrario:** ofrecer la renovación cuando la persona está terminando y viendo resultados convierte mucho mejor que ofrecerla cuando el acceso ya venció y perdió el envión.

Vale la pena ofrecer ahí el **upgrade al pack de 3 niveles descontando lo ya pagado**: quien pagó $40.000 y quiere seguir, paga la diferencia hasta el pack. Es la conversión más fácil de todo el embudo, porque la persona ya probó el producto.

---

## 8. La asesoría 1:1 — definida

**$280.000 por mes**, y **$350.000 por mes** con plan nutricional. Es un producto mensual y personalizado, no un paquete.

| Qué incluye |
|---|
| Plan de entrenamiento armado para su caso, con más días por semana |
| Objetivos puntuales más allá de la recomposición corporal |
| Plan de nutrición personalizado (en la versión de $350.000) |
| Corrección de ejercicios por WhatsApp |
| Consultas ilimitadas por WhatsApp |
| Llamada 1:1 a los 20 días de arrancar |

### Cupos: arrancamos con 5

Con WhatsApp ilimitado el techo no lo pone la agenda, lo pone la cabeza. **5 lugares la primera vez**, para medir la carga real antes de escalar. Si se desborda, Daiana y nosotros podemos absorber la parte operativa (ordenar consultas, recordatorios, seguimiento) y dejarle a María Pía sólo lo que requiere criterio profesional.

> **Ojo con esto:** delegar la respuesta de WhatsApp en un producto que se vende como "contacto directo con María Pía" es una promesa que se rompe fácil. La forma sana de repartirlo es que Daiana maneje lo administrativo y el triage, y que **toda respuesta técnica salga de María Pía**, aunque el mensaje lo escriba otra persona. Conviene definir esa línea antes de vender el primer lugar, no después.

### Sin precio público — decisión tomada

En la web sólo se menciona que la asesoría existe, dentro de la respuesta "¿es personalizado?" del FAQ, y se deriva a WhatsApp. **El precio se da en la conversación, después de calificar.**

Dos razones: a ese ticket la venta necesita conversación, y publicar $280.000 al lado de $40.000 hace que el reto parezca "la opción barata" en vez de "la opción correcta". El mensaje de WhatsApp precargado ya existe (`CONTACT.advisoryUrl`).

Además, **la asesoría no compite con el reto: lo sucede.** El momento natural para ofrecerla es cuando alguien terminó el nivel 3, o cuando en la conversación de venta aparece un objetivo que el reto explícitamente no cubre (una lesión, una competencia, un embarazo, un objetivo de rendimiento).

---

## 9. Escalera completa propuesta

```
Contenido gratis (Instagram)
        ↓
NIVEL 1 · Reto 28 Días — $40.000
   grupos cada 14 días · Semana 0
        ↓                        ↘
NIVEL 2 · $40.000          PACK 3 NIVELES · $99.000  (–17,5%)
        ↓                     se desbloquean al completar el 80%
NIVEL 3 · $40.000                 ventana de 6 meses
        ↓
ASESORÍA 1:1 — $280.000/mes · 5 cupos · sólo WhatsApp, sin precio público
        ↓
ASESORÍA 1:1 + NUTRICIÓN — $350.000/mes
```

---

## 10. Estado de las definiciones

### ✅ Confirmado el 2026-08-13

| # | Pregunta | Respuesta |
|---|---|---|
| 1 | Precio del pack de 3 niveles | **$99.000** (era un error de cálculo) |
| 2 | ¿La asesoría es mensual o paquete? | **Mensual.** Ticket alto porque es personalizada |
| 3 | Cupos de asesoría 1:1 | **5** para la primera camada, para medir carga |
| 4 | ¿Incluye llamada 1:1 de bienvenida? | **Sí**, en la Semana 0 |
| 5 | ¿Incluye guía de nutrición? | **Sí, estándar** — no personalizada |
| 6 | ¿Incluye corrección de técnica? | **Sí: sesión grupal de 1 h, día fijo (viernes)** |
| 7 | ¿Incluye comunidad? | **Sí: Skool + grupo de WhatsApp** |
| 8 | Sesiones por nivel | **12** (3 por semana × 4 semanas) |
| 9 | Ventana de 6 meses y pausa de 30 días | **De acuerdo** |

### ⏳ Todavía abierto

| # | Pregunta | Por qué importa |
|---|---|---|
| 10 | **¿Para cuándo está grabado el nivel 2?** | Estimado: mediados de septiembre, a confirmar. El grupo fundador termina el nivel 1 a los 28 días de arrancar — ese es el deadline real, no "un mes calendario" |
| 11 | ¿Qué contiene exactamente la guía de nutrición estándar? | Está prometida en la web; hay que poder entregarla el día 1 |
| 12 | ¿Horario fijo de la sesión de los viernes? | Se anuncia antes de vender: es parte de lo que la persona compra |
| 13 | ¿Dónde termina Daiana y dónde empieza María Pía en el WhatsApp de la asesoría? | Ver §8. Definirlo antes de vender el primer lugar |
