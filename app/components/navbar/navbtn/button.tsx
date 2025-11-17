"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

interface ButtonProps {
  href?: string;
  label: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "dark-pill"; 
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
      "bg-gradient-to-r from-[#1e5de2] to-[#05d5fe] text-white shadow-md hover:shadow-lg hover:opacity-95",

    "dark-pill":
      "bg-black text-white shadow-[0_4px_16px_rgba(0,0,0,0.25)] hover:shadow-[0_4px_22px_rgba(0,0,0,0.35)] hover:bg-black/90",
  };

  const className = `${baseStyles} ${variants[variant]}`;

  const ButtonInner = () => (
    <>
      {label}

      {/* Right small circular icon */}
      <span className="w-8.5 h-8.5 flex items-center justify-center rounded-full bg-black/40 border border-white/10 hover:bg-black/60 transition">
        <ArrowUpRight size={22} />
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
