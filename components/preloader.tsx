"use client";

import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";

function finish() {
  document.documentElement.classList.remove("is-loading");
  (window as Window & { __introDone?: boolean }).__introDone = true;
  // Dispatch outside this GSAP context so listeners' selectors resolve in their own scope.
  setTimeout(() => window.dispatchEvent(new Event("intro:done")), 0);
  window.__lenis?.start();
}

/** Counter 000 → 100, then the panel lifts away like a curtain. */
export function Preloader() {
  const root = useRef<HTMLDivElement>(null);
  const num = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) {
        root.current!.style.display = "none";
        finish();
        return;
      }
      window.__lenis?.stop();
      const counter = { v: 0 };
      const tl = gsap.timeline();
      tl.to(counter, {
        v: 100,
        duration: 1.8,
        ease: "power3.inOut",
        onUpdate: () => {
          num.current!.textContent = String(Math.round(counter.v)).padStart(3, "0");
        },
      })
        .to(".pl-bar", { scaleX: 1, duration: 1.8, ease: "power3.inOut" }, 0)
        .to(".pl-fade", { opacity: 0, y: -20, duration: 0.5, ease: "power2.in", stagger: 0.05 })
        .to(root.current, {
          clipPath: "inset(0 0 100% 0)",
          duration: 1.1,
          ease: "expo.inOut",
          onStart: finish,
        })
        .set(root.current, { display: "none" });
    },
    { scope: root },
  );

  return (
    <div
      ref={root}
      aria-hidden
      className="fixed inset-0 z-[100] flex flex-col justify-between bg-ink-2 p-5 md:p-10"
      style={{ clipPath: "inset(0 0 0% 0)" }}
    >
      <div className="pl-fade flex justify-between font-mono text-xs uppercase tracking-widest text-mute">
        <span>Alan Douglas</span>
        <span>Portfolio ©2026</span>
      </div>
      <div className="flex items-end justify-between">
        <p className="pl-fade serif max-w-xs text-2xl italic text-mute md:text-3xl">
          Products, built properly.
        </p>
        <span
          ref={num}
          className="pl-fade font-sans text-[22vw] font-medium leading-[0.8] tracking-tighter tabular-nums md:text-[14vw]"
        >
          000
        </span>
      </div>
      <div className="pl-fade absolute inset-x-0 bottom-0 h-px bg-line">
        <div className="pl-bar h-full origin-left scale-x-0 bg-ember" />
      </div>
    </div>
  );
}
