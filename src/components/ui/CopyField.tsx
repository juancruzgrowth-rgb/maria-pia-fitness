"use client";

import { useState } from "react";
import { Check, Copy } from "@phosphor-icons/react";

interface CopyFieldProps {
  label: string;
  value: string;
}

export function CopyField({ label, value }: CopyFieldProps) {
  const [copied, setCopied] = useState(false);

  const onCopy = async () => {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex items-center justify-between gap-3 border-b border-mp-line py-4 last:border-b-0">
      <div className="flex min-w-0 flex-col gap-0.5">
        <span className="text-[11px] uppercase tracking-[0.14em] text-mp-carbon/70">
          {label}
        </span>
        <span className="truncate font-display text-base font-bold text-mp-ink md:text-lg">
          {value}
        </span>
      </div>

      <button
        type="button"
        onClick={onCopy}
        aria-label={`Copiar ${label}`}
        className="inline-flex h-11 shrink-0 items-center gap-2 rounded-md border border-mp-line px-3 font-display text-[11px] font-semibold uppercase tracking-[0.08em] text-mp-ink transition-colors hover:border-mp-ink"
      >
        {copied ? (
          <>
            <Check weight="bold" className="h-4 w-4 text-mp-orange" aria-hidden="true" />
            Copiado
          </>
        ) : (
          <>
            <Copy weight="regular" className="h-4 w-4" aria-hidden="true" />
            Copiar
          </>
        )}
      </button>
    </div>
  );
}
