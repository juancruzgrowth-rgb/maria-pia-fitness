"use client";

import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react";
import {
  CHALLENGE,
  ENROLLMENT_OPEN,
  FOUNDING,
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
        <span className="font-display font-extrabold text-base sm:text-lg">
          {ENROLLMENT_OPEN
            ? `Desde ${formatARS(CHALLENGE.priceARS)}`
            : "Lista de espera"}
        </span>
        {/* La urgencia va ACÁ dentro y no debajo de la barra: afuera flota sobre
            lo que haya detrás —la foto del hero, una sección oscura— y se vuelve
            ilegible en la mitad del scroll. Sobre el fondo tinta siempre se lee. */}
        <span className="text-[11px] font-medium text-mp-canvas/75">
          {!ENROLLMENT_OPEN
            ? "Te aviso cuando abra"
            : FOUNDING.active
              ? `Precio fundador hasta el ${FOUNDING.endsAt}`
              : CHALLENGE.name}
        </span>
      </span>

      <span className="inline-flex items-center gap-2 rounded-md bg-mp-orange px-4 py-3 font-display font-semibold uppercase tracking-[0.08em] text-[11px] sm:text-xs text-mp-ink transition-transform duration-200 group-hover:scale-[0.98] group-active:scale-[0.96]">
        {PRIMARY_CTA.label}
        <ArrowRight weight="bold" className="h-4 w-4" aria-hidden="true" />
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
