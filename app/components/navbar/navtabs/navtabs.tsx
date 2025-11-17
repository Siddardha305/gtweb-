"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState, useRef } from "react";
import { ChevronDown } from "lucide-react";

const tabs = [
  {
    name: "Services",
    href: "/services",
    subTabs: [
      { name: "LMS", href: "/services/lms" },
      { name: "Website", href: "/services/website" },
      { name: "Portfolio", href: "/services/portfolio" },
    ],
  },
  { name: "Our Work", href: "/our-work" },
  { name: "Achievements", href: "/achievements" },

  // ✅ New Tabs
  { name: "Blogs", href: "/blogs" },
  { name: "Careers", href: "/careers" },
];

export default function NavTabs() {
  const pathname = usePathname();
  const [openTab, setOpenTab] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div className="w-full bg-transparent">
      <div className="mx-auto max-w-[980px] px-4">
        <nav
          ref={containerRef}
          className="relative flex items-center justify-center"
          aria-label="Primary"
        >
          {/* 🌟 Glassmorphism Capsule */}
          <div
            className="
              flex items-center gap-3 px-3 py-2 rounded-full
              bg-white/10 
              backdrop-blur-xl 
              border border-white/10 
              shadow-[0_8px_32px_rgba(0,0,0,0.1)]
              ring-1 ring-white/20
            "
          >
            {tabs.map((tab) => {
              const isActive = pathname === tab.href;
              const hasSub = Boolean((tab as any).subTabs?.length);

              return (
                <div key={tab.name} className="relative">
                  
                  {/* Main Tab */}
                  <Link
                    href={tab.href}
                    className={`inline-flex items-center gap-2 px-5 py-2 text-sm font-medium rounded-full transition-all duration-200
                      ${
                        isActive
                          ? "bg-white/30 text-white shadow-sm backdrop-blur-md"
                          : "text-white hover:bg-white/20"
                      }
                    `}
                    onMouseEnter={() => hasSub && setOpenTab(tab.name)}
                    onMouseLeave={() => hasSub && setOpenTab(null)}
                  >
                    <span>{tab.name}</span>

                    {hasSub && (
                      <ChevronDown
                        size={14}
                        className={`text-white transition-transform duration-200 ${
                          openTab === tab.name ? "rotate-180" : ""
                        }`}
                      />
                    )}
                  </Link>

                  {/* Dropdown */}
                  {hasSub && (
                    <div
                      onMouseEnter={() => setOpenTab(tab.name)}
                      onMouseLeave={() => setOpenTab(null)}
                      className={`
                        absolute left-1/2 top-full mt-3 -translate-x-1/2 w-44 rounded-xl
                        bg-white/10 
                        backdrop-blur-2xl 
                        border border-white/30 
                        shadow-lg 
                        ring-1 ring-white/10
                        transition-all duration-300 z-30
                        ${
                          openTab === tab.name
                            ? "opacity-100 visible translate-y-0"
                            : "opacity-0 invisible -translate-y-2"
                        }
                      `}
                    >
                      {(tab as any).subTabs?.map((sub: any) => {
                        const isSubActive = pathname === sub.href;

                        return (
                          <Link
                            key={sub.name}
                            href={sub.href}
                            className={`block px-4 py-2 text-sm text-white transition-all
                              ${
                                isSubActive
                                  ? "bg-white/30 font-semibold backdrop-blur-sm"
                                  : "hover:bg-white/20"
                              }
                            `}
                          >
                            {sub.name}
                          </Link>
                        );
                      })}
                    </div>
                  )}

                </div>
              );
            })}
          </div>
        </nav>
      </div>
    </div>
  );
}
