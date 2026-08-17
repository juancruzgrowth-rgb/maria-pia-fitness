import Link from "next/link";
import { cn } from "@/lib/utils";
import { SITE } from "@/lib/site";

/**
 * Sistema de logotipos — Pía Moretto.
 *
 * El logotipo original está hecho en Canva con Quiche (monograma) y Montserrat
 * (firma). Acá se reconstruye con tipografía web en lugar de incrustar una
 * imagen, por tres motivos:
 *
 *   1. Hereda el color del tema. El mismo componente sirve en claro y en
 *      oscuro sin exportar dos archivos ni recolorear un PNG.
 *   2. Es nítido en cualquier tamaño y pesa cero.
 *   3. Es texto real: los lectores de pantalla y Google leen "Pía Moretto".
 *
 * Cuando llegue el SVG oficial exportado desde Canva, se reemplaza sólo el
 * monograma y el resto del sistema queda igual.
 *
 * Cuatro piezas, cada una con su lugar:
 *   LogoMonogram  · P|M solo — favicon, avatares, sellos, espacios chicos
 *   LogoWordmark  · PÍA MORETTO solo — pies de página, franjas, marcas de agua
 *   LogoLockup    · monograma sobre firma — el logotipo completo, vertical
 *   Logo          · versión horizontal enlazada — navegación y pie
 */

const [FIRST_INITIAL, SECOND_INITIAL] = SITE.monogram;

interface MonogramProps {
  className?: string;
  /** Alto del monograma en clases de Tailwind. Por defecto, el de navegación. */
  size?: "sm" | "md" | "lg";
}

const MONOGRAM_SIZE = {
  sm: "text-lg",
  md: "text-2xl",
  lg: "text-5xl md:text-6xl",
} as const;

/**
 * El monograma. La barra vertical entre las dos iniciales es un elemento real,
 * no el carácter "|": así se controla su grosor y su alto, y queda como
 * hairline de 1px en cualquier tamaño.
 */
export function LogoMonogram({ className, size = "md" }: MonogramProps) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "inline-flex items-center font-display font-medium leading-none text-mp-ink",
        MONOGRAM_SIZE[size],
        className,
      )}
    >
      <span>{FIRST_INITIAL}</span>
      <span className="mx-[0.32em] h-[1.15em] w-px shrink-0 bg-current opacity-70" />
      <span>{SECOND_INITIAL}</span>
    </span>
  );
}

interface WordmarkProps {
  className?: string;
}

/** La firma. Versalitas espaciadas, igual que en el logotipo original. */
export function LogoWordmark({ className }: WordmarkProps) {
  return (
    <span
      className={cn(
        "font-ui text-[0.7rem] font-medium uppercase leading-none text-mp-ink",
        className,
      )}
    >
      {SITE.fullName}
    </span>
  );
}

interface LockupProps {
  className?: string;
  size?: MonogramProps["size"];
}

/** El logotipo completo, apilado. Para el hero, portadas y piezas impresas. */
export function LogoLockup({ className, size = "lg" }: LockupProps) {
  return (
    <span
      className={cn("inline-flex flex-col items-center gap-3", className)}
      role="img"
      aria-label={SITE.fullName}
    >
      <LogoMonogram size={size} />
      <LogoWordmark className="text-[0.65rem] tracking-[0.34em]" />
    </span>
  );
}

interface LogoProps {
  className?: string;
  withTagline?: boolean;
}

/** Versión horizontal y enlazada. Es la que va en la barra y en el pie. */
export function Logo({ className, withTagline = false }: LogoProps) {
  return (
    <Link
      href="/"
      aria-label={`Inicio — ${SITE.fullName}`}
      className={cn("group inline-flex items-center gap-3", className)}
    >
      <LogoMonogram size="md" />
      <span
        aria-hidden="true"
        className="h-7 w-px shrink-0 bg-mp-line"
      />
      <span className="flex flex-col gap-1 leading-none">
        <LogoWordmark />
        {withTagline && (
          <span className="font-ui text-[9px] uppercase tracking-[0.2em] text-mp-carbon/70">
            {SITE.city}
          </span>
        )}
      </span>
    </Link>
  );
}
