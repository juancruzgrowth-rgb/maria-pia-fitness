"use client";

import { motion } from "framer-motion";

interface ShutterCharProps {
  char: string;
  delay: number;
  sizeClasses: string;
  colorClass: string;
}

function ShutterChar({ char, delay, sizeClasses, colorClass }: ShutterCharProps) {
  return (
    <span className="relative inline-block overflow-hidden">
      <motion.span
        initial={{ opacity: 0, filter: "blur(5px)" }}
        animate={{ opacity: 1, filter: "blur(0px)" }}
        transition={{ delay: delay + 0.18, duration: 0.6 }}
        className={`${sizeClasses} ${colorClass} inline-block leading-none`}
      >
        {char}
      </motion.span>

      <motion.span
        initial={{ x: "-105%" }}
        animate={{ x: "105%", opacity: [0, 1, 0] }}
        transition={{ duration: 0.45, delay, ease: "easeInOut" }}
        className={`${sizeClasses} text-mp-orange absolute inset-0 leading-none pointer-events-none`}
        style={{ clipPath: "polygon(0 0, 100% 0, 100% 34%, 0 34%)" }}
        aria-hidden="true"
      >
        {char}
      </motion.span>

      <motion.span
        initial={{ x: "105%" }}
        animate={{ x: "-105%", opacity: [0, 0.75, 0] }}
        transition={{ duration: 0.45, delay: delay + 0.07, ease: "easeInOut" }}
        className={`${sizeClasses} text-mp-carbon absolute inset-0 leading-none pointer-events-none`}
        style={{ clipPath: "polygon(0 34%, 100% 34%, 100% 66%, 0 66%)" }}
        aria-hidden="true"
      >
        {char}
      </motion.span>

      <motion.span
        initial={{ x: "-105%" }}
        animate={{ x: "105%", opacity: [0, 1, 0] }}
        transition={{ duration: 0.45, delay: delay + 0.14, ease: "easeInOut" }}
        className={`${sizeClasses} text-mp-orange absolute inset-0 leading-none pointer-events-none`}
        style={{ clipPath: "polygon(0 66%, 100% 66%, 100% 100%, 0 100%)" }}
        aria-hidden="true"
      >
        {char}
      </motion.span>
    </span>
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
    "font-display font-extrabold text-5xl sm:text-6xl lg:text-[72px] tracking-tight";

  const renderLine = (text: string, colorClass: string, charOffset: number) => {
    const tokens = text.split(/(\s+)/);
    let i = charOffset;
    return tokens.map((token, ti) => {
      if (/^\s+$/.test(token)) {
        i++;
        return (
          <span key={ti} className={`${SIZE} inline-block`}>
            {" "}
          </span>
        );
      }
      const wordStart = i;
      i += token.length;
      return (
        <span key={ti} className="inline-flex">
          {token.split("").map((char, ci) => (
            <ShutterChar
              key={ci}
              char={char}
              delay={baseDelay + (wordStart + ci) * 0.028}
              sizeClasses={SIZE}
              colorClass={colorClass}
            />
          ))}
        </span>
      );
    });
  };

  return (
    <div aria-label={`${lead} ${accent}`}>
      <div className="flex flex-wrap" aria-hidden="true">
        {renderLine(lead, "text-mp-ink", 0)}
      </div>
      <div className="flex flex-wrap" aria-hidden="true">
        {renderLine(accent, "text-mp-orange", lead.length + 1)}
      </div>
    </div>
  );
}
