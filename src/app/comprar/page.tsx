import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowsClockwise,
  ClockCounterClockwise,
  WhatsappLogo,
} from "@phosphor-icons/react/dist/ssr";
import { CopyField } from "@/components/ui/CopyField";
import { CONTACT } from "@/lib/site";
import {
  CHALLENGE,
  ENROLLMENT_OPEN,
  FOUNDING,
  PACK_DISCOUNT_PCT,
  RENEWAL,
  TRANSFER,
  VISIBLE_PLANS,
  formatARS,
} from "@/lib/products";

export const metadata: Metadata = {
  title: `Reservá tu lugar en el ${CHALLENGE.name}`,
  description: `Cómo pagar el ${CHALLENGE.name} por transferencia bancaria y recibir el acceso en ${TRANSFER.responseWindow}.`,
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
        Empezás el día que entrás: el material completo te llega apenas
        confirmo la transferencia, sin esperar a que arranque ningún grupo.
        {FOUNDING.active
          ? ` Estos precios son los de lanzamiento y rigen hasta el ${FOUNDING.endsAt}.`
          : ""}
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
              </span>
            </div>
            <p className="text-sm leading-relaxed text-mp-carbon/80">
              {plan.summary}
            </p>
            {plan.id === "pack-3-niveles" && (
              <p className="font-display text-xs font-semibold uppercase tracking-[0.08em] text-mp-ember">
                {PACK_DISCOUNT_PCT}% menos que comprarlos de a uno
              </p>
            )}
          </li>
        ))}
      </ul>

      <ol className="mt-10 flex flex-col gap-8">
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
            <CopyField label="CBU" value={TRANSFER.cbu} />
            <CopyField label="Titular" value={TRANSFER.holder} />
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
            necesito para darte el acceso.
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
              Recibís el acceso
            </h2>
          </div>
          <p className="text-sm leading-relaxed text-mp-carbon/80">
            Verifico la transferencia y te mando el acceso a la comunidad, las
            rutinas y los videos donde te explico cómo usar todo, en{" "}
            {TRANSFER.responseWindow}.
          </p>
        </li>
      </ol>

      <div className="mt-10 flex flex-col gap-4">
        <div className="flex gap-3 rounded-md border border-mp-line p-4">
          <ClockCounterClockwise
            weight="duotone"
            className="mt-0.5 h-5 w-5 shrink-0 text-mp-orange"
            aria-hidden="true"
          />
          <p className="text-sm leading-relaxed text-mp-carbon">
            Si transferís de noche, vas a recibir la confirmación de que llegó
            enseguida, y el acceso a primera hora de la mañana.
          </p>
        </div>

        <div className="flex gap-3 rounded-md border border-mp-line p-4">
          <ArrowsClockwise
            weight="duotone"
            className="mt-0.5 h-5 w-5 shrink-0 text-mp-orange"
            aria-hidden="true"
          />
          <p className="text-sm leading-relaxed text-mp-carbon">
            <span className="font-display font-semibold text-mp-ink">
              No hay débito automático.
            </span>{" "}
            Un nivel te da {RENEWAL.accessDays} días de acceso. Si querés
            seguir con el siguiente, transferís de nuevo. Si no hacés nada, se
            termina y listo.
          </p>
        </div>
      </div>

      <p className="mt-8 text-xs leading-relaxed text-mp-carbon/70">
        Al comprar aceptás los{" "}
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
