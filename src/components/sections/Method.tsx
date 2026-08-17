import { RevealOnScroll } from "@/components/effects/RevealOnScroll";
import { METHOD, CHALLENGE } from "@/lib/products";

export function Method() {
  return (
    <section
      id="metodo"
      aria-label={`Cómo entrenamos: ${METHOD.name}`}
      className="section-pad border-t border-mp-line"
    >
      <div className="container-page">
        <RevealOnScroll className="mb-10 flex max-w-3xl flex-col gap-4 md:mb-14">
          <span className="inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.18em] text-mp-carbon/70">
            <span
              aria-hidden="true"
              className="inline-block h-1.5 w-1.5 rounded-full bg-mp-orange"
            />
            Cómo entrenamos
          </span>
          <h2 className="font-display text-3xl font-extrabold leading-[1.08] tracking-tight md:text-4xl lg:text-5xl">
            {METHOD.name}
          </h2>
          <p className="text-base leading-relaxed text-mp-carbon/80">
            Cuatro principios que sostienen cada rutina. No son etiquetas: son la
            razón por la que el plan funciona cuando tenés poco tiempo y mucha
            semana encima. {CHALLENGE.name} es la puerta de entrada.
          </p>
        </RevealOnScroll>

        <ol className="grid grid-cols-1 gap-px overflow-hidden rounded-[var(--radius-card)] border border-mp-line bg-mp-line sm:grid-cols-2">
          {METHOD.pillars.map((pillar, index) => (
            <RevealOnScroll
              as="li"
              key={pillar.id}
              delay={index * 90}
              className="flex flex-col gap-3 bg-mp-canvas p-6 md:p-8"
            >
              <span
                aria-hidden="true"
                className="font-display text-4xl font-extrabold leading-none tracking-tight text-mp-orange md:text-5xl"
              >
                F
              </span>
              <h3 className="font-display text-lg font-bold text-mp-ink md:text-xl">
                {pillar.name}
              </h3>
              <p className="text-sm leading-relaxed text-mp-carbon/80">
                {pillar.body}
              </p>
            </RevealOnScroll>
          ))}
        </ol>
      </div>
    </section>
  );
}
