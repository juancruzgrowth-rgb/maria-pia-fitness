"use client";

import { useRef } from "react";
import { ArrowRight, YoutubeLogo, CalendarBlank, Clock } from "@phosphor-icons/react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { RevealOnScroll } from "@/components/effects/RevealOnScroll";

interface LiveEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  topic: string;
  youtubeUrl?: string;
}

const EVENTS: LiveEvent[] = [
  {
    id: "seminario-1",
    title: "Cómo armar una rutina de fuerza desde cero",
    description:
      "Principios básicos, ejercicios fundamentales y cómo progresarlos sin importar tu nivel actual.",
    date: "Martes 20 de mayo",
    time: "19:00 hs ARG",
    topic: "Entrenamiento",
    youtubeUrl: "",
  },
  {
    id: "seminario-2",
    title: "Nutrición sin dietas: cómo comer bien de forma sostenible",
    description:
      "Por qué las dietas restrictivas no funcionan a largo plazo y qué hacer en cambio.",
    date: "Martes 3 de junio",
    time: "19:00 hs ARG",
    topic: "Nutrición",
    youtubeUrl: "",
  },
  {
    id: "seminario-3",
    title: "Recuperación y descanso: el entrenamiento que no se ve",
    description:
      "Sueño, estrés y manejo de la carga de entrenamiento. Todo lo que pasa fuera del gym también entrena.",
    date: "Martes 17 de junio",
    time: "19:00 hs ARG",
    topic: "Hábitos",
    youtubeUrl: "",
  },
];

const TOPIC_COLORS: Record<string, string> = {
  Entrenamiento: "text-mp-orange border-mp-orange/30 bg-mp-orange/5",
  Nutrición: "text-mp-sky border-mp-sky/30 bg-mp-sky/10",
  Hábitos: "text-mp-amber border-mp-amber/30 bg-mp-amber/5",
  "Salud y rendimiento": "text-mp-carbon border-mp-line bg-mp-canvas",
};

const YOUTUBE_CHANNEL = "https://www.youtube.com/@mp.cep";

export function LiveEvents() {
  const autoplay = useRef(
    Autoplay({ delay: 7000, stopOnInteraction: false, stopOnMouseEnter: true }),
  );

  const [emblaRef] = useEmblaCarousel(
    { loop: true, align: "start" },
    [autoplay.current],
  );

  return (
    <section
      id="eventos"
      aria-label="Próximos eventos en vivo"
      className="section-pad border-t border-mp-line"
    >
      <div className="container-page">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between mb-14 md:mb-20">
          <RevealOnScroll className="max-w-2xl flex flex-col gap-4">
            <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-mp-carbon/70 font-medium">
              <span
                aria-hidden="true"
                className="inline-block h-1.5 w-1.5 rounded-full bg-mp-orange"
              />
              Clases en vivo
            </span>
            <h2 className="font-display font-extrabold text-4xl md:text-5xl lg:text-[56px] leading-[1.05] tracking-tight">
              Seminarios gratuitos en YouTube.
            </h2>
            <p className="text-base md:text-lg text-mp-carbon/80 leading-relaxed">
              Una vez cada dos semanas, una clase en vivo sin costo. Preguntas en
              tiempo real y contenido que podés aplicar el mismo día.
            </p>
          </RevealOnScroll>

          <RevealOnScroll delay={120}>
            <a
              href={YOUTUBE_CHANNEL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-display font-semibold uppercase tracking-[0.12em] text-mp-ink hover:text-mp-amber transition-colors"
            >
              <YoutubeLogo weight="regular" className="h-5 w-5" />
              Activar recordatorio
            </a>
          </RevealOnScroll>
        </div>
      </div>

      <div className="overflow-hidden px-4 md:px-8 lg:px-12" ref={emblaRef}>
        <div className="flex gap-6">
          {EVENTS.map((event) => (
            <article
              key={event.id}
              className="flex shrink-0 basis-[85%] sm:basis-[60%] md:basis-[46%] lg:basis-[calc(25%-18px)] flex-col rounded-[var(--radius-card)] border border-mp-line bg-mp-canvas p-6 md:p-8 gap-5 transition-all duration-300 hover:border-mp-orange/25 hover:shadow-[0_0_28px_-6px_rgba(242,163,27,0.14)]"
            >
              <div className="flex items-start justify-between gap-3">
                <span
                  className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[10px] uppercase tracking-[0.14em] font-display font-semibold ${
                    TOPIC_COLORS[event.topic] ?? TOPIC_COLORS["Salud y rendimiento"]
                  }`}
                >
                  {event.topic}
                </span>
                <YoutubeLogo
                  weight="regular"
                  className="h-5 w-5 text-mp-carbon/40 shrink-0"
                  aria-hidden="true"
                />
              </div>

              <div className="flex flex-col gap-3 flex-1">
                <h3 className="font-display font-bold text-xl md:text-2xl text-mp-ink leading-snug">
                  {event.title}
                </h3>
                <p className="text-sm text-mp-carbon/80 leading-relaxed">
                  {event.description}
                </p>
              </div>

              <div className="flex flex-col gap-2 border-t border-mp-line pt-5">
                <div className="flex items-center gap-2 text-sm text-mp-carbon/80">
                  <CalendarBlank
                    weight="duotone"
                    className="h-4 w-4 text-mp-orange shrink-0"
                    aria-hidden="true"
                  />
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-mp-carbon/80">
                  <Clock
                    weight="duotone"
                    className="h-4 w-4 text-mp-orange shrink-0"
                    aria-hidden="true"
                  />
                  <span>{event.time}</span>
                </div>
              </div>

              <a
                href={event.youtubeUrl || YOUTUBE_CHANNEL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-md bg-mp-ink px-5 py-3 font-display font-semibold uppercase tracking-[0.08em] text-xs text-mp-canvas hover:bg-mp-carbon active:scale-[0.98] transition-all duration-200 mt-1"
              >
                Inscribirme al seminario
                <ArrowRight weight="bold" className="h-3.5 w-3.5" />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
