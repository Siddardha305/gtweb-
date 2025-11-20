"use client";

import React from "react";
import Button from "../navbar/navbtn/button";

export default function HeroContent({ headingRef, primaryBtnRef }: any) {
  return (
    <div className="w-full text-center mt-17"> 
      <h1
        ref={headingRef}
        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
      >
        Grow Online with <br /> {" "}
        <span
          className="animate-gradient"
          style={{
            background: "linear-gradient(90deg,#05d5fe,#1e5de2,#05d5fe)",
            backgroundSize: "200% 200%",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          Powerful Websites
        </span>{" "}
        &<br /> Strategic{" "}
        <span
          className="animate-gradient"
          style={{
            background: "linear-gradient(90deg,#05d5fe,#1e5de2,#05d5fe)",
            backgroundSize: "200% 200%",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          Digital Marketing
        </span>
      </h1>

      <p className="text-white/80 max-w-2xl mx-auto mb-8 text-lg">
        GT Web & Design helps businesses, creators, and startups grow with
        high-performance websites, strong branding, and results-driven
        digital marketing built to convert and scale.
      </p>

      <div className="flex justify-center">
        <div ref={primaryBtnRef}>
          <Button
            label="Start Your Project"
            href="/contact"
            variant="primary"
          />
        </div>
      </div>
    </div>
  );
}
