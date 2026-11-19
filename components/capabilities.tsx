"use client";

import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { capabilities } from "@/content/site";

/** Sticky cards that stack; each one recedes as the next slides over it. */
export function Capabilities() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const cards = gsap.utils.toArray<HTMLElement>(".cap-card");
      cards.forEach((card, i) => {
        const next = cards[i + 1];
        if (!next) return;
        gsap.to(card.querySelector(".cap-inner"), {
          scale: 0.9,
          filter: "brightness(0.45)",
          ease: "none",
          scrollTrigger: { trigger: next, start: "top bottom", end: "top 15%", scrub: true },
        });
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
          From the ledger to the <span className="serif italic text-ember">lock screen</span>.
        </h2>
      </div>

      <div className="space-y-6 md:space-y-0">
        {capabilities.map((c, i) => (
          <div
            key={c.no}
            className="cap-card sticky md:h-[78vh]"
            style={{ top: `calc(5.5rem + ${i * 1.25}rem)` }}
          >
            <div className="cap-inner flex h-full origin-top flex-col justify-between gap-10 rounded-3xl border border-line bg-ink-3 p-6 will-change-transform md:p-12">
              <div className="flex items-start justify-between gap-6">
                <h3 className="text-4xl font-medium tracking-[-0.04em] md:text-7xl">{c.title}</h3>
                <span className="serif text-5xl italic text-ember md:text-8xl">{c.no}</span>
              </div>
              <div className="grid gap-8 md:grid-cols-12">
                <p className="text-lg leading-relaxed text-mute md:col-span-6 md:text-2xl md:leading-snug">
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
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
