import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  withTagline?: boolean;
}

export function Logo({ className, withTagline = false }: LogoProps) {
  return (
    <Link
      href="/"
      aria-label="Inicio — MP Centro de Entrenamiento Personalizado"
      className={cn(
        "inline-flex items-center gap-3 group",
        className,
      )}
    >
      <span
        className="relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-mp-ink/80 bg-mp-canvas"
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 40 40"
          className="h-6 w-6 text-mp-orange"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6 22 L12 22 L15 12 L20 30 L24 16 L28 22 L34 22"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <span className="flex flex-col leading-none">
        <span className="font-display font-bold text-mp-ink text-base tracking-tight">
          Maria Pia
        </span>
        {withTagline && (
          <span className="text-[10px] uppercase tracking-[0.18em] text-mp-carbon/70 mt-0.5">
            Centro · Entrenamiento Personalizado
          </span>
        )}
      </span>
    </Link>
  );
}
