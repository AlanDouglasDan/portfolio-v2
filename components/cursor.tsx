"use client";

import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

/**
 * Blend-mode dot that trails the pointer and grows over interactive elements.
 * Elements with data-cursor="Label" show that label inside the cursor.
 */
export function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!fine || prefersReducedMotion()) return;

    const el = dot.current!;
    el.style.display = "flex";
    document.documentElement.classList.add("has-cursor");
    gsap.set(el, { xPercent: -50, yPercent: -50, opacity: 0 });
    const xTo = gsap.quickTo(el, "x", { duration: 0.45, ease: "power3" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.45, ease: "power3" });

    let shown = false;
    const move = (e: PointerEvent) => {
      if (!shown) {
        gsap.set(el, { x: e.clientX, y: e.clientY });
        gsap.to(el, { opacity: 1, duration: 0.3 });
        shown = true;
      }
      xTo(e.clientX);
      yTo(e.clientY);
    };

    const over = (e: PointerEvent) => {
      const t = (e.target as HTMLElement).closest<HTMLElement>("a, button, [data-cursor]");
      const text = t?.dataset.cursor;
      if (text) {
        label.current!.textContent = text;
        gsap.to(el, { width: 96, height: 96, duration: 0.5, ease: "expo.out" });
        gsap.to(label.current, { opacity: 1, duration: 0.3 });
        el.style.mixBlendMode = "normal";
        el.style.background = "var(--color-ember)";
      } else if (t) {
        gsap.to(el, { width: 56, height: 56, duration: 0.5, ease: "expo.out" });
        gsap.to(label.current, { opacity: 0, duration: 0.2 });
        el.style.mixBlendMode = "difference";
        el.style.background = "var(--color-paper)";
      } else {
        gsap.to(el, { width: 12, height: 12, duration: 0.5, ease: "expo.out" });
        gsap.to(label.current, { opacity: 0, duration: 0.2 });
        el.style.mixBlendMode = "difference";
        el.style.background = "var(--color-paper)";
      }
    };
    const leave = () => gsap.to(el, { opacity: 0, duration: 0.3 }).then(() => (shown = false));

    window.addEventListener("pointermove", move);
    window.addEventListener("pointerover", over);
    document.documentElement.addEventListener("pointerleave", leave);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", over);
      document.documentElement.removeEventListener("pointerleave", leave);
      document.documentElement.classList.remove("has-cursor");
    };
  }, []);

  return (
    <div
      ref={dot}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[90] hidden h-3 w-3 items-center justify-center rounded-full bg-paper mix-blend-difference"
    >
      <span
        ref={label}
        className="font-mono text-[11px] uppercase tracking-wider text-ink opacity-0"
      />
    </div>
  );
}
