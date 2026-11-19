"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);
}

export { gsap, ScrollTrigger, SplitText, useGSAP };

export const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Resolves once the preloader has finished (or immediately if it already has). */
export function onIntroDone(cb: () => void) {
  if (typeof window === "undefined") return () => {};
  const w = window as Window & { __introDone?: boolean };
  if (w.__introDone) {
    cb();
    return () => {};
  }
  const handler = () => cb();
  window.addEventListener("intro:done", handler, { once: true });
  return () => window.removeEventListener("intro:done", handler);
}
