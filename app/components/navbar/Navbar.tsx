// app/components/navbar/index.tsx
"use client";

import React, { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

import Logo from "../navbar/navlogo/logo";
import NavTabs from "../navbar/navtabs/navtabs";
import Button from "../navbar/navbtn/button";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-4 z-50 transition-all pointer-events-auto ${
        isScrolled ? "shadow-sm" : "bg-transparent"
      }`}
      aria-label="Main navigation"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">

          {/* LEFT: Logo */}
          <div className="flex items-center gap-2">
            <Logo />
          </div>

          {/* CENTER: NavTabs */}
          <div className="hidden md:flex">
            <NavTabs />
          </div>

          {/* RIGHT: Contact Button */}
          <div className="hidden md:flex">
            <Button label="Contact" href="/contact" variant="primary" />
          </div>

          {/* MOBILE: Hamburger Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation menu"
            className="md:hidden p-2 rounded-md hover:bg-gray-100"
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* MOBILE DROPDOWN */}
        {menuOpen && (
          <div className="md:hidden mt-2 rounded-lg bg-white shadow-md p-4">
            <NavTabs />
            <div className="mt-3">
              <Button label="Contact" href="/contact" variant="primary" />
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
