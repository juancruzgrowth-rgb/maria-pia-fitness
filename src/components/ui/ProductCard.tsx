"use client";

import { useState, useRef } from "react";
import { CheckCircle, Plus, Play, Pause, SpeakerHigh } from "@phosphor-icons/react";
import { useCartStore } from "@/lib/cart/store";
import { formatPrice, type ProductPackage } from "@/lib/products";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: ProductPackage;
  className?: string;
}

function AudioPlayer({ src }: { src: string }) {
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
    } else {
      audio.play();
    }
    setPlaying(!playing);
  };

  const onTimeUpdate = () => {
    const audio = audioRef.current;
    if (!audio || !audio.duration) return;
    setProgress((audio.currentTime / audio.duration) * 100);
  };

  const onEnded = () => {
    setPlaying(false);
    setProgress(0);
  };

  const seek = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current;
    if (!audio) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    audio.currentTime = ratio * audio.duration;
  };

  return (
    <div className="rounded-md border border-mp-line bg-mp-canvas/60 p-4 flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <SpeakerHigh weight="duotone" className="h-4 w-4 text-mp-orange shrink-0" aria-hidden="true" />
        <span className="text-xs uppercase tracking-[0.14em] font-display font-semibold text-mp-carbon/70">
          Maria Pia te explica el plan
        </span>
      </div>
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={toggle}
          aria-label={playing ? "Pausar audio" : "Reproducir audio"}
          className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-mp-ink text-mp-canvas hover:bg-mp-carbon transition-colors"
        >
          {playing ? (
            <Pause weight="fill" className="h-3.5 w-3.5" aria-hidden="true" />
          ) : (
            <Play weight="fill" className="h-3.5 w-3.5 translate-x-px" aria-hidden="true" />
          )}
        </button>
        <div
          className="flex-1 h-1 bg-mp-line rounded-full cursor-pointer overflow-hidden"
          onClick={seek}
          role="slider"
          aria-label="Progreso del audio"
        >
          <div
            className="h-full bg-mp-orange rounded-full transition-all duration-100"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
      <audio
        ref={audioRef}
        src={src}
        onTimeUpdate={onTimeUpdate}
        onEnded={onEnded}
        preload="metadata"
      />
    </div>
  );
}

export function ProductCard({ product, className }: ProductCardProps) {
  const currency = useCartStore((state) => state.currency);
  const addItem = useCartStore((state) => state.addItem);

  const price = product.prices[currency];

  return (
    <article
      className={cn(
        "flex h-full flex-col justify-between rounded-[var(--radius-card)] border border-mp-line bg-mp-canvas p-8 md:p-10 transition-all duration-300",
        product.recommended
          ? "border-mp-ink"
          : "hover:border-mp-orange/25 hover:shadow-[0_0_28px_-6px_rgba(242,163,27,0.14)]",
        className,
      )}
    >
      <header className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          {product.badge && (
            <span
              className={cn(
                "inline-flex items-center rounded-full border px-3 py-1 text-[10px] uppercase tracking-[0.16em] font-display font-semibold",
                product.recommended
                  ? "border-mp-ink bg-mp-ink text-mp-canvas"
                  : "border-mp-line text-mp-carbon",
              )}
            >
              {product.badge}
            </span>
          )}
          <span className="text-xs uppercase tracking-[0.16em] text-mp-carbon/70">
            {product.duration}
          </span>
        </div>

        <h3 className="font-display font-bold text-2xl md:text-[28px] text-mp-ink leading-tight">
          {product.name}
        </h3>
        <p className="text-sm text-mp-carbon/80 leading-relaxed">
          {product.tagline}
        </p>

        <p className="text-sm text-mp-ink leading-relaxed border-t border-mp-line pt-5">
          {product.goal}
        </p>

        <ul className="flex flex-col gap-3 mt-2">
          {product.includes.map((item) => (
            <li key={item} className="flex gap-3 text-sm text-mp-carbon">
              <CheckCircle
                weight="duotone"
                className="mt-0.5 h-4 w-4 text-mp-orange shrink-0"
                aria-hidden="true"
              />
              <span className="leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>

        {product.audioUrl && (
          <div className="mt-4">
            <AudioPlayer src={product.audioUrl} />
          </div>
        )}
      </header>

      <footer className="mt-8 flex flex-col gap-5 border-t border-mp-line pt-6">
        <div className="flex items-baseline gap-2">
          <span className="font-display font-extrabold text-3xl md:text-4xl text-mp-ink">
            {formatPrice(price, currency)}
          </span>
          <span className="text-xs uppercase tracking-[0.18em] text-mp-carbon/60">
            {currency}
          </span>
        </div>
        <button
          type="button"
          onClick={() => addItem(product.id)}
          className="inline-flex items-center justify-center gap-2 rounded-md bg-mp-ink px-6 py-3.5 font-display font-semibold uppercase tracking-[0.1em] text-xs text-mp-canvas hover:bg-mp-carbon active:scale-[0.98] transition-all duration-200"
        >
          <Plus weight="bold" className="h-4 w-4" aria-hidden="true" />
          Sumar al carrito
        </button>
      </footer>
    </article>
  );
}
