"use client";

import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react";
import {
  CHALLENGE,
  ENROLLMENT_OPEN,
  FOUNDING,
  FOUNDING_SPOTS_LEFT,
  RENEWAL,
  formatARS,
} from "@/lib/products";
import { PRIMARY_CTA } from "@/lib/site";

/**
 * Único CTA flotante del sitio. Fijo y visible en todas las secciones.
 * En mobile ocupa el ancho completo, al alcance del pulgar.
 */
export function BuyBar() {
  const isExternal = PRIMARY_CTA.href.startsWith("http");

  const content = (
    <>
      <span className="flex flex-col text-left leading-tight">
        {/* El precio y la frecuencia van en renglones separados. Juntos en uno
            solo, en el ancho que le queda a la barra al lado del botón, "por
            mes" se partía al medio y quedaba "$ 55.000 por / mes". */}
        <span className="whitespace-nowrap font-display text-base font-extrabold sm:text-lg">
          {ENROLLMENT_OPEN ? formatARS(CHALLENGE.priceARS) : "Lista de espera"}
        </span>
        {/* La urgencia va ACÁ dentro y no debajo de la barra: afuera flota sobre
            lo que haya detrás —la foto del hero, una sección oscura— y se vuelve
            ilegible en la mitad del scroll. Sobre el fondo tinta siempre se lee.
            Cuando no hay urgencia que mostrar, el renglón lo ocupa la frecuencia. */}
        <span className="whitespace-nowrap text-[11px] font-medium text-mp-canvas/75">
          {!ENROLLMENT_OPEN
            ? "Te aviso cuando abra"
            : FOUNDING.active && FOUNDING_SPOTS_LEFT > 0
              ? `${FOUNDING.label}: quedan ${FOUNDING_SPOTS_LEFT} lugares`
              : RENEWAL.frequencyLabel}
        </span>
      </span>

      <span className="inline-flex min-w-0 shrink items-center gap-2 rounded-md bg-mp-orange px-3 py-3 font-display font-semibold uppercase tracking-[0.08em] text-[11px] sm:text-xs text-mp-ink transition-transform duration-200 group-hover:scale-[0.98] group-active:scale-[0.96]">
        {/* `min-w-0` en el botón y `shrink-0` en la flecha: sin eso el botón
            no puede achicarse abajo de su ancho de contenido y a 390px se
            desbordaba de la barra, cortando la etiqueta al medio. */}
        <span className="min-w-0">{PRIMARY_CTA.label}</span>
        <ArrowRight weight="bold" className="h-4 w-4 shrink-0" aria-hidden="true" />
      </span>
    </>
  );

  const className =
    "group flex items-center justify-between gap-4 rounded-lg bg-mp-ink px-4 py-3 text-mp-canvas transition-colors hover:bg-mp-carbon focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mp-orange focus-visible:ring-offset-2 focus-visible:ring-offset-mp-canvas";

  return (
    <aside
      aria-label="Reservar tu lugar"
      className="pointer-events-none fixed inset-x-0 bottom-0 z-40"
    >
      <div className="container-page pb-3 pt-2 sm:pb-5">
        <div className="pointer-events-auto mx-auto max-w-lg lg:ml-auto lg:mr-0">
          {isExternal ? (
            <a
              href={PRIMARY_CTA.href}
              target="_blank"
              rel="noopener noreferrer"
              className={className}
            >
              {content}
            </a>
          ) : (
            <Link href={PRIMARY_CTA.href} className={className}>
              {content}
            </Link>
          )}
        </div>
      </div>
    </aside>
  );
}
