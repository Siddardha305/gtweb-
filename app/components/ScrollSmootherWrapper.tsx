// components/ScrollSmootherWrapper.tsx
"use client";
import React, { useEffect } from "react";

export default function ScrollSmootherWrapper({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    let smoother: any = null;

    (async () => {
      if (typeof window === "undefined") return;

      // dynamic imports are SSR-safe
      const gsapModule = await import("gsap");
      const gsap = gsapModule.gsap ?? gsapModule.default ?? gsapModule;
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      // Try to import ScrollSmoother; if missing you'll get an error you can catch
      const { ScrollSmoother } = await import("gsap/ScrollSmoother");

      gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

      // create smoother
      smoother = ScrollSmoother.create({
        wrapper: "#smooth-wrapper",
        content: "#smooth-content",
        smooth: 1.8,           // strength of smoothing (0 = no smoothing)
        effects: true,        // enable data-speed/data-lag effects on children
        normalizeScroll: true // optional, helps on some devices
      });

      // optional: expose for debugging
      (window as any)._smoother = smoother;
    })().catch((err) => {
      console.warn("ScrollSmoother import failed (maybe it's not installed/available):", err);
    });

    return () => {
      // cleanup
      try {
        if (smoother) {
          smoother.kill();
          // also kill ScrollTrigger instances
          const gsapModule = (window as any).gsap;
          if (gsapModule && gsapModule.ScrollTrigger) {
            gsapModule.ScrollTrigger.getAll().forEach((st: any) => st.kill());
          }
        }
      } catch (e) { /* ignore */ }
    };
  }, []);

  // we render the wrapper & content here — put this near top-level (e.g., in root layout)
  return (
    <div id="smooth-wrapper">
      <div id="smooth-content">{children}</div>
    </div>
  );
}
