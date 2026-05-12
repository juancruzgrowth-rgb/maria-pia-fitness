"use client";

import { useCartStore } from "@/lib/cart/store";
import { cn } from "@/lib/utils";
import type { Currency } from "@/lib/products";

const OPTIONS: { value: Currency; label: string }[] = [
  { value: "ARS", label: "ARS" },
  { value: "USD", label: "USD" },
];

interface CurrencyToggleProps {
  className?: string;
}

export function CurrencyToggle({ className }: CurrencyToggleProps) {
  const currency = useCartStore((state) => state.currency);
  const setCurrency = useCartStore((state) => state.setCurrency);

  return (
    <div
      role="group"
      aria-label="Selector de moneda"
      className={cn(
        "inline-flex items-center rounded-full border border-mp-line bg-mp-canvas p-1",
        className,
      )}
    >
      {OPTIONS.map((option) => {
        const isActive = currency === option.value;
        return (
          <button
            key={option.value}
            type="button"
            onClick={() => setCurrency(option.value)}
            aria-pressed={isActive}
            className={cn(
              "px-3 py-1 text-xs font-display font-semibold uppercase tracking-[0.1em] rounded-full transition-colors",
              isActive
                ? "bg-mp-ink text-mp-canvas"
                : "text-mp-carbon hover:text-mp-ink",
            )}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
