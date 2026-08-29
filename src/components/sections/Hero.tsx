"use client";

import { useState } from "react";
import { getImageProps } from "next/image";
import { Play, X, WhatsappLogo } from "@phosphor-icons/react";
import { HERO } from "@/content/hero";
import { CONTACT } from "@/lib/site";
import {
  ENROLLMENT_OPEN,
  FOUNDING,
  FOUNDING_SPOTS_LEFT,
} from "@/lib/products";

/** Ancho real de la miniatura. Las dos versiones son 16:9. */
const POSTER_WIDTH = 1920;
const POSTER_HEIGHT = 1080;
const POSTER_SIZES = "(min-width: 1024px) 45vw, 100vw";
const POSTER_ALT =
  "Mi Método 4F: Fuerza, Función, Flexibilidad y Foco. Pía Moretto entrenando con una pesa rusa";

/**
 * Art direction de la miniatura: mobile y desktop llevan fotos distintas de
 * Pía. No alcanza con `sizes` —eso resuelve resolución, no encuadre—, así que
 * usamos <picture> con getImageProps para que el navegador baje UNA sola de
 * las dos y no las dos. Con dos <Image> y `hidden` bajaría ambas y duplicaría
 * el peso del LCP.
 */
function usePosterSources() {
  const common = {
    alt: POSTER_ALT,
    width: POSTER_WIDTH,
    height: POSTER_HEIGHT,
    sizes: POSTER_SIZES,
    priority: true,
  };

  const {
    props: { srcSet: desktopSrcSet },
  } = getImageProps({ ...common, src: HERO.videoPosterUrl });

  const {
    props: { srcSet: mobileSrcSet, ...imgProps },
  } = getImageProps({ ...common, src: HERO.videoPosterUrlMobile });

  return { desktopSrcSet, mobileSrcSet, imgProps };
}

export function Hero() {
  const [playing, setPlaying] = useState(false);
  const { desktopSrcSet, mobileSrcSet, imgProps } = usePosterSources();

  return (
    <section id="inicio" aria-label="Presentación" className="pt-8 pb-16 md:pt-16 md:pb-24">
      <div className="container-page">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16 lg:items-center">
          <div className="flex flex-col gap-6 lg:col-span-6">
            <span className="inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.18em] text-mp-carbon/70">
              <span
                aria-hidden="true"
                className="inline-block h-1.5 w-1.5 rounded-full bg-mp-orange"
              />
              {HERO.eyebrow}
            </span>

            <h1 className="font-display text-[2.5rem] font-extrabold leading-[1.05] tracking-tight sm:text-5xl lg:text-[64px]">
              <span className="block text-mp-ink">{HERO.headlineLead}</span>
              <span className="block text-mp-ember">{HERO.headlineAccent}</span>
            </h1>

            {/* En mobile el hero se queda con lo minimo —titulo, una linea y
                el video— para que la miniatura entre en pantalla. El texto
                largo, el cuadro de "empezas hoy", el CTA de dudas y los tres
                datos de abajo aparecen recien en desktop. */}
            <p className="max-w-xl text-base leading-relaxed text-mp-carbon/80 md:hidden">
              {HERO.descriptionShort}
            </p>
            <p className="hidden max-w-xl text-base leading-relaxed text-mp-carbon/80 md:block md:text-lg">
              {HERO.description}
            </p>

            {ENROLLMENT_OPEN && (
              <div className="hidden flex-col gap-1.5 rounded-md border border-mp-line p-4 md:flex">
                <span className="inline-flex items-center gap-2 font-display text-[11px] font-semibold uppercase tracking-[0.14em] text-mp-ember">
                  <span
                    aria-hidden="true"
                    className="inline-block h-1.5 w-1.5 rounded-full bg-mp-orange"
                  />
                  {FOUNDING.active ? FOUNDING.label : "Empezás hoy"}
                </span>
                <p className="text-sm leading-relaxed text-mp-carbon">
                  Empezás el día que entrás, no cuando arranque un grupo.
                  {FOUNDING.active
                    ? ` Hay ${FOUNDING.spotsTotal} lugares al precio de lanzamiento${
                        FOUNDING_SPOTS_LEFT > 0
                          ? ` —quedan ${FOUNDING_SPOTS_LEFT}—`
                          : ""
                      }, y ese precio te queda congelado mientras sigas entrenando.`
                    : " Entrás al precio de lanzamiento, y te queda congelado mientras sigas entrenando."}
                </p>
              </div>
            )}

            <a
              href={CONTACT.askUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden w-full items-center justify-center gap-2 rounded-md border border-mp-ink px-6 py-4 font-display text-xs font-semibold uppercase tracking-[0.08em] text-mp-ink transition-all duration-200 hover:bg-mp-ink hover:text-mp-canvas active:scale-[0.98] sm:w-auto md:inline-flex"
            >
              <WhatsappLogo weight="fill" className="h-4 w-4" aria-hidden="true" />
              Tengo una duda antes de entrar
            </a>

            <dl className="mt-2 hidden grid-cols-3 gap-4 border-t border-mp-line pt-6 md:grid">
              {HERO.trustPoints.map((point) => (
                <div key={point.label} className="flex flex-col">
                  <dt className="font-display text-lg font-extrabold text-mp-ink md:text-xl">
                    {point.label}
                  </dt>
                  <dd className="mt-1 text-[11px] leading-snug text-mp-carbon/70 md:text-xs">
                    {point.caption}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="lg:col-span-6">
            {playing ? (
              <div className="relative aspect-video w-full overflow-hidden rounded-[var(--radius-card)] border border-mp-line bg-mp-ink">
                <video
                  src={HERO.videoUrl}
                  poster={HERO.videoPosterUrl}
                  autoPlay
                  controls
                  playsInline
                  preload="metadata"
                  className="h-full w-full object-contain"
                  title="Pía explica el método del Flex Program"
                />
                <button
                  type="button"
                  onClick={() => setPlaying(false)}
                  aria-label="Cerrar video"
                  className="absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-mp-canvas/90 text-mp-ink transition-colors hover:bg-mp-canvas"
                >
                  <X weight="bold" className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setPlaying(true)}
                className="group relative block aspect-video w-full overflow-hidden rounded-[var(--radius-card)] border border-mp-line bg-mp-canvas"
                aria-label="Reproducir el video donde Pía explica el método"
              >
                <picture>
                  <source media="(min-width: 768px)" srcSet={desktopSrcSet} />
                  <source media="(max-width: 767px)" srcSet={mobileSrcSet} />
                  <img
                    {...imgProps}
                    alt={POSTER_ALT}
                    fetchPriority="high"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </picture>
                <span
                  aria-hidden="true"
                  className="absolute left-1/2 top-1/2 inline-flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-mp-ink text-mp-canvas transition-transform duration-300 group-hover:scale-95 md:h-20 md:w-20"
                >
                  <Play weight="fill" className="h-6 w-6 translate-x-0.5 md:h-7 md:w-7" />
                </span>
                <span className="absolute left-3 right-3 top-3 inline-flex items-center gap-2 rounded-md bg-mp-ink/90 px-3 py-2 text-left font-display text-[11px] font-semibold uppercase tracking-[0.12em] text-mp-canvas backdrop-blur-sm sm:right-auto">
                  <span
                    aria-hidden="true"
                    className="h-1.5 w-1.5 shrink-0 rounded-full bg-mp-orange"
                  />
                  {HERO.videoBadge}
                </span>
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
