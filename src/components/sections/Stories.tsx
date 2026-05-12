"use client";

import React from "react";
import Image from "next/image";
import { Quotes } from "@phosphor-icons/react";
import { motion } from "framer-motion";
import { RevealOnScroll } from "@/components/effects/RevealOnScroll";
import { STORIES, type SuccessStory } from "@/content/stories";

function StoryCard({ story }: { story: SuccessStory }) {
  return (
    <article className="flex flex-col rounded-[var(--radius-card)] border border-mp-line overflow-hidden bg-mp-canvas w-72 shrink-0">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={story.imageUrl}
          alt={`Caso de ${story.name}`}
          fill
          sizes="288px"
          className="object-cover"
        />
      </div>
      <div className="flex flex-col gap-4 p-6 flex-1">
        <div className="flex items-center justify-between">
          <h3 className="font-display font-bold text-lg text-mp-ink">
            {story.name}{" "}
            <span className="text-mp-carbon/60 font-medium text-sm">
              · {story.age}
            </span>
          </h3>
          <span className="text-[10px] uppercase tracking-[0.16em] text-mp-carbon/70 border border-mp-line rounded-full px-2.5 py-1 font-display font-semibold">
            {story.duration}
          </span>
        </div>
        <p className="text-xs uppercase tracking-[0.14em] text-mp-orange font-display font-semibold">
          {story.program}
        </p>
        <p className="text-sm text-mp-carbon leading-relaxed">
          {story.caseSummary}
        </p>
        <blockquote className="border-t border-mp-line pt-5 mt-auto flex gap-3">
          <Quotes
            weight="fill"
            className="h-5 w-5 text-mp-orange shrink-0"
            aria-hidden="true"
          />
          <p className="text-sm text-mp-ink italic leading-relaxed">
            {story.testimonial}
          </p>
        </blockquote>
      </div>
    </article>
  );
}

function StoriesColumn({
  stories,
  duration = 14,
  className,
}: {
  stories: SuccessStory[];
  duration?: number;
  className?: string;
}) {
  return (
    <div className={`overflow-hidden ${className ?? ""}`}>
      <motion.div
        animate={{ translateY: "-50%" }}
        transition={{
          duration,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-6 pb-6"
      >
        {[...Array(2)].map((_, i) => (
          <React.Fragment key={i}>
            {stories.map((story) => (
              <StoryCard key={`${i}-${story.id}`} story={story} />
            ))}
          </React.Fragment>
        ))}
      </motion.div>
    </div>
  );
}

const col1 = STORIES.slice(0, 3);
const col2 = STORIES.slice(3, 6);
const col3 = STORIES.slice(6, 9);

export function Stories() {
  return (
    <section
      id="casos"
      aria-label="Casos de éxito"
      className="section-pad border-t border-mp-line"
    >
      <div className="container-page">
        <RevealOnScroll className="max-w-2xl flex flex-col gap-4 mb-14 md:mb-20">
          <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-mp-carbon/70 font-medium">
            <span
              aria-hidden="true"
              className="inline-block h-1.5 w-1.5 rounded-full bg-mp-orange"
            />
            Casos reales
          </span>
          <h2 className="font-display font-extrabold text-4xl md:text-5xl lg:text-[56px] leading-[1.05] tracking-tight">
            Resultados que no dependen de la motivación, sino de un plan bien hecho.
          </h2>
          <p className="text-base md:text-lg text-mp-carbon/80 leading-relaxed">
            Cada proceso combina entrenamiento personalizado, nutrición y seguimiento para que la
            persona no solo vea cambios en su cuerpo, sino que también aprenda a sostenerlos en
            su vida real.
          </p>
        </RevealOnScroll>
      </div>

      <div className="flex justify-center gap-6 [mask-image:linear-gradient(to_bottom,transparent,black_15%,black_85%,transparent)] max-h-[760px] overflow-hidden px-4 md:px-8">
        <StoriesColumn stories={col1} duration={50} />
        <StoriesColumn stories={col2} duration={62} className="hidden md:block" />
        <StoriesColumn stories={col3} duration={55} className="hidden lg:block" />
      </div>
    </section>
  );
}
