import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { RevealOnScroll } from "@/components/effects/RevealOnScroll";
import { HOW_IT_WORKS } from "@/content/offer";
import { PRIMARY_CTA } from "@/lib/site";
import {
  ENROLLMENT_OPEN,
  NUTRITION_GUIDE,
  QUARTERLY_DISCOUNT_PCT,
  RENEWAL,
  TRANSFER,
  VISIBLE_PLANS,
  formatARS,
} from "@/lib/products";

/**
 * El precio, en la home. Va acá y no antes por pedido de Pía: la visitante
 * primero ve para quién es, quién es Pía, el método y cómo funciona, y recién
 * entonces la plata.
 *
 * Los importes salen de VISIBLE_PLANS y el descuento del trimestral se calcula
 * —no se afirma— en products.ts. La sección no muestra alias ni CVU: esos
 * datos viven sólo en /comprar, que es donde la clienta llega a transferir.
 *
 * Los tres pasos para empezar eran una sección aparte hasta el 2026-08-29.
 * Pía los quiso pegados al precio: quien ya decidió cuánto va a pagar tiene
 * ahí mismo qué hacer después, sin seguir scrolleando.
 */
const CTA_CLASS =
  "inline-flex w-full items-center justify-center gap-2 rounded-md bg-mp-ink px-6 py-4 font-display text-xs font-semibold uppercase tracking-[0.08em] text-mp-canvas transition-transform duration-200 hover:scale-[0.99] active:scale-[0.98] sm:w-auto";

