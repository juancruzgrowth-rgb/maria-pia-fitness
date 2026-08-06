import type { ReactNode } from "react";

interface LegalPageProps {
  title: string;
  updatedAt: string;
  intro?: string;
  children: ReactNode;
}

export function LegalPage({ title, updatedAt, intro, children }: LegalPageProps) {
  return (
    <article className="container-page section-pad max-w-3xl">
      <p className="mb-4 font-display text-[11px] font-semibold uppercase tracking-[0.16em] text-mp-ember">
        Borrador — pendiente de revisión por abogado
      </p>

      <h1 className="font-display text-3xl font-extrabold leading-[1.08] tracking-tight md:text-4xl lg:text-5xl">
        {title}
      </h1>

      <p className="mt-4 text-sm text-mp-carbon/70">
        Última actualización: {updatedAt}
      </p>

      {intro && (
        <p className="mt-6 text-base leading-relaxed text-mp-carbon/80">{intro}</p>
      )}

      <div className="mt-10 flex flex-col gap-8">{children}</div>
    </article>
  );
}

interface LegalSectionProps {
  heading: string;
  children: ReactNode;
}

export function LegalSection({ heading, children }: LegalSectionProps) {
  return (
    <section className="flex flex-col gap-3">
      <h2 className="font-display text-lg font-bold text-mp-ink md:text-xl">
        {heading}
      </h2>
      <div className="flex flex-col gap-3 text-sm leading-relaxed text-mp-carbon md:text-base">
        {children}
      </div>
    </section>
  );
}
