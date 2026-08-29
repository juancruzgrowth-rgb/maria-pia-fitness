import Image from "next/image";
import { ArrowUpRight, MapPin } from "@phosphor-icons/react/dist/ssr";
import { RevealOnScroll } from "@/components/effects/RevealOnScroll";
import { ABOUT } from "@/content/about";
import { CONTACT } from "@/lib/site";

export function About() {
  return (
    <section
      id="sobre-mi"
      aria-label="Sobre Pía"
      className="section-pad border-t border-mp-line"
    >
      <div className="container-page grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        <RevealOnScroll className="lg:col-span-5">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius-card)] border border-mp-line">
            <Image
              src={ABOUT.imageUrl}
              alt="Retrato de Pía"
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover"
            />
          </div>
        </RevealOnScroll>

        <div className="lg:col-span-7 flex flex-col gap-8">
          <RevealOnScroll delay={80} className="flex flex-col gap-4">
            <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-mp-carbon/70 font-medium">
              <span
                aria-hidden="true"
                className="inline-block h-1.5 w-1.5 rounded-full bg-mp-orange"
              />
              Sobre mí
            </span>
            <h2 className="font-display font-extrabold text-4xl md:text-5xl leading-[1.05] tracking-tight">
              {ABOUT.heading}
            </h2>
            <p className="text-base md:text-lg text-mp-carbon/80 leading-relaxed max-w-2xl">
              {ABOUT.intro}
            </p>
          </RevealOnScroll>

          {ABOUT.paragraphs.map((paragraph, index) => (
            <RevealOnScroll
              key={paragraph.slice(0, 24)}
              delay={140 + index * 80}
            >
              <p className="text-sm md:text-base text-mp-carbon leading-relaxed max-w-2xl">
                {paragraph}
              </p>
            </RevealOnScroll>
          ))}

          <RevealOnScroll delay={460} className="flex flex-col gap-4 mt-2">
            <div className="rounded-md border border-mp-line p-4">
              <p className="text-sm text-mp-carbon leading-relaxed">
                {ABOUT.onlineNote}
              </p>
            </div>

            <a
              href={CONTACT.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-mp-carbon/80 transition-colors hover:text-mp-ink"
            >
              <MapPin
                weight="duotone"
                className="h-4 w-4 shrink-0 text-mp-orange"
                aria-hidden="true"
              />
              {ABOUT.mapsLabel}
              <ArrowUpRight weight="bold" className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}
