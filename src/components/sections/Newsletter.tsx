"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowRight, CheckCircle, EnvelopeSimple } from "@phosphor-icons/react";
import { RevealOnScroll } from "@/components/effects/RevealOnScroll";

const schema = z.object({
  firstName: z
    .string()
    .min(2, "Tu nombre tiene que tener al menos 2 letras.")
    .max(60),
  email: z.string().email("Necesitamos un email válido."),
  consent: z
    .boolean()
    .refine((value) => value, "Necesitamos tu consentimiento."),
});

type FormValues = z.infer<typeof schema>;

type Status = "idle" | "submitting" | "success" | "error";

export function Newsletter() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { firstName: "", email: "", consent: false },
  });

  const onSubmit = async (values: FormValues) => {
    setStatus("submitting");
    setErrorMessage(null);
    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!response.ok) {
        const data = (await response.json().catch(() => null)) as {
          error?: string;
        } | null;
        throw new Error(data?.error || "No pudimos registrarte. Probá de nuevo.");
      }
      setStatus("success");
      reset();
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error ? error.message : "Error inesperado.",
      );
    }
  };

  return (
    <section
      id="newsletter"
      aria-label="Newsletter"
      className="section-pad border-t border-mp-line"
    >
      <div className="container-page">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          <RevealOnScroll className="lg:col-span-5 flex flex-col gap-5">
            <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-mp-carbon/70 font-medium">
              <span
                aria-hidden="true"
                className="inline-block h-1.5 w-1.5 rounded-full bg-mp-orange"
              />
              Newsletter
            </span>
            <h2 className="font-display font-extrabold text-4xl md:text-5xl leading-[1.05] tracking-tight">
              Una vez por semana, contenido que sí sirve.
            </h2>
            <p className="text-base text-mp-carbon/80 leading-relaxed max-w-md">
              Una rutina, una receta y una idea para ordenar la semana. Sin
              spam, sin promesas vacías. Cancelás cuando quieras.
            </p>
          </RevealOnScroll>

          <RevealOnScroll
            delay={120}
            className="lg:col-span-7 rounded-[var(--radius-card)] border border-mp-line p-6 md:p-10 bg-mp-canvas"
          >
            {status === "success" ? (
              <div className="flex flex-col items-start gap-4 py-8">
                <CheckCircle
                  weight="duotone"
                  className="h-12 w-12 text-mp-orange"
                  aria-hidden="true"
                />
                <h3 className="font-display font-bold text-2xl">
                  Listo. Revisá tu casilla.
                </h3>
                <p className="text-sm text-mp-carbon/80 max-w-md leading-relaxed">
                  Te enviamos un email para confirmar tu suscripción. Si no
                  llega en 5 minutos, mirá la carpeta de Promociones o Spam.
                </p>
                <button
                  type="button"
                  onClick={() => setStatus("idle")}
                  className="text-xs uppercase tracking-[0.14em] font-display font-semibold text-mp-ink hover:text-mp-amber transition-colors"
                >
                  Suscribir otro email
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                className="flex flex-col gap-5"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <label className="flex flex-col gap-2">
                    <span className="text-xs uppercase tracking-[0.14em] text-mp-carbon font-display font-semibold">
                      Nombre
                    </span>
                    <input
                      type="text"
                      autoComplete="given-name"
                      placeholder="Cómo te llamamos"
                      {...register("firstName")}
                      className="rounded-md border border-mp-line bg-mp-canvas px-4 py-3 text-sm text-mp-ink placeholder:text-mp-carbon/40 focus:border-mp-ink focus:outline-none"
                    />
                    {errors.firstName && (
                      <span className="text-xs text-mp-amber">
                        {errors.firstName.message}
                      </span>
                    )}
                  </label>
                  <label className="flex flex-col gap-2">
                    <span className="text-xs uppercase tracking-[0.14em] text-mp-carbon font-display font-semibold">
                      Email
                    </span>
                    <div className="relative">
                      <EnvelopeSimple
                        weight="regular"
                        aria-hidden="true"
                        className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-mp-carbon/60"
                      />
                      <input
                        type="email"
                        autoComplete="email"
                        placeholder="vos@ejemplo.com"
                        {...register("email")}
                        className="w-full rounded-md border border-mp-line bg-mp-canvas pl-10 pr-4 py-3 text-sm text-mp-ink placeholder:text-mp-carbon/40 focus:border-mp-ink focus:outline-none"
                      />
                    </div>
                    {errors.email && (
                      <span className="text-xs text-mp-amber">
                        {errors.email.message}
                      </span>
                    )}
                  </label>
                </div>

                <label className="flex items-start gap-3 text-xs text-mp-carbon/80 leading-relaxed">
                  <input
                    type="checkbox"
                    {...register("consent")}
                    className="mt-0.5 h-4 w-4 rounded border-mp-line accent-mp-ink"
                  />
                  <span>
                    Acepto recibir comunicaciones de Maria Pia y la{" "}
                    <a
                      href="/politica-privacidad"
                      className="underline underline-offset-2 hover:text-mp-ink"
                    >
                      política de privacidad
                    </a>
                    .
                  </span>
                </label>
                {errors.consent && (
                  <span className="text-xs text-mp-amber">
                    {errors.consent.message}
                  </span>
                )}

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-2">
                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="inline-flex items-center justify-center gap-2 rounded-md bg-mp-ink px-6 py-3.5 font-display font-semibold uppercase tracking-[0.1em] text-xs text-mp-canvas hover:bg-mp-carbon active:scale-[0.98] transition-all duration-200 disabled:opacity-50"
                  >
                    {status === "submitting" ? "Enviando…" : "Suscribirme"}
                    <ArrowRight weight="bold" className="h-4 w-4" />
                  </button>
                  {status === "error" && errorMessage && (
                    <span className="text-xs text-mp-amber">
                      {errorMessage}
                    </span>
                  )}
                </div>
              </form>
            )}
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}
