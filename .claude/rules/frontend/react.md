---
paths: "src/**/*.{tsx,jsx}"
---

# React — MP CEP

- **Server Components por defecto.** `"use client"` solo cuando hay interactividad real (eventos, estado local, hooks de browser).
- **Sin `any`** — usar interfaces o tipos propios. Si TypeScript no infiere bien, declarar el tipo, no usar `as any`.
- **Props tipadas con interfaces.** Una interfaz por componente, en el mismo archivo o exportada.
- **Un componente, una responsabilidad.** Si pasa de ~150 líneas o tiene varias intents, partir.
- **Lógica de negocio fuera de componentes.** Hooks personalizados o funciones en `src/lib/`.
- **No queries directas a APIs externas en componentes.** Pasar por `src/lib/<servicio>.ts` o por server actions / route handlers.
- **No agregar manejo de errores para escenarios que no pueden ocurrir.** Trust framework guarantees.
- **No comentarios obvios.** Solo cuando el "por qué" es no-obvio.

## Convenciones específicas

- Iconos: `import { Heart } from "@phosphor-icons/react"` — peso regular por defecto
- Forms: `react-hook-form` + `zod` con `@hookform/resolvers/zod`
- Animaciones: `framer-motion` solo cuando IntersectionObserver puro no alcanza
- Carrusel: `embla-carousel-react`
- Estado global: `zustand` (solo carrito); resto vía props o context local

## Naming
- Componentes: PascalCase, named export
- Hooks: `useFooBar`, named export
- Helpers en `lib/`: camelCase, named export
- Tipos: `Foo` o `FooProps` (sufijo `Props` para los de componentes)
