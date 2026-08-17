# Pieles del sitio — una publicada, dos para comparar

> **Construido el 2026-08-17. Decisión tomada el 2026-08-17.**
> Para quién: para vos con las manos, y para que Pía entienda qué va a ver.

---

## 1. Qué se decidió

Después de mirar las tres versiones en pantalla, **la que se publica es `pia`**: el fondo
claro y el naranja de la paleta original, con la tipografía del logotipo P│M encima. Es una
combinación de las dos que se habían probado, no una de ellas.

Mismo texto, misma estructura, mismos botones, mismos precios en las tres.

| | **`pia`** ← se publica | `moretto` | `moretto-dark` |
|---|---|---|---|
| Fondo | Blanco suave `#F5F5F2` | Porcelana `#F2F1ED` | Negro cálido `#131311` |
| Acento | **Naranja `#F2A31B`** | Bordeaux `#6E1D2B` | Rosa antiguo `#D19AA6` |
| Titulares | Fraunces | Fraunces | Fraunces |
| Texto | Newsreader | Newsreader | Newsreader, peso 450 |
| Utilidad | Montserrat | Montserrat | Montserrat |
| **Para qué** | **La web real** | Comparar sin color | Comparar de noche |

**La tipografía ya no cambia entre pieles.** Es de la marca: sale del logotipo y se queda.
Lo único que separa a las tres es el color. Eso hace que la comparación sea honesta —
se mira una variable por vez.

> El detalle de la paleta, de las tres familias tipográficas y del modo oscuro está en
> [`18-identidad-pia-moretto.md`](18-identidad-pia-moretto.md). Este documento cubre sólo la
> mecánica de servir varias pieles del mismo sitio.

---

## 2. Cómo funciona por dentro

El sitio ya estaba construido con **tokens**: ningún componente dice "naranja", todos dicen
"el color de acento". Eso hizo que el trabajo fuera de un par de horas y no de una semana.

Se agregó una variable de entorno, `NEXT_PUBLIC_THEME`.

```
(vacía)                          →  pia — la que se publica
NEXT_PUBLIC_THEME=moretto        →  comparación: monocromo claro
NEXT_PUBLIC_THEME=moretto-dark   →  comparación: monocromo oscuro
```

**En Vercel no hay que definir nada:** sin la variable, sale `pia`.

Esa variable pinta un atributo en la página y las variables de color y tipografía se
reemplazan solas. **Los 29 componentes no saben que existen los temas.**

### Los nombres de los tokens

En los temas Moretto, el token que se llama `--color-mp-orange` contiene un bordeaux. Se dejó
así a propósito: los nombres son **ranuras** ("el acento", "el fondo"), no descripciones del
color. Renombrarlos obligaría a tocar los 29 componentes sin cambiar un solo píxel. Está
anotado en el código para que nadie lo lea como un error.

---

## 3. Cómo lo desplegás

**El proyecto de Vercel que ya existe no necesita ningún cambio.** Sin la variable definida,
compila `pia`, que es la elegida.

Si en algún momento querés publicar una segunda piel para compararla con tráfico real, se
crea un segundo proyecto de Vercel apuntando **al mismo repositorio** con
`NEXT_PUBLIC_THEME=moretto` y un subdominio propio. Cuando cambie un precio, una fecha o un
texto, se cambia una vez y se despliegan los dos: **nunca pueden contradecirse.** Ése era el
riesgo real de copiar el repositorio, y es por eso que no lo copiamos.

### Para verlo local

```bash
npm run dev                                   # pia — la que se publica
NEXT_PUBLIC_THEME=moretto npm run dev         # comparación: monocromo claro
NEXT_PUBLIC_THEME=moretto-dark npm run dev    # comparación: monocromo oscuro
```

**Verificado:** las tres pieles compilan sin errores ni advertencias, con las 9 rutas
estáticas de siempre, y las tres pasan WCAG AA en todas las combinaciones de texto.

---

## 4. Qué queda del manual de marca anterior

El manual [`branding.md`](../../.claude/rules/branding.md) describía la marca "MP CEP".
La piel `pia` **conserva su paleta entera** —el blanco suave, el naranja, el negro profundo—
y **reemplaza sólo el par tipográfico**: donde decía Manrope + Inter, ahora va
Fraunces + Newsreader + Montserrat, que es lo que sale del logotipo P│M.

Lo que no se rompió, y fue deliberado:
- Sin sombras pesadas, sin gradientes, sin glassmorphism, sin emojis
- Todo el contraste de texto pasa WCAG AA, verificado con luminancia real
- El fondo claro sigue siendo claro

**El manual sigue pendiente de reescribir** en su sección de tipografía. Hasta entonces, la
verdad vigente es este documento y [`18-identidad-pia-moretto.md`](18-identidad-pia-moretto.md).

---

## 5. Qué falta

| | Estado |
|---|---|
| Sistema de pieles | ✅ Hecho |
| Piel `pia` — la que se publica | ✅ Hecha y verificada en contraste |
| Sistema de logotipos | ✅ Cuatro piezas; el color sale de los tokens |
| Las tres compilan | ✅ Verificado |
| Reescribir la tipografía en `branding.md` | Pendiente |
| Segundo proyecto en Vercel | Sólo si algún día se compara con tráfico real |
| Reparto de tráfico con cookie | Ídem — y ver el punto 6 antes |

---

## 6. Una advertencia honesta sobre medir

Si alguna vez volvés a comparar dos pieles: para que un test A/B dé un resultado en el que se
pueda confiar hacen falta **cientos de visitas por variante**. Con el tráfico del grupo
fundador el resultado va a ser **ruido** — si una vende 3 y la otra 2, eso no significa nada.

Comparar mirando, como se hizo acá, es la forma correcta a esta escala: la decisión es
cualitativa y se toma en pantalla. **El test estadístico tiene sentido más adelante**, cuando
haya anuncios corriendo y tráfico sostenido — del lanzamiento 3 en adelante.

---

## Ver también

- [`18-identidad-pia-moretto.md`](18-identidad-pia-moretto.md) — la identidad nueva en detalle
- [`branding.md`](../../.claude/rules/branding.md) — el manual anterior, pendiente de reescribir
- [`01-web-arquitectura.md`](01-web-arquitectura.md) — la estructura que las dos comparten
