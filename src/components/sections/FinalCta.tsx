import { WhatsappLogo } from "@phosphor-icons/react/dist/ssr";
import { RevealOnScroll } from "@/components/effects/RevealOnScroll";
import { CONTACT } from "@/lib/site";
import { GROUP, isGroupOpen } from "@/lib/products";

export function FinalCta() {
  return (
    <section
      aria-label="Contacto"
      className="section-pad border-t border-mp-line"
    >
      <RevealOnScroll className="container-page flex max-w-3xl flex-col items-start gap-6">
        <h2 className="font-display text-3xl font-extrabold leading-[1.08] tracking-tight md:text-4xl lg:text-5xl">
          ¿Te quedó alguna duda?
        </h2>
        <p className="text-base leading-relaxed text-mp-carbon/80 md:text-lg">
          Escribime por WhatsApp y te respondo yo. Sin formularios, sin
          llamadas de venta y sin que te insista después.
          {isGroupOpen
            ? ` La inscripción del ${GROUP.label.toLowerCase()} cierra el ${GROUP.closesAt}.`
            : ""}
        </p>
        <a
          href={CONTACT.askUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex w-full items-center justify-center gap-2 rounded-md border border-mp-ink px-6 py-4 font-display text-xs font-semibold uppercase tracking-[0.08em] text-mp-ink transition-all duration-200 hover:bg-mp-ink hover:text-mp-canvas active:scale-[0.98] sm:w-auto"
        >
          <WhatsappLogo weight="fill" className="h-4 w-4" aria-hidden="true" />
          Hablar con Pía
        </a>
      </RevealOnScroll>
    </section>
  );
}
