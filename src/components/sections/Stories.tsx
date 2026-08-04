"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowLeft, ArrowRight, Quotes } from "@phosphor-icons/react";
import { STORIES, type SuccessStory } from "@/content/stories";
import { cn } from "@/lib/utils";

function StoryCard({ story }: { story: SuccessStory }) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] border border-mp-line bg-mp-canvas">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={story.imageUrl}
          alt={`${story.name}, alumna del Reto 28 Días`}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 85vw"
          className="object-cover"
        />
      </div>

      <div className="flex flex-1 flex-col gap-4 p-6">
        <div className="flex flex-col gap-1">
          <h3 className="font-display text-lg font-bold text-mp-ink">
            {story.name}
            <span className="ml-1.5 text-sm font-medium text-mp-carbon/60">
              · {story.age}
            </span>
          </h3>
          <p className="text-xs font-medium text-mp-carbon/70">{story.job}</p>
        </div>

        <p className="text-sm leading-relaxed text-mp-carbon">
          {story.caseSummary}
        </p>

        <blockquote className="mt-auto flex gap-3 border-t border-mp-line pt-5">
          <Quotes
            weight="fill"
            className="h-4 w-4 shrink-0 text-mp-orange"
            aria-hidden="true"
          />
          <p className="text-sm italic leading-relaxed text-mp-carbon/80">
            {story.testimonial}
          </p>
        </blockquote>
      </div>
    </article>
  );
}

export function Stories() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: "start",
    containScroll: "trimSnaps",
  });
  const [selected, setSelected] = useState(0);
  const [snaps, setSnaps] = useState<number[]>([]);

  useEffect(() => {
    if (!emblaApi) return;

    const sync = () => {
      setSnaps(emblaApi.scrollSnapList());
      setSelected(emblaApi.selectedScrollSnap());
    };

    emblaApi.on("select", sync);
    emblaApi.on("reInit", sync);
    // Embla sólo conoce sus snaps una vez montado: forzamos un reInit para
    // que el estado inicial llegue por el mismo evento y no por el efecto.
    emblaApi.reInit();

    return () => {
      emblaApi.off("select", sync);
      emblaApi.off("reInit", sync);
    };
  }, [emblaApi]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <section
      id="testimonios"
      aria-label="Testimonios de alumnas"
      className="section-pad border-t border-mp-line"
    >
      <div className="container-page">
        <div className="mb-8 flex flex-col gap-4 md:mb-12 md:flex-row md:items-end md:justify-between">
          <div className="flex max-w-2xl flex-col gap-4">
            <span className="inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.18em] text-mp-carbon/70">
              <span
                aria-hidden="true"
                className="inline-block h-1.5 w-1.5 rounded-full bg-mp-orange"
              />
              Testimonios
            </span>
            <h2 className="font-display text-3xl font-extrabold leading-[1.08] tracking-tight md:text-4xl lg:text-5xl">
              Mujeres con la misma agenda que vos.
            </h2>
          </div>

          <div className="hidden shrink-0 gap-2 md:flex">
            <button
              type="button"
              onClick={scrollPrev}
              aria-label="Testimonio anterior"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-mp-line text-mp-ink transition-colors hover:border-mp-ink"
            >
              <ArrowLeft weight="bold" className="h-4 w-4" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={scrollNext}
              aria-label="Testimonio siguiente"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-mp-line text-mp-ink transition-colors hover:border-mp-ink"
            >
              <ArrowRight weight="bold" className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>

        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-4 md:gap-6">
            {STORIES.map((story) => (
              <div
                key={story.id}
                className="min-w-0 shrink-0 grow-0 basis-[85%] sm:basis-1/2 lg:basis-1/3"
              >
                <StoryCard story={story} />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 flex items-center justify-center gap-2">
          {snaps.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => emblaApi?.scrollTo(index)}
              aria-label={`Ir al testimonio ${index + 1}`}
              aria-current={index === selected}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                index === selected
                  ? "w-6 bg-mp-orange"
                  : "w-1.5 bg-mp-line hover:bg-mp-carbon/30",
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
