"use client";

import React from "react";
import Button from "../navbar/navbtn/button";

export default function CtaCard() {
  return (
    <section className="w-full flex justify-center px-4 py-16">
      <div
        className="
          max-w-2xl w-full rounded-3xl p-10 
          bg-white/10 backdrop-blur-xl 
          border border-white/20 shadow-xl 
          text-center
        "
      >
        {/* Headline */}
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 leading-tight">
          Ready to Stop Wishing and Start Growing?
        </h2>

        {/* Body */}
        <p className="text-white/90 text-lg mb-8">
          Let's discuss your unique business challenge. We'll craft a personalized 
          digital strategy designed to maximize your visibility and revenue.
        </p>

        {/* CTA Button using your component */}
        <div className="flex justify-center">
          <Button
            label="→ Schedule Your Free Strategy Session"
            href="/contact"
            variant="primary"
          />
        </div>
      </div>
    </section>
  );
}
