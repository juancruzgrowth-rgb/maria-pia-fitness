# Testing — MP CEP

## Comandos
- `npm run typecheck` después de cada serie de cambios
- `npm run build` antes de cada commit grande
- `npm run lint` para verificar reglas de estilo

## Qué se verifica hoy
No hay backend: el sitio es estático y no tiene endpoints, base de datos ni
pasarela de pago. La verificación es de copy, de links y de build.

- **Datos bancarios:** el alias y el CBU de `/comprar` coinciden con lo que
  confirmó Pía. Es el único error del sitio que cuesta plata.
- **Links de WhatsApp:** todos abren con el mensaje precargado correcto
  (comprobante, consulta, baja, asesoría).
- **Precios:** lo que muestra la home coincide con `src/lib/products.ts`.
- **Cupo del grupo fundador:** `FOUNDING.spotsTaken` refleja las clientas
  reales. Un cupo inventado es publicidad engañosa (art. 8, Ley 24.240).
- **Páginas legales:** accesibles desde el footer, y `/cancelar` enlazada
  desde la home (Res. 424/2020).

## Reglas de tests
- La tarea NO está completa si `typecheck`, `lint` o `build` fallan.
- Un cambio en `src/lib/products.ts` exige revisar la home, `/comprar` y los
  Términos y Condiciones: los tres leen de ahí.

## Smoke test manual antes de cada deploy
1. Cargar la home en mobile y desktop
2. Reproducir el video del hero
3. Abrir `/comprar` y copiar alias y CBU con los botones de copiar
4. Click en "Ya transferí" → WhatsApp abre con nombre, email y plan a completar
5. Click en la barra de compra flotante → llega a `/comprar`
6. Abrir `/cancelar` desde el footer y probar el botón de WhatsApp
7. Verificar que ninguna sección promete débito automático ni pago con tarjeta
8. Páginas legales accesibles desde el footer
