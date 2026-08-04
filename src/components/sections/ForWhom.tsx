import { Check, X } from "@phosphor-icons/react/dist/ssr";
import { RevealOnScroll } from "@/components/effects/RevealOnScroll";
import { FOR_WHOM } from "@/content/offer";

export function ForWhom() {
  return (
    <section
      id="el-reto"
      aria-label="Para quién es el reto"
      className="section-pad border-t border-mp-line"
    >
      <div className="container-page">
        <RevealOnScroll className="mb-10 flex max-w-3xl flex-col gap-4 md:mb-14">
          <span className="inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.18em] text-mp-carbon/70">
            <span
              aria-hidden="true"
              className="inline-block h-1.5 w-1.5 rounded-full bg-mp-orange"
            />
            Antes de seguir
          </span>
          <h2 className="font-display text-3xl font-extrabold leading-[1.08] tracking-tight md:text-4xl lg:text-5xl">
            Este reto no es para todo el mundo.
          </h2>
          <p className="text-base leading-relaxed text-mp-carbon/80">
            Prefiero que lo sepas ahora y no cuando ya pagaste. Leé las dos
            columnas y decidí vos.
          </p>
        </RevealOnScroll>

        <div className="grid grid-cols-1 gap-px overflow-hidden rounded-[var(--radius-card)] border border-mp-line bg-mp-line md:grid-cols-2">
          <RevealOnScroll className="flex flex-col gap-5 bg-mp-canvas p-6 md:p-10">
            <h3 className="font-display text-xl font-bold text-mp-ink md:text-2xl">
              {FOR_WHOM.yes.title}
            </h3>
            <ul className="flex flex-col gap-4">
              {FOR_WHOM.yes.items.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-relaxed text-mp-carbon md:text-base">
                  <Check
                    weight="bold"
                    className="mt-0.5 h-4 w-4 shrink-0 text-mp-orange"
                    aria-hidden="true"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </RevealOnScroll>

          <RevealOnScroll delay={120} className="flex flex-col gap-5 bg-mp-canvas p-6 md:p-10">
            <h3 className="font-display text-xl font-bold text-mp-ink md:text-2xl">
              {FOR_WHOM.no.title}
            </h3>
            <ul className="flex flex-col gap-4">
              {FOR_WHOM.no.items.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-relaxed text-mp-carbon/70 md:text-base">
                  <X
                    weight="bold"
                    className="mt-0.5 h-4 w-4 shrink-0 text-mp-carbon/40"
                    aria-hidden="true"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}
