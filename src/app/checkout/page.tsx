"use client";

import Link from "next/link";
import { ArrowLeft, Lock } from "@phosphor-icons/react";
import {
  useCartStore,
  getCartLines,
  getCartTotal,
} from "@/lib/cart/store";
import { formatPrice } from "@/lib/products";
import { CurrencyToggle } from "@/components/ui/CurrencyToggle";

export default function CheckoutPage() {
  const items = useCartStore((state) => state.items);
  const currency = useCartStore((state) => state.currency);

  const lines = getCartLines(items, currency);
  const total = getCartTotal(items, currency);
  const hasItems = lines.length > 0;

  return (
    <section className="container-page section-pad">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.14em] text-mp-carbon hover:text-mp-ink transition-colors mb-8"
      >
        <ArrowLeft weight="bold" className="h-4 w-4" />
        Seguir explorando
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
        <div className="lg:col-span-7 flex flex-col gap-6">
          <h1 className="font-display font-extrabold text-4xl md:text-5xl tracking-tight">
            Revisá tu compra
          </h1>
          <p className="text-base text-mp-carbon/80 max-w-lg leading-relaxed">
            Confirmá los programas que querés contratar. El pago se procesa de
            forma segura por MercadoPago (ARS) o Stripe (USD).
          </p>

          <div className="flex items-center justify-between border-t border-b border-mp-line py-4">
            <span className="text-xs uppercase tracking-[0.14em] text-mp-carbon">
              Moneda
            </span>
            <CurrencyToggle />
          </div>

          {hasItems ? (
            <ul className="flex flex-col gap-5">
              {lines.map((line) => (
                <li
                  key={line.productId}
                  className="flex items-start justify-between gap-4 border-b border-mp-line pb-5"
                >
                  <div>
                    <p className="font-display font-bold text-lg">
                      {line.name}
                    </p>
                    <p className="text-xs uppercase tracking-[0.14em] text-mp-carbon/70 mt-1">
                      {line.duration} · x{line.quantity}
                    </p>
                  </div>
                  <span className="font-display font-bold text-mp-ink">
                    {formatPrice(line.lineTotal, currency)}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <div className="flex flex-col gap-3 border border-dashed border-mp-line rounded-[var(--radius-card)] p-10 text-center">
              <p className="font-display font-semibold text-lg">
                Tu carrito está vacío.
              </p>
              <p className="text-sm text-mp-carbon/80">
                Volvé al inicio y elegí el programa que mejor encaja con vos.
              </p>
            </div>
          )}
        </div>

        <aside className="lg:col-span-5">
          <div className="sticky top-24 rounded-[var(--radius-card)] border border-mp-line p-6 md:p-8 flex flex-col gap-5">
            <h2 className="font-display font-bold text-xl uppercase tracking-[0.12em]">
              Resumen
            </h2>
            <div className="flex items-baseline justify-between border-t border-mp-line pt-5">
              <span className="text-xs uppercase tracking-[0.14em] text-mp-carbon">
                Total
              </span>
              <span className="font-display font-extrabold text-3xl">
                {formatPrice(total, currency)}
              </span>
            </div>

            <button
              type="button"
              disabled={!hasItems}
              className="inline-flex items-center justify-center gap-2 rounded-md bg-mp-ink px-6 py-4 font-display font-semibold uppercase tracking-[0.1em] text-xs text-mp-canvas hover:bg-mp-carbon active:scale-[0.98] transition-all duration-200 disabled:opacity-40"
            >
              <Lock weight="bold" className="h-4 w-4" />
              {currency === "ARS"
                ? "Pagar con MercadoPago"
                : "Pagar con Stripe"}
            </button>

            <p className="text-xs text-mp-carbon/70 leading-relaxed">
              Las pasarelas de pago se conectan con credenciales productivas en
              el deploy. En desarrollo, este botón es un placeholder.
            </p>
          </div>
        </aside>
      </div>
    </section>
  );
}
