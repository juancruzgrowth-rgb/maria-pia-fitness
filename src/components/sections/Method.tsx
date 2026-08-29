import { RevealOnScroll } from "@/components/effects/RevealOnScroll";
import { METHOD, TRAINING } from "@/lib/products";

/**
 * Los niveles se filtran por TRAINING.available a proposito. El B3 existe en
 * la estructura del plan pero todavia no esta cargado en Skool, y anunciar un
 * nivel que nadie puede abrir es prometer algo que no se entrega.
 */
const AVAILABLE_LEVELS = TRAINING.levels.filter((level) =>
  (TRAINING.available as readonly string[]).includes(level.id),
);

/**
 * "Por qué mi método 4F". Va justo después de "Soy Pía": primero la visitante
 * sabe quién le habla y recién entonces por qué su método es distinto.
 *
 * Concentra en una sola sección lo que antes estaba repartido en tres: qué es
 * el método, para quién es y con qué nivel entra cada una. Las tarjetas B1/B2
 * vivían en "Todo lo que tenés que saber"; esa sección se eliminó el
 * 2026-08-29 y los niveles se mudaron acá, que es donde se explica el método.
 */
export function Method() {
  return (
    <section
      id="metodo"
      aria-label={`Por qué ${METHOD.name}`}
      className="section-pad border-t border-mp-line"
    >
      <div className="container-page">
        <RevealOnScroll className="mb-10 flex max-w-3xl flex-col gap-4 md:mb-14">
          <span className="inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.18em] text-mp-carbon/70">
            <span
              aria-hidden="true"
              className="inline-block h-1.5 w-1.5 rounded-full bg-mp-orange"
            />
            Por qué mi método
          </span>
          <h2 className="font-display text-3xl font-extrabold leading-[1.08] tracking-tight md:text-4xl lg:text-5xl">
            {METHOD.name}
          </h2>
          <p className="text-base leading-relaxed text-mp-carbon/80 md:text-lg">
            {METHOD.lead}
          </p>
          <p className="text-sm leading-relaxed text-mp-carbon">
            {METHOD.forWhom}
          </p>
        </RevealOnScroll>

        <ol className="grid grid-cols-1 gap-px overflow-hidden rounded-[var(--radius-card)] border border-mp-line bg-mp-line sm:grid-cols-2 lg:grid-cols-4">
          {METHOD.pillars.map((pillar, index) => (
            <RevealOnScroll
              as="li"
              key={pillar.id}
              delay={index * 90}
              className="flex flex-col gap-3 bg-mp-canvas p-6 md:p-8"
            >
              <span
                aria-hidden="true"
                className="font-display text-4xl font-extrabold leading-none tracking-tight text-mp-orange"
              >
                F
              </span>
              <h3 className="font-display text-lg font-bold text-mp-ink">
                {pillar.name}
              </h3>
              <p className="text-sm leading-relaxed text-mp-carbon/80">
                {pillar.body}
              </p>
            </RevealOnScroll>
          ))}
        </ol>

        <RevealOnScroll delay={120} className="mt-10 flex flex-col gap-4 border-t border-mp-line pt-10">
          <h3 className="font-display text-lg font-bold text-mp-ink md:text-xl">
            Elegís el nivel según cómo entrenás hoy.
          </h3>
          <p className="max-w-2xl text-sm leading-relaxed text-mp-carbon/80">
            Cada nivel tiene {TRAINING.daysPerLevel} días de entrenamiento y{" "}
            {TRAINING.setsPerDay} sets por día. Pasás al siguiente cuando tu
            avance lo justifica, no cuando lo dice el calendario.
          </p>
        </RevealOnScroll>

        <ul className="mt-5 grid grid-cols-1 gap-px overflow-hidden rounded-[var(--radius-card)] border border-mp-line bg-mp-line sm:grid-cols-2">
          {AVAILABLE_LEVELS.map((level, index) => (
            <RevealOnScroll
              as="li"
              key={level.id}
              delay={index * 90}
              className="flex flex-col gap-2 bg-mp-canvas p-6 md:p-8"
            >
              <span className="font-display text-3xl font-extrabold leading-none tracking-tight text-mp-ink">
                {level.name}
              </span>
              <p className="text-sm leading-relaxed text-mp-carbon/80">
                {level.body}
              </p>
            </RevealOnScroll>
          ))}
        </ul>

      </div>
    </section>
  );
}
