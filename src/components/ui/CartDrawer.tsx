"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Minus, Plus, Trash, X } from "@phosphor-icons/react";
import {
  useCartStore,
  getCartLines,
  getCartTotal,
} from "@/lib/cart/store";
import { formatPrice } from "@/lib/products";
import { CurrencyToggle } from "@/components/ui/CurrencyToggle";

export function CartDrawer() {
  const [mounted, setMounted] = useState(false);
  const isOpen = useCartStore((state) => state.isOpen);
  const setOpen = useCartStore((state) => state.setOpen);
  const items = useCartStore((state) => state.items);
  const currency = useCartStore((state) => state.currency);
  const setQuantity = useCartStore((state) => state.setQuantity);
  const removeItem = useCartStore((state) => state.removeItem);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    document.documentElement.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [isOpen, mounted]);

  if (!mounted) return null;

  const lines = getCartLines(items, currency);
  const total = getCartTotal(items, currency);

  return (
    <div
      aria-hidden={!isOpen}
      className={`fixed inset-0 z-[80] ${isOpen ? "pointer-events-auto" : "pointer-events-none"}`}
    >
      <button
        type="button"
        aria-label="Cerrar carrito"
        onClick={() => setOpen(false)}
        className={`absolute inset-0 bg-mp-ink/30 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
      />
      <aside
        role="dialog"
        aria-label="Carrito de compras"
        className={`absolute right-0 top-0 h-full w-full max-w-md bg-mp-canvas border-l border-mp-line shadow-[0_0_60px_rgba(5,5,5,0.04)] flex flex-col transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <header className="flex items-center justify-between border-b border-mp-line px-6 py-5">
          <h2 className="font-display font-bold text-lg uppercase tracking-[0.12em]">
            Tu carrito
          </h2>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Cerrar"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-mp-line hover:border-mp-ink transition-colors"
          >
            <X weight="regular" className="h-4 w-4" aria-hidden="true" />
          </button>
        </header>

        <div className="px-6 py-4 border-b border-mp-line flex items-center justify-between text-xs text-mp-carbon">
          <span className="uppercase tracking-[0.14em]">Moneda</span>
          <CurrencyToggle />
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-6">
          {lines.length === 0 ? (
            <div className="flex flex-col items-center justify-center text-center py-16 gap-3">
              <p className="font-display font-semibold text-lg">
                Todavía no agregaste nada.
              </p>
              <p className="text-sm text-mp-carbon/80 max-w-xs">
                Elegí un programa y avanzá hacia tu mejor versión con método.
              </p>
            </div>
          ) : (
            <ul className="flex flex-col gap-5">
              {lines.map((line) => (
                <li
                  key={line.productId}
                  className="flex flex-col gap-3 border-b border-mp-line pb-5 last:border-b-0"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-display font-bold text-base text-mp-ink">
                        {line.name}
                      </p>
                      <p className="text-xs text-mp-carbon/70 uppercase tracking-[0.14em] mt-1">
                        {line.duration}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeItem(line.productId)}
                      aria-label={`Quitar ${line.name}`}
                      className="text-mp-carbon hover:text-mp-ink transition-colors"
                    >
                      <Trash weight="regular" className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="inline-flex items-center gap-2 rounded-full border border-mp-line px-1">
                      <button
                        type="button"
                        aria-label="Disminuir cantidad"
                        onClick={() =>
                          setQuantity(line.productId, line.quantity - 1)
                        }
                        className="h-8 w-8 inline-flex items-center justify-center text-mp-ink hover:text-mp-amber"
                      >
                        <Minus weight="bold" className="h-3 w-3" />
                      </button>
                      <span className="text-sm font-display font-semibold w-6 text-center">
                        {line.quantity}
                      </span>
                      <button
                        type="button"
                        aria-label="Aumentar cantidad"
                        onClick={() =>
                          setQuantity(line.productId, line.quantity + 1)
                        }
                        className="h-8 w-8 inline-flex items-center justify-center text-mp-ink hover:text-mp-amber"
                      >
                        <Plus weight="bold" className="h-3 w-3" />
                      </button>
                    </div>
                    <span className="font-display font-bold text-mp-ink">
                      {formatPrice(line.lineTotal, currency)}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <footer className="border-t border-mp-line px-6 py-6 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-[0.14em] text-mp-carbon">
              Total
            </span>
            <span className="font-display font-extrabold text-2xl text-mp-ink">
              {formatPrice(total, currency)}
            </span>
          </div>
          <Link
            href="/checkout"
            onClick={() => setOpen(false)}
            aria-disabled={lines.length === 0}
            className={`inline-flex items-center justify-center gap-2 rounded-md bg-mp-ink px-6 py-4 font-display font-semibold uppercase tracking-[0.1em] text-xs text-mp-canvas transition-all duration-200 ${
              lines.length === 0
                ? "pointer-events-none opacity-40"
                : "hover:bg-mp-carbon active:scale-[0.98]"
            }`}
          >
            Finalizar compra
          </Link>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="text-xs uppercase tracking-[0.14em] text-mp-carbon hover:text-mp-ink"
          >
            Seguir explorando
          </button>
        </footer>
      </aside>
    </div>
  );
}
