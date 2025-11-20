// app/components/navbar/navlogo/logo.tsx
"use client";

import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <Link
      href="/"
      aria-label="Go to homepage"         
      className="flex items-center gap-2 transition-transform duration-200"
    >
      <Image
        src="/gt-logo.webp"
        alt="GT Website Logo"
        width={50}
        height={50}
        priority
      />
      <span className="text-lg font-semibold bg-gradient-to-r from-[#05d5fe] to-[#1e5de2] bg-clip-text text-transparent">
         GTwebdevelopers
      </span>
    </Link>
  );
}
