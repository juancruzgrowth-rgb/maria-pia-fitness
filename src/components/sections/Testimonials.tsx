import Image from "next/image";
import { ChatCircleText, ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { RevealOnScroll } from "@/components/effects/RevealOnScroll";
import { TESTIMONIALS } from "@/content/testimonials";

/**
 * Prueba social. Son capturas de WhatsApp reales, sin retocar: lo único que se
 * hizo fue centrarlas en un lienzo cuadrado del color del sitio para que en la
 * fila se vean todas del mismo tamaño (ver `src/content/testimonials.ts`).
 *
 * La fila scrollea en horizontal en todos los tamaños, y no hay flechas ni
 * autoplay: así la sección es un Server Component y no carga un solo KB de
 * JavaScript. En mobile —el 80% del tráfico— el gesto ya es el natural.
 */
export function Testimonials() {
  return (
    <section
      id="testimonios"
      aria-label="Testimonios de clientas"
      className="section-pad border-t border-mp-line"
    >
      <div className="container-page flex flex-col gap-4">
        <RevealOnScroll className="flex flex-col gap-4">
          <span className="inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.18em] text-mp-carbon/70">
            <span
              aria-hidden="true"
              className="inline-block h-1.5 w-1.5 rounded-full bg-mp-orange"
            />
            Lo que me escriben
          </span>
          <h2 className="font-display text-3xl font-extrabold leading-[1.08] tracking-tight md:text-4xl lg:text-5xl">
            No lo digo yo.
          </h2>
          <p className="max-w-2xl text-base leading-relaxed text-mp-carbon/80 md:text-lg">
            Mensajes de mujeres que entrenan conmigo, tal como llegaron a mi
            WhatsApp. Ninguno está escrito por mí.
          </p>
        </RevealOnScroll>
      </div>

      <div className="container-page mt-10">
        <ul
          className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-6 md:gap-6"
          aria-label="Capturas de mensajes de clientas"
        >
          {TESTIMONIALS.map((testimonial, index) => (
            <RevealOnScroll
              as="li"
              key={testimonial.slug}
              delay={Math.min(index, 3) * 90}
              className="w-[78vw] max-w-[360px] shrink-0 snap-start sm:w-[320px] lg:w-[340px]"
            >
              <figure className="flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] border border-mp-line bg-mp-canvas">
                <figcaption className="flex items-center gap-2 border-b border-mp-line px-4 py-3 text-[10px] uppercase tracking-[0.16em] text-mp-carbon/70">
                  <ChatCircleText
                    weight="duotone"
                    className="h-4 w-4 shrink-0 text-mp-orange"
                    aria-hidden="true"
                  />
                  Mensaje de una clienta
                </figcaption>
                <Image
                  src={`/images/testimonios/${testimonial.slug}.jpg`}
                  alt={testimonial.quote}
                  width={1080}
                  height={1080}
                  sizes="(min-width: 1024px) 340px, (min-width: 640px) 320px, 78vw"
                  className="h-auto w-full"
                />
              </figure>
            </RevealOnScroll>
          ))}
        </ul>

        <div className="flex flex-col gap-3 border-t border-mp-line pt-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-mp-carbon/70">
            Deslizá para ver los {TESTIMONIALS.length}
            <ArrowRight weight="bold" className="h-3.5 w-3.5" aria-hidden="true" />
          </p>
          {/* Los resultados de una clienta no son una promesa para la próxima:
              decirlo es lo que separa un testimonio de una publicidad engañosa
              (art. 8, Ley 24.240). */}
          <p className="max-w-xl text-xs leading-relaxed text-mp-carbon/70">
            Mensajes reales, publicados con permiso. Los resultados dependen de
            cada persona, de su punto de partida y de su constancia.
          </p>
        </div>
      </div>
    </section>
  );
}
