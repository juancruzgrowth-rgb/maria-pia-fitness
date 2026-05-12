"use client";

import { useEffect, useState } from "react";
import { ShoppingBag } from "@phosphor-icons/react";
import { useCartStore, getCartCount } from "@/lib/cart/store";
import { cn } from "@/lib/utils";

interface CartButtonProps {
  className?: string;
}

export function CartButton({ className }: CartButtonProps) {
  const [mounted, setMounted] = useState(false);
  const items = useCartStore((state) => state.items);
  const setOpen = useCartStore((state) => state.setOpen);

  useEffect(() => {
    setMounted(true);
  }, []);

  const count = mounted ? getCartCount(items) : 0;

  return (
    <button
      type="button"
      onClick={() => setOpen(true)}
      aria-label={`Abrir carrito${count > 0 ? ` con ${count} ${count === 1 ? "ítem" : "ítems"}` : ""}`}
      className={cn(
        "relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-mp-line text-mp-ink hover:border-mp-ink transition-colors",
        className,
      )}
    >
      <ShoppingBag weight="regular" className="h-5 w-5" aria-hidden="true" />
      {count > 0 && (
        <span
          aria-hidden="true"
          className="absolute -top-1 -right-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-mp-orange px-1 text-[10px] font-display font-bold text-mp-ink"
        >
          {count}
        </span>
      )}
    </button>
  );
}
