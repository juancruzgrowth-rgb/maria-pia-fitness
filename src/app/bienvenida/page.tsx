import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle,
  UsersThree,
  WhatsappLogo,
} from "@phosphor-icons/react/dist/ssr";
import { CONTACT, SITE } from "@/lib/site";
import { CHALLENGE } from "@/lib/products";

export const metadata: Metadata = {
  title: "Ya estás adentro",
  description: `Tu acceso ${CHALLENGE.shortName}.`,
  robots: { index: false, follow: false },
};

/**
 * Página de retorno de MercadoPago.
 *
 * Es el canal PRINCIPAL de entrega del acceso, no el email. Si el mail cae en
 * spam hay una clienta que pagó y no entró, y nadie se entera hasta que
 * reclama: plata cobrada más silencio, el peor modo de falla del sistema.
 * Ver docs/estrategia/21-mercadopago-suscripciones.md §4.
 *
 * No confirma el pago —eso lo hace el webhook, que puede llegar unos segundos
 * después—: confirma que volvió de MercadoPago y le muestra por dónde entrar.
 */
export default function BienvenidaPage() {
  const skoolUrl = CONTACT.skoolUrl;
  const groupUrl = CONTACT.whatsappGroupUrl;

  return (
    <section className="container-page section-pad max-w-2xl">
      <span className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-mp-ember">
        <CheckCircle weight="fill" className="h-4 w-4" aria-hidden="true" />
        Pago recibido
      </span>

      <h1 className="mt-4 font-display text-3xl font-extrabold leading-[1.08] tracking-tight md:text-4xl lg:text-5xl">
        Ya estás adentro.
      </h1>

      <p className="mt-4 text-base leading-relaxed text-mp-carbon/80">
        Bienvenida {CHALLENGE.shortName}. Te mandé el acceso por mail, pero no
        hace falta que lo esperes: entrá desde acá y empezá hoy.
      </p>

      <ol className="mt-10 flex flex-col gap-8">
        <li className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-mp-ink font-display text-sm font-bold text-mp-canvas">
              1
            </span>
            <h2 className="font-display text-lg font-bold text-mp-ink md:text-xl">
              Entrá a la comunidad
            </h2>
          </div>
          <p className="text-sm leading-relaxed text-mp-carbon/80">
            Creá tu cuenta con <strong>el mismo email</strong> que dejaste al
            pagar: es con ese correo que te identifico para aprobarte el
            ingreso.
          </p>
          {skoolUrl ? (
            <a
              href={skoolUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-mp-ink px-6 py-4 font-display text-xs font-semibold uppercase tracking-[0.08em] text-mp-canvas transition-transform hover:scale-[0.99] active:scale-[0.98] sm:w-auto"
            >
              <UsersThree weight="fill" className="h-4 w-4" aria-hidden="true" />
              Entrar a Skool
              <ArrowRight weight="bold" className="h-4 w-4" aria-hidden="true" />
            </a>
          ) : (
            <p className="rounded-md border border-mp-line p-4 text-sm leading-relaxed text-mp-carbon">
              El link de invitación te llega por mail a la brevedad. Si en un
              rato no lo ves, escribime y te lo paso a mano.
            </p>
          )}
        </li>

        <li className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-mp-ink font-display text-sm font-bold text-mp-canvas">
              2
            </span>
            <h2 className="font-display text-lg font-bold text-mp-ink md:text-xl">
              Sumate al grupo de WhatsApp
            </h2>
          </div>
          <p className="text-sm leading-relaxed text-mp-carbon/80">
            Es el día a día: avisos, dudas rápidas y las demás que están
            entrenando al mismo tiempo que vos.
          </p>
          <a
            href={groupUrl || CONTACT.askUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full items-center justify-center gap-2 rounded-md border border-mp-ink px-6 py-4 font-display text-xs font-semibold uppercase tracking-[0.08em] text-mp-ink transition-all duration-200 hover:bg-mp-ink hover:text-mp-canvas active:scale-[0.98] sm:w-auto"
          >
            <WhatsappLogo weight="fill" className="h-4 w-4" aria-hidden="true" />
            {groupUrl ? "Entrar al grupo" : "Pedirme el link del grupo"}
          </a>
        </li>

        <li className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-mp-ink font-display text-sm font-bold text-mp-canvas">
              3
            </span>
            <h2 className="font-display text-lg font-bold text-mp-ink md:text-xl">
              Mirá los videos de arranque y entrená hoy
            </h2>
          </div>
          <p className="text-sm leading-relaxed text-mp-carbon/80">
            Están arriba de todo en la comunidad. Veinte minutos y ya sabés
            exactamente qué hacer. Después abrís la sesión 1 y empezás.
          </p>
        </li>
      </ol>

      <div className="mt-12 rounded-md border border-mp-line p-4">
        <p className="text-sm leading-relaxed text-mp-carbon">
          <span className="font-display font-semibold text-mp-ink">
            ¿Algo no te funciona?
          </span>{" "}
          Escribime por{" "}
          <a
            href={CONTACT.askUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2"
          >
            WhatsApp
          </a>{" "}
          o a{" "}
          <a
            href={`mailto:${SITE.email}`}
            className="underline underline-offset-2"
          >
            {SITE.email}
          </a>
          . Te respondo yo.
        </p>
      </div>

      <p className="mt-8 text-xs leading-relaxed text-mp-carbon/70">
        Podés cancelar cuando quieras desde tu cuenta de MercadoPago o desde{" "}
        <Link href="/cancelar" className="underline underline-offset-2">
          esta página
        </Link>
        .
      </p>
    </section>
  );
}
