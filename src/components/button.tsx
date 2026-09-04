import Link from "next/link";
import type { ComponentProps } from "react";
import clsx from "clsx";

type Variant = "primary" | "secondary" | "ghost";

const VARIANT_CLASSES: Record<Variant, string> = {
  primary:
    "bg-gradient-to-br from-blue-600 to-cyan-500 text-white hover:opacity-90",
  secondary:
    "border border-border text-text-primary hover:border-text-secondary",
  ghost: "text-accent hover:opacity-80 px-2",
};

const BASE_CLASSES =
  "inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold transition";

type ButtonProps = {
  variant?: Variant;
  href?: string;
  className?: string;
} & ComponentProps<"button">;

export function Button({
  variant = "primary",
  href,
  className,
  children,
  ...props
}: ButtonProps) {
  const classes = clsx(BASE_CLASSES, VARIANT_CLASSES[variant], className);

  if (href) {
    const isExternal = /^https?:\/\//.test(href);

    if (isExternal) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={classes}
        >
          {children}
        </a>
      );
    }

    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
