---
paths: "src/**/*.{tsx,jsx,css}"
---

# Estilos — MP CEP

- **Tailwind con tokens MP** — usar las clases custom (`bg-mp-canvas`, `text-mp-ink`, etc.) en lugar de hex hardcodeados.
- **Mobile-first siempre.** Empezar sin breakpoint, agregar `md:` y `lg:` después.
- **Sin estilos inline** (excepto `style={{ ... }}` para values dinámicos calculados).
- **Sin `@apply`** salvo para tokens repetitivos puros.
- **Sin sombras pesadas** (`shadow-md/lg/xl`). Sombras solo ultra-difusas con opacidad < 0.05.
- **Sin gradientes** en producto. Solo en SVG decorativos contados.
- **Sin `rounded-full`** en contenedores grandes (cards, secciones). Sí en avatars y dots chicos.
- **Sin emojis.** Sustituir siempre por SVG.

## Tokens (declarados en `src/app/globals.css`, bloque `@theme`)

No hay `tailwind.config.ts`: con Tailwind v4 los tokens viven en el CSS.

```css
--color-mp-canvas: #f5f5f2;   /* fondo principal */
--color-mp-ink:    #050505;   /* texto / CTA primario */
--color-mp-carbon: #161616;   /* texto secundario */
--color-mp-orange: #eaa959;   /* acento principal — NO usar en texto (1.9:1) */
--color-mp-amber:  #d0904c;   /* acento hover */
--color-mp-ember:  #8a5a24;   /* acento para TEXTO sobre canvas (5.4:1) */
--color-mp-sky:    #bfdfff;   /* acento decorativo */
--color-mp-line:   #eaeaea;   /* bordes */
```

Los nombres son **ranuras semánticas**, no descripciones del color: las pieles de
comparación meten un bordeaux en `--color-mp-orange` a propósito. Ver `src/lib/theme.ts`.

## Tipografía

Tres roles, dos serifas y un palo seco. Sale del logotipo P│M.

| Variable | Familia | Rol |
|---|---|---|
| `--font-display` | Fraunces | Titulares y cifras. Serif suave, la voz del logotipo |
| `--font-sans` | Newsreader | Texto largo. Serif de lectura, bajo contraste |
| `--font-ui` | Montserrat | Etiquetas, botones, navegación |

- Clases helper: `font-display`, `font-sans` (default) y `font-ui`
- **Todo lo que va en `uppercase` toma Montserrat automáticamente** — hay una regla
  global en `globals.css`. No hace falta agregar `font-ui` a mano
- H1-H3: `font-display`
- CTAs: `font-display font-semibold uppercase tracking-wider` (la regla de arriba
  los pasa a Montserrat)
- **Nunca fijar `font-variation-settings: "opsz" …` a mano.** Está en `auto`: el
  navegador deriva el tamaño óptico del tamaño real del texto. Fijarlo adelgaza
  los trazos finos de todo lo chico hasta hacerlos desaparecer
- **Nunca arrastrar `font-feature-settings` de una familia a otra.** Un tag como
  `ss01` significa cosas distintas en cada tipografía
- **No pedir un eje variable en `next/font` sin justificarlo.** Cada eje engorda
  el `.woff2` que baja toda visitante. Pedir `SOFT`/`WONK` de Fraunces para
  escribir el valor que ya traen por defecto costaba 52 KB; el `opsz` de
  Newsreader, que a un solo tamaño de cuerpo no llega a trabajar, otros 72 KB
- **Ninguna serif de alto contraste (Didone) para texto chico.** Una Bodoni o una
  Playfair se desarman abajo de ~24px: el "4" se lee "1" y el guion desaparece.
  Es lo que pasó con los precios y con los marcadores del método 4F

## Verificación visual

Compilar no es ver. Los tres bugs de tipografía de este proyecto —el guion
invisible, el "40.000" que parecía "10.000" y la línea de escasez ilegible sobre
la foto— pasaron `typecheck`, `lint`, `build` y la auditoría de contraste sin que
saltara nada. **Cualquier cambio de tipografía, color de texto o elemento
flotante se mira en captura a 390px de ancho real antes de commitear.**

## Layout

- Contenedor base: `mx-auto max-w-7xl px-4 sm:px-6 lg:px-8`
- Texto largo: `max-w-4xl` (lectura cómoda)
- Spacing entre secciones: `py-20 md:py-28 lg:py-32`
- Bento card: `border border-mp-line p-8 md:p-10`

## Animaciones

- Fade in scroll: `opacity-0 translate-y-3` → `opacity-100 translate-y-0` con `transition-all duration-700 ease-out`
- CTA hover: `hover:scale-[0.98] active:scale-[0.96] transition-transform`
- Stagger en grids: 80-120ms entre items
