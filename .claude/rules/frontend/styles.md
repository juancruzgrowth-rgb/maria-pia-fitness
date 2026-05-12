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

## Tokens (declarados en `tailwind.config.ts`)

```ts
colors: {
  mp: {
    canvas: "#F5F5F2",   // fondo principal
    ink: "#050505",      // texto / CTA primario
    carbon: "#161616",   // texto secundario
    orange: "#F2A31B",   // acento principal
    amber: "#D98A17",    // acento hover
    sky: "#BFDFFF",      // acento decorativo
    line: "#EAEAEA",     // bordes
  },
}
```

## Tipografía

- Variables de fuente cargadas en `layout.tsx` y aplicadas globalmente:
  - `--font-manrope` → display (titulares, CTAs)
  - `--font-inter` → texto (body, UI)
- Clases helper: `font-display` (Manrope) y `font-sans` (Inter, default)
- H1-H3: usar `font-display` con peso ExtraBold/Bold/Semibold
- Body: default (Inter)
- CTAs: `font-display font-semibold uppercase tracking-wider`

## Layout

- Contenedor base: `mx-auto max-w-7xl px-4 sm:px-6 lg:px-8`
- Texto largo: `max-w-4xl` (lectura cómoda)
- Spacing entre secciones: `py-20 md:py-28 lg:py-32`
- Bento card: `border border-mp-line p-8 md:p-10`

## Animaciones

- Fade in scroll: `opacity-0 translate-y-3` → `opacity-100 translate-y-0` con `transition-all duration-700 ease-out`
- CTA hover: `hover:scale-[0.98] active:scale-[0.96] transition-transform`
- Stagger en grids: 80-120ms entre items
