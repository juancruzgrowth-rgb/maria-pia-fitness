# Test A/B de diseño — Dos pieles, un solo sitio

> **Decidido y construido el 2026-08-17.**
> Para quién: para vos con las manos, y para que Pía entienda qué va a ver.

---

## 1. Qué se hizo

El sitio puede vestirse de **tres maneras distintas** sin duplicar una sola línea de copy.
Mismo texto, misma estructura, mismos botones, mismos precios. **Lo único que cambia es el
color, la tipografía y el logotipo.**

| | **`mp`** | **`moretto`** | **`moretto-dark`** |
|---|---|---|---|
| Fondo | Blanco suave `#F5F5F2` | Porcelana `#F2F1ED` | Negro cálido `#131311` |
| Acento | Naranja `#F2A31B` | Bordeaux `#6E1D2B` | Rosa antiguo `#D19AA6` |
| Titulares | Manrope | Bodoni Moda | Bodoni Moda, óptica 11 |
| Texto | Inter | Newsreader | Newsreader, peso 450 |
| Utilidad | Manrope | Montserrat | Montserrat |
| **Qué representa** | La marca anterior | **La identidad Pía Moretto** | **La misma, de noche** |

> **Actualizado el 2026-08-17.** La variante "Editorial" que existía acá quedó reemplazada por
> la identidad real de Pía Moretto. El detalle de la paleta, la tipografía y el modo oscuro
> está en [`18-identidad-pia-moretto.md`](18-identidad-pia-moretto.md); este documento cubre
> sólo la mecánica de servir dos pieles a la vez.

---

## 2. Cómo funciona por dentro

El sitio ya estaba construido con **tokens**: ningún componente dice "naranja", todos dicen
"el color de acento". Eso hizo que el trabajo fuera de un par de horas y no de una semana.

Se agregó una variable de entorno, `NEXT_PUBLIC_THEME`. Vale `mp`, `moretto` o `moretto-dark`.

```
NEXT_PUBLIC_THEME=mp             →  marca anterior
NEXT_PUBLIC_THEME=moretto        →  Pía Moretto claro
NEXT_PUBLIC_THEME=moretto-dark   →  Pía Moretto oscuro
```

Esa variable pinta un atributo en la página y las variables de color y tipografía se
reemplazan solas. **Los 29 componentes no saben que existen los temas.**

### Los nombres de los tokens

En los temas Moretto, el token que se llama `--color-mp-orange` contiene un bordeaux. Se dejó
así a propósito: los nombres son **ranuras** ("el acento", "el fondo"), no descripciones del
color. Renombrarlos obligaría a tocar los 29 componentes sin cambiar un solo píxel. Está
anotado en el código para que nadie lo lea como un error.

---

## 3. Cómo lo desplegás

Dos proyectos de Vercel apuntando **al mismo repositorio**, con la variable distinta:

| Proyecto | Variable | Dominio |
|---|---|---|
| `mp-cep` | `NEXT_PUBLIC_THEME=mp` | el dominio principal |
| `mp-cep-b` | `NEXT_PUBLIC_THEME=moretto` | un subdominio, ej. `b.dominio.com` |

**Ventaja de hacerlo así:** cuando cambie un precio, una fecha o un texto, se cambia una vez
y se despliegan las dos. **Nunca pueden contradecirse.** Ése era el riesgo real de copiar el
repositorio, y es por eso que no lo copiamos.

### Para verlo local

```bash
npm run dev                                   # marca anterior
NEXT_PUBLIC_THEME=moretto npm run dev         # Pía Moretto claro
NEXT_PUBLIC_THEME=moretto-dark npm run dev    # Pía Moretto oscuro
```

**Verificado:** los tres temas compilan sin errores ni advertencias, con las 9 rutas
estáticas de siempre, y los tres pasan WCAG AA en todas las combinaciones de texto.

---

## 4. Cómo se reparte el tráfico

Depende de para qué lo uses:

**Si es para que Pía elija:** no repartas nada. Le mandás los dos links y decide ella.
Es lo más rápido y no necesita ninguna infraestructura.

**Si es para medir de verdad:** hace falta que la misma persona vea siempre la misma versión
(si ve una distinta cada vez que entra, el dato no sirve) y que el reparto sea parejo. Eso se
resuelve con un middleware que sortea una vez y guarda la elección en una cookie. **No está
construido todavía** — son un par de horas más, y sólo tiene sentido si vas a medir en serio.

---

## 5. ⚠️ Antes de mostrarle esto a tráfico real

**Los temas Moretto se apartan del manual de marca anterior**, que pedía naranja y Manrope.
Eso es esperable: el manual describía la marca "MP CEP", que quedó reemplazada por el
logotipo de Pía Moretto. **Pero el manual todavía no se reescribió**, así que hasta que eso
pase conviven dos verdades en el repositorio.

Lo que los temas Moretto **no** rompen, y fue deliberado:
- Sin sombras pesadas, sin gradientes, sin glassmorphism, sin emojis
- Todo el contraste de texto pasa WCAG AA, verificado con luminancia real
- El fondo claro sigue siendo claro; el oscuro es una variante, no el reemplazo

**Pía tiene que elegir entre claro y oscuro antes de que esto vea tráfico.** Ver
[`18-identidad-pia-moretto.md`](18-identidad-pia-moretto.md) §8.

---

## 6. Cuánto tiempo tomó y qué falta

| | Estado |
|---|---|
| Sistema de temas | ✅ Hecho |
| Paleta y tipografía de los temas Moretto | ✅ Hechas y verificadas en contraste |
| Sistema de logotipos | ✅ Cuatro piezas; el color sale de los tokens |
| Los tres compilan | ✅ Verificado |
| Segundo proyecto en Vercel | Pendiente — 10 minutos, cuando quieras |
| Reparto de tráfico con cookie | Pendiente — sólo si vamos a medir en serio |

---

## 7. Una advertencia honesta sobre medir

Para que un test A/B dé un resultado en el que se pueda confiar hacen falta **cientos de
visitas por variante**. Con el tráfico del grupo fundador, el resultado va a ser **ruido**:
si una variante vende 3 y la otra 2, eso no significa nada.

**Sirve igual, pero para otra cosa:** para que Pía y Daiana vean las dos direcciones
en pantalla y decidan cuál representa mejor el negocio. Esa decisión es cualitativa y se toma
mirando, no midiendo.

**El test estadístico de verdad tiene sentido más adelante**, cuando haya anuncios corriendo y
tráfico sostenido — es decir, del lanzamiento 3 en adelante. Lo bueno es que la infraestructura
ya va a estar hecha para ese momento.

---

## Ver también

- [`18-identidad-pia-moretto.md`](18-identidad-pia-moretto.md) — la identidad nueva en detalle
- [`branding.md`](../../.claude/rules/branding.md) — el manual anterior, pendiente de reescribir
- [`01-web-arquitectura.md`](01-web-arquitectura.md) — la estructura que las dos comparten
