import { ArrowsClockwise, Lightning } from "@phosphor-icons/react/dist/ssr";
import { RevealOnScroll } from "@/components/effects/RevealOnScroll";
import { WHAT_YOU_GET } from "@/content/offer";
import { CHALLENGE, FOUNDING, formatARS } from "@/lib/products";

export function WhatYouGet() {
  return (
    <section
      id="que-recibis"
      aria-label="Qué incluye el reto"
      className="section-pad border-t border-mp-line"
    >
      <div className="container-page">
        <RevealOnScroll className="mb-10 flex max-w-3xl flex-col gap-4 md:mb-14">
          <span className="inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.18em] text-mp-carbon/70">
            <span
              aria-hidden="true"
              className="inline-block h-1.5 w-1.5 rounded-full bg-mp-orange"
            />
            Qué recibís
          </span>
          <h2 className="font-display text-3xl font-extrabold leading-[1.08] tracking-tight md:text-4xl lg:text-5xl">
            Todo lo que entra en los 28 días.
          </h2>
          <p className="text-base leading-relaxed text-mp-carbon/80">
            Todo el material está grabado y te lo doy completo el día que
            entrás. No hay nada que esperar.
          </p>
        </RevealOnScroll>

        <div className="grid grid-cols-1 gap-px overflow-hidden rounded-[var(--radius-card)] border border-mp-line bg-mp-line sm:grid-cols-2">
          {WHAT_YOU_GET.map((item, index) => (
            <RevealOnScroll
              key={item.title}
              delay={Math.min(index, 4) * 80}
              className="flex flex-col gap-2 bg-mp-canvas p-6 md:p-8"
            >
              <span className="font-display text-[11px] font-semibold tracking-[0.14em] text-mp-ember">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="font-display text-base font-bold text-mp-ink md:text-lg">
                {item.title}
              </h3>
              <p className="text-sm leading-relaxed text-mp-carbon/80">
                {item.body}
              </p>
            </RevealOnScroll>
          ))}
        </div>

        <RevealOnScroll
          delay={120}
          className="mt-8 flex flex-col gap-6 rounded-[var(--radius-card)] border border-mp-ink p-6 md:mt-10 md:flex-row md:items-center md:justify-between md:p-10"
        >
          <div className="flex flex-col gap-2">
            <span className="font-display text-[11px] font-semibold uppercase tracking-[0.16em] text-mp-carbon/70">
              {CHALLENGE.name} · 28 días
            </span>
            <p className="font-display text-4xl font-extrabold leading-none tracking-tight text-mp-ink md:text-5xl">
              {formatARS(CHALLENGE.priceARS)}
            </p>
            <p className="text-sm text-mp-carbon/80">
              Sin débito automático. Cuando terminan los 28 días decidís si
              seguís con el nivel siguiente o lo dejás acá.
            </p>
          </div>

          <ul className="flex shrink-0 flex-col gap-3 border-t border-mp-line pt-5 md:border-l md:border-t-0 md:pl-10 md:pt-0">
            <li className="flex items-start gap-2.5 text-sm text-mp-carbon">
              <Lightning
                weight="duotone"
                className="mt-0.5 h-5 w-5 shrink-0 text-mp-orange"
                aria-hidden="true"
              />
              <span>
                <span className="font-display font-semibold text-mp-ink">
                  Empezás hoy
                </span>
                <br />
                No esperás a que arranque ningún grupo.
              </span>
            </li>
            {FOUNDING.active && (
              <li className="flex items-start gap-2.5 text-sm text-mp-carbon">
                <ArrowsClockwise
                  weight="duotone"
                  className="mt-0.5 h-5 w-5 shrink-0 text-mp-orange"
                  aria-hidden="true"
                />
                <span>
                  <span className="font-display font-semibold text-mp-ink">
                    {FOUNDING.label}
                  </span>
                  <br />
                  Hasta el {FOUNDING.endsAt}. Después sube.
                </span>
              </li>
            )}
          </ul>
        </RevealOnScroll>
      </div>
    </section>
  );
}
