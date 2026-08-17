# Identidad Pía Moretto — Logotipo, tipografía y temas

> **Construido el 2026-08-17.** Reemplaza a "MP — Centro de Entrenamiento Personalizado"
> como identidad del producto digital.
> Para quién: para vos, para Daiana que va a diseñar piezas, y para Pía que tiene que elegir.

---

## 1. Qué cambió

**"María Pía" pasa a ser "Pía".** Más corto, más cercano, y es como firma. Cambiado en los 29
lugares del código donde aparecía: copy de la web, mensajes precargados de WhatsApp,
metadatos y datos estructurados.

**La marca pasa a ser "Pía Moretto".** El logotipo es un monograma `P|M` sobre la firma
completa en versalitas. Suena a profesional con nombre propio, no a gimnasio con sigla — que
es exactamente lo que hace falta para vender a $40.000 y para sostener una asesoría de
$280.000.

> **Pendiente legal:** `SITE.fiscalName` dice "Pía Moretto", pero en las páginas legales tiene
> que figurar el nombre que está en la constancia de AFIP. Confirmar antes de publicar.

---

## 2. El sistema de logotipos

El logotipo original está hecho en Canva. En la web **no se incrusta como imagen**: se
reconstruye con tipografía, por tres razones concretas.

1. **Hereda el color del tema.** El mismo componente funciona en claro y en oscuro. Con un PNG
   harían falta dos archivos y alguien que se acuerde de mantener los dos.
2. **Es nítido en cualquier tamaño y pesa cero.**
3. **Es texto de verdad.** Los lectores de pantalla y Google leen "Pía Moretto". Una imagen no
   dice nada si nadie escribió el `alt`.

### Las cuatro piezas

Están en [`src/components/ui/Logo.tsx`](../../src/components/ui/Logo.tsx) y se usan como
componentes, no se copian y pegan.

| Pieza | Qué es | Dónde va |
|---|---|---|
| `LogoMonogram` | Sólo `P│M` | Favicon, avatares, sellos, espacios chicos |
| `LogoWordmark` | Sólo `PÍA MORETTO` | Pies de página, franjas, marcas de agua |
| `LogoLockup` | Monograma sobre firma, apilado | Portadas, hero, piezas impresas |
| `Logo` | Versión horizontal, enlazada al inicio | Barra de navegación y pie |

**Un detalle que importa:** la barra vertical entre la P y la M **no es el carácter `|`**. Es
un elemento con su propio alto y un grosor de 1px real. Con el carácter, el grosor y la altura
cambian con cada tipografía y en pantallas de alta densidad se ve gorda e imprecisa.

### Cuando llegue el SVG oficial

Exportalo desde Canva como SVG y pasámelo. Se reemplaza **sólo el monograma**; las otras tres
piezas y todos los lugares donde se usan quedan igual. Es un cambio de diez minutos.

---

## 3. Tipografía: tres roles, no dos

El logotipo usa **Quiche** (de Adam Ladd) arriba y **Montserrat** abajo.

**Quiche no se puede usar en la web todavía.** Es una tipografía comercial que se distribuye
por Adobe Fonts y MyFonts, y viene incluida en Canva — pero la licencia de Canva cubre lo que
diseñás *dentro* de Canva, no publicarla como webfont en un sitio. Para eso hace falta una
licencia de webfont aparte.

**Mientras tanto se sustituye por Bodoni Moda**, que comparte el alto contraste y las serifas
finas del logotipo y es libre. El sustituto libre más parecido a Quiche es en realidad Playfair
Display (~85% de similitud), pero **Playfair es la serif por defecto de todo sitio hecho con
IA** y se reconoce a un kilómetro. Bodoni Moda es igual de defendible, menos gastada, y —lo
importante— **tiene eje de tamaño óptico**, que es lo que hace posible el modo oscuro. Ver §5.

| Rol | Tipografía | Para qué |
|---|---|---|
| **Display** | Bodoni Moda | Titulares. Es la voz del logotipo |
| **Cuerpo** | Newsreader | Texto largo. Serif de lectura, contraste bajo |
| **Utilidad** | Montserrat | Etiquetas, botones, navegación. Sale del propio logo |

