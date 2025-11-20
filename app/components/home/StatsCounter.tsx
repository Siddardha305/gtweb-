// app/components/home/StatsCounter.tsx
"use client";

import { useEffect } from "react";
import type { RefObject } from "react";

type Refs = {
  statsRef: RefObject<HTMLElement | null>;
  stat1Ref: RefObject<HTMLElement | null>;
  stat2Ref: RefObject<HTMLElement | null>;
  stat3Ref: RefObject<HTMLElement | null>;
};

export default function StatsCounter({ statsRef, stat1Ref, stat2Ref, stat3Ref }: Refs) {
  useEffect(() => {
    let gsap: any = null;
    let ScrollTrigger: any = null;
    let scrollTriggerInstance: any = null;
    const tweens: any[] = [];

    (async () => {
      try {
        const gsapModule: any = await import("gsap");
        const stModule: any = await import("gsap/ScrollTrigger");

        gsap = gsapModule.default || gsapModule;
        ScrollTrigger = stModule.default || stModule.ScrollTrigger || stModule;

        if (gsap && ScrollTrigger) {
          gsap.registerPlugin(ScrollTrigger);
        }

        // If trigger node not present, skip creation
        if (!statsRef?.current || !gsap || !ScrollTrigger) return;

        scrollTriggerInstance = ScrollTrigger.create({
          trigger: statsRef.current,
          start: "top 80%",
          onEnter: () => {
            // only animate when the specific stat ref has a current element
            if (stat1Ref?.current) animate(stat1Ref, 100, "+");
            if (stat2Ref?.current) animate(stat2Ref, 24, "");
            if (stat3Ref?.current) animate(stat3Ref, 99, "%");
          },
          once: true,
        });
      } catch (err) {
        // optional: console.warn("GSAP import failed", err);
      }
    })();

    function animate(ref: RefObject<HTMLElement | null>, end: number, suffix: string) {
      // Ensure we have the element and gsap ready
      if (!ref?.current || !gsap) return;

      const obj = { value: 0 };
      const tween = gsap.to(obj, {
        value: end,
        duration: 1.4,
        ease: "power1.out",
        onUpdate: () => {
          const el = ref.current;
          if (!el) return; // guard: element might be removed mid-animation
          try {
            el.textContent = Math.floor(obj.value).toString() + suffix;
          } catch (e) {
            // ignore if something goes wrong with textContent
          }
        },
        onComplete: () => {
          const el = ref.current;
          if (!el) return;
          try {
            el.textContent = Math.floor(end).toString() + suffix;
          } catch (e) {}
        },
      });

      tweens.push(tween);
    }

    return () => {
      // kill tweens
      try {
        tweens.forEach((t) => t && t.kill && t.kill());
      } catch (e) {
        /* ignore */
      }
      // kill ScrollTrigger
      try {
        if (scrollTriggerInstance && scrollTriggerInstance.kill) scrollTriggerInstance.kill();
      } catch (e) {
        /* ignore */
      }
    };
  }, [statsRef, stat1Ref, stat2Ref, stat3Ref]);

  return null;
}
