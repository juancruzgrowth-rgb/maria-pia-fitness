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
              Elegí el plan que se adapta a tu momento.
            </h2>
            <p className="text-base md:text-lg text-mp-carbon/80 leading-relaxed">
              Cada programa parte del mismo método: diagnóstico, plan
              personalizado y seguimiento real. Lo que cambia es la profundidad
              y el ritmo.
            </p>
          </RevealOnScroll>

          <RevealOnScroll delay={120} className="flex items-center gap-3">
            <span className="text-xs uppercase tracking-[0.14em] text-mp-carbon/70">
              Moneda
            </span>
            <CurrencyToggle />
          </RevealOnScroll>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {PRODUCTS.map((product, index) => (
            <RevealOnScroll
              key={product.id}
              delay={index * 100}
              className="h-full"
            >
              <ProductCard product={product} />
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
