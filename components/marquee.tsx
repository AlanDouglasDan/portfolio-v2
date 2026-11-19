"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { marquee } from "@/content/site";

function Row({ outline }: { outline?: boolean }) {
  return (
    <div className="flex overflow-hidden">
      <div className="mq-track flex shrink-0 whitespace-nowrap will-change-transform">
        {[0, 1].map((k) => (
          <div key={k} className="flex shrink-0 items-center" aria-hidden={k === 1}>
            {marquee.map((w) => (
              <span key={w} className="flex items-center">
                <span
                  className={`px-6 text-5xl font-medium tracking-tighter md:px-10 md:text-8xl ${
                    outline ? "serif italic text-transparent [-webkit-text-stroke:1px_var(--color-mute)]" : ""
                  }`}
                >
                  {w}
                </span>
                <span className="text-2xl text-ember md:text-4xl">✦</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/** Two counter-running rows that speed up and flip direction with scroll velocity. */
export function Marquee() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const rows = gsap.utils.toArray<HTMLElement>(".mq-track");
      const tweens = rows.map((row, i) =>
        gsap.fromTo(
          row,
          { xPercent: i % 2 ? -50 : 0 },
          { xPercent: i % 2 ? 0 : -50, duration: 40, ease: "none", repeat: -1 },
        ),
      );

      let dir = 1;
      const st = ScrollTrigger.create({
        trigger: root.current,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
          dir = self.direction;
          const boost = 1 + Math.min(Math.abs(self.getVelocity()) / 300, 8);
          tweens.forEach((t) =>
            gsap.to(t, { timeScale: boost * dir, duration: 0.2, overwrite: true }),
          );
          gsap.to(".mq-track", {
            skewX: gsap.utils.clamp(-12, 12, self.getVelocity() / -200),
            duration: 0.3,
            overwrite: "auto",
          });
        },
      });

      // Ease back to cruising speed when scrolling stops.
      const settle = () => {
        tweens.forEach((t) => gsap.to(t, { timeScale: dir, duration: 1, ease: "power2.out" }));
        gsap.to(".mq-track", { skewX: 0, duration: 0.8, ease: "power3.out" });
      };
      ScrollTrigger.addEventListener("scrollEnd", settle);

      return () => {
        st.kill();
        ScrollTrigger.removeEventListener("scrollEnd", settle);
      };
    },
    { scope: root },
  );

  return (
    <div ref={root} className="relative space-y-2 border-y border-line py-10 md:space-y-4 md:py-16">
      <Row />
      <Row outline />
    </div>
  );
}
