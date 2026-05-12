"use client";

import { useState } from "react";
import { Plus, Minus } from "@phosphor-icons/react";
import { motion, AnimatePresence } from "framer-motion";
import { RevealOnScroll } from "@/components/effects/RevealOnScroll";

interface FAQItem {
  question: string;
  answer: string;
}

const FAQS: FAQItem[] = [
  {
    question: "¿Necesito tener experiencia previa para empezar?",
    answer:
      "No. Los programas se adaptan a tu nivel actual, ya sea que nunca hayas entrenado o que tengas años de experiencia. El diagnóstico inicial permite diseñar un plan que empiece desde donde estás vos, no desde donde debería estar cualquiera.",
  },
  {
    question: "¿Cómo funciona el entrenamiento online?",
    answer:
      "Recibís tu plan de entrenamiento y nutrición en una app o planilla compartida. Cada semana tenés seguimiento por chat, con feedback técnico sobre tu progreso. Si necesitás corrección de técnica, podés enviar videos y recibir devolución personalizada.",
  },
  {
    question: "¿Puedo entrenar en casa sin equipamiento?",
    answer:
      "Sí. Los programas pueden diseñarse para entrenar con el cuerpo, con bandas de resistencia o con equipamiento mínimo. En la consulta inicial evaluamos qué tenés disponible y construimos el plan en función de eso.",
  },
  {
    question: "¿Qué pasa si no puedo seguir el plan una semana?",
    answer:
      "La vida pasa. Si una semana no podés entrenar o tu alimentación se desordena, el plan no se rompe — se ajusta. El seguimiento existe justamente para eso: acompañar la realidad de cada persona, no exigir perfección.",
  },
  {
    question: "¿Cuánto tiempo lleva ver resultados?",
    answer:
      "Depende del punto de partida y del objetivo, pero con constancia la mayoría de las personas nota cambios reales en 4 a 6 semanas. Cambios en composición corporal, energía, fuerza y cómo se siente el cuerpo en general. Los resultados visibles en el espejo suelen aparecer entre las 8 y 12 semanas.",
  },
  {
    question: "¿La nutrición incluye conteo de calorías o macros?",
    answer:
      "No necesariamente. El enfoque nutricional depende del perfil de cada persona. Para algunas puede incluir porciones y estructuras de comida sin contar nada; para otras, un seguimiento más preciso. El objetivo siempre es que el plan sea sostenible, no que genere ansiedad.",
  },
  {
    question: "¿Puedo combinar entrenamiento presencial y online?",
    answer:
      "Sí. Si estás en Rosario, podés acordar sesiones presenciales en el gimnasio complementadas con seguimiento online. La modalidad se define en la consulta inicial según tu disponibilidad y objetivo.",
  },
  {
    question: "¿Qué incluye el seguimiento semanal?",
    answer:
      "Revisión de métricas de progreso, devolución sobre el entrenamiento de la semana, ajustes en carga o intensidad si corresponde, y un espacio para preguntas o dudas. En los planes Elite, además incluye llamadas quincenales por video.",
  },
];

function FAQRow({ item, index }: { item: FAQItem; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <RevealOnScroll delay={index * 60}>
      <div className="border-b border-mp-line">
        <button
          type="button"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          className="w-full flex items-start justify-between gap-4 py-6 text-left group"
        >
          <span className="font-display font-semibold text-base md:text-lg text-mp-ink leading-snug group-hover:text-mp-orange transition-colors">
            {item.question}
          </span>
          <span className="shrink-0 mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full border border-mp-line text-mp-carbon group-hover:border-mp-orange group-hover:text-mp-orange transition-colors">
            {open ? (
              <Minus weight="bold" className="h-3 w-3" aria-hidden="true" />
            ) : (
              <Plus weight="bold" className="h-3 w-3" aria-hidden="true" />
            )}
          </span>
        </button>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              key="answer"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <p className="pb-6 text-sm md:text-base text-mp-carbon/80 leading-relaxed max-w-3xl">
                {item.answer}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          <RevealOnScroll className="lg:col-span-4 flex flex-col gap-4">
            <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-mp-carbon/70 font-medium">
              <span
                aria-hidden="true"
                className="inline-block h-1.5 w-1.5 rounded-full bg-mp-orange"
              />
              Preguntas frecuentes
            </span>
            <h2 className="font-display font-extrabold text-4xl md:text-5xl leading-[1.05] tracking-tight">
              Lo que más nos preguntan.
            </h2>
            <p className="text-base text-mp-carbon/80 leading-relaxed">
              Si no encontrás lo que buscás, escribinos por WhatsApp y te respondemos en el día.
            </p>
          </RevealOnScroll>

          <div className="lg:col-span-8">
            {FAQS.map((item, index) => (
              <FAQRow key={item.question} item={item} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
