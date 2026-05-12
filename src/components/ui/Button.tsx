import Link from "next/link";
import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "lg";

const VARIANT_CLASSES: Record<Variant, string> = {
  primary:
    "bg-mp-ink text-mp-canvas hover:bg-mp-carbon active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-mp-orange mp-cta-ring",
  secondary:
    "bg-transparent text-mp-ink border border-mp-ink hover:bg-mp-ink hover:text-mp-canvas active:scale-[0.98]",
  ghost:
    "bg-transparent text-mp-ink hover:text-mp-amber active:scale-[0.98]",
};

const SIZE_CLASSES: Record<Size, string> = {
  md: "px-5 py-2.5 text-xs",
  lg: "px-7 py-4 text-sm",
};

const BASE_CLASSES =
  "inline-flex items-center justify-center gap-2 rounded-md font-display font-semibold uppercase tracking-[0.08em] transition-all duration-200 disabled:opacity-50 disabled:pointer-events-none";

interface ButtonOwnProps {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  className?: string;
}

type ButtonAsButton = ButtonOwnProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonOwnProps> & {
    href?: undefined;
  };

type ButtonAsLink = ButtonOwnProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof ButtonOwnProps> & {
    href: string;
  };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

export function Button(props: ButtonProps) {
  const {
    variant = "primary",
    size = "md",
    className,
    children,
    ...rest
  } = props;

  const classes = cn(
    BASE_CLASSES,
    VARIANT_CLASSES[variant],
    SIZE_CLASSES[size],
    className,
  );

  if ("href" in rest && rest.href !== undefined) {
    const { href, ...anchorProps } = rest as ButtonAsLink;
    const isExternal = /^https?:\/\//.test(href);
    if (isExternal) {
      return (
        <a
          href={href}
          target={anchorProps.target ?? "_blank"}
          rel={anchorProps.rel ?? "noopener noreferrer"}
          {...anchorProps}
          className={classes}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} {...anchorProps} className={classes}>
        {children}
      </Link>
    );
  }

  const buttonProps = rest as ButtonAsButton;
  return (
    <button {...buttonProps} className={classes}>
      {children}
    </button>
  );
}
