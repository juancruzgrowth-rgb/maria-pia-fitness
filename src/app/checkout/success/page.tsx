import Link from "next/link";
import { CheckCircle } from "@phosphor-icons/react/dist/ssr";

export default function CheckoutSuccessPage() {
  return (
    <section className="container-page section-pad max-w-2xl text-center flex flex-col items-center gap-6">
      <CheckCircle
        weight="duotone"
        className="h-20 w-20 text-mp-orange"
        aria-hidden="true"
      />
      <h1 className="font-display font-extrabold text-4xl md:text-5xl">
        ¡Listo, ya estamos en marcha!
      </h1>
      <p className="text-base md:text-lg text-mp-carbon/80 leading-relaxed">
        Recibimos tu pago. En las próximas 48 hs hábiles te llega un mail de
        Maria Pia con los próximos pasos: completar el cuestionario inicial y
        agendar tu primera sesión.
      </p>
      <Link
        href="/"
        className="inline-flex items-center justify-center rounded-md bg-mp-ink px-6 py-4 font-display font-semibold uppercase tracking-[0.1em] text-xs text-mp-canvas hover:bg-mp-carbon active:scale-[0.98] transition-all duration-200"
      >
        Volver al inicio
      </Link>
    </section>
  );
}
