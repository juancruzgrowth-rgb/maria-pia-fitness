import { Quotes } from "@phosphor-icons/react/dist/ssr";
import { RevealOnScroll } from "@/components/effects/RevealOnScroll";
import { STORIES } from "@/content/stories";

/**
 * Prueba social compacta, inmediatamente después del VSL.
 * Reduce rebote sin retrasar la oferta: los testimonios completos van
 * después del precio, que es donde está el pico de duda.
 */
export function SocialProofBar() {
  const featured = STORIES.slice(0, 2);

  return (
    <section aria-label="Lo que dicen las alumnas" className="pb-4 md:pb-8">
      <div className="container-page">
        <RevealOnScroll className="grid grid-cols-1 gap-px overflow-hidden rounded-[var(--radius-card)] border border-mp-line bg-mp-line md:grid-cols-2">
          {featured.map((story) => (
            <figure
              key={story.id}
              className="flex gap-3 bg-mp-canvas p-5 md:p-6"
            >
              <Quotes
                weight="fill"
                className="mt-0.5 h-4 w-4 shrink-0 text-mp-orange"
                aria-hidden="true"
              />
              <div className="flex flex-col gap-2">
                <blockquote className="text-sm italic leading-relaxed text-mp-carbon">
                  {story.testimonial}
                </blockquote>
                <figcaption className="text-[11px] font-medium text-mp-carbon/70">
                  {story.name} · {story.job}
                </figcaption>
              </div>
            </figure>
          ))}
        </RevealOnScroll>

        <RevealOnScroll delay={80}>
          <p className="mt-3 text-center text-[11px] text-mp-carbon/70">
            <a
              href="#testimonios"
              className="underline decoration-mp-orange decoration-2 underline-offset-4 transition-colors hover:text-mp-ember"
            >
              Ver todos los testimonios
            </a>
          </p>
        </RevealOnScroll>
      </div>
    </section>
  );
}
