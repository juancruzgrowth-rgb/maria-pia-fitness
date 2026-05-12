"use client";

import { WhatsappLogo } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { CONTACT } from "@/lib/site";

export function WhatsAppFab() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const id = window.setTimeout(() => setVisible(true), 1200);
    return () => window.clearTimeout(id);
  }, []);

  if (!CONTACT.whatsappNumber) return null;

  return (
    <a
      href={CONTACT.whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chatear con Maria Pia por WhatsApp"
      className={`fixed bottom-6 right-6 z-40 inline-flex h-14 w-14 items-center justify-center rounded-full bg-mp-ink text-mp-canvas transition-all duration-500 hover:bg-mp-amber hover:text-mp-ink focus-visible:ring-2 focus-visible:ring-mp-orange focus-visible:ring-offset-2 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
      }`}
    >
      <WhatsappLogo weight="fill" className="h-7 w-7" aria-hidden="true" />
      <span
        aria-hidden="true"
        className="absolute inset-0 rounded-full ring-1 ring-mp-orange/30 animate-ping"
      />
    </a>
  );
}
