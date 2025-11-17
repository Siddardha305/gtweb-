"use client";

import React from "react";
import Button from "../navbar/navbtn/button";
import ButtonOutline from "../navbar/navbtn/button-outline";

export default function Hero1() {
  return (
    <section className="w-full px-4 py-24">
      <div className="mx-auto max-w-6xl flex flex-col-reverse lg:flex-row items-center gap-10">
        {/* Left: Text */}
        <div className="w-full lg:w-1/2 text-center lg:text-left">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight mb-4">
            Grow with Power: Strategic Websites & Digital Marketing That Convert.
          </h1>

          <p className="text-white/80 text-lg sm:text-xl mb-8 max-w-2xl mx-auto lg:mx-0">
            We are a creative digital agency built for businesses, creators, and
            startups who want to stand out, scale up, and succeed online.
          </p>

          <div className="flex flex-col sm:flex-row items-center sm:items-start sm:justify-start gap-4">
            {/* Primary CTA */}
            <Button
              label="For Growth Strategy"
              href="/contact"
              variant="primary"
            />

            {/* Secondary CTA */}
            <ButtonOutline
              label="View Our Proven Results"
              href="/our-work"
            />
          </div>
        </div>

        {/* Right: Illustration */}
        <div className="w-full lg:w-1/2 flex items-center justify-center">
          <div
            className="
              w-[360px] h-[260px] rounded-2xl
              bg-gradient-to-br from-white/6 via-white/3 to-white/5
              backdrop-blur-2xl border border-white/10 shadow-xl
              flex items-center justify-center
            "
          >
            <div className="text-center">
              <div className="mb-4">
                <svg width="120" height="80" viewBox="0 0 120 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="120" height="80" rx="14" fill="rgba(255,255,255,0.06)"/>
                  <rect x="8" y="12" width="104" height="12" rx="4" fill="rgba(255,255,255,0.09)"/>
                  <rect x="8" y="34" width="104" height="6" rx="3" fill="rgba(255,255,255,0.06)"/>
                  <rect x="8" y="46" width="70" height="18" rx="6" fill="rgba(255,255,255,0.08)"/>
                </svg>
              </div>
              <div className="text-sm text-white/80">Website & Growth Mockup</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
