"use client";

import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { capabilities } from "@/content/site";

/**
 * Sticky cards that stack. Each card is sized to its content and gets its own
 * stretch of scroll, so it is fully readable before the next one slides over.
 * Only once the next card is nearly on top does the previous one recede (a
 * gentle scale plus a light shade, never a full blackout).
 */
export function Capabilities() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const cards = gsap.utils.toArray<HTMLElement>(".cap-card");
      cards.forEach((card, i) => {
        const next = cards[i + 1];
        if (!next) return;
        const range = {
          trigger: next,
          start: "top 55%",
          end: () => `top ${card.getBoundingClientRect().height * 0.25 + 96}px`,
          scrub: true,
          invalidateOnRefresh: true,
        };
        gsap.to(card.querySelector(".cap-inner"), { scale: 0.94, ease: "none", scrollTrigger: range });
        gsap.to(card.querySelector(".cap-shade"), { opacity: 0.35, ease: "none", scrollTrigger: range });
      });

      gsap.from(".cap-head > *", {
        y: 50,
        opacity: 0,
        duration: 1.2,
        ease: "expo.out",
        stagger: 0.08,
        scrollTrigger: { trigger: ".cap-head", start: "top 80%" },
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="relative px-5 py-28 md:px-10 md:py-40">
      <div className="cap-head mb-16 grid gap-6 md:mb-24 md:grid-cols-12">
        <div className="flex items-center gap-4 font-mono text-[11px] uppercase tracking-[0.2em] text-mute md:col-span-3">
          <span className="text-ember">●</span> What I do
        </div>
        <h2 className="text-5xl font-medium leading-[0.95] tracking-[-0.045em] md:col-span-9 md:text-7xl">
          From the backend to the <span className="serif italic text-ember">lock screen</span>.
        </h2>
      </div>

      <div className="space-y-[18vh] md:space-y-[28vh]">
        {capabilities.map((c, i) => (
          <div key={c.no} className="cap-card sticky" style={{ top: `calc(6rem + ${i * 1.5}rem)` }}>
            <div className="cap-inner relative origin-top overflow-hidden rounded-3xl border border-line bg-ink-3 p-6 shadow-[0_-24px_60px_-20px_rgba(0,0,0,0.6)] will-change-transform md:p-12">
              <div className="flex items-start justify-between gap-6">
                <h3 className="text-4xl font-medium tracking-[-0.04em] md:text-7xl">{c.title}</h3>
                <span className="serif text-5xl italic text-ember md:text-8xl">{c.no}</span>
              </div>
              <div className="mt-8 grid gap-8 md:mt-16 md:grid-cols-12">
                <p className="text-lg leading-relaxed text-paper/75 md:col-span-6 md:text-2xl md:leading-snug">
                  {c.body}
                </p>
                <ul className="grid grid-cols-2 gap-x-6 gap-y-3 self-end md:col-span-5 md:col-start-8">
                  {c.items.map((it) => (
                    <li key={it} className="flex items-center gap-3 border-t border-line pt-3 text-sm">
                      <span className="h-1 w-1 rounded-full bg-ember" />
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
              <div aria-hidden className="cap-shade pointer-events-none absolute inset-0 bg-black opacity-0" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
