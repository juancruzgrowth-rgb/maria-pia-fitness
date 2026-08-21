import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr";
import { CancelForm } from "@/components/checkout/CancelForm";
import { SITE } from "@/lib/site";
import { WITHDRAWAL_RIGHT } from "@/lib/products";

export const metadata: Metadata = {
  title: "Botón de arrepentimiento y baja",
  description:
    "Cancelá tu suscripción o ejercé tu derecho de arrepentimiento. Sin llamar a nadie.",
  robots: { index: true, follow: true },
};

/**
 * Botón de arrepentimiento y baja de la suscripción.
 *
 * Obligatorio por la Resolución 424/2020 de la Secretaría de Comercio Interior
 * desde que se cobra con débito automático: cancelar tiene que ser tan fácil
 * como suscribirse, y el acceso al botón tiene que estar en la home.
 *
 * El pedido se registra y se procesa dentro de las 24 h. NO cancelamos la
 * suscripción en el acto desde acá a propósito: sin login, un formulario que
 * cancela sabiendo sólo el email deja que cualquiera dé de baja a otra. El
 * camino instantáneo existe y está a la vista: la propia app de MercadoPago.
 */
export default function CancelarPage() {
  return (
    <section className="container-page section-pad max-w-2xl">
      <Link
        href="/"
        className="mb-8 inline-flex items-center gap-2 text-xs uppercase tracking-[0.14em] text-mp-carbon transition-colors hover:text-mp-ink"
      >
        <ArrowLeft weight="bold" className="h-4 w-4" aria-hidden="true" />
        Volver
      </Link>

      <h1 className="font-display text-3xl font-extrabold leading-[1.08] tracking-tight md:text-4xl lg:text-5xl">
        Dar de baja o arrepentirte.
      </h1>

      <p className="mt-4 text-base leading-relaxed text-mp-carbon/80">
        Sin llamados, sin explicaciones y sin que nadie te intente convencer de
        lo contrario. Completá el formulario y listo.
      </p>

      <div className="mt-8 rounded-md border border-mp-line p-4">
        <p className="text-sm leading-relaxed text-mp-carbon">
          <span className="font-display font-semibold text-mp-ink">
            Lo más rápido: hacelo desde MercadoPago.
          </span>{" "}
          Entrá a tu cuenta, buscá <em>Suscripciones</em>, elegí la de{" "}
          {SITE.brand} y cancelala. Tiene efecto al instante y no depende de que
          nosotras hagamos nada.
        </p>
      </div>

      <div className="mt-8">
        <CancelForm />
      </div>

      <div className="mt-10 flex flex-col gap-4 border-t border-mp-line pt-8">
        <p className="text-sm leading-relaxed text-mp-carbon/80">
          <span className="font-display font-semibold text-mp-ink">
            Derecho de arrepentimiento.
          </span>{" "}
          Tenés {WITHDRAWAL_RIGHT.days} días corridos desde la compra para
          arrepentirte y recuperar lo que pagaste, sin costo y sin tener que dar
          motivos ({WITHDRAWAL_RIGHT.law}). Es un derecho irrenunciable.
        </p>
        <p className="text-sm leading-relaxed text-mp-carbon/80">
          <span className="font-display font-semibold text-mp-ink">
            Cuándo dejás de tener acceso.
          </span>{" "}
          Si das de baja la renovación, seguís entrando hasta que termine el
          período que ya pagaste. No cortamos el acceso el mismo día.
        </p>
        <p className="text-sm leading-relaxed text-mp-carbon/80">
          También podés escribirnos a{" "}
          <a
            href={`mailto:${SITE.email}`}
            className="underline underline-offset-2"
          >
            {SITE.email}
          </a>
          .
        </p>
      </div>
    </section>
  );
}
