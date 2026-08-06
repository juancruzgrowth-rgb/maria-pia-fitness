import Link from "next/link";
import { ShieldCheck } from "@phosphor-icons/react/dist/ssr";
import { RevealOnScroll } from "@/components/effects/RevealOnScroll";
import { GUARANTEE } from "@/lib/products";

const CONDITIONS = [
  {
    title: "Sin condiciones",
    body: "No hace falta que hayas completado ningún entrenamiento ni que justifiques nada.",
  },
  {
    title: "Sin repreguntas",
    body: "Te voy a preguntar qué no funcionó, porque me sirve para mejorar. Respondas lo que respondas, te devuelvo el dinero igual.",
  },
  {
    title: "Devolución en 5 días hábiles",
    body: "Por transferencia a la misma cuenta desde la que pagaste.",
  },
];

export function Guarantee() {
  return (
    <section
      aria-label="Garantía"
      className="section-pad border-t border-mp-line"
    >
      <div className="container-page">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
          <RevealOnScroll className="flex flex-col gap-4 lg:col-span-5">
            <ShieldCheck
              weight="duotone"
              className="h-9 w-9 text-mp-orange"
              aria-hidden="true"
            />
            <h2 className="font-display text-3xl font-extrabold leading-[1.08] tracking-tight md:text-4xl lg:text-5xl">
              {GUARANTEE.days} días de garantía.
            </h2>
            <p className="text-base leading-relaxed text-mp-carbon/80">
              {GUARANTEE.summary}
            </p>
            <Link
              href="/garantia"
              className="text-sm font-medium text-mp-ink underline decoration-mp-orange decoration-2 underline-offset-4 transition-colors hover:text-mp-ember"
            >
              Ver los términos completos de la garantía
            </Link>
          </RevealOnScroll>

          <div className="flex flex-col gap-px overflow-hidden rounded-[var(--radius-card)] border border-mp-line bg-mp-line lg:col-span-7">
            {CONDITIONS.map((condition, index) => (
              <RevealOnScroll
                key={condition.title}
                delay={index * 90}
                className="flex flex-col gap-2 bg-mp-canvas p-6 md:p-8"
              >
                <h3 className="font-display text-base font-bold text-mp-ink md:text-lg">
                  {condition.title}
                </h3>
                <p className="text-sm leading-relaxed text-mp-carbon/80">
                  {condition.body}
                </p>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
