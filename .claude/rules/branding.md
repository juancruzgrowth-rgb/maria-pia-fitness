# Branding — Pía Moretto

> ## ⚠️ LA SECCIÓN DE TIPOGRAFÍA ESTÁ DESACTUALIZADA — 2026-08-17
>
> La marca pasó de "MP CEP" a **Pía Moretto** (monograma `P│M`). Se decidió
> conservar **toda la paleta de este manual** —el blanco suave, el naranja, el
> negro profundo— y **reemplazar sólo el par tipográfico**.
>
> | | Antes | Ahora |
> |---|---|---|
> | Titulares | Manrope | **Fraunces** |
> | Texto | Inter | **Newsreader** |
> | Etiquetas y CTAs | Manrope | **Montserrat** |
>
> **Qué sigue valiendo:** todo lo demás. La paleta, el tono verbal, las palabras
> prohibidas, los motivos visuales, la cuadrícula, el espaciado, las
> microanimaciones y "Lo que NO hacemos" salvo la línea de la fuente Inter.
>
> **Qué ya no vale:** la § Tipografía de más abajo, entera.
>
> El detalle está en
> [`docs/estrategia/18-identidad-pia-moretto.md`](../../docs/estrategia/18-identidad-pia-moretto.md)
> y las reglas operativas en
> [`rules/frontend/styles.md`](frontend/styles.md).

Manual visual oficial. Cualquier desviación del color, tipografía o tono requiere aprobación explícita.

## Paleta cromática

| Token | Hex | Uso |
|-------|-----|-----|
| `mp.canvas` | `#F5F5F2` | Fondo principal del sitio (Blanco Suave) |
| `mp.ink` | `#050505` | Texto principal, CTAs primarios (Negro Profundo) |
| `mp.carbon` | `#161616` | Texto secundario, bordes oscuros (Carbón) |
| `mp.orange` | `#EAA959` | Acento primario (Naranja Principal — del logo) |
| `mp.amber` | `#D0904C` | Hover/active de naranja (Ámbar Cálido) |
| `mp.sky` | `#BFDFFF` | Acento secundario decorativo (Celeste) |
| `mp.line` | `#EAEAEA` | Bordes ultra claros, separadores |

**Reglas:**
- Fondo del sitio: SIEMPRE `mp.canvas` (no usar blanco puro)
- Texto principal: `mp.ink` (no usar `#000000`)
- CTAs primarios: fondo `mp.ink`, texto `mp.canvas`
- Acentos en links, hover, badges, iconos: `mp.orange` o `mp.amber`
- `mp.sky` solo para decoración (líneas, halos sutiles, no fondos grandes)
- Naranja NUNCA cubre áreas grandes (no hero naranja, no tarjetas naranjas saturadas)

## Tipografía

| Familia | Uso | Pesos |
|---------|-----|-------|
| **Manrope** | H1, H2, H3, CTAs (mayúsculas) | ExtraBold (800), Bold (700), Semibold (600) |
| **Inter** | Body, UI, captions, formularios | Regular (400), Medium (500), Semibold (600) |

**Jerarquía:**
- H1: Manrope ExtraBold, ~56/64 (3.5rem / 4rem)
- H2: Manrope Bold, ~32/40 (2rem / 2.5rem)
- H3: Manrope Semibold, ~20/28 (1.25rem / 1.75rem)
- Body: Inter Regular, 16/24
- Caption: Inter Regular, 12/16
- CTA: Manrope Semibold, mayúsculas, letter-spacing ~0.04em

**Carga:** Vía `next/font/google` con `display: 'swap'`. Variables CSS `--font-manrope` y `--font-inter` declaradas en `app/layout.tsx`.

## Tono verbal

- **Motivador:** Inspiramos acción y superación, no vendemos humo.
- **Profesional:** Transmitimos rigor, confianza y método.
- **Cercano:** Hablamos de vos (rioplatense), con empatía.
- **Directo:** Mensajes claros y al grano. Sin clichés ni inglés innecesario.

**Banned:** "Eleva", "Impulsa", "Desata", "De nueva generación", "Game-changer", "Transforma tu vida", "Lorem Ipsum", "John Doe", "Acme".

## Motivos visuales

- **Trazo de pulso:** SVG ECG-style, línea fina de 1.5-2px, color `mp.orange`. Usar como divisor entre secciones y como acento decorativo.
- **Líneas finas:** `border: 1px solid var(--mp-line)` para separar bento boxes.
- **Iconos:** Phosphor Icons, peso "regular" o "duotone". Color `mp.orange` o `mp.ink`.
- **Fotos:** Desaturadas, con leve ruido (3% opacidad). Sin imágenes saturadas de stock.
- **Sin emojis** en ningún lado del producto (UI, copy, alt). Reemplazar con SVG.
- **Sin sombras pesadas**, sin gradientes, sin glassmorphism. Sombras solo ultra difusas y opacidad < 0.05.
- **Sin `rounded-full`** en contenedores grandes (sí en avatars chicos y dots).

## Cuadrícula y espaciado

- Grandes márgenes macro: `py-20` a `py-32` entre secciones
- Texto largo: `max-w-4xl` (no más ancho)
- Bento grids: CSS Grid asimétrico, padding de cards `p-8` a `p-10`
- Mobile-first siempre — desktop es enhancement

## Microanimaciones

- Apariciones por scroll: IntersectionObserver, fade in 600ms
- CTAs: `hover:scale-[0.98]` con `transition-transform`
- Carrusel de reels: scroll continuo derecha→izquierda + autoplay del que queda en el centro
- Cascada en bento: revelar items con stagger 80-120ms
- NUNCA montar todo simultáneamente

## Lo que NO hacemos

- ❌ Fuente "Inter" sola sin Manrope (rompe jerarquía editorial)
- ❌ Fondos negros completos (la marca usa fondo claro en producto)
- ❌ Sombras tipo `shadow-md/lg/xl` de Tailwind
- ❌ Gradientes en botones, badges o fondos
- ❌ Emojis en cualquier parte
- ❌ Logo deformado, recoloreado fuera de las variantes oficiales o con sombras
- ❌ Naranja saturado en grandes superficies
