import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, WhatsappLogo } from "@phosphor-icons/react/dist/ssr";
import { CONTACT, SITE } from "@/lib/site";
import { RENEWAL, WITHDRAWAL_RIGHT } from "@/lib/products";

export const metadata: Metadata = {
  title: "Botón de arrepentimiento y baja",
  description:
    "Cancelá tu acceso o ejercé tu derecho de arrepentimiento. Sin llamar a nadie.",
  robots: { index: true, follow: true },
};

/**
 * Botón de arrepentimiento y baja.
 *
 * Obligatorio por la Resolución 424/2020 de la Secretaría de Comercio Interior
 * en toda venta online: dar de baja tiene que ser tan fácil como contratar, y
 * el acceso al botón tiene que estar en la home.
 *
 * Con el cobro por transferencia no hay nada que cancelar —no existe un débito
 * que frenar—, así que la página informa eso primero y deja los dos canales de
 * contacto para el arrepentimiento del art. 34, que sí exige respuesta. No hay
 * formulario: no hay ninguna automatización detrás que lo procese, y un form
 * que escribe a una planilla sin credenciales cargadas es peor que un botón de
 * WhatsApp que funciona siempre.
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
        lo contrario.
      </p>

      <div className="mt-8 rounded-md border border-mp-line p-4">
        <p className="text-sm leading-relaxed text-mp-carbon">
          <span className="font-display font-semibold text-mp-ink">
            No tenés que cancelar nada.
          </span>{" "}
          El pago es por transferencia: no hay débito automático ni ningún medio
          de pago tuyo guardado. Si no transferís el período siguiente, tu
          acceso termina cuando se cumplen los {RENEWAL.accessDays} días que ya
          pagaste y no se te cobra nada más.
        </p>
      </div>

      <h2 className="mt-10 font-display text-lg font-bold text-mp-ink md:text-xl">
        Si querés avisarme, o querés arrepentirte
      </h2>

      <p className="mt-3 text-sm leading-relaxed text-mp-carbon/80">
        Escribime por cualquiera de estos dos canales con tu nombre y tu email.
        Te contesto dentro de las 24 horas.
      </p>

      <a
        href={CONTACT.cancelUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-md bg-mp-ink px-6 py-4 font-display text-xs font-semibold uppercase tracking-[0.08em] text-mp-canvas transition-transform hover:scale-[0.99] active:scale-[0.98] sm:w-auto"
      >
        <WhatsappLogo weight="fill" className="h-5 w-5" aria-hidden="true" />
        Escribirme por WhatsApp
      </a>

      <p className="mt-4 text-sm leading-relaxed text-mp-carbon/80">
        O por mail a{" "}
        <a href={`mailto:${SITE.email}`} className="underline underline-offset-2">
          {SITE.email}
        </a>
        .
      </p>

      <div className="mt-10 flex flex-col gap-4 border-t border-mp-line pt-8">
        <p className="text-sm leading-relaxed text-mp-carbon/80">
          <span className="font-display font-semibold text-mp-ink">
            Derecho de arrepentimiento.
          </span>{" "}
          Tenés {WITHDRAWAL_RIGHT.days} días corridos desde la compra para
          arrepentirte y recuperar lo que pagaste, sin costo y sin tener que dar
          motivos ({WITHDRAWAL_RIGHT.law}). Es un derecho irrenunciable. La
          devolución te la hago por transferencia a la cuenta que me indiques,
          dentro de los cinco días hábiles.
        </p>
        <p className="text-sm leading-relaxed text-mp-carbon/80">
          <span className="font-display font-semibold text-mp-ink">
            Cuándo dejás de tener acceso.
          </span>{" "}
          Seguís entrando hasta que termine el período que ya pagaste. No corto
          el acceso el mismo día que me avisás.
        </p>
      </div>
    </section>
  );
}
