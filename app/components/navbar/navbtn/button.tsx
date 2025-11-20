// app/components/navbar/navbtn/button.tsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export type ButtonProps = {
  href?: string;
  label: string;
  onClick?: (e?: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "dark-pill";
  disabled?: boolean;
  loading?: boolean;        // optional: use to show loading UI
  className?: string;       // allow parent to pass full-width etc.
};

export default function Button({
  href,
  label,
  onClick,
  type = "button",
  variant = "primary",
  disabled = false,
  loading = false,
  className = "",
}: ButtonProps) {
  const [animate, setAnimate] = useState(false);

  // Default button styles
  const baseStyles =
    "inline-flex items-center gap-5 justify-center rounded-full px-3 py-2.5 font-medium transition-all duration-300";

  // Variants (your theme)
  const variants: Record<string, string> = {
    primary:
      "bg-gradient-to-r from-[#1e5de2] to-[#05d5fe] text-white shadow-md hover:shadow-lg hover:opacity-95",
    "dark-pill":
      "bg-black text-white shadow-[0_4px_16px_rgba(0,0,0,0.25)] hover:shadow-[0_4px_22px_rgba(0,0,0,0.35)] hover:bg-black/90",
  };

  // disabled styles (subtle)
  const disabledStyles = disabled ? "opacity-60 cursor-not-allowed pointer-events-none" : "";

  const classes = `${baseStyles} ${variants[variant] ?? variants.primary} ${disabledStyles} ${className}`.trim();

  // Click → trigger diagonal arrow animation, unless disabled or loading
  const handleClick = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    if (disabled || loading) {
      e.preventDefault();
      return;
    }

    setAnimate(true);
    onClick?.(e);

    // reset after animation
    setTimeout(() => setAnimate(false), 300);
  };

  const Arrow = () => (
    <span
      className="w-8.5 h-8.5 flex items-center justify-center rounded-full bg-black/40 border border-white/10"
      aria-hidden
    >
      <span
        className={`
          inline-block transition-transform duration-200 ease-out
          ${animate ? "translate-x-1 -translate-y-1" : ""}
        `}
        style={{ willChange: "transform" }}
      >
        <ArrowUpRight size={22} />
      </span>
    </span>
  );

  // Button inner content — supports loading state
  const ButtonInner = () => (
    <>
      <span className="flex items-center gap-3">
        <span className="leading-none">
          {loading ? (typeof loading === "boolean" ? "Sending..." : loading) : label}
        </span>
        <Arrow />
      </span>
    </>
  );

  // If button is a link
  if (href) {
    // Note: Next.js Link supports className; use aria-disabled when disabled.
    return (
      // eslint-disable-next-line jsx-a11y/anchor-is-valid
      <Link
        href={href}
        className={classes}
        onClick={handleClick}
        aria-disabled={disabled || loading ? "true" : undefined}
      >
        <ButtonInner />
      </Link>
    );
  }

  // Regular button (works inside forms)
  return (
    <button
      type={type}
      onClick={handleClick}
      className={classes}
      disabled={disabled || loading}
      aria-pressed="false"
    >
      <ButtonInner />
    </button>
  );
}
