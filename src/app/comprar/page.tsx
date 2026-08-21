import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowsClockwise,
  Barbell,
  Users,
  WhatsappLogo,
} from "@phosphor-icons/react/dist/ssr";
import { CONTACT } from "@/lib/site";
import {
  CheckoutForm,
  type CheckoutPlanOption,
} from "@/components/checkout/CheckoutForm";
import {
  CHALLENGE,
  ENROLLMENT_OPEN,
  EQUIPMENT,
  FOUNDING,
  FOUNDING_SPOTS_LEFT,
  QUARTERLY_DISCOUNT_PCT,
  SUBSCRIPTION,
  VISIBLE_PLANS,
} from "@/lib/products";

export const metadata: Metadata = {
  title: `Suscribite ${CHALLENGE.shortName}`,
  description: `Cómo suscribirte ${CHALLENGE.shortName} con débito automático por ${SUBSCRIPTION.provider} y recibir el acceso.`,
  robots: { index: false, follow: true },
};

export default function ComprarPage() {
  if (!ENROLLMENT_OPEN) {
    return (
      <section className="container-page section-pad max-w-2xl">
        <h1 className="font-display text-3xl font-extrabold tracking-tight md:text-4xl">
          La inscripción está cerrada por ahora.
        </h1>
        <p className="mt-4 text-base leading-relaxed text-mp-carbon/80">
          Estoy con el cupo de atención completo. Dejame tu contacto y te
          aviso apenas se libere un lugar.
        </p>
        <a
          href={CONTACT.waitlistUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-md bg-mp-ink px-6 py-4 font-display text-xs font-semibold uppercase tracking-[0.08em] text-mp-canvas transition-transform hover:scale-[0.99] active:scale-[0.98] sm:w-auto"
        >
          <WhatsappLogo weight="fill" className="h-4 w-4" aria-hidden="true" />
          Anotarme para la próxima
        </a>
      </section>
    );
  }

  /* El endpoint sale de acá, no del cliente: el importe de cada plan lo pone
     el servidor desde products.ts. Si el plan viniera del formulario, alguien
     podría suscribirse al trimestral pagando el mensual. */
  const CHECKOUT_ENDPOINTS: Record<string, string> = {
    "nivel-mensual": "/api/checkout/suscripcion",
    trimestral: "/api/checkout/pack",
  };

  const planOptions: CheckoutPlanOption[] = VISIBLE_PLANS.filter(
    (plan) => plan.id in CHECKOUT_ENDPOINTS,
  ).map((plan) => ({
    id: plan.id,
    name: plan.name,
    priceARS: plan.priceARS,
    frequencyLabel: plan.frequencyLabel,
    summary: plan.summary,
    endpoint: CHECKOUT_ENDPOINTS[plan.id],
    note:
      plan.id === "trimestral"
        ? `${QUARTERLY_DISCOUNT_PCT}% menos que pagando mes a mes`
        : "",
  }));

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
        Reservá tu lugar.
      </h1>

      <p className="mt-4 text-base leading-relaxed text-mp-carbon/80">
        Empezás el día que entrás: el acceso te llega apenas se confirma el
        pago, sin esperar a que arranque ningún grupo.
        {FOUNDING.active && FOUNDING_SPOTS_LEFT > 0
          ? ` Este es el precio del grupo fundador: son ${FOUNDING.spotsTotal} lugares, quedan ${FOUNDING_SPOTS_LEFT}, y el precio te queda congelado mientras sigas suscripta.`
          : ""}
      </p>

      <div className="mt-8">
        <CheckoutForm plans={planOptions} />
      </div>

      <ol className="mt-12 flex flex-col gap-8">
        <li className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-mp-ink font-display text-sm font-bold text-mp-canvas">
              1
            </span>
            <h2 className="font-display text-lg font-bold text-mp-ink md:text-xl">
              Te suscribís con {SUBSCRIPTION.provider}
            </h2>
          </div>
          <p className="text-sm leading-relaxed text-mp-carbon/80">
            Elegís tu medio de pago una sola vez y queda configurado el débito
            automático. Sin transferencias y sin mandarme ningún comprobante.
          </p>
        </li>

        <li className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-mp-ink font-display text-sm font-bold text-mp-canvas">
              2
            </span>
            <h2 className="font-display text-lg font-bold text-mp-ink md:text-xl">
              Recibís el acceso a Skool
            </h2>
          </div>
          <p className="text-sm leading-relaxed text-mp-carbon/80">
            Ahí están las rutinas, los videos de cada ejercicio y la comunidad
            donde subís tus videos de técnica y preguntás lo que necesites.
          </p>
        </li>

        <li className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-mp-ink font-display text-sm font-bold text-mp-canvas">
              3
            </span>
            <h2 className="font-display text-lg font-bold text-mp-ink md:text-xl">
              Entrenás ese mismo día
            </h2>
          </div>
          <p className="text-sm leading-relaxed text-mp-carbon/80">
            Mirás los videos de arranque, abrís la sesión 1 y empezás. Tres
            sesiones por semana, de 30 a 60 minutos cada una.
          </p>
        </li>
      </ol>

      <div className="mt-10 flex flex-col gap-4">
        <div className="flex gap-3 rounded-md border border-mp-line p-4">
          <ArrowsClockwise
            weight="duotone"
            className="mt-0.5 h-5 w-5 shrink-0 text-mp-orange"
            aria-hidden="true"
          />
          <p className="text-sm leading-relaxed text-mp-carbon">
            <span className="font-display font-semibold text-mp-ink">
              Se renueva solo todos los meses.
            </span>{" "}
            {SUBSCRIPTION.cancelNote}
          </p>
        </div>

        <div className="flex gap-3 rounded-md border border-mp-line p-4">
          <Barbell
            weight="duotone"
            className="mt-0.5 h-5 w-5 shrink-0 text-mp-orange"
            aria-hidden="true"
          />
          <p className="text-sm leading-relaxed text-mp-carbon">
            <span className="font-display font-semibold text-mp-ink">
              {EQUIPMENT.short}.
            </span>{" "}
            {EQUIPMENT.detail}
          </p>
        </div>

        {FOUNDING.active && FOUNDING_SPOTS_LEFT > 0 && (
          <div className="flex gap-3 rounded-md border border-mp-line p-4">
            <Users
              weight="duotone"
              className="mt-0.5 h-5 w-5 shrink-0 text-mp-orange"
              aria-hidden="true"
            />
            <p className="text-sm leading-relaxed text-mp-carbon">
              <span className="font-display font-semibold text-mp-ink">
                {FOUNDING.label}: quedan {FOUNDING_SPOTS_LEFT} de{" "}
                {FOUNDING.spotsTotal} lugares.
              </span>{" "}
              Cuando se completa el cupo el precio sube, pero el tuyo no: te
              queda congelado mientras no canceles.
            </p>
          </div>
        )}
      </div>

      <p className="mt-8 text-xs leading-relaxed text-mp-carbon/70">
        Al suscribirte aceptás los{" "}
        <Link href="/terminos-condiciones" className="underline underline-offset-2">
          Términos y Condiciones
        </Link>{" "}
        y la{" "}
        <Link href="/politica-privacidad" className="underline underline-offset-2">
          Política de Privacidad
        </Link>
        .
      </p>
    </section>
  );
}
