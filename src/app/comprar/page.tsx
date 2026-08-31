import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowsClockwise,
  Barbell,
  Users,
  WhatsappLogo,
} from "@phosphor-icons/react/dist/ssr";
import { CopyField } from "@/components/ui/CopyField";
import { CONTACT } from "@/lib/site";
import {
  CHALLENGE,
  ENROLLMENT_OPEN,
  EQUIPMENT,
  FOUNDING,
  FOUNDING_SPOTS_LEFT,
  QUARTERLY_DISCOUNT_PCT,
  RENEWAL,
  TRANSFER,
  NUTRITION_GUIDE,
  VISIBLE_PLANS,
  formatARS,
} from "@/lib/products";

export const metadata: Metadata = {
  title: `Entrá ${CHALLENGE.shortName}`,
  description: `Cómo pagar ${CHALLENGE.shortName} por transferencia bancaria y recibir el acceso en ${TRANSFER.responseWindow}.`,
  robots: { index: false, follow: true },
};

/**
 * Página de compra. Cobro por transferencia y alta manual: no hay pasarela,
 * no hay redirección de vuelta y no hay página de gracias. El circuito
 * termina en WhatsApp, que es donde Pía confirma el comprobante y da el
 * acceso a Skool. Ver TRANSFER en @/lib/products.
 */
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
        Transferís, me mandás el comprobante por WhatsApp y te doy el acceso en{" "}
        {TRANSFER.responseWindow}. Sin esperar a que arranque ningún grupo.
        {FOUNDING.active && FOUNDING_SPOTS_LEFT > 0
          ? ` Este es el precio del grupo fundador: son ${FOUNDING.spotsTotal} lugares, quedan ${FOUNDING_SPOTS_LEFT}, y te lo respeto mientras sigas renovando.`
          : " Es el precio de lanzamiento, y te lo respeto mientras sigas renovando."}
      </p>

      <h2 className="mt-10 font-display text-lg font-bold text-mp-ink md:text-xl">
        Elegí cómo entrar
      </h2>

      <ul className="mt-4 flex flex-col gap-4">
        {VISIBLE_PLANS.map((plan) => (
          <li
            key={plan.id}
            className="flex flex-col gap-3 rounded-[var(--radius-card)] border border-mp-line p-6"
          >
            <div className="flex items-baseline justify-between gap-4">
              <span className="font-display text-sm font-semibold text-mp-ink">
                {plan.name}
              </span>
              <span className="font-display text-2xl font-extrabold text-mp-ink md:text-3xl">
                {formatARS(plan.priceARS)}
                <span className="ml-1 text-sm font-semibold text-mp-carbon/70">
                  {plan.frequencyLabel}
                </span>
              </span>
            </div>
            <p className="text-sm leading-relaxed text-mp-carbon/80">
              {plan.summary}
            </p>
            {plan.id === "trimestral" && (
              <p className="font-display text-xs font-semibold uppercase tracking-[0.08em] text-mp-ember">
                {QUARTERLY_DISCOUNT_PCT}% menos que pagando mes a mes
              </p>
            )}
          </li>
        ))}

        {/* La guia no es un plan: se suma al que elijas. Va con el borde
            punteado para que no se lea como una tercera opcion excluyente. */}
        {NUTRITION_GUIDE.visible && (
          <li className="flex flex-col gap-3 rounded-[var(--radius-card)] border border-dashed border-mp-line p-6">
            <div className="flex items-baseline justify-between gap-4">
              <span className="font-display text-sm font-semibold text-mp-ink">
                {NUTRITION_GUIDE.name}
                <span className="ml-2 font-display text-xs font-semibold uppercase tracking-[0.08em] text-mp-ember">
                  {NUTRITION_GUIDE.label}
                </span>
              </span>
              <span className="font-display text-2xl font-extrabold text-mp-ink md:text-3xl">
                {formatARS(NUTRITION_GUIDE.priceARS)}
                <span className="ml-1 text-sm font-semibold text-mp-carbon/70">
                  {NUTRITION_GUIDE.frequencyLabel}
                </span>
              </span>
            </div>
            <p className="text-sm leading-relaxed text-mp-carbon/80">
              {NUTRITION_GUIDE.summary}
            </p>
            <p className="text-xs leading-relaxed text-mp-carbon/70">
              {NUTRITION_GUIDE.disclaimer}
            </p>
            <p className="text-sm leading-relaxed text-mp-carbon/80">
              Si la querés, sumá {formatARS(NUTRITION_GUIDE.priceARS)} a la
              transferencia de tu plan y avisame en el mismo mensaje del
              comprobante.
            </p>
          </li>
        )}
      </ul>

      <ol className="mt-12 flex flex-col gap-8">
        <li className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-mp-ink font-display text-sm font-bold text-mp-canvas">
              1
            </span>
            <h2 className="font-display text-lg font-bold text-mp-ink md:text-xl">
              Transferí el monto de tu plan
            </h2>
          </div>

          <div className="rounded-[var(--radius-card)] border border-mp-line px-5">
            <CopyField label="Alias" value={TRANSFER.alias} />
            <CopyField label="CVU" value={TRANSFER.cvu} />
            <CopyField label="Titular" value={TRANSFER.holder} />
            <CopyField label="Banco o billetera" value={TRANSFER.bank} />
          </div>
        </li>

        <li className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-mp-ink font-display text-sm font-bold text-mp-canvas">
              2
            </span>
            <h2 className="font-display text-lg font-bold text-mp-ink md:text-xl">
              Mandame el comprobante
            </h2>
          </div>
          <p className="text-sm leading-relaxed text-mp-carbon/80">
            El botón abre WhatsApp con el mensaje ya escrito. Adjuntá el
            comprobante y completá tu nombre, tu email y qué plan elegiste: los
            necesito para darte el acceso. Usá el email con el que vas a crear
            tu cuenta de Skool.
          </p>
          <a
            href={CONTACT.receiptUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-mp-ink px-6 py-4 font-display text-xs font-semibold uppercase tracking-[0.08em] text-mp-canvas transition-transform hover:scale-[0.99] active:scale-[0.98]"
          >
            <WhatsappLogo weight="fill" className="h-5 w-5" aria-hidden="true" />
            Ya transferí — enviar comprobante
          </a>
        </li>

        <li className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-mp-ink font-display text-sm font-bold text-mp-canvas">
              3
            </span>
            <h2 className="font-display text-lg font-bold text-mp-ink md:text-xl">
              Te doy el acceso y entrenás ese mismo día
            </h2>
          </div>
          <p className="text-sm leading-relaxed text-mp-carbon/80">
            Te mando la invitación a Skool por WhatsApp, mirás los videos de
            arranque y abrís la sesión 1. Tres sesiones por semana, de 30 a 60
            minutos cada una.
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
              No se renueva solo.
            </span>{" "}
            No hay débito automático ni tarjeta guardada: tenés{" "}
            {RENEWAL.accessDays} días de acceso por cada mes que transferís.
            Antes de que se venza te escribo, y seguís sólo si querés.
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
              Cuando se completa el cupo el precio sube, pero el tuyo no: te lo
              respeto mientras sigas renovando.
            </p>
          </div>
        )}
      </div>

      <p className="mt-8 text-xs leading-relaxed text-mp-carbon/70">
        Al contratar aceptás los{" "}
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
