import { ProductCard } from "@/components/ui/ProductCard";
import { CurrencyToggle } from "@/components/ui/CurrencyToggle";
import { RevealOnScroll } from "@/components/effects/RevealOnScroll";
import { PRODUCTS } from "@/lib/products";

export function Services() {
  return (
    <section
      id="servicios"
      aria-label="Programas y servicios"
      className="section-pad border-t border-mp-line"
    >
      <div className="container-page">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between mb-14 md:mb-20">
          <RevealOnScroll className="max-w-2xl flex flex-col gap-4">
            <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-mp-carbon/70 font-medium">
              <span
                aria-hidden="true"
                className="inline-block h-1.5 w-1.5 rounded-full bg-mp-orange"
              />
              Programas
            </span>
            <h2 className="font-display font-extrabold text-4xl md:text-5xl lg:text-[56px] leading-[1.05] tracking-tight">
              Un programa. Una promesa clara.
            </h2>
            <p className="text-base md:text-lg text-mp-carbon/80 leading-relaxed">
              90 días para mejorar hábitos, subir energía y tonificar el
              cuerpo, sin depender de la motivación. Todo incluido, sin
              llamadas previas.
            </p>
          </RevealOnScroll>

          <RevealOnScroll delay={120} className="flex items-center gap-3">
            <span className="text-xs uppercase tracking-[0.14em] text-mp-carbon/70">
              Moneda
            </span>
            <CurrencyToggle />
          </RevealOnScroll>
        </div>

        <div className="max-w-2xl mx-auto">
          {PRODUCTS.map((product) => (
            <RevealOnScroll key={product.id} delay={0} className="h-full">
              <ProductCard product={product} />
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