### Por qué dos serifas y no una serif con una sans

Pediste que combinara distintos tipos de serif. La regla que hace que eso funcione, y no
parezca un error, es esta: **dos tipografías tienen que diferenciarse por rol y parecerse en
origen**. Dos serifas casi iguales se leen como un fallo de carga; dos sin nada en común
hacen ruido.

Acá la diferencia de rol es evidente —una es de alto contraste y hace de titular, la otra es
de bajo contraste y se lee en párrafos— y lo que comparten es la lógica editorial. Montserrat
entra como tercer rol y no rompe nada, porque **viene del logotipo mismo**: es la tipografía
de la firma. Eso hace que el sistema se sienta derivado de la marca en lugar de elegido de un
catálogo.

### Cómo se aplica en el código

Todo lo que va **en mayúsculas** en este sitio es del rol de utilidad —etiquetas, botones,
insignias, navegación— y **ningún titular está en mayúsculas**. Así que la regla es automática
en el CSS en lugar de repetir una clase en 27 lugares. Si algún día se agrega un titular en
mayúsculas, hay que hacerlo con una clase explícita.

---

## 4. Los tres temas

Se eligen con `NEXT_PUBLIC_THEME` en tiempo de build.

| Tema | Qué es |
|---|---|
| `mp` | La marca anterior: naranja y palo seco geométrico |
| `moretto` | **La identidad nueva, clara** |
| `moretto-dark` | **La identidad nueva, oscura** |

```bash
npm run dev                                      # mp
NEXT_PUBLIC_THEME=moretto npm run dev            # claro
NEXT_PUBLIC_THEME=moretto-dark npm run dev       # oscuro
```

### La paleta clara

| Token | Valor | Qué es |
|---|---|---|
| Fondo | `#F2F1ED` | Porcelana fría |
| Texto | `#111110` | Casi negro |
| Secundario | `#2E2D2A` | |
| Acento | `#6E1D2B` | Bordeaux |
| Líneas | `#E0DED7` | |

**Dos decisiones a defender:**

**No es crema.** La crema tibia (`#F4F1EA` y sus primos) es el fondo por defecto de todo sitio
generado con IA, y además tiñe de sepia un logotipo que es negro puro sobre blanco. La
porcelana es fría: deja el negro como negro.

**El único color es un bordeaux, usado con cuentagotas.** El logotipo no tiene color. Ponerle
una paleta encima lo contradice. El bordeaux aparece en enlaces, en el foco del teclado y en
poco más — y por eso, cuando aparece, se ve.

### La paleta oscura

| Token | Valor |
|---|---|
| Fondo | `#131311` — negro cálido, no `#000` |
| Texto | `#EDEAE1` — hueso, no `#FFF` |
| Secundario | `#B5B1A6` |
| Acento | `#D19AA6` — rosa antiguo |

---

## 5. El modo oscuro no es invertir los colores

Es la parte donde se nota si alguien lo pensó. Tres cosas que un modo oscuro hecho a las
apuradas no hace:

**1 · Ni negro puro ni blanco puro.** `#000` con `#FFF` encima vibra, cansa la vista y en
pantallas OLED produce halo alrededor de las letras. El fondo es un negro cálido y el texto
un hueso.

**2 · Las serifas finas se engrosan.** Ésta es la importante. Una tipografía de alto contraste
como Bodoni tiene trazos finísimos, y **sobre fondo oscuro esos trazos desaparecen**. Es el
error clásico de pasar una serif elegante a modo oscuro: en claro se ve refinada, en oscuro se
ve rota.

La solución no es agrandar el texto. Bodoni Moda tiene un **eje de tamaño óptico**: los
diseñadores de la tipografía dibujaron versiones distintas para tamaños distintos, y las de
tamaño chico tienen los trazos finos más gruesos a propósito, porque a cuerpo pequeño la
tinta se pierde. Nosotros usamos ese eje para otra cosa: **en claro pedimos tamaño óptico 96
—hairlines finas, igual que el logotipo— y en oscuro bajamos a 11, que engrosa las hairlines
sin cambiar el tamaño de la letra.**

