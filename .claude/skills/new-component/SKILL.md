---
name: new-component
description: Scaffoldea un nuevo componente UI siguiendo las convenciones del proyecto MP CEP.
---

Crear un nuevo componente llamado: $ARGUMENTS

1. Usar el agente `component-builder` para analizar los patrones existentes en `src/components/`.
2. Decidir la ubicación correcta según el tipo:
   - UI atómica → `src/components/ui/`
   - Sección de página → `src/components/sections/`
   - Layout → `src/components/layout/`
3. Crear el archivo del componente respetando la paleta MP (`mp.canvas`, `mp.ink`, `mp.orange`, etc.) y la tipografía (Manrope display + Inter body).
4. Tipos en interfaces propias, sin `any`.
5. Server Component salvo que necesite interactividad real.
6. Informar la ruta del archivo creado y cómo importarlo.
