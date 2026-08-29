import { ArrowRight, Check } from "@phosphor-icons/react/dist/ssr";
import { RevealOnScroll } from "@/components/effects/RevealOnScroll";
import { CONTACT } from "@/lib/site";
import { ADVISORY, formatARS } from "@/lib/products";

/**
 * La asesoría 1:1, en la home. Sumada el 2026-08-29 por pedido de Pía, junto
 * con la decisión de publicar el precio.
 *
 * Va DESPUÉS del bloque de precio y no dentro: si $350.000 aparece en la misma
 * fila que $55.000, el Flex Program se lee como la versión barata en vez de
 * como el producto principal. Acá abajo se lee como el otro camino, para quien
 * ya descartó el programa. Por lo mismo el botón es secundario —contorno, no
 * relleno—: el CTA lleno de la página es uno solo y es el del programa.
 *
 * El precio y las prestaciones salen de ADVISORY: no se escriben acá.
 */
const CTA_CLASS =
  "inline-flex w-full items-center justify-center gap-2 rounded-md border border-mp-ink px-6 py-4 font-display text-xs font-semibold uppercase tracking-[0.08em] text-mp-ink transition-transform duration-200 hover:scale-[0.99] active:scale-[0.98] sm:w-auto";

export function Advisory() {
  return (
    <section
      id="asesoria"
      aria-label={ADVISORY.name}
      className="section-pad border-t border-mp-line"
    >
      <div className="container-page">
        <RevealOnScroll className="mb-10 flex max-w-3xl flex-col gap-4">
          <span className="inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.18em] text-mp-carbon/70">
            <span
              aria-hidden="true"
              className="inline-block h-1.5 w-1.5 rounded-full bg-mp-orange"
            />
            {ADVISORY.name}
          </span>
          <h2 className="font-display text-3xl font-extrabold leading-[1.08] tracking-tight md:text-4xl lg:text-5xl">
            Si querés que el plan se arme para tu caso.
          </h2>
          <p className="text-base leading-relaxed text-mp-carbon/80">
            En el Flex Program el entrenamiento es el mismo para todas. Acá no:
            lo armo sobre tus días, tus elementos y tus objetivos, y me tenés a
            mano todos los días.
          </p>
          {ADVISORY.showPrice && (
            <p className="font-display text-4xl font-extrabold leading-none tracking-tight text-mp-ink md:text-5xl">
              {formatARS(ADVISORY.priceARS)}
              <span className="ml-2 font-display text-sm font-semibold text-mp-carbon/70">
                {ADVISORY.frequencyLabel}
              </span>
            </p>
          )}
        </RevealOnScroll>

        <div className="grid grid-cols-1 gap-px overflow-hidden rounded-[var(--radius-card)] border border-mp-line bg-mp-line md:grid-cols-2">
          {ADVISORY.blocks.map((block, index) => (
            <RevealOnScroll
              key={block.id}
              delay={index * 120}
              className="flex flex-col gap-5 bg-mp-canvas p-6 md:p-10"
            >
              <h3 className="font-display text-xl font-bold text-mp-ink md:text-2xl">
                {block.title}
              </h3>
              <ul className="flex flex-col gap-4">
                {block.items.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 text-sm leading-relaxed text-mp-carbon md:text-base"
                  >
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
          ))}
        </div>

        <RevealOnScroll delay={200} className="mt-8">
          <a
            href={CONTACT.advisoryUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={CTA_CLASS}
          >
            Quiero la asesoría 1:1
            <ArrowRight weight="bold" className="h-4 w-4" aria-hidden="true" />
          </a>
          <p className="mt-3 text-xs leading-relaxed text-mp-carbon/70">
            Lo hablamos por WhatsApp antes de arrancar: primero veo si es lo que
            te sirve.
          </p>
        </RevealOnScroll>
      </div>
    </section>
  );
}
