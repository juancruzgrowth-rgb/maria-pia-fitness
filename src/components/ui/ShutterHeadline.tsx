"use client";

import { motion } from "framer-motion";

interface ShutterWordProps {
  word: string;
  delay: number;
  sizeClasses: string;
  colorClass: string;
}

function ShutterWord({ word, delay, sizeClasses, colorClass }: ShutterWordProps) {
  return (
    <motion.span
      initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ delay, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      className={`inline-block ${sizeClasses} ${colorClass}`}
    >
      {word}
    </motion.span>
  );
}

interface ShutterHeadlineProps {
  lead: string;
  accent: string;
  baseDelay?: number;
}

export function ShutterHeadline({
  lead,
  accent,
  baseDelay = 0.15,
}: ShutterHeadlineProps) {
  const SIZE =
    "font-display font-extrabold text-5xl sm:text-6xl lg:text-[72px] tracking-tight leading-none";

  const renderLine = (text: string, colorClass: string, wordOffset: number) =>
    text.split(" ").map((word, i) => (
      <ShutterWord
        key={`${word}-${i}`}
        word={word}
        delay={baseDelay + (wordOffset + i) * 0.07}
        sizeClasses={SIZE}
        colorClass={colorClass}
      />
    ));

  const leadWords = lead.split(" ").length;

  return (
    <div aria-label={`${lead} ${accent}`}>
      <div className="flex flex-wrap gap-x-[0.25em] gap-y-1" aria-hidden="true">
        {renderLine(lead, "text-mp-ink", 0)}
      </div>
      <div className="flex flex-wrap gap-x-[0.25em] gap-y-1 mt-1" aria-hidden="true">
        {renderLine(accent, "text-mp-orange", leadWords)}
      </div>
    </div>
  );
}
