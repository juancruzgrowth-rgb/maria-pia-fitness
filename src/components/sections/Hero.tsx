"use client";

import { useState } from "react";
import { ArrowRight, Play, X } from "@phosphor-icons/react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { HERO } from "@/content/hero";
import { CONTACT } from "@/lib/site";
import { Button } from "@/components/ui/Button";

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] as const },
});

export function Hero() {
  const [playing, setPlaying] = useState(false);

  return (
    <section
      id="inicio"
      aria-label="Bienvenida"
      className="relative section-pad pt-12 md:pt-20"
    >
      <AnimatePresence mode="wait">
        {playing ? (
          <motion.div
            key="video-expanded"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="container-page"
          >
            <div className="relative w-full aspect-video rounded-[var(--radius-card)] overflow-hidden border border-mp-line bg-mp-ink">
              <iframe
                src={`${HERO.videoUrl}?autoplay=1&rel=0`}
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
                className="h-full w-full"
                title="Video de presentación de Maria Pia"
              />
              <button
                type="button"
                onClick={() => setPlaying(false)}
                aria-label="Cerrar video"
                className="absolute top-4 right-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-mp-canvas/90 text-mp-ink hover:bg-mp-canvas transition-colors"
              >
                <X weight="bold" className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="hero-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="container-page grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center"
          >
            <div className="lg:col-span-7 flex flex-col gap-8 max-w-2xl">
              <motion.span
                {...fadeUp(0.1)}
                className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-mp-carbon/70 font-medium"
              >
                <span
                  aria-hidden="true"
                  className="inline-block h-1.5 w-1.5 rounded-full bg-mp-orange"
                />
                {HERO.eyebrow}
              </motion.span>

              <motion.h1
                {...fadeUp(0.2)}
                className="font-display font-extrabold text-5xl sm:text-6xl lg:text-[72px] tracking-tight leading-[1.05]"
              >
                <span className="block text-mp-ink">{HERO.headlineLead}</span>
                <span className="block text-mp-orange">{HERO.headlineAccent}</span>
              </motion.h1>

              <motion.p
                {...fadeUp(0.3)}
                className="text-base md:text-lg text-mp-carbon/80 leading-relaxed max-w-xl"
              >
                {HERO.description}
              </motion.p>

              <motion.div
                {...fadeUp(0.4)}
                className="flex flex-col sm:flex-row gap-3 sm:items-center"
              >
                <Button
                  href={CONTACT.whatsappUrl}
                  size="lg"
                  variant="primary"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {HERO.primaryCtaLabel}
                  <ArrowRight weight="bold" className="h-4 w-4" />
                </Button>
                <Button href="#servicios" size="lg" variant="ghost">
                  {HERO.secondaryCtaLabel}
                </Button>
              </motion.div>

              <motion.dl
                {...fadeUp(0.5)}
                className="mt-6 grid grid-cols-3 gap-6 border-t border-mp-line pt-8 max-w-md"
              >
                {HERO.trustPoints.map((point) => (
                  <div key={point.label} className="flex flex-col">
                    <dt className="font-display font-extrabold text-xl text-mp-ink">
                      {point.label}
                    </dt>
                    <dd className="text-xs text-mp-carbon/70 mt-1 leading-snug">
                      {point.caption}
                    </dd>
                  </div>
                ))}
              </motion.dl>
            </div>

            <motion.div {...fadeUp(0.25)} className="lg:col-span-5">
              <div className="relative aspect-[3/4] overflow-hidden rounded-[var(--radius-card)] border border-mp-line bg-mp-ink">
                <Image
                  src={HERO.videoPosterUrl}
                  alt="Maria Pia en sesión de entrenamiento"
                  fill
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  priority
                  className="object-cover opacity-90"
                />
                <button
                  type="button"
                  onClick={() => setPlaying(true)}
                  aria-label="Reproducir video de presentación"
                  className="absolute inset-0 flex items-center justify-center group"
                >
                  <span className="absolute inset-0 bg-mp-ink/20 group-hover:bg-mp-ink/10 transition-colors" />
                  <span className="relative inline-flex h-20 w-20 items-center justify-center rounded-full bg-mp-canvas text-mp-ink shadow-[0_0_0_1px_rgba(5,5,5,0.04)] group-hover:scale-95 transition-transform duration-300">
                    <Play
                      weight="fill"
                      className="h-7 w-7 translate-x-0.5"
                      aria-hidden="true"
                    />
                  </span>
                </button>
                <span className="absolute bottom-4 left-4 right-4 inline-flex items-center gap-2 rounded-md bg-mp-canvas/90 backdrop-blur-sm px-3 py-2 text-xs font-display font-semibold uppercase tracking-[0.14em] text-mp-ink">
                  <span
                    aria-hidden="true"
                    className="h-1.5 w-1.5 rounded-full bg-mp-orange"
                  />
                  Te explico mi método en 10 minutos
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
