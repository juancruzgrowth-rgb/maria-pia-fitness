/**
 * Sistema de temas para el test A/B de diseño.
 *
 * Las dos variantes son EL MISMO SITIO: mismo copy, misma estructura, mismos
 * botones y el mismo `products.ts`. Lo único que cambia es la piel — color,
 * tipografía y logo. Así el test mide diseño y nada más, y un cambio de precio
 * o de fecha impacta en las dos sin tocar dos repositorios.
 *
 * Se elige en tiempo de build con NEXT_PUBLIC_THEME. En Vercel son dos
 * proyectos apuntando al mismo repo con esa variable distinta.
 *
 * Ver docs/estrategia/17-test-ab-diseno.md
 */

export type ThemeId = "mp" | "moretto" | "moretto-dark";

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
  mp: {
    id: "mp",
    label: "MP — manual de marca anterior",
    canvas: "#F5F5F2",
    isDark: false,
    hypothesis:
      "Naranja y palo seco geométrico. Transmite método y energía. Es la marca previa al logotipo de Pía Moretto.",
  },
  moretto: {
    id: "moretto",
    label: "Pía Moretto — claro",
    canvas: "#F2F1ED",
    isDark: false,
    hypothesis:
      "Porcelana, serif de alto contraste y bordeaux con cuentagotas. Transmite oficio y criterio: una profesional, no una app de fitness.",
  },
  "moretto-dark": {
    id: "moretto-dark",
    label: "Pía Moretto — oscuro",
    canvas: "#131311",
    isDark: true,
    hypothesis:
      "La misma identidad de noche. Transmite intimidad y foco — el entrenamiento que hacés cuando terminó el día.",
  },
};

const THEME_IDS = Object.keys(THEMES) as ThemeId[];

function resolveThemeId(): ThemeId {
  const raw = process.env.NEXT_PUBLIC_THEME;
  return THEME_IDS.find((id) => id === raw) ?? "mp";
}

export const THEME_ID = resolveThemeId();
export const THEME = THEMES[THEME_ID];
