"use client";

import React, { useRef } from "react";
import HeroContent from "./HeroContent";
import HeroStats from "./HeroStats";
import StatsCounter from "./StatsCounter";

export default function Hero1() {
  const headingRef = useRef(null);
  const primaryBtnRef = useRef(null);
  const statsRef = useRef(null);
  const stat1Ref = useRef(null);
  const stat2Ref = useRef(null);
  const stat3Ref = useRef(null);

  // run counter inside here
  StatsCounter({ statsRef, stat1Ref, stat2Ref, stat3Ref });

  return (
    <section className="w-full px-4 py-24 relative min-h-screen flex items-center justify-center hero-section">
      
      {/* BACKGROUND */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0b1220] via-[#0c1630] to-[#0b1230]" />
      </div>

      <div className="max-w-5xl mx-auto flex flex-col items-center gap-12">
        <HeroContent headingRef={headingRef} primaryBtnRef={primaryBtnRef} />
        <HeroStats
          statsRef={statsRef}
          stat1Ref={stat1Ref}
          stat2Ref={stat2Ref}
          stat3Ref={stat3Ref}
        />
      </div>

    </section>
  );
}