Es una sola línea de CSS y es la diferencia entre un modo oscuro que se ve caro y uno que se
ve descuidado.

**3 · El texto sube de peso y se separa.** El texto claro sobre fondo oscuro florece
ópticamente: se ve más pesado y más apretado de lo que es. El cuerpo pasa de peso 400 a 450 y
suma un poco de tracking para compensar.

---

## 6. Accesibilidad — verificado, no estimado

Se comprobó cada combinación de color de los tres temas **incluyendo las opacidades** que usan
los componentes (`text-mp-carbon/70`, `/80`), que es justo donde se rompe y donde nadie mira.

**Aparecieron dos fallos y se corrigieron:**

- En el tema claro, el gris secundario al 70% de opacidad —el de las etiquetas de 11px— daba
  **4,38:1**, por debajo del 4,5 exigido. Se oscureció de `#3A3936` a `#2E2D2A` → **4,94:1**.
- En el tema oscuro, el mismo caso daba **4,20:1**. Se aclaró de `#A8A49A` a `#B5B1A6` →
  **4,83:1**.

Los dos habrían pasado desapercibidos a ojo. Con los valores corregidos, **las tres pieles
pasan WCAG AA en todas las combinaciones de texto.**

> El único fallo que queda es preexistente y conocido: el naranja del tema `mp` da 1,92:1. Por
> eso existe el token `ember`, y por eso el naranja sólo se usa en iconos y bordes.

---

## 7. Lo que todavía no está

- **El SVG oficial del logotipo.** Exportalo desde Canva y lo integro.
- **La licencia de Quiche**, si se decide usar la tipografía real en la web. Hasta entonces,
  Bodoni Moda. *(Que las piezas de Canva usen Quiche y la web use Bodoni no es un problema
  grave: son medios distintos y nadie las compara lado a lado. Pero conviene decidirlo.)*
- **Favicon y la imagen que se ve al compartir el link** (Open Graph). Se pueden generar desde
  el monograma; media hora.
- **El dominio.** El código ya dice `hola@piamoretto.com`, que **todavía no existe**. Hay que
  registrarlo o cambiar el mail.
- **Revisión de las fotos.** El stock actual de Pexels se eligió para una marca naranja. Sobre
  porcelana y bordeaux va a pedir otra cosa: más desaturado, más contraste.
- **Mirarlo con los ojos.** Yo verifiqué que compila y que el contraste da. **No pude ver el
  sitio renderizado**, así que la última palabra sobre si se ve bien es tuya y de Pía.

---

## 8. Lo que hay que decidir

**Pía tiene que elegir entre `moretto` y `moretto-dark`.** Mandale los dos links y que decida
mirando el celular, no la computadora: el 80% de su audiencia entra desde el teléfono.

Mi opinión, para que la tengas: **el claro para la web y el oscuro para el producto**. La web
tiene que ser fácil de leer a las once de la noche por alguien que la abre por primera vez, y
un fondo claro se lee mejor a la primera. El oscuro tiene más carácter y funcionaría muy bien
adentro de Skool y en las piezas de Instagram, donde la persona ya está adentro y la
intimidad juega a favor.

---

## Ver también

- [`17-test-ab-diseno.md`](17-test-ab-diseno.md) — cómo se despliegan dos pieles a la vez
- [`branding.md`](../../.claude/rules/branding.md) — el manual anterior, que esta identidad reemplaza
- [`11-metodo-4f.md`](11-metodo-4f.md) — la arquitectura de nombres

**Fuentes de la investigación tipográfica:**
[Free alternatives to Quiche](https://fontalternatives.com/alternatives/quiche/) ·
[Quiche Sans en Adobe Fonts](https://fonts.adobe.com/fonts/quiche-sans) ·
[Font pairings for editorial design](https://fontalternatives.com/blog/font-pairings-editorial-magazine-design/) ·
[Inclusive dark mode — Smashing Magazine](https://www.smashingmagazine.com/2025/04/inclusive-dark-mode-designing-accessible-dark-themes/) ·
[Typography in dark mode — Design Shack](https://designshack.net/articles/typography/dark-mode-typography/)
