/**
 * Pieles del sitio.
 *
 * `pia` es la que se publica y la que sale sin configurar nada. Las otras dos
 * existen para mirar la misma web con otra paleta antes de decidir: son EL
 * MISMO SITIO — mismo copy, misma estructura, mismos botones y el mismo
 * `products.ts`. Cambia sólo el color.
 *
 * Se elige en tiempo de build con NEXT_PUBLIC_THEME. Si no está definida o
 * trae cualquier otra cosa, sale `pia`, que es lo que compila Vercel.
 *
 * Ver docs/estrategia/17-test-ab-diseno.md
 */

export type ThemeId = "pia" | "moretto" | "moretto-dark";

export interface Theme {
  id: ThemeId;
  /** Aparece en <html data-theme> y manda sobre las variables CSS. */
  label: string;
  /** Color de la barra del navegador en mobile. Debe coincidir con el canvas. */
  canvas: string;
  /** Manda el `color-scheme` del navegador: formularios y scrollbars nativos. */
  isDark: boolean;
  /** Hipótesis que esta variante pone a prueba. */
  hypothesis: string;
}

export const THEMES: Record<ThemeId, Theme> = {
  pia: {
    id: "pia",
    label: "Pía Moretto — la que se publica",
    canvas: "#F5F5F2",
    isDark: false,
    hypothesis:
      "Fondo claro y naranja de la paleta original, con el sistema tipográfico del logotipo P│M. La serif pone el oficio; el naranja, la energía.",
  },
  moretto: {
    id: "moretto",
    label: "Comparación — monocromo claro",
    canvas: "#F2F1ED",
    isDark: false,
    hypothesis:
      "Porcelana y bordeaux con cuentagotas, sin naranja. Más editorial y más frío.",
  },
  "moretto-dark": {
    id: "moretto-dark",
    label: "Comparación — monocromo oscuro",
    canvas: "#131311",
    isDark: true,
    hypothesis:
      "La misma identidad de noche. Intimidad y foco — el entrenamiento que hacés cuando terminó el día.",
  },
};

const THEME_IDS = Object.keys(THEMES) as ThemeId[];

function resolveThemeId(): ThemeId {
  const raw = process.env.NEXT_PUBLIC_THEME;
  return THEME_IDS.find((id) => id === raw) ?? "pia";
}

export const THEME_ID = resolveThemeId();
export const THEME = THEMES[THEME_ID];
