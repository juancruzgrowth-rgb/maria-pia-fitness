"use client";

import { useState } from "react";
import { CONTACT } from "@/lib/site";

const KINDS = [
  {
    id: "baja",
    label: "Quiero dar de baja la renovación",
    help: "Dejás de pagar el mes que viene y seguís entrando hasta que termine el período que ya pagaste.",
  },
  {
    id: "arrepentimiento",
    label: "Me arrepentí de la compra (botón de arrepentimiento)",
    help: "Si pasaron 10 días corridos o menos desde que pagaste, te devolvemos el importe completo.",
  },
] as const;

export function CancelForm() {
  const [kind, setKind] = useState<string>(KINDS[0].id);
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [motivo, setMotivo] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">(
    "idle",
  );

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (state === "sending") return;
    setState("sending");

    try {
      const response = await fetch("/api/cancelar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tipo: kind, nombre, email, motivo }),
      });
      setState(response.ok ? "done" : "error");
    } catch {
      setState("error");
    }
  }

  if (state === "done") {
    return (
      <div className="rounded-[var(--radius-card)] border border-mp-ink p-6">
        <p className="font-display text-lg font-bold text-mp-ink">
          Listo, recibimos tu pedido.
        </p>
        <p className="mt-3 text-sm leading-relaxed text-mp-carbon/80">
          Lo procesamos dentro de las 24 horas y te confirmamos por mail a{" "}
          {email}. Si querés que sea inmediato, cancelá la suscripción desde tu
          propia cuenta de MercadoPago: es un clic y tiene efecto al instante.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <fieldset className="flex flex-col gap-3">
        <legend className="mb-1 text-[11px] uppercase tracking-[0.18em] text-mp-carbon/70">
          Qué querés hacer
        </legend>
        {KINDS.map((option) => (
          <label
            key={option.id}
            className={`flex cursor-pointer flex-col gap-2 rounded-md border p-4 transition-colors ${
              kind === option.id
                ? "border-mp-ink"
                : "border-mp-line hover:border-mp-carbon/40"
            }`}
          >
            <span className="flex items-center gap-3">
              <input
                type="radio"
                name="tipo"
                value={option.id}
                checked={kind === option.id}
                onChange={() => setKind(option.id)}
                className="h-4 w-4 accent-mp-ink"
              />
              <span className="text-sm font-medium text-mp-ink">
                {option.label}
              </span>
            </span>
            <span className="block pl-7 text-xs leading-relaxed text-mp-carbon/70">
              {option.help}
            </span>
          </label>
        ))}
      </fieldset>

      <label className="flex flex-col gap-2">
        <span className="text-[11px] uppercase tracking-[0.18em] text-mp-carbon/70">
          Tu nombre
        </span>
        <input
          type="text"
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
          El email con el que te suscribiste
        </span>
        <input
          type="email"
          required
          maxLength={120}
          autoComplete="email"
          inputMode="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="rounded-md border border-mp-line bg-mp-canvas px-4 py-3 text-base text-mp-ink outline-none transition-colors focus:border-mp-ink"
        />
      </label>

      <label className="flex flex-col gap-2">
        <span className="text-[11px] uppercase tracking-[0.18em] text-mp-carbon/70">
          Motivo (opcional)
        </span>
        <textarea
          rows={3}
          maxLength={500}
          value={motivo}
          onChange={(event) => setMotivo(event.target.value)}
          className="rounded-md border border-mp-line bg-mp-canvas px-4 py-3 text-base text-mp-ink outline-none transition-colors focus:border-mp-ink"
        />
      </label>

      {state === "error" && (
        <p role="alert" className="text-sm leading-relaxed text-mp-ember">
          No pudimos registrar el pedido.{" "}
          <a
            href={CONTACT.askUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2"
          >
            Escribime por WhatsApp
          </a>{" "}
          y lo resuelvo yo.
        </p>
      )}

      <button
        type="submit"
        disabled={state === "sending"}
        className="inline-flex w-full items-center justify-center rounded-md bg-mp-ink px-6 py-4 font-display text-xs font-semibold uppercase tracking-[0.08em] text-mp-canvas transition-transform hover:scale-[0.99] active:scale-[0.98] disabled:opacity-60"
      >
        {state === "sending" ? "Enviando..." : "Enviar el pedido"}
      </button>
    </form>
  );
}
