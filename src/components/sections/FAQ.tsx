"use client";

import { useState } from "react";
import { Plus, Minus } from "@phosphor-icons/react";
import { RevealOnScroll } from "@/components/effects/RevealOnScroll";
import { FAQS, type FaqItem } from "@/content/offer";

function FaqRow({ item, index }: { item: FaqItem; index: number }) {
  const [open, setOpen] = useState(false);
  const panelId = `faq-panel-${index}`;

  return (
    <RevealOnScroll delay={Math.min(index, 4) * 60}>
      <div className="border-b border-mp-line">
        <button
          type="button"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-controls={panelId}
          className="group flex w-full items-start justify-between gap-4 py-5 text-left md:py-6"
        >
          <span className="font-display text-base font-semibold leading-snug text-mp-ink transition-colors group-hover:text-mp-orange md:text-lg">
            {item.question}
          </span>
          <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-mp-line text-mp-carbon transition-colors group-hover:border-mp-orange group-hover:text-mp-orange">
            {open ? (
              <Minus weight="bold" className="h-3 w-3" aria-hidden="true" />
            ) : (
              <Plus weight="bold" className="h-3 w-3" aria-hidden="true" />
            )}
          </span>
        </button>

        <div
          id={panelId}
          hidden={!open}
          className="pb-5 text-sm leading-relaxed text-mp-carbon/80 md:pb-6 md:text-base"
        >
          {item.answer}
        </div>
      </div>
    </RevealOnScroll>
  );
}

export function FAQ() {
  return (
    <section
      id="faq"
      aria-label="Preguntas frecuentes"
      className="section-pad border-t border-mp-line"
    >
      <div className="container-page">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-16">
          <RevealOnScroll className="flex flex-col gap-4 lg:col-span-4">
            <span className="inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.18em] text-mp-carbon/70">
              <span
                aria-hidden="true"
                className="inline-block h-1.5 w-1.5 rounded-full bg-mp-orange"
              />
              Preguntas frecuentes
            </span>
            <h2 className="font-display text-3xl font-extrabold leading-[1.08] tracking-tight md:text-4xl lg:text-5xl">
              Lo que más me preguntan.
            </h2>
          </RevealOnScroll>

          <div className="lg:col-span-8">
            {FAQS.map((item, index) => (
              <FaqRow key={item.question} item={item} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
