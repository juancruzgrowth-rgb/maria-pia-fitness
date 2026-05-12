import { cn } from "@/lib/utils";

interface PulseDividerProps {
  className?: string;
  ariaLabel?: string;
}

export function PulseDivider({
  className,
  ariaLabel = "Separador de sección",
}: PulseDividerProps) {
  return (
    <div
      role="separator"
      aria-label={ariaLabel}
      className={cn(
        "mp-pulse flex items-center justify-center w-full overflow-hidden",
        className,
      )}
    >
      <svg
        viewBox="0 0 800 60"
        className="w-full h-10 text-mp-orange"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M0 30 L240 30 L260 30 L280 12 L300 48 L320 18 L340 30 L380 30 L400 30 L420 6 L440 54 L460 30 L500 30 L800 30"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
