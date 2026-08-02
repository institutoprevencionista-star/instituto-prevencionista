import Link from "next/link";
import { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "white" | "outline-white";

const VARIANT_CLASSES: Record<Variant, string> = {
  primary:
    "bg-brand-green-700 text-white hover:bg-brand-green-900 focus-visible:outline-brand-green-700",
  secondary:
    "bg-brand-gold-500 text-brand-black hover:bg-brand-gold-400 focus-visible:outline-brand-gold-500",
  ghost:
    "bg-transparent text-brand-green-700 border border-brand-green-700 hover:bg-brand-green-700 hover:text-white",
  white:
    "bg-white text-brand-green-900 hover:bg-white/90 focus-visible:outline-white",
  "outline-white":
    "bg-transparent text-white border border-white/50 hover:bg-white hover:text-brand-green-900 focus-visible:outline-white",
};

const BASE_CLASSES =
  "inline-flex items-center justify-center rounded-md px-5 py-2.5 text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className = "",
  target,
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
  target?: string;
}) {
  return (
    <Link
      href={href}
      target={target}
      rel={target === "_blank" ? "noopener noreferrer" : undefined}
      className={`${BASE_CLASSES} ${VARIANT_CLASSES[variant]} ${className}`}
    >
      {children}
    </Link>
  );
}

export function Button({
  children,
  variant = "primary",
  className = "",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }) {
  return (
    <button className={`${BASE_CLASSES} ${VARIANT_CLASSES[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}
