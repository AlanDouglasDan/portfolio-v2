"use client";

import { useEffect, useRef } from "react";
import { gsap, SplitText, useGSAP, onIntroDone, prefersReducedMotion } from "@/lib/gsap";
import { profile } from "@/content/site";
import { Magnetic } from "./magnetic";

export function Hero() {
  const root = useRef<HTMLElement>(null);
  const glow = useRef<HTMLDivElement>(null);

  useGSAP(
    (_ctx, contextSafe) => {
      const reduce = prefersReducedMotion();
      const chars = SplitText.create(".hero-name", { type: "chars", charsClass: "inline-block" });
      const lines = SplitText.create(".hero-copy", { type: "lines", mask: "lines" });

      if (!reduce) {
        gsap.set(chars.chars, { yPercent: 110, rotate: 6 });
        gsap.set(lines.lines, { yPercent: 100 });
        gsap.set(".hero-fade", { opacity: 0, y: 16 });
        gsap.set(".hero-rule", { scaleX: 0 });
      }

      const off = onIntroDone(contextSafe!(() => {
        if (reduce) return;
        const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
        tl.to(chars.chars, { yPercent: 0, rotate: 0, duration: 1.6, stagger: 0.04 })
          .to(".hero-rule", { scaleX: 1, duration: 1.4, ease: "expo.inOut" }, 0.2)
          .to(lines.lines, { yPercent: 0, duration: 1.2, stagger: 0.08 }, 0.5)
          .to(".hero-fade", { opacity: 1, y: 0, duration: 1, stagger: 0.08 }, 0.7);
      }));

      if (!reduce) {
        // Scroll-out: name drifts apart and the whole hero dims as Work slides over it.
        const tl = gsap.timeline({
          scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
        });
        tl.to(".hero-line-1", { xPercent: -12, ease: "none" }, 0)
          .to(".hero-line-2", { xPercent: 10, ease: "none" }, 0)
          .to(".hero-inner", { yPercent: 25, opacity: 0.15, scale: 0.94, ease: "none" }, 0);
      }

      return () => {
        off();
        chars.revert();
        lines.revert();
      };
    },
    { scope: root },
  );

  // Ember spotlight follows the pointer.
  useEffect(() => {
    if (!window.matchMedia("(hover: hover)").matches || prefersReducedMotion()) return;
    const xTo = gsap.quickTo(glow.current, "x", { duration: 1.4, ease: "power3" });
    const yTo = gsap.quickTo(glow.current, "y", { duration: 1.4, ease: "power3" });
    const move = (e: PointerEvent) => {
      xTo(e.clientX - window.innerWidth / 2);
      yTo(e.clientY - window.innerHeight / 2);
    };
    window.addEventListener("pointermove", move);
    return () => window.removeEventListener("pointermove", move);
  }, []);

  return (
    <section
      id="top"
      ref={root}
      className="relative flex min-h-svh flex-col overflow-hidden px-5 pb-8 pt-24 md:px-10 md:pb-10"
    >
      {/* Backdrop */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div
          ref={glow}
          className="absolute left-1/2 top-1/2 h-[70vmax] w-[70vmax] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.16] blur-[120px]"
          style={{ background: "radial-gradient(circle, var(--color-ember) 0%, transparent 60%)" }}
        />
        <div className="absolute inset-0 grid grid-cols-4 md:grid-cols-12">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className={`border-r border-line/40 ${i >= 4 ? "hidden md:block" : ""}`} />
          ))}
        </div>
      </div>

      <div className="hero-inner relative flex flex-1 flex-col justify-between will-change-transform">
        <div className="hero-fade flex flex-wrap items-center justify-between gap-3 font-mono text-[11px] uppercase tracking-[0.2em] text-mute">
          <span>{profile.role}</span>
          <span className="hidden sm:inline">Portfolio / 2026</span>
          <span>{profile.location}</span>
        </div>

        <h1 className="my-6 md:my-4 select-none font-medium leading-[0.82] tracking-[-0.06em]">
          <span className="sr-only">{profile.name}</span>
          <span aria-hidden className="hero-line-1 flex items-start justify-between overflow-clip pb-[0.12em] -mb-[0.12em] text-[23vw] md:text-[min(19vw,27svh)]">
            <span className="hero-name whitespace-nowrap">Alan</span>
            <span className="serif hero-fade mt-[3vw] hidden text-[clamp(1.5rem,3.4vw,4rem)] italic leading-none tracking-normal text-ember md:block">
              (engineer,
              <br />
              founder, CTO)
            </span>
          </span>
          <span aria-hidden className="hero-line-2 line-mask block pb-[0.2em]! -mb-[0.2em]! text-right text-[23vw] md:text-[min(19vw,27svh)]">
            <span className="hero-name whitespace-nowrap">Douglas</span>
          </span>
        </h1>

        <div>
          <div className="hero-rule mb-6 h-px origin-left bg-line" />
          <div className="grid items-end gap-8 md:grid-cols-12">
            <p className="hero-copy text-xl leading-snug text-paper/90 md:col-span-6 md:text-2xl lg:col-span-5">
              {profile.intro}
            </p>
            <div className="hero-fade flex items-center gap-4 md:col-span-3 md:col-start-8">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ember opacity-60" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-ember" />
              </span>
              <span className="text-sm text-mute">{profile.available}</span>
            </div>
            <div className="hero-fade hidden justify-end md:col-span-2 md:col-start-11 md:flex">
              <Magnetic strength={0.5}>
                <a
                  href="#work"
                  className="flex h-24 w-24 items-center justify-center rounded-full border border-line text-xs uppercase tracking-widest transition-colors duration-500 hover:border-ember hover:bg-ember hover:text-ink"
                >
                  Scroll ↓
                </a>
              </Magnetic>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
