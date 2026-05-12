"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { List, X } from "@phosphor-icons/react";
import { Logo } from "@/components/ui/Logo";
import { CartButton } from "@/components/ui/CartButton";
import { NAV_SECTIONS, CONTACT } from "@/lib/site";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-mp-canvas/85 backdrop-blur-md border-b border-mp-line"
          : "bg-transparent border-b border-transparent",
      )}
    >
      <div className="container-page flex items-center justify-between h-16 md:h-20">
        <Logo />

        <nav
          aria-label="Secciones principales"
          className="hidden lg:flex items-center gap-8"
        >
          {NAV_SECTIONS.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className="text-sm text-mp-ink hover:text-mp-amber transition-colors font-medium"
            >
              {section.label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <CartButton />
          <a
            href={CONTACT.calendlyUrl || "#newsletter"}
            target={CONTACT.calendlyUrl ? "_blank" : undefined}
            rel={CONTACT.calendlyUrl ? "noopener noreferrer" : undefined}
            className="inline-flex items-center justify-center rounded-md bg-mp-ink px-5 py-2.5 font-display font-semibold uppercase tracking-[0.1em] text-xs text-mp-canvas hover:bg-mp-carbon active:scale-[0.98] transition-all duration-200"
          >
            Agendar llamada
          </a>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <CartButton />
          <button
            type="button"
            onClick={() => setMobileOpen((open) => !open)}
            aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={mobileOpen}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-mp-line text-mp-ink"
          >
            {mobileOpen ? (
              <X weight="regular" className="h-5 w-5" />
            ) : (
              <List weight="regular" className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="lg:hidden border-t border-mp-line bg-mp-canvas">
          <nav
            aria-label="Secciones principales (mobile)"
            className="container-page flex flex-col gap-1 py-6"
          >
            {NAV_SECTIONS.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                onClick={() => setMobileOpen(false)}
                className="font-display font-semibold text-lg py-2 text-mp-ink hover:text-mp-amber transition-colors"
              >
                {section.label}
              </a>
            ))}
            <Link
              href={CONTACT.calendlyUrl || "#newsletter"}
              target={CONTACT.calendlyUrl ? "_blank" : undefined}
              rel={CONTACT.calendlyUrl ? "noopener noreferrer" : undefined}
              onClick={() => setMobileOpen(false)}
              className="mt-4 inline-flex items-center justify-center rounded-md bg-mp-ink px-6 py-4 font-display font-semibold uppercase tracking-[0.1em] text-xs text-mp-canvas"
            >
              Agendar llamada
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
