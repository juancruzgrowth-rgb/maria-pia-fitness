import Image from "next/image";
import { Barbell, HeartStraight, Path, ChatCircle } from "@phosphor-icons/react/dist/ssr";
import { RevealOnScroll } from "@/components/effects/RevealOnScroll";
import { ABOUT } from "@/content/about";

const PILLAR_ICONS = [Barbell, HeartStraight, Path, ChatCircle] as const;

export function About() {
  return (
    <section
      id="sobre-mi"
      aria-label="Sobre Maria Pia"
      className="section-pad border-t border-mp-line"
    >
      <div className="container-page grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        <RevealOnScroll className="lg:col-span-5">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius-card)] border border-mp-line">
            <Image
              src={ABOUT.imageUrl}
              alt="Retrato de Maria Pia"
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

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-mp-line border border-mp-line rounded-[var(--radius-card)] overflow-hidden mt-6">
            {ABOUT.pillars.map((pillar, index) => {
              const Icon = PILLAR_ICONS[index] ?? Barbell;
              return (
                <RevealOnScroll
                  key={pillar.title}
                  delay={index * 90}
                  className="bg-mp-canvas p-6 md:p-8 flex flex-col gap-3"
                >
                  <Icon
                    weight="duotone"
                    className="h-6 w-6 text-mp-orange"
                    aria-hidden="true"
                  />
                  <h3 className="font-display font-bold text-lg text-mp-ink">
                    {pillar.title}
                  </h3>
                  <p className="text-sm text-mp-carbon/80 leading-relaxed">
                    {pillar.body}
                  </p>
                </RevealOnScroll>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
