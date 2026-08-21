"use client";

import { useState } from "react";
import { CONTACT } from "@/lib/site";
import { SUBSCRIPTION, formatARS } from "@/lib/products";

export interface CheckoutPlanOption {
  id: string;
  name: string;
  priceARS: number;
  frequencyLabel: string;
  summary: string;
  /** Endpoint que crea el cobro de este plan. */
  endpoint: string;
  /** Nota corta bajo el precio. Vacía si no corresponde. */
  note: string;
}

interface Props {
  plans: CheckoutPlanOption[];
}

/**
 * Formulario de compra.
 *
 * Pedimos nombre y email ACÁ, antes de mandarla a MercadoPago, porque el email
 * que devuelve MP puede ser el de la cuenta con la que pagó —del marido, de la
 * madre— y ese no sirve para invitarla a Skool.
 * Ver docs/estrategia/24-acceso-skool-desde-mercadopago.md §4.
 */
export function CheckoutForm({ plans }: Props) {
  const [planId, setPlanId] = useState(plans[0]?.id ?? "");
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);

  const selected = plans.find((plan) => plan.id === planId) ?? plans[0];

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!selected || sending) return;

    setSending(true);
    setError("");

    try {
      const response = await fetch(selected.endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, email }),
      });

      const data: { initPoint?: string; error?: string } = await response
        .json()
        .catch(() => ({}));

      if (!response.ok || !data.initPoint) {
        setError(
          data.error ??
            "No pudimos abrir el pago. Probá de nuevo o escribime por WhatsApp.",
        );
        setSending(false);
        return;
      }

      window.location.href = data.initPoint;
    } catch {
      setError(
        "No pudimos abrir el pago. Probá de nuevo o escribime por WhatsApp.",
      );
      setSending(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <fieldset className="flex flex-col gap-4">
        <legend className="sr-only">Elegí tu plan</legend>
        {plans.map((plan) => {
          const checked = plan.id === planId;
          return (
            <label
              key={plan.id}
              className={`flex cursor-pointer flex-col gap-3 rounded-[var(--radius-card)] border p-6 transition-colors ${
                checked ? "border-mp-ink" : "border-mp-line hover:border-mp-carbon/40"
              }`}
            >
              <span className="flex items-baseline justify-between gap-4">
                <span className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="plan"
                    value={plan.id}
                    checked={checked}
                    onChange={() => setPlanId(plan.id)}
                    className="h-4 w-4 accent-mp-ink"
                  />
                  <span className="font-display text-sm font-semibold text-mp-ink">
                    {plan.name}
                  </span>
                </span>
                <span className="font-display text-2xl font-extrabold text-mp-ink md:text-3xl">
                  {formatARS(plan.priceARS)}
                  <span className="ml-1 text-sm font-semibold text-mp-carbon/70">
                    {plan.frequencyLabel}
                  </span>
                </span>
              </span>
              <span className="block text-sm leading-relaxed text-mp-carbon/80">
                {plan.summary}
              </span>
              {plan.note && (
                <span className="block font-display text-xs font-semibold uppercase tracking-[0.08em] text-mp-ember">
                  {plan.note}
                </span>
              )}
            </label>
          );
        })}
      </fieldset>

      <div className="flex flex-col gap-4">
        <label className="flex flex-col gap-2">
          <span className="text-[11px] uppercase tracking-[0.18em] text-mp-carbon/70">
            Tu nombre
          </span>
          <input
            type="text"
            name="nombre"
            required
            minLength={2}
            maxLength={80}
            autoComplete="name"
            value={nombre}
            onChange={(event) => setNombre(event.target.value)}
            className="rounded-md border border-mp-line bg-mp-canvas px-4 py-3 text-base text-mp-ink outline-none transition-colors focus:border-mp-ink"
          />
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-[11px] uppercase tracking-[0.18em] text-mp-carbon/70">
            Tu email
          </span>
          <input
            type="email"
            name="email"
            required
            maxLength={120}
            autoComplete="email"
            inputMode="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="rounded-md border border-mp-line bg-mp-canvas px-4 py-3 text-base text-mp-ink outline-none transition-colors focus:border-mp-ink"
          />
          <span className="text-xs leading-relaxed text-mp-carbon/70">
            Acá te llega el acceso, así que revisá que esté bien. Usá este mismo
            correo para crear tu cuenta de Skool.
          </span>
        </label>
      </div>

      {error && (
        <p role="alert" className="text-sm leading-relaxed text-mp-ember">
          {error}{" "}
          <a
            href={CONTACT.paymentHelpUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2"
          >
            Escribime por WhatsApp
          </a>
          .
        </p>
      )}

      <button
        type="submit"
        disabled={sending}
        className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-mp-ink px-6 py-4 font-display text-xs font-semibold uppercase tracking-[0.08em] text-mp-canvas transition-transform hover:scale-[0.99] active:scale-[0.98] disabled:opacity-60"
      >
        {sending ? "Abriendo el pago..." : `Pagar con ${SUBSCRIPTION.provider}`}
      </button>

      <p className="text-xs leading-relaxed text-mp-carbon/70">
        Te llevamos a {SUBSCRIPTION.provider} para pagar. Nosotras no vemos ni
        guardamos los datos de tu tarjeta.
      </p>
    </form>
  );
}
