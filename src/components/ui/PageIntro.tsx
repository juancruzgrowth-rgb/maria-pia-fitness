"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SpecialText } from "@/components/ui/SpecialText";

const INTRO_TEXT = "Tu cuerpo no necesita presión. Necesita un método que te acompañe.";
const DISPLAY_DURATION = 3200;

export function PageIntro() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), DISPLAY_DURATION);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="page-intro"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-mp-ink px-6"
          aria-hidden="true"
        >
          <div className="max-w-2xl text-center">
            <SpecialText
              speed={12}
              className="text-lg sm:text-xl md:text-2xl text-mp-canvas/90 leading-relaxed"
            >
              {INTRO_TEXT}
            </SpecialText>
          </div>

          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.4 }}
          >
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                className="block h-1 w-1 rounded-full bg-mp-orange"
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeInOut",
                }}
              />
            ))}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
