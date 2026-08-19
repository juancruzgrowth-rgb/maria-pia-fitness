"use client";

import { useState } from "react";
import Image from "next/image";
import { Play, X, WhatsappLogo } from "@phosphor-icons/react";
import { HERO } from "@/content/hero";
import { CONTACT } from "@/lib/site";
import { ENROLLMENT_OPEN, FOUNDING } from "@/lib/products";

export function Hero() {
  const [playing, setPlaying] = useState(false);

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

            <p className="max-w-xl text-base leading-relaxed text-mp-carbon/80 md:text-lg">
              {HERO.description}
            </p>

            {ENROLLMENT_OPEN && FOUNDING.active && (
              <div className="flex flex-col gap-1.5 rounded-md border border-mp-line p-4">
                <span className="inline-flex items-center gap-2 font-display text-[11px] font-semibold uppercase tracking-[0.14em] text-mp-ember">
                  <span
                    aria-hidden="true"
                    className="inline-block h-1.5 w-1.5 rounded-full bg-mp-orange"
                  />
                  {FOUNDING.label}
                </span>
                <p className="text-sm leading-relaxed text-mp-carbon">
                  Empezás el día que entrás, no cuando arranque un grupo. El
                  precio de lanzamiento vale hasta el {FOUNDING.endsAt}.
                </p>
              </div>
            )}

            <a
              href={CONTACT.askUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 rounded-md border border-mp-ink px-6 py-4 font-display text-xs font-semibold uppercase tracking-[0.08em] text-mp-ink transition-all duration-200 hover:bg-mp-ink hover:text-mp-canvas active:scale-[0.98] sm:w-auto"
            >
              <WhatsappLogo weight="fill" className="h-4 w-4" aria-hidden="true" />
              Tengo una duda antes de entrar
            </a>

            <dl className="mt-2 grid grid-cols-3 gap-4 border-t border-mp-line pt-6">
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
                  title="Pía explica el método del Reto 28 Días"
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
                className="group relative block aspect-video w-full overflow-hidden rounded-[var(--radius-card)] border border-mp-line bg-mp-ink"
                aria-label="Reproducir el video donde Pía explica el método"
              >
                <Image
                  src={HERO.videoPosterUrl}
                  alt="Pía explicando el método del Reto 28 Días en su centro de entrenamiento"
                  fill
                  sizes="(min-width: 1024px) 45vw, 100vw"
                  priority
                  className="object-cover opacity-90"
                />
                <span
                  aria-hidden="true"
                  className="absolute inset-0 bg-mp-ink/25 transition-colors group-hover:bg-mp-ink/15"
                />
                <span
                  aria-hidden="true"
                  className="absolute left-1/2 top-1/2 inline-flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-mp-canvas text-mp-ink transition-transform duration-300 group-hover:scale-95 md:h-20 md:w-20"
                >
                  <Play weight="fill" className="h-6 w-6 translate-x-0.5 md:h-7 md:w-7" />
                </span>
                <span className="absolute inset-x-3 bottom-3 inline-flex items-center gap-2 rounded-md bg-mp-canvas/90 px-3 py-2 text-left font-display text-[11px] font-semibold uppercase tracking-[0.12em] text-mp-ink backdrop-blur-sm">
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
