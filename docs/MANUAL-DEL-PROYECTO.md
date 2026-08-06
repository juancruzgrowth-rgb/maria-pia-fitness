# Manual del Proyecto MP CEP

**Todo lo que hicimos, por qué lo hicimos y cómo funciona — explicado sin tecnicismos.**

> Este documento está escrito para que lo entienda cualquiera, incluso alguien que nunca escuchó hablar de automatizaciones, embudos de venta o inteligencia artificial. Está pensado para pegarse en Notion y para usarse como fuente de ideas de contenido.
>
> Última actualización: 6 de agosto de 2026

---

## Índice

1. [Qué estamos construyendo](#1-qué-estamos-construyendo)
2. [Glosario: todas las palabras raras, explicadas](#2-glosario)
3. [El producto: el Reto 28 Días](#3-el-producto-el-reto-28-días)
4. [A quién le vendemos](#4-a-quién-le-vendemos)
5. [Cómo llega la gente: el camino completo](#5-cómo-llega-la-gente-el-camino-completo)
6. [La página web, sección por sección](#6-la-página-web-sección-por-sección)
7. [Cómo se compra y cómo se cobra](#7-cómo-se-compra-y-cómo-se-cobra)
8. [La garantía de 10 días](#8-la-garantía-de-10-días)
9. [Los grupos: por qué arrancamos todas juntas](#9-los-grupos)
10. [Skool: donde vive el producto](#10-skool-donde-vive-el-producto)
11. [Las automatizaciones, explicadas simple](#11-las-automatizaciones-explicadas-simple)
12. [El contenido de Instagram y los lead magnets](#12-el-contenido-de-instagram-y-los-lead-magnets)
13. [Quién hace qué](#13-quién-hace-qué)
14. [Los números del negocio](#14-los-números-del-negocio)
15. [Decisiones que tomamos y por qué](#15-decisiones-que-tomamos-y-por-qué)
16. [En qué estado está todo hoy](#16-en-qué-estado-está-todo-hoy)
17. [Banco de ideas de contenido](#17-banco-de-ideas-de-contenido)

---

## 1. Qué estamos construyendo

Un negocio online que vende un programa de entrenamiento y nutrición de María Pía, y que **funciona casi solo**.

La idea central: María Pía tiene un centro de entrenamiento físico en Rosario donde entrena gente cara a cara. Eso tiene un techo — sólo puede atender a las personas que entran por la puerta, y sólo mientras ella esté ahí. Lo que estamos armando le permite vender su método a mujeres de todo el país (y del mundo) sin tener que estar presente en cada sesión.

**La meta a la que apuntamos:** que esto lo puedan manejar tres personas trabajando pocas horas, porque todo lo repetitivo lo hace un sistema automático en vez de una persona.

**Lo que NO es:** no es una app, no es una red social, no es un gimnasio virtual. Es una página web que vende un programa, más un lugar donde se entrega ese programa, más un conjunto de automatizaciones que conectan las dos cosas.

---

## 2. Glosario

Todas las palabras que vas a ver repetidas, en castellano común.

### Sobre ventas y marketing

**Landing page (o "landing")**
La página web de venta. Se llama así porque es donde "aterriza" la persona que hace clic en un link. La nuestra tiene un solo objetivo: que compren el reto.

**Embudo (o "funnel")**
El camino que recorre una persona desde que te conoce hasta que te compra. Se llama embudo porque arriba entran muchos y abajo salen pocos: mil ven un reel, cien comentan, cuarenta dejan el mail, quince compran.

**Lead**
Una persona que mostró interés y te dejó un dato de contacto (mail o WhatsApp), pero todavía no compró. Es un cliente potencial.

**Lead magnet ("imán de leads")**
Algo gratis y útil que regalás a cambio del mail. Por ejemplo: "comentá CENA y te mando 5 recetas rápidas". El regalo atrae, el mail es lo que te llevás.

**CTA (Call To Action, "llamada a la acción")**
El botón o la frase que le dice a la persona qué hacer. "Quiero entrar al reto" es un CTA. En nuestra web hay solamente dos: el de comprar y el de escribir por WhatsApp.

**VSL (Video Sales Letter, "carta de venta en video")**
El video donde María Pía explica el método y convence. El nuestro dura 10 minutos y está arriba de todo en la web.

**Conversión / tasa de conversión**
Qué porcentaje de gente hace lo que querés. Si 100 personas visitan la web y 5 compran, la conversión es del 5%.

**Upsell**
Venderle algo más grande a quien ya te compró algo chico. Nuestro caso: quien termina el reto de 28 días recibe la oferta del programa largo.

**Low ticket / high ticket**
Producto barato / producto caro. El reto es low ticket (producto de entrada). El programa personalizado será high ticket.

**Prueba social**
Testimonios, casos y cualquier cosa que demuestre que otros ya lo hicieron y les funcionó. Es lo que más pesa a la hora de decidir una compra.

**Objeción**
El motivo por el que alguien no compra. "No tengo tiempo", "es caro", "no sé si me va a servir". Buena parte del trabajo de la web es responder objeciones antes de que aparezcan.

**Grupo**
La tanda de alumnas que arrancan el mismo día y van al mismo ritmo. Como una camada o una promoción. Antes lo llamábamos "cohorte", pero "grupo" se entiende mejor.

**Churn / abandono**
La gente que deja el programa antes de terminarlo. Es el enemigo número uno de este negocio.

**Tasa de finalización**
Qué porcentaje de las que compran llegan al día 28. **Es nuestra métrica más importante**, y en la sección 15 explico por qué.

### Sobre herramientas y tecnología

**Skool**
Una plataforma pensada para comunidades con contenido. Es donde va a vivir el reto: los videos de los ejercicios, las rutinas, el grupo donde las alumnas hablan entre ellas, el ranking de participación. Se paga una suscripción mensual.

**n8n** (se pronuncia "eno-cho-eno")
Un programa que conecta otras aplicaciones entre sí y hace tareas automáticas. Funciona como un tablero donde dibujás flechas: "cuando pase ESTO, hacé AQUELLO". Por ejemplo: cuando llega un comprobante de pago por WhatsApp, que se anote solo en la planilla y me avise. **Es el motor de todo el sistema automático.**

**ManyChat**
Una herramienta que responde mensajes de Instagram automáticamente. Si alguien comenta una palabra clave en un reel, ManyChat le manda un mensaje privado al instante con el regalo prometido.

**Brevo**
El programa que manda los mails automáticos. Por ejemplo la secuencia de bienvenida o los mails de seguimiento.

**Google Sheets**
Una planilla de Google. La usamos como base de datos: ahí se anotan solos todos los leads, las ventas y el seguimiento. Es simple a propósito — cualquiera la puede abrir y entender.

**Webhook**
Un aviso automático entre dos programas. Cuando algo pasa en una aplicación, ésta "golpea la puerta" de la otra para avisarle. No necesitás entenderlo más allá de eso.

**API**
La forma en que dos programas se hablan entre sí. Cuando decimos "Skool no tiene API", significa que no se lo puede automatizar bien y hay que hacer algunas cosas a mano.

**Vercel**
El servicio donde vive la página web, o sea, donde está alojada para que cualquiera pueda verla desde internet.

**Next.js / TypeScript / React**
El lenguaje y las herramientas con las que está construida la web. No hace falta que sepas nada de esto.

**Deploy / desplegar**
Publicar los cambios para que la gente los vea en internet. Hasta que no se hace deploy, los cambios existen sólo en la computadora.

**Repositorio / GitHub**
El lugar donde se guarda el código y todo su historial de cambios. Si algo se rompe, se puede volver atrás a cualquier versión anterior.

**Commit**
Guardar un conjunto de cambios con una descripción. Como un punto de guardado en un videojuego.

---

## 3. El producto: el Reto 28 Días

### Qué es

Un programa de **28 días, 100% online**, donde la alumna entrena 30 minutos por día, cuatro veces por semana, y sigue una guía de alimentación pensada para gente sin tiempo.

### Qué incluye

> **Actualizado el 6 de agosto de 2026** con las especificaciones que pasó María Pía: son **3 sesiones semanales de 50 a 60 minutos**, y cada rutina viene en versión gimnasio y versión casa. Antes el sitio decía 4 sesiones de 30 minutos, que era una propuesta nuestra sin confirmar.
>
> ⚠️ **Hay dos puntos abiertos que frenan la publicación:** el precio del pack de 3 niveles y qué incluye exactamente el plan de $40.000. Están detallados en `docs/estrategia/10-planes-y-niveles.md`.

| Lo que recibe | Detalle |
|---|---|
| 3 sesiones por semana | De 50 a 60 minutos cada una. Cada sesión le dice exactamente qué hacer. |
| Versión gimnasio y versión casa | La misma rutina adaptada a lo que tenga disponible ese día. |
| Llamada 1:1 de bienvenida | Media hora con María Pía antes de arrancar. |
| Corrección de técnica semanal | Graba su ejercicio, lo manda, María Pía le devuelve qué corregir. |
| Guía de nutrición | Desayunos de 5 minutos, cenas de 15, qué hacer cuando come afuera. Sin contar calorías. |
| Biblioteca de ejercicios en video | Cada movimiento explicado, con versión más fácil y más difícil. |
| Plan B de 10 minutos | Para los días imposibles. |
| Comunidad privada | El grupo de su grupo. |
| Seguimiento diario | Planilla simple. Si deja de aparecer, María Pía le escribe. |

### Lo importante: qué es personalizado y qué no

**El plan es el mismo para todas.** Las rutinas, los videos y la guía de nutrición son idénticos para todo el grupo.

**Lo personalizado es el acompañamiento:** la llamada de bienvenida, la corrección de la técnica de cada una y los ajustes que María Pía haga en el camino.

Esto lo decimos **explícitamente en la web y en los términos legales**. No es un detalle menor: es la diferencia entre una clienta contenta y una que pide la devolución sintiendo que le vendieron otra cosa. Además es lo que hace que el negocio escale — si cada plan fuera hecho a medida, María Pía sólo podría atender a 10 personas.

### Precio

**$40.000 por nivel.** Un nivel es un mes. No hay débito automático: cada nivel se compra cuando la persona decide seguir.

Existe además un pack de los 3 niveles con descuento, **pendiente de definir el precio**: María Pía propuso $130.000, pero tres meses sueltos cuestan $120.000, así que el pack saldría más caro. Está oculto en la web hasta resolverlo.

### Qué viene después: los niveles

El reto es el **nivel 1**. Cuando la alumna lo completa se desbloquea el **nivel 2**, y después el **nivel 3**. Cada uno dura un mes.

Esto tiene un beneficio operativo importante: **el desbloqueo progresivo le da a María Pía el tiempo de grabar el nivel 2 mientras el primer grupo cursa el nivel 1.** No hace falta tener los tres meses grabados antes de vender.

Y arriba de los niveles está la **asesoría 1:1**, para quien busca objetivos más específicos: WhatsApp ilimitado y llamada mensual, con la opción de sumar plan nutricional.

```
Contenido gratis en Instagram
        ↓
Regalo gratis (lead magnet) a cambio del mail
        ↓
RETO 28 DÍAS  ← estamos acá
        ↓
Programa 90 días
        ↓
Acompañamiento 1:1 personalizado
```

---

## 4. A quién le vendemos

**Mujeres que trabajan ocho horas por día o más, y que quieren mantener hábitos saludables y estar en forma sin que eso les coma la vida.**

Esta definición es el corazón de todo. No es "mujeres que quieren entrenar" — eso es demasiado amplio y no le habla a nadie en particular. Es una mujer concreta:

- Tiene jornada completa, a veces más.
- Llega a casa sin energía.
- Ya intentó empezar varias veces y siempre se le cayó a las dos semanas.
- No le sobra tiempo ni ganas de ir a un gimnasio.
- No quiere una dieta, quiere un sistema que le entre en el día.
- **No le falta voluntad: le falta un método que respete su realidad.**

Esa última frase es la tesis del negocio entero, y conviene repetirla en el contenido.

### Por qué elegir un nicho tan angosto

Porque cuanto más específica es la persona a la que le hablás, más te elige. Una mujer que trabaja 9 horas y ve un reel que dice "sé que llegás a las 8 de la noche sin ganas de nada" siente que le hablan a ella. Si el reel dice "entrená y sentite bien", no siente nada.

Además, un nicho angosto sostiene precios más altos, porque no estás compitiendo con los mil coaches genéricos de Instagram.

---

## 5. Cómo llega la gente: el camino completo

```
1. Ve un reel de María Pía en Instagram
        ↓
2. El reel dice: "comentá CENA y te mando las recetas"
        ↓
3. Comenta
        ↓
4. ManyChat le responde el comentario en público y le manda
   un mensaje privado en menos de 10 segundos
        ↓
5. En el privado le pide el mail y le entrega el regalo
        ↓
6. Ese contacto se anota solo en la planilla y en Brevo
        ↓
7. Durante 5 días recibe mails con contenido útil
        ↓
8. Al quinto día recibe la oferta del reto
        ↓
9. Entra a la web
        ↓
10. Ve el video, lee los testimonios, resuelve sus dudas
        ↓
11. Toca el botón de comprar
        ↓
12. Transfiere y manda el comprobante por WhatsApp
        ↓
13. María Pía confirma → recibe el acceso automáticamente
        ↓
14. Arranca la Semana 0, después el reto con su grupo
        ↓
15. Al día 28 recibe la oferta del programa largo
```

**El dato que hace que esto funcione:** la respuesta automática llega en 8 segundos. Una respuesta manual tardaría entre 4 y 6 horas. Está medido que responder dentro de los primeros 5 minutos multiplica por 100 las chances de contactar a alguien, comparado con responder a los 30 minutos. Por eso la automatización de mensajes no es un lujo, es lo que más plata mueve de todo el sistema.

---

## 6. La página web, sección por sección

La web tiene **un solo objetivo**: que la persona compre el reto. Todo lo que no empuja hacia ahí, lo sacamos.

### El orden y para qué sirve cada parte

| # | Sección | Para qué está |
|---|---|---|
| 1 | **Portada (Hero)** | Título que golpea, video de 10 minutos y la fecha del próximo grupo |
| 2 | **¿Es para vos?** | Dos columnas: "sí, si..." y "no, si...". Filtra a la persona equivocada antes de que compre |
| 3 | **Qué recibís** | Los 8 entregables, contados uno por uno. Después, el precio |
| 4 | **Cómo funciona** | Tres pasos: reservás, empezás la Semana 0, arranca el reto |
| 5 | **Testimonios** | Carrusel con casos de mujeres con la misma agenda |
| 6 | **Sobre mí** | La historia de María Pía |
| 7 | **El centro** | El gimnasio de Rosario como prueba de que es real |
| 8 | **Garantía** | Los 10 días explicados |
| 9 | **Preguntas frecuentes** | Las 9 objeciones más comunes, respondidas |
| 10 | **Contacto** | Botón de WhatsApp para dudas |

### Las decisiones de diseño que importan

**Un solo botón de compra, y siempre visible.**
Hay una barra flotante abajo de la pantalla que muestra el precio y el botón de comprar. Te acompaña en todo momento, en todas las secciones y en todas las páginas. La idea: quien decidió comprar nunca tiene que buscar dónde hacerlo.

**Un solo botón secundario, el de WhatsApp.**
Para quien tiene dudas. No flota, aparece en la portada y al final.

**"No es para vos si..." es tan importante como "es para vos si...".**
Parece que espantar clientes es mala idea. Es al revés: la persona equivocada que compra pide la devolución, se va enojada y habla mal. La persona correcta que se ve reflejada en esa columna compra con más convicción.

**El título le habla al nicho, no al producto.**
*"Ocho horas de trabajo. Treinta minutos para vos."* No dice qué vendemos. Dice a quién le hablamos. Quien trabaja 8 horas se detiene a leer.

**Todo pensado primero para el celular.**
Ocho de cada diez personas van a entrar desde el teléfono. Todas las decisiones de tamaño, espacio y ubicación de botones se toman pensando en una pantalla chica y en un pulgar.

**Rosario está, pero no como servicio local.**
El reto es online y lo puede hacer alguien de Salta o de Madrid. El gimnasio aparece con un mensaje distinto: *"No soy una coach de Instagram, tengo un centro donde entreno gente todos los días"*. Es prueba de autoridad, no una oferta presencial.

**Los testimonios están repartidos en dos lugares, no en uno.**
Debajo del video hay una franja compacta con dos citas cortas, y el carrusel completo va inmediatamente después del precio. El motivo: la prueba social arriba baja el rebote entre 15 y 20%, pero el bloque grande rinde más donde está el pico de duda, que es el precio. Combinar los dos lugares rinde un 31% más que poner todo arriba. Además, un testimonio que dice "sostuve cuatro entrenamientos por semana" pega mucho más *después* de que leíste que son 4 sesiones de 30 minutos.

**La web es accesible, y eso se verifica.**
Google mide la accesibilidad de la página con una herramienta llamada Lighthouse. Arreglamos todo lo que marcaba: el naranja de la marca no tenía suficiente contraste para usarse en texto (se lee mal, sobre todo con sol o con vista cansada), los botoncitos del carrusel eran demasiado chicos para el dedo, y la lista de "cómo funciona" estaba mal armada para los lectores de pantalla que usan las personas ciegas. También revisamos a mano los diez puntos que la herramienta no puede comprobar sola: orden de los títulos, navegación con teclado, y que cada botón diga qué hace.

Detalle importante: **el naranja de la marca sigue estando** en los botones, los íconos y los detalles. Lo que cambió es que el *texto* naranja ahora usa un ámbar más oscuro, que es el mismo color pero legible.

### Lo que sacamos, y por qué

| Qué sacamos | Por qué |
|---|---|
| Sección "En redes" (reels) | Mandaba a la gente de vuelta a Instagram antes de comprar |
| Sección "Seminarios" | No existen en este producto |
| Formulario de newsletter | Le daba a la visitante una forma de postergar la decisión sintiendo que hizo algo |
| Quiz / diagnóstico | Mismo problema: le regalaba una salida gratis a alguien que estaba por comprar |
| Carrito de compras | Con un solo producto, cada clic extra pierde gente |
| Selector de moneda | Sin pasarela de pago activa, sólo confundía |
| Los 4 paquetes viejos | Ahora hay un solo producto |

> **La regla que aplicamos:** una página que vende una sola cosa, vende. Una que ofrece de todo, no vende nada.

---

## 7. Cómo se compra y cómo se cobra

Por ahora **no usamos MercadoPago ni tarjeta**. Se cobra por transferencia bancaria.

### El recorrido de la clienta

**Paso 1.** Toca el botón flotante "Quiero entrar al reto".

**Paso 2.** Llega a la página de compra, donde ve:
- El resumen de lo que se lleva y el precio
- El alias y el CBU, con un botón para copiarlos de un toque
- Los tres pasos numerados
- La garantía
- Un aviso: si transferís de noche, la confirmación llega enseguida y el acceso a la mañana

**Paso 3.** Transfiere desde su banco.

**Paso 4.** Toca "Ya transferí — enviar comprobante". **Se abre WhatsApp con el mensaje ya escrito:**

```
Hola María Pía! Quiero entrar al Reto 28 Días.
Ya hice la transferencia de $29.900 y te adjunto el comprobante.

Mi nombre:
Mi email:
```

Sólo tiene que adjuntar la foto y completar dos datos.

> **Por qué el mensaje pide nombre y mail:** sin eso, María Pía recibe un comprobante de un número desconocido y no sabe a quién darle el acceso ni a qué dirección mandarle la invitación. Ese detalle chiquito evita una conversación de ida y vuelta por cada venta.

### Qué pasa del otro lado

**Al instante (automático):**
1. Le responde: *"¡Recibí tu comprobante! Lo estoy verificando, en menos de 2 horas te mando el acceso."*
2. Guarda la imagen del comprobante
3. Anota la venta en la planilla como "pendiente"
4. Le manda a María Pía una tarjeta con todos los datos y un número de 4 dígitos

**Después (María Pía, dos segundos):**

Ella abre el home banking, ve que la plata llegó, y **responde por WhatsApp: `OK 4821`**.

Eso es todo. Ese mensajito dispara automáticamente:
- La venta pasa a "pagado" en la planilla
- La invitación a Skool
- El mail de bienvenida
- El mensaje de WhatsApp con el acceso
- El alta en el grupo del grupo
- El aviso para agendar la llamada de bienvenida
- El arranque del reloj de la garantía

**Todo eso ocurre en menos de 30 segundos.**

### Por qué elegimos este método y no otro

Evaluamos tres formas de que María Pía confirme el pago:

| Opción | Veredicto |
|---|---|
| **Responder `OK 4821` por WhatsApp** | ✅ **Elegida.** No tiene que aprender ninguna herramienta nueva, lo hace desde el celular parada en cualquier lado, son dos segundos |
| Tildar una casilla en la planilla de Google | Buena para más adelante, cuando haya volumen y convenga procesar de a muchas |
| Leer el banco automáticamente | ❌ Descartada. Los bancos argentinos no lo permiten para cuentas personales; la alternativa sería guardar las claves del banco en un servidor. El riesgo no vale ahorrar dos segundos |

### La regla que no se negocia

**La verificación es manual, el acuse de recibo no.**

Si alguien transfiere a las 23:40 y no recibe ninguna señal hasta las 9 de la mañana, pasa nueve horas con la plata transferida y sin confirmación. Eso genera ansiedad, mensajes de reclamo y, en el peor caso, un pedido de devolución antes de haber empezado.

### Lo que hay que saber de este método

Cobrar por transferencia **cuesta ventas** comparado con un botón de pago con tarjeta. Se pierde gente entre el "quiero" y el "transferí", sobre todo de noche y los fines de semana. Es una decisión válida para arrancar sin trámites, pero **cuando el primer grupo valide que el producto funciona, volver a MercadoPago debería ser la prioridad número uno.**

---

## 8. La garantía de 10 días

### Qué ofrecemos

Diez días corridos desde que recibe el acceso. Si no es para ella, avisa y se le devuelve el 100%. Sin condiciones, sin tener que justificar nada, sin que se le insista.

### Por qué 10 y no 7

Al principio habíamos planteado 7 días. **Revisando la ley argentina apareció un problema:** el artículo 34 de la Ley 24.240 de Defensa del Consumidor obliga a dar **10 días corridos** para arrepentirse de cualquier compra hecha a distancia (por internet). Y ese derecho **es irrenunciable**: lo tiene la clienta aunque nosotros digamos otra cosa.

Entonces ofrecer 7 días no reducía nada. Sólo creaba dos plazos distintos y letra chica que explicar. Poniéndolos iguales, el mensaje es simple: **son 10 días, y punto.**

La web también tiene un **"botón de arrepentimiento"**, que es obligatorio por la Resolución 424/2020 para cualquier negocio que venda por internet en Argentina.

### Cuánto cuesta esto en la práctica

En productos de precio bajo con un producto decente, las devoluciones rondan el **2 a 5%**. Lo que se gana en ventas por ofrecer una garantía sin letra chica es bastante más que eso.

### Cómo se maneja un pedido de devolución

**El objetivo NO es evitar la devolución. Es entender por qué, y ofrecer una solución sólo si el motivo tiene arreglo.**

Cuando llega el pedido, se responde siempre igual:

> *"Hola [nombre]. Vi tu mensaje y ya está en marcha, quedate tranquila. Antes de procesarlo te quería preguntar una sola cosa, más para mí que para vos: ¿qué fue lo que no funcionó? Me sirve muchísimo para mejorar el reto."*

Esto hace tres cosas de una: le confirma que la devolución no está en discusión (con lo cual baja la guardia), pide la información, y encuadra la respuesta como un favor.

**Los motivos reales y qué hacer con cada uno:**

| Dice | Qué hacer |
|---|---|
| "No tengo tiempo" | Es justo lo que el reto resuelve. Ofrecer las rutinas de 10 minutos y armarle la semana en una llamada corta |
| "Es más difícil de lo que esperaba" | Es miedo, no producto. Mostrarle las variantes fáciles |
| "No entendí cómo funciona" | Es culpa nuestra. Mandarle un video de 2 minutos mostrando dónde está todo |
| "Esperaba que fuera personalizado" | Falla de expectativa. **Revisar el copy de la web.** Si igual no le sirve, devolver sin discutir |
| "Problema de plata" | Devolver hoy y dejarla en la lista para más adelante. Suele volver |
| "No me gustó" | Devolver, cero fricción |

**Las cuatro reglas:**

1. **Un solo intento.** Se ofrece una solución. Si repite el pedido, se devuelve. Nunca dos vueltas.
2. **Nunca culpa ni presión.** Ni "pero si no lo intentaste". Es la forma más rápida de convertir una devolución en un mal comentario público.
3. **Menos de 24 horas** desde el pedido hasta la resolución.
4. **Todo se anota.** Tres devoluciones por el mismo motivo son un problema del producto o del texto de la web, no de las clientas.

### El beneficio escondido

La ventana de 10 días **coincide con el período donde más gente abandona**. Eso convierte al pedido de devolución en un **sistema de alerta temprana**: te avisa quién está por abandonar, a tiempo para hacer algo.

Una alumna que pide la devolución el día 5 y se queda después de una charla de 10 minutos es una que iba a abandonar en silencio el día 9.

---

## 9. Los grupos

### Qué son

Todas las alumnas arrancan **el mismo día** y van al mismo ritmo. Como una camada. Todas hacen el día 14 el mismo día y terminan juntas.

La alternativa sería que cada una entre cuando compra y esté en un día distinto.

### Por qué elegimos grupos

Porque nuestra métrica principal es **cuánta gente termina el programa**, y los grupos son la palanca más fuerte que existe sobre eso.

El motivo es humano, no técnico: **en un reto lo que sostiene a la gente no es el contenido, es ver que otras están en el mismo día que ella.** Si tu alumna afloja el día 9 y nadie más está en el día 9, nadie lo nota. Si hay 15 mujeres ahí mismo, su ausencia se ve, y ella lo sabe.

Además resuelve tres cosas operativas:
- Las llamadas de María Pía se agrupan en dos días en vez de aparecer salteadas todo el mes
- La urgencia es real: los cupos cierran de verdad porque las llamadas tienen un techo
- La oferta del programa largo se hace una vez a todo el grupo, no en 20 conversaciones

### Cada cuánto abrimos un grupo nuevo: cada 14 días

Esta era una decisión delicada, porque los grupos tienen un costo: **quien compra tiene que esperar hasta que arranque su grupo.** Y cada día de espera es un día en el que puede enfriarse o arrepentirse.

Comparamos las opciones:

| Cada cuánto | Espera máxima | Grupos por mes | Problema |
|---|---|---|---|
| Cada 7 días | 6 días | 4 | Grupos de 6 personas: no generan acompañamiento, generan silencio. Y María Pía haría llamadas todas las semanas |
| **Cada 14 días** | **13 días** | **2** | **Ninguno grave. Es el punto justo** |
| Cada 30 días | 29 días | 1 | Inaceptable. La garantía se vencería antes de que la persona entrene un solo día |

**Con 14 días, la espera promedio es de 7 días y la máxima de 13.** Los grupos quedan de 12 a 15 personas, que es suficiente para que el acompañamiento funcione.

### La pieza clave: la Semana 0

**Esto es lo que elimina el problema de la espera.** Quien compra hoy **entra hoy**. No al reto, sino a la Semana 0.

**La regla que ordena todo:** la Semana 0 **prepara y mide, pero no entrena ni enseña el contenido del reto.** Esto no es un detalle. Si liberás las rutinas antes del día 1, el grupo deja de arrancar junto y perdés justo lo que los grupos vienen a dar. Y si liberás todo de entrada, habilitás el "me lo veo en tres días y pido la devolución", que es un patrón conocido en cursos online.

#### Las 5 cosas obligatorias (unos 90 minutos en total)

| # | Qué | Tiempo | Para qué |
|---|---|---|---|
| 1 | Video "Empezá acá" | 3 min | Qué va a pasar, cómo se usa la plataforma, cuándo arranca |
| 2 | Cuestionario de ingreso | 10 min | Historial, lesiones, horarios reales, objetivo |
| 3 | Llamada 1:1 con María Pía | 30 min | Lo único verdaderamente personalizado del producto |
| 4 | Tu Mapa de Semana | 15 min | Elegir y bloquear los 4 horarios reales |
| 5 | Tu punto de partida | 30 min | Medidas, fotos y tests — la base contra la que se compara el día 28 |

#### Los 5 mini-retos (para llenar la espera larga)

Uno por día, ninguno es un entrenamiento, todos terminan con un check-in en la comunidad:

1. **Movilidad de la mañana** — 6 movimientos, 6 minutos
2. **Foto de tu desayuno** — sin cambiar nada, sólo mostrarlo
3. **Caminata de 15 minutos** — sin música, sin pantalla
4. **Armá tu rincón** — dejar todo listo para el día 1
5. **Escribí tu porqué** — 3 líneas que se postean en el grupo

Cada uno lleva menos de 15 minutos, deja una victoria visible y termina con una publicación. Antes del día 1 la persona ya tiene la costumbre de abrir la plataforma, de postear, conoce a sus compañeras y tiene una racha que da pena romper.

#### Qué se mide

**Del cuerpo:** peso (una vez, encuadrado como dato y no como nota), circunferencias de cintura, cadera, muslo y brazo, y fotos de frente, perfil y espalda. *Las fotos quedan en el celular de ella, no se suben a ningún lado — y eso se dice explícitamente.*

**De la capacidad** (se repiten el día 28 y son las que producen el "no lo puedo creer"): sentadillas en 60 segundos, plancha máxima, flexiones apoyadas y un test de movilidad de 4 posiciones.

**De los hábitos, durante 7 días y sin cambiar nada:** energía percibida del 1 al 10, horas de sueño, pasos, vasos de agua, foto de las comidas, en qué momento del día aparece más hambre y cuántas veces come afuera.

> **Dos cosas importantes acá.** Primero: la instrucción es *"no cambies nada, sólo anotá"* — cambiar antes de medir hace imposible saber después qué funcionó, y observar sin cambiar ya genera conciencia por sí solo. Segundo: **nada de contar calorías ni pesar comida.** El nicho son mujeres con jornadas de 8+ horas; pedirles eso la semana previa a empezar es la forma más rápida de que abandonen antes del día 1. Una foto lleva 10 segundos y da mejor información.

Cuando llega el día 1, María Pía tiene de cada alumna su historial, sus horarios bloqueados, su punto de partida, su capacidad medida, su patrón de comidas real y su porqué escrito. La llamada de bienvenida deja de ser una charla genérica.

#### ¿Y si compra dos días antes de que arranque el grupo?

**No pierde la Semana 0: se reordena.** Nadie se queda sin nada.

- **El mismo día:** video, cuestionario de ingreso y Mapa de Semana. Estas tres no se mueven — sin ellas el día 1 arranca improvisando.
- **El día 1:** las medidas, las fotos y los tests, antes del primer entrenamiento.
- **Durante la primera semana del reto:** la llamada 1:1. Es lo único que se reprograma.

Y se le dice con todas las letras en el mensaje de bienvenida: *"Entrás justo antes de que arranque el grupo, así que hacemos la preparación en modo exprés. No te perdés nada, sólo cambia el orden."* Nombrar la situación evita que sienta que le tocó una versión peor.

**Si compra el día del inicio o después**, elige ella: entrar con 1-3 días de atraso, o esperar al próximo grupo con la Semana 0 completa. Si el atraso pasa de 3 días recomendamos activamente esperar — arrancar corriendo desde atrás es una de las causas más frecuentes de abandono.

#### El número que hay que vigilar

**Devoluciones antes del día 1: menos del 2%.** Es el termómetro de todo el sistema. Si sube de ahí, la respuesta no es mejorar la Semana 0: es acortar la cadencia de 14 a 7 días.

El diseño completo está en `docs/estrategia/09-semana-cero.md`.

### El primer lanzamiento es distinto

El grupo fundador tiene ventana de inscripción más larga (10-14 días en vez de 7), precio de lanzamiento y un posicionamiento especial: *"sos del primer grupo"*.

**Una recomendación incómoda sobre el cupo:** apuntar a **12-15 alumnas, no 25.** El primer grupo es donde se rompen cosas — va a faltar contenido, va a haber instrucciones confusas. Con 15 se maneja y sale bien; con 25 se te va de las manos y arruinás justo el grupo del que van a salir tus primeros testimonios.

> **El grupo 1 no es para facturar. Es para generar los 10 testimonios con los que vas a vender las siguientes seis.**

### Cómo se opera

En la web hay un interruptor. Entre grupo y grupo se pone en "lista de espera" y **todos los botones del sitio cambian solos**: en vez de "Quiero entrar" dicen "Anotarme para la próxima". Son dos ediciones cada 14 días: una para cerrar, otra para abrir.

---

## 10. Skool: donde vive el producto

### Qué es y por qué lo elegimos

Skool es una plataforma que junta cuatro cosas en un solo lugar: los videos del curso, un muro donde la comunidad conversa, eventos en vivo, y un sistema de puntos y niveles.

Elegimos Skool porque **en fitness el acompañamiento lo es todo**, y el ranking de participación más la costumbre del "che, hoy hice la rutina" funcionan mejor ahí que en cualquier otra herramienta.

### Cómo está organizado el contenido

```
MÓDULO 0 — EMPEZÁ ACÁ            (la Semana 0)
MÓDULO 1 — FUNDAMENTOS           (cómo se arma una rutina, técnica básica)
MÓDULO 2 — SEMANA 1: ADAPTACIÓN
MÓDULO 3 — SEMANA 2: PROGRESIÓN
MÓDULO 4 — SEMANA 3: INTENSIDAD
MÓDULO 5 — SEMANA 4: CONSOLIDACIÓN
MÓDULO 6 — NUTRICIÓN             (abierto desde el día 1)
MÓDULO 7 — SOSTENERLO            (qué hacer después del día 28)
MÓDULO 8 — BIBLIOTECA DE EJERCICIOS
```

### El truco que le ahorra semanas de trabajo a María Pía

**Los módulos 2 al 5 son la programación** (qué hacer cada día, en qué orden, cuántas series). **El módulo 8 es la enciclopedia** (cómo se ejecuta cada ejercicio).

Cada día de rutina **enlaza** a los videos del módulo 8 en vez de repetirlos.

Esto significa que **María Pía graba cada ejercicio una sola vez** y ese video se reutiliza en las cuatro semanas y en todos los productos futuros. Sin esta separación, tendría que grabar lo mismo cuatro veces.

### Cuánto trabajo de grabación es, en total

| Qué | Cuánto |
|---|---|
| Biblioteca de ejercicios (40-50 videos de 1 min) | 2 medias jornadas |
| Videos explicativos (módulos 0, 1, 6, 7) | 1 media jornada |
| **Total para crear el producto entero** | **3 medias jornadas** |

Es finito, es acotado, y se hace una sola vez.

**Formato de cada video de ejercicio (45-70 segundos):**
1. Nombre del ejercicio y qué músculo trabaja
2. Ejecución completa, 3 repeticiones, de costado
3. Los 2 errores más comunes, mostrados y corregidos
4. Ejecución correcta de frente
5. Variante más fácil y más difícil

Todo grabado en vertical, con micrófono de solapa (el audio del celular en un gimnasio no sirve) y el nombre del ejercicio escrito en pantalla, así se puede reutilizar sin volver a editar.

### Cuánto tiempo tiene que estar María Pía en la comunidad

**Publicado, acotado y sostenido.** Predecible vale más que abundante.

| Cuándo | Cuánto |
|---|---|
| Lunes 18:00 a 18:45 | Responder preguntas |
| Jueves 18:00 a 18:45 | Correcciones de técnica |
| Miércoles 19:00 | Vivo de 40 minutos |
| **Total** | **~2 horas por semana** |

Esto se le dice a las alumnas desde el módulo 0. Saber cuándo va a responder elimina la ansiedad de la alumna y el agobio de la coach.

### Una advertencia honesta sobre Skool

Skool es la herramienta del sistema **peor preparada para automatizarse**. Dar de alta a una alumna nueva puede tener que hacerse a mano. Con 25 personas son 10-15 minutos por día, perfectamente manejable. Si esto escala a 100, habrá que replantearlo.

---

## 11. Las automatizaciones, explicadas simple

Una automatización es una tarea que antes hacía una persona y ahora hace sola una computadora. Las armamos todas en n8n.

### Lo que ganamos

| Tarea | Sin automatizar | Automatizado |
|---|---|---|
| Responder mensajes de Instagram | 8 h/semana | 1 h/semana |
| Responder WhatsApp | 10 h/semana | 2 h/semana |
| Dar de alta a las alumnas nuevas | 3 h/semana | 12 min/semana |
| Seguimiento de las que se atrasan | 5 h/semana | 30 min/semana |
| Controlar los pagos | 2 h/semana | 30 min/semana |
| Comunidad | 4 h/semana | 2 h/semana |
| Pedir testimonios | 2 h/semana | 0 |
| **TOTAL** | **34 h/semana** | **6 h/semana** |

**Recuperamos 28 horas por semana.** Eso es lo que hace posible que esto funcione con tres personas.

### Las que hay que hacer sí o sí antes de vender

**1. Captura de leads desde Instagram**
Alguien comenta la palabra clave → recibe el regalo por privado → su contacto se anota solo en la planilla y en el sistema de mails.

**2. Recepción del comprobante**
Llega el comprobante por WhatsApp → se le responde al instante → se guarda la imagen → se anota la venta como pendiente → se le avisa a María Pía con un código de 4 dígitos.

**3. Confirmación del pago**
María Pía responde `OK 4821` → el sistema entiende que ese pago está confirmado y arranca la bienvenida.

**4. Bienvenida y alta**
Invitación a Skool, mail de bienvenida, mensaje de WhatsApp, alta en el grupo, link para agendar la llamada, arranque del reloj de la garantía.

### Las que vienen después

**Secuencia de las primeras 48 horas.** Mensajes escalonados: bienvenida, "¿pudiste entrar?", "tu primera rutina está lista", "¿cómo te fue?". Las primeras 48 horas definen si la persona termina el programa.

**Detección de abandono.** Todos los días el sistema mira quién no aparece. A los 2 días manda un mensaje de aliento. A los 4 avisa a María Pía. A los 7 María Pía escribe personalmente.

**Recuperación de compra abandonada.** Alguien visitó la página de compra y no llegó ningún comprobante en 24 horas → se le escribe. **Esto es especialmente importante con transferencia**, porque mucha gente dice "después transfiero" y se olvida de verdad. No es rechazo, es olvido.

**Pedido automático de testimonios.** El día 21, cuando la motivación está en su pico, se le pide a las que van bien que cuenten cómo les fue en un audio de un minuto.

**Oferta del programa largo.** Los días 26, 28 y 31, automáticamente. **Acá está la mayor parte de la ganancia del negocio.**

**Recordatorios de la llamada de bienvenida.** Sin recordatorio, mucha gente no aparece a las llamadas gratuitas. Con recordatorio a las 24 horas y a la hora, baja muchísimo. Protege directamente el tiempo de María Pía.

**Lista de espera entre grupos.** Quien llega con la inscripción cerrada recibe la fecha del próximo grupo, no un "cerrado" a secas.

### Cómo se automatizan las respuestas de Instagram y WhatsApp

**En Instagram (ManyChat):**
- Comentario con palabra clave → regalo por privado
- Respuesta a una historia → se clasifica la intención y se responde
- Mensaje nuevo → menú de 3 opciones
- Seguimiento a las 24 y 72 horas

**En WhatsApp:**
- Primer contacto → menú de 4 opciones
- Comprobante → acuse de recibo instantáneo
- Alumna activa con una duda → respuestas a las preguntas repetidas
- Grupo de WhatsApp del grupo → rutina del día a las 7, recordatorio a las 20

### Las reglas de las respuestas automáticas

1. **Siempre se aclara que es un asistente.** Nunca se hace pasar por María Pía. En un negocio construido sobre confianza personal, que alguien descubra que hablaba con un robot creyendo hablar con la coach es un daño que no se repara.
2. **Velocidad ante todo.** Una respuesta imperfecta en 8 segundos gana a una perfecta en 4 horas.
3. **Ante la duda, pasa a un humano.** Escalar de más cuesta un minuto de Daiana. Escalar de menos cuesta una venta.
4. **Máximo 3 mensajes automáticos** sin respuesta. Más que eso genera bloqueos y arruina el alcance de la cuenta.
5. **Cero consejo médico automatizado.** Dolor, lesión, embarazo o medicación pasan a María Pía siempre, sin excepción.
6. **Se avisa el horario.** "María Pía responde lunes y jueves de 18 a 19."

> **La regla que define todo el proyecto: automatizamos la velocidad, no la relación.**
>
> El robot existe para que nadie espere. La conversación que decide una compra o retiene a una alumna la tiene una persona. Un negocio de coaching que automatiza la relación deja de ser coaching y se convierte en un curso — y los cursos no sostienen el precio ni generan ventas posteriores.

---

## 12. El contenido de Instagram y los lead magnets

### Los cuatro principios

1. **El regalo es la continuación exacta del reel.** Si el reel habla de cenas y el regalo es de rutinas, la gente no lo pide.
2. **Resolver un problema chico y urgente, completo.** No "todo sobre nutrición", sí "qué cenar cuando llegás a las 21".
3. **Que se consuma en menos de 10 minutos.** Un PDF de 40 páginas no se lee. Uno de 3 se usa el mismo día.
4. **Todo regalo termina apuntando al reto.** Es un puente, no un servicio gratuito.

### Los formatos, de mejor a peor

| Formato | Cuánta gente deja el mail |
|---|---|
| Cuestionario con resultado personalizado | 30-47% |
| Checklist o lista de control | 24-42% |
| Plantilla para completar | 20-35% |
| Video corto por privado | 20-30% |
| Guía o ebook | 4-8% |

**Conclusión: no hagan ebooks.** Checklists y plantillas, que son más fáciles de hacer y funcionan mucho mejor.

### Los cuatro regalos principales

| Regalo | Palabra clave |
|---|---|
| Rutina de 30 minutos para después del trabajo | `ENTRENO` |
| 5 cenas rápidas para cuando llegás tarde y con hambre | `CENA` |
| Cómo preparar tu semana en 45 minutos del domingo | `DOMINGO` |
| Los 7 errores de las que entrenan con poco tiempo | `ERRORES` |

Hay 12 en total, con calendario de 12 semanas, en el archivo de Excel **`MP-CEP-Plan-Lead-Magnets.xlsx`**.

### El ritmo de publicación

**4 publicaciones por semana: 2 con regalo y 2 sin.** Publicar siempre pidiendo el mail agota a la audiencia.

### La regla de la palabra clave

Una sola palabra, en mayúsculas, **dicha en el video y escrita en el texto**. "Comentá **CENA**". No "comentá si te interesa".

Una sola palabra por publicación. Dos opciones equivalen a cero acción.

### Cómo se produce sin morir

**Todo por tandas.** Una sesión de grabación al mes cubre las cuatro semanas de contenido. María Pía entra al set una vez por mes, no cuatro.

Para los PDF, **una sola plantilla base en Canva** con los colores de la marca. Cada regalo nuevo es un duplicado con contenido distinto. Nunca se diseña desde cero.

---

## 13. Quién hace qué

### El principio

**María Pía sólo hace lo que sólo ella puede hacer.** Todo lo demás se delega o se automatiza.

### María Pía — la cara y el criterio técnico

**Sí hace:** aparecer en cámara, las llamadas de bienvenida, corregir técnica, estar en la comunidad en sus bloques, aprobar los textos y las decisiones del producto.

**No hace nunca:** responder los primeros mensajes, editar videos, controlar pagos uno por uno, escribir mails, publicar.

**Objetivo: 12-15 horas por semana.**

| Bloque | Horas |
|---|---|
| Grabación (una tanda) | 3 |
| Llamadas de bienvenida (agrupadas) | 3 |
| Correcciones de técnica | 2 |
| Comunidad (dos bloques) | 1,5 |
| Vivo semanal | 1 |
| Excepciones | 2 |

### Daiana — contenido

Guiones y calendario, grabación asistida, edición de reels, publicación, diseño de los regalos en Canva, primera línea de comentarios, reporte semanal.

### Juan Cruz — estrategia y automatización

Web, n8n, ManyChat, Brevo, WhatsApp, planillas y métricas, decisiones de precio y de embudo junto a María Pía.

### La regla de escalado

**Si una tarea la hace una persona más de 3 veces por semana de la misma forma, entra a la cola de automatización.** Sin excepción.

---

## 14. Los números del negocio

### Cuánto cuesta mantenerlo

| Herramienta | Para qué | Costo mensual |
|---|---|---|
| Skool | Donde vive el producto | USD 99 |
| n8n | El motor de las automatizaciones | USD 24 |
| ManyChat | Respuestas de Instagram | USD 15 |
| Canva Pro | Diseño de los regalos | USD 12 |
| Servidor de WhatsApp | Automatizar WhatsApp | USD 6 |
| Vercel | Alojamiento de la web | USD 0-20 |
| Brevo | Mails (gratis hasta 500 contactos) | USD 0 |
| **TOTAL** | | **~USD 160-185** |

### El punto de equilibrio

**7 u 8 ventas por mes.** Todo lo que pase de ahí es ganancia.

### Objetivos del primer grupo

| Qué | Meta |
|---|---|
| Ventas | 15 alumnas |
| Comentarios con palabra clave | 100 por semana |
| Mails capturados | 150 en 4 semanas |
| **Que terminen el reto** | **más del 50%** |
| Devoluciones | menos del 5% |
| Que compren el programa largo | más del 25% de las que terminan |

### El techo actual

**Unas 25 alumnas por mes.** El límite lo pone la llamada de bienvenida: si son 20 minutos cada una y María Pía dedica 3 horas semanales, no da para más. Cuando se llegue a ese techo hay tres caminos: subir el precio, hacer las llamadas grupales, o sacar la llamada del producto de entrada.

---

## 15. Decisiones que tomamos y por qué

### Vender un reto y no un curso

No es lo mismo aunque el contenido sea idéntico:

| "Curso de 4 semanas" | "Reto de 28 días" |
|---|---|
| Contenido que consumís | Compromiso que asumís |
| Empezás cuando querés | Empezás con un grupo |
| Terminarlo es opcional | Terminarlo es el punto |
| Sin urgencia | Urgencia natural |
| Poca gente termina | Mucha gente termina |

Además, está medido que los retos pagos de 14 a 30 días son el formato que mejor convierte desde redes sociales.

### La métrica principal es cuánta gente termina, no cuánta compra

Puede sonar raro elegir eso antes que las ventas. El motivo:

- **Entre el 25% y el 55% de las que terminan compran el producto siguiente.** Las que abandonan, prácticamente ninguna.
- **Cada persona que termina es un testimonio.** Los testimonios son lo que vende los grupos que vienen.
- Una persona que abandona la semana 2 es plata perdida dos veces: no compra de nuevo y no te deja material.

Las ventas del primer grupo son casi un medio para conseguir testimonios. **El negocio de verdad arranca en el grupo 3, cuando ya tenés 30 casos reales para mostrar.**

### Empezar con un producto barato y no con el programa caro

Saltar de "seguidora de Instagram" a "programa de $120.000" es un salto demasiado grande. Ahí es donde se estanca la mayoría de los coaches. El reto barato calienta a la persona, le hace vivir el método y después el programa largo se vende sin objeciones.

### Sacar el quiz y el newsletter de la web

Los dos parecían buenas ideas. Los dos son fugas: le dan a alguien que estaba por comprar una forma de irse sintiendo que hizo algo. En una página de venta, "me suscribo y lo pienso" casi siempre significa que no vuelve.

La captura de mails va en Instagram, donde la persona está explorando contenido, no decidiendo una compra.

### Un solo botón de compra, siempre visible

Cada clic extra entre la decisión y el pago pierde gente. La barra flotante hace que el botón esté siempre a un toque de distancia, en todas las secciones y en todas las páginas.

### Sacar "presencial en Rosario" del texto de venta

El reto es online y lo puede hacer alguien de cualquier lado. Si el mapa domina, una persona de Córdoba asume que no es para ella. El gimnasio queda, pero con otro mensaje: es la prueba de que María Pía entrena gente de verdad todos los días.

### No usar tarjeta por ahora

Decisión del negocio: arrancar sin trámites de pasarela de pago. Tiene un costo en ventas y hay que asumirlo conscientemente. Se revisa después del primer grupo.

---

## 16. En qué estado está todo hoy

### Listo

- ✅ Estrategia completa documentada (9 documentos + 1 Excel)
- ✅ Web reconstruida entera: nuevo texto, nueva estructura, pensada para celular
- ✅ Página de compra con transferencia y WhatsApp automático
- ✅ Página de garantía con botón de arrepentimiento
- ✅ Páginas legales adaptadas a la ley argentina
- ✅ Optimización para Google
- ✅ Calendario de contenido de 12 semanas

### Falta (bloquea el lanzamiento)

| Qué falta | De quién depende |
|---|---|
| Precio definitivo | María Pía + Juan Cruz |
| Alias, CBU y titular de la cuenta | María Pía |
| Número de WhatsApp argentino | María Pía |
| Fechas del primer grupo | María Pía + Juan Cruz |
| Nombre definitivo del producto | María Pía |
| Crear la comunidad en Skool | María Pía |
| Grabar los 40-50 videos de ejercicios | María Pía |
| Grabar el video de 10 minutos de la web | María Pía |
| Testimonios reales con foto y permiso | María Pía |
| Instalar n8n y armar las automatizaciones | Juan Cruz |
| Producir los 4 regalos | Daiana |
| Revisión legal de las páginas por un abogado | María Pía |

### El orden en que conviene atacarlo

```
1. Definir precio, fechas y datos bancarios       (1 día)
2. Grabar los videos del producto                  (3 medias jornadas)
3. Montar Skool                                    (2 días)
4. Armar las automatizaciones básicas              (2 semanas)
5. Producir los regalos y arrancar el contenido    (2 semanas, en paralelo)
6. LANZAMIENTO DEL PRIMER GRUPO
```

---

## 17. Banco de ideas de contenido

Todo lo de arriba se puede convertir en contenido. Algunos ángulos que salen directo de este documento:

### Sobre el método
- "No te falta voluntad, te falta un sistema" — la tesis del negocio entera
- Por qué las rutinas de 30 minutos funcionan mejor que las de 90 para quien trabaja todo el día
- El plan B de 10 minutos: por qué contemplar los días malos es lo que hace que la gente no abandone
- Por qué arranca todo el grupo el mismo día

### Sobre el nicho
- "Llegás a las 8 de la noche y no tenés ganas de nada. No sos vaga, estás cansada."
- Cómo era mi semana cuando trabajaba 9 horas y entrenaba igual
- La diferencia entre la semana ideal y la semana real
- Los 45 minutos del domingo que te ordenan los otros 6 días

### Sobre transparencia (funciona muy bien y casi nadie lo hace)
- "Mi plan no es personalizado, y te explico por qué está bien"
- "Te doy 10 días de garantía porque la ley me obliga a dártelos igual"
- "Prefiero que no compres si estás en esta situación" — el "no es para vos"
- Cuánto cuesta de verdad armar un programa online

### Sobre el detrás de escena
- Cómo se graban 50 videos de ejercicios en dos días
- Un negocio de 3 personas: quién hace qué
- Por qué elegí cobrar por transferencia y no con tarjeta
- El día que descubrí que mi garantía era ilegal (spoiler: era corta, no larga)

### Sobre resultados
- Qué pasa el día 9 (que es cuando la mayoría abandona) y cómo lo atravesamos
- Qué cambió en 28 días: no el espejo, la energía a las 7 de la tarde
- Por qué mido cuánta gente termina y no cuánta compra

---

## Dónde está cada cosa

| Documento | Qué contiene |
|---|---|
| `docs/MANUAL-DEL-PROYECTO.md` | Este archivo |
| `docs/estrategia/00-plan-maestro.md` | Fases, roles y métricas |
| `docs/estrategia/01-web-arquitectura.md` | Análisis de la estructura de la web |
| `docs/estrategia/02-investigacion-mercado.md` | Qué funciona en coaching fitness online |
| `docs/estrategia/03-lead-magnets-calendario.md` | Regalos y calendario de contenido |
| `docs/estrategia/04-automatizaciones-n8n.md` | Las 22 automatizaciones, en detalle técnico |
| `docs/estrategia/05-skool-estructura.md` | Estructura de Skool y guion de grabación |
| `docs/estrategia/06-comunidad-respuestas.md` | Instagram y WhatsApp automatizados |
| `docs/estrategia/07-circuito-compra-y-garantia.md` | Cobro, garantía y devoluciones |
| `docs/estrategia/08-grupos-y-cadencia.md` | Cada cuánto abrir grupos nuevos |
| `docs/estrategia/09-semana-cero.md` | Qué hace la persona entre que paga y arranca |
| `docs/estrategia/10-planes-y-niveles.md` | Precios, niveles y qué pasa si alguien tarda de más |
| `docs/estrategia/MP-CEP-Plan-Lead-Magnets.xlsx` | El plan de contenido en Excel |
| `.claude/proximos-pasos.md` | Qué sigue, actualizado cada sesión |
