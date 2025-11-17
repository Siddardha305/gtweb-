"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

interface ButtonProps {
  href?: string;
  label: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "dark-pill" | "gradient-outline";
}

export default function Button({
  href,
  label,
  onClick,
  type = "button",
  variant = "primary",
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center gap-3 justify-center rounded-full px-5 py-2.5 font-medium transition-all duration-300";

  const variants = {
    primary:
      "text-white shadow-md hover:shadow-lg hover:opacity-95 bodder",

    "dark-pill":
      "bg-black text-white shadow-[0_4px_16px_rgba(0,0,0,0.25)] hover:shadow-[0_4px_22px_rgba(0,0,0,0.35)] hover:bg-black/90",

    "gradient-outline": `
      text-white border-2 rounded-full 
      border-transparent
      bg-gradient-to-r from-[#05d5fe] to-[#1e5de2] 
      bg-clip-border
      hover:bg-white/10
      [background-origin:border-box]
      [box-shadow:inset_0_0_0_1000px_rgba(0,0,0,0)]
      hover:[box-shadow:inset_0_0_0_1000px_rgba(255,255,255,0.08)]
    `,
  };

  const className = `${baseStyles} ${variants[variant]}`;

  const ButtonInner = () => (
    <>
      {label}

      {/* Right circular icon */}
      <span
        className="
          w-8 h-8 flex items-center justify-center rounded-full 
          bg-transparent border border-white/20 
          hover:bg-white/10 transition
        "
      >
        <ArrowUpRight size={18} />
      </span>
    </>
  );

  if (href) {
    return (
      <Link href={href} className={className}>
        <ButtonInner />
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={className}>
      <ButtonInner />
    </button>
  );
}