export function Pricing() {
  const isExternal = PRIMARY_CTA.href.startsWith("http");

  return (
    <section
      id="precios"
      aria-label="Precio del Flex Program"
      className="section-pad border-t border-mp-line"
    >
      <div className="container-page">
        <RevealOnScroll className="mb-10 flex max-w-3xl flex-col gap-4">
          <span className="inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.18em] text-mp-carbon/70">
            <span
              aria-hidden="true"
              className="inline-block h-1.5 w-1.5 rounded-full bg-mp-orange"
            />
            Precio
          </span>
          <h2 className="font-display text-3xl font-extrabold leading-[1.08] tracking-tight md:text-4xl lg:text-5xl">
            Elegí cómo entrar.
          </h2>
          <p className="text-base leading-relaxed text-mp-carbon/80">
            Se paga por transferencia y sin débito automático: cuando se vencen
            tus {RENEWAL.accessDays} días seguís sólo si querés. Entrás al
            precio de lanzamiento, y te queda congelado mientras sigas
            entrenando.
          </p>
        </RevealOnScroll>

        <ul className="grid grid-cols-1 gap-px overflow-hidden rounded-[var(--radius-card)] border border-mp-line bg-mp-line md:grid-cols-2">
          {VISIBLE_PLANS.map((plan, index) => (
            <RevealOnScroll
              as="li"
              key={plan.id}
              delay={index * 100}
              className="flex flex-col gap-3 bg-mp-canvas p-6 md:p-10"
            >
              <span className="font-display text-[11px] font-semibold uppercase tracking-[0.16em] text-mp-carbon/70">
                {plan.name}
              </span>
              <p className="font-display text-4xl font-extrabold leading-none tracking-tight text-mp-ink md:text-5xl">
                {formatARS(plan.priceARS)}
                <span className="ml-2 font-display text-sm font-semibold text-mp-carbon/70">
                  {plan.frequencyLabel}
                </span>
              </p>
              {plan.id === "trimestral" && (
                <span className="font-display text-xs font-semibold uppercase tracking-[0.08em] text-mp-ember">
                  {QUARTERLY_DISCOUNT_PCT}% menos que pagando mes a mes
                </span>
              )}
              <p className="text-sm leading-relaxed text-mp-carbon/80">
                {plan.summary}
              </p>
            </RevealOnScroll>
          ))}

          {/* La guia va en la misma grilla y a lo ancho de las dos columnas:
              queda pegada a los planes, que es donde Pia la quiere, sin
              leerse como una tercera forma de entrar al programa. */}
          {NUTRITION_GUIDE.visible && (
            <RevealOnScroll
              as="li"
              delay={200}
              className="flex flex-col gap-3 bg-mp-canvas p-6 md:col-span-2 md:p-10"
            >
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <span className="font-display text-[11px] font-semibold uppercase tracking-[0.16em] text-mp-carbon/70">
                  {NUTRITION_GUIDE.name}
                </span>
                <span className="font-display text-[11px] font-semibold uppercase tracking-[0.16em] text-mp-ember">
                  {NUTRITION_GUIDE.label}
                </span>
              </div>
              <p className="font-display text-3xl font-extrabold leading-none tracking-tight text-mp-ink md:text-4xl">
                {formatARS(NUTRITION_GUIDE.priceARS)}
                <span className="ml-2 font-display text-sm font-semibold text-mp-carbon/70">
                  {NUTRITION_GUIDE.frequencyLabel}
                </span>
              </p>
              <p className="max-w-2xl text-sm leading-relaxed text-mp-carbon/80">
                {NUTRITION_GUIDE.summary}
              </p>
              <p className="max-w-2xl text-xs leading-relaxed text-mp-carbon/70">
                {NUTRITION_GUIDE.disclaimer}
              </p>
            </RevealOnScroll>
          )}
        </ul>

        <RevealOnScroll delay={200} className="mt-8">
          {/* Con la inscripcion cerrada PRIMARY_CTA apunta a wa.me, que es un
              link externo y no una ruta de Next. Ver BuyBar: mismo criterio. */}
          {isExternal ? (
            <a
              href={PRIMARY_CTA.href}
              target="_blank"
              rel="noopener noreferrer"
              className={CTA_CLASS}
            >
              {PRIMARY_CTA.label}
              <ArrowRight weight="bold" className="h-4 w-4" aria-hidden="true" />
            </a>
          ) : (
            <Link href={PRIMARY_CTA.href} className={CTA_CLASS}>
              {PRIMARY_CTA.label}
              <ArrowRight weight="bold" className="h-4 w-4" aria-hidden="true" />
            </Link>
          )}
          {ENROLLMENT_OPEN && (
            <p className="mt-3 text-xs leading-relaxed text-mp-carbon/70">
              Ahí están el alias y el CVU para transferir.
            </p>
          )}
        </RevealOnScroll>

        <RevealOnScroll delay={240} className="mt-14 flex flex-col gap-4 border-t border-mp-line pt-10">
          <h3 className="font-display text-xl font-bold text-mp-ink md:text-2xl">
            De la decisión al primer entrenamiento, en tres pasos.
          </h3>
        </RevealOnScroll>

        <ol className="mt-5 grid grid-cols-1 gap-px overflow-hidden rounded-[var(--radius-card)] border border-mp-line bg-mp-line md:grid-cols-3">
          {HOW_IT_WORKS.map((item, index) => (
            <RevealOnScroll
              key={item.step}
              as="li"
              delay={index * 100}
              className="flex flex-col gap-3 bg-mp-canvas p-6 md:p-8"
            >
              <span className="font-display text-3xl font-extrabold leading-none text-mp-ember">
                {item.step}
              </span>
              <h4 className="font-display text-lg font-bold text-mp-ink">
                {item.title}
              </h4>
              <p className="text-sm leading-relaxed text-mp-carbon/80">
                {item.body}
              </p>
            </RevealOnScroll>
          ))}
        </ol>

        <RevealOnScroll delay={120}>
          <p className="mt-6 text-sm leading-relaxed text-mp-carbon/70">
            El acceso te lo doy yo, en {TRANSFER.responseWindow}. No hay fechas
            de inicio ni lista de espera: el día 1 es el día que entrás.
          </p>
        </RevealOnScroll>
      </div>
    </section>
  );
}
