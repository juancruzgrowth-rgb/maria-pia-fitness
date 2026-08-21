import { RevealOnScroll } from "@/components/effects/RevealOnScroll";
import { HOW_IT_WORKS } from "@/content/offer";
import { SUBSCRIPTION } from "@/lib/products";

export function HowItWorks() {
  return (
    <section
      aria-label="Cómo funciona"
      className="section-pad border-t border-mp-line"
    >
      <div className="container-page">
        <RevealOnScroll className="mb-10 flex max-w-3xl flex-col gap-4 md:mb-14">
          <span className="inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.18em] text-mp-carbon/70">
            <span
              aria-hidden="true"
              className="inline-block h-1.5 w-1.5 rounded-full bg-mp-orange"
            />
            Cómo funciona
          </span>
          <h2 className="font-display text-3xl font-extrabold leading-[1.08] tracking-tight md:text-4xl lg:text-5xl">
            De la decisión al primer entrenamiento, en tres pasos.
          </h2>
        </RevealOnScroll>

        <ol className="grid grid-cols-1 gap-px overflow-hidden rounded-[var(--radius-card)] border border-mp-line bg-mp-line md:grid-cols-3">
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
              <h3 className="font-display text-lg font-bold text-mp-ink">
                {item.title}
              </h3>
              <p className="text-sm leading-relaxed text-mp-carbon/80">
                {item.body}
              </p>
            </RevealOnScroll>
          ))}
        </ol>

        <RevealOnScroll delay={120}>
          <p className="mt-6 text-sm leading-relaxed text-mp-carbon/70">
            El pago es una suscripción con débito automático por{" "}
            {SUBSCRIPTION.provider}: se cobra solo todos los meses y tu acceso
            sigue activo sin que tengas que hacer nada. {SUBSCRIPTION.cancelNote}{" "}
            No hay fechas de inicio ni lista de espera: el día 1 es el día que
            entrás.
          </p>
        </RevealOnScroll>
      </div>
    </section>
  );
}
