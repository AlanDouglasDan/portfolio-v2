"use client";

import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { experience } from "@/content/site";

export function Experience() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.utils.toArray<HTMLElement>(".xp-row").forEach((row) => {
        const tl = gsap.timeline({ scrollTrigger: { trigger: row, start: "top 92%" } });
        tl.from(row.querySelector(".xp-rule"), { scaleX: 0, duration: 1.4, ease: "expo.inOut" }).from(
          row.querySelectorAll(".xp-cell"),
          { yPercent: 100, opacity: 0, duration: 1, ease: "expo.out", stagger: 0.05 },
          0.25,
        );
      });
    },
    { scope: root },
  );

  return (
    <section id="experience" ref={root} className="relative px-5 py-28 md:px-10 md:py-40">
      <div className="mb-16 grid gap-6 md:mb-24 md:grid-cols-12">
        <div className="flex items-center gap-4 font-mono text-[11px] uppercase tracking-[0.2em] text-mute md:col-span-3">
          <span className="text-ember">●</span> Experience
        </div>
        <h2 className="text-5xl font-medium leading-[0.95] tracking-[-0.045em] md:col-span-9 md:text-7xl">
          Six years across <span className="serif italic text-ember">four countries</span>, all of them
          remote.
        </h2>
      </div>

      <ol>
        {experience.map((x) => (
          <li key={x.company} className="xp-row group relative">
            <div className="xp-rule h-px origin-left bg-line" />
            {/* Hover wash */}
            <div className="pointer-events-none absolute inset-0 origin-bottom scale-y-0 bg-ember transition-transform duration-500 ease-[var(--ease-expo)] group-hover:scale-y-100" />
            <div className="relative grid grid-cols-2 gap-x-4 gap-y-1 overflow-hidden py-6 transition-colors duration-500 group-hover:text-ink md:grid-cols-12 md:py-8">
              <span className="xp-cell col-span-2 text-2xl font-medium tracking-tight md:col-span-4 md:text-4xl">
                <span className="inline-block transition-transform duration-500 ease-[var(--ease-expo)] group-hover:translate-x-3">
                  {x.company}
                </span>
              </span>
              <span className="xp-cell text-sm text-mute transition-colors group-hover:text-ink/70 md:col-span-4 md:self-center md:text-base">
                {x.role}
              </span>
              <span className="xp-cell hidden text-sm text-mute transition-colors group-hover:text-ink/70 md:col-span-2 md:block md:self-center">
                {x.place}
              </span>
              <span className="xp-cell text-right font-mono text-xs uppercase tracking-widest text-mute transition-colors group-hover:text-ink/70 md:col-span-2 md:self-center">
                {x.period}
              </span>
            </div>
          </li>
        ))}
        <li className="h-px bg-line" />
      </ol>
    </section>
  );
}
