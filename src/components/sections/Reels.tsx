"use client";

import { useEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { Play, InstagramLogo } from "@phosphor-icons/react";
import { REELS } from "@/content/reels";
import { CONTACT } from "@/lib/site";

export function Reels() {
  const autoplay = useRef(
    Autoplay({ delay: 4200, stopOnInteraction: false, stopOnMouseEnter: true }),
  );

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "center" },
    [autoplay.current],
  );

  const [activeIndex, setActiveIndex] = useState(0);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setActiveIndex(emblaApi.selectedScrollSnap());
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi]);

  useEffect(() => {
    videoRefs.current.forEach((video, i) => {
      if (!video) return;
      if (i === activeIndex) {
        video.currentTime = 0;
        video.play().catch(() => {});
      } else {
        video.pause();
        video.currentTime = 0;
      }
    });
  }, [activeIndex]);

  return (
    <section
      aria-label="Reels y contenido"
      className="section-pad border-t border-mp-line"
    >
      <div className="container-page">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between mb-10 md:mb-14">
          <div className="max-w-2xl flex flex-col gap-4">
            <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-mp-carbon/70 font-medium">
              <span
                aria-hidden="true"
                className="inline-block h-1.5 w-1.5 rounded-full bg-mp-orange"
              />
              EN REDES
            </span>
            <p className="text-base md:text-lg text-mp-carbon/80 leading-relaxed">
              Entrenamiento, nutrición y hábitos explicados simple.
            </p>
            <h2 className="font-display font-extrabold text-3xl md:text-4xl leading-[1.1] tracking-tight">
              Cada semana, te comparto contenido práctico para ayudarte a moverte
              mejor, comer con más claridad y construir un proceso que puedas sostener.
            </h2>
          </div>

          {CONTACT.instagramUrl && (
            <a
              href={CONTACT.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-display font-semibold uppercase tracking-[0.12em] text-mp-ink hover:text-mp-amber transition-colors"
            >
              <InstagramLogo weight="regular" className="h-5 w-5" />
              Seguir en Instagram → @MP.CEP
            </a>
          )}
        </div>
      </div>

      <div className="overflow-hidden px-4 md:px-8" ref={emblaRef}>
        <div className="flex gap-4 md:gap-6">
          {REELS.map((reel, index) => {
            const isActive = index === activeIndex;
            return (
              <div
                key={reel.id}
                className="relative shrink-0 basis-[70%] sm:basis-[44%] md:basis-[32%] lg:basis-[22%] aspect-[9/16] rounded-[var(--radius-card)] overflow-hidden border border-mp-line transition-all duration-500"
                style={{
                  transform: isActive ? "scale(1)" : "scale(0.92)",
                  opacity: isActive ? 1 : 0.6,
                }}
              >
                <video
                  ref={(el) => {
                    videoRefs.current[index] = el;
                  }}
                  src={reel.videoUrl}
                  muted
                  playsInline
                  loop
                  preload="metadata"
                  className="absolute inset-0 h-full w-full object-cover"
                  aria-label={reel.caption}
                />

                <div className="absolute inset-0 bg-gradient-to-t from-mp-ink/70 via-transparent to-transparent pointer-events-none" />

                {!isActive && (
                  <span className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-mp-canvas/90">
                      <Play
                        weight="fill"
                        className="h-5 w-5 text-mp-ink translate-x-0.5"
                        aria-hidden="true"
                      />
                    </span>
                  </span>
                )}

                <p className="absolute bottom-3 left-3 right-3 text-xs text-mp-canvas font-medium leading-snug line-clamp-2 drop-shadow">
                  {reel.caption}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
