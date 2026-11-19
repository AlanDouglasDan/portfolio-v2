"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger, useGSAP, onIntroDone } from "@/lib/gsap";
import { profile } from "@/content/site";
import { Magnetic } from "./magnetic";

const items = [
  { href: "#work", label: "Work" },
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
];

function useLocalTime(tz: string) {
  const [time, setTime] = useState("");
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", { timeZone: tz, hour: "2-digit", minute: "2-digit" });
    const update = () => setTime(fmt.format(new Date()));
    update();
    const id = setInterval(update, 15_000);
    return () => clearInterval(id);
  }, [tz]);
  return time;
}

export function Nav() {
  const root = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);
  const time = useLocalTime(profile.timezone);

  useGSAP(
    (_ctx, contextSafe) => {
      gsap.set(".nav-in", { yPercent: 120 });
      const off = onIntroDone(
        contextSafe!(() => {
          gsap.to(".nav-in", { yPercent: 0, duration: 1.2, ease: "expo.out", stagger: 0.06, delay: 0.5 });
        }),
      );

      // Hide on scroll down, reveal on scroll up.
      const st = ScrollTrigger.create({
        start: 200,
        end: "max",
        onUpdate: (self) => {
          gsap.to(root.current, {
            yPercent: self.direction === 1 ? -110 : 0,
            duration: 0.6,
            ease: "expo.out",
            overwrite: true,
          });
        },
        onLeaveBack: () => gsap.to(root.current, { yPercent: 0, duration: 0.6, overwrite: true }),
      });
      return () => {
        off();
        st.kill();
      };
    },
    { scope: root },
  );

  // Full-screen menu on small screens.
  useGSAP(() => {
    gsap.to(".menu-panel", {
      clipPath: open ? "inset(0% 0 0 0)" : "inset(0 0 100% 0)",
      duration: 0.9,
      ease: "expo.inOut",
    });
    if (open) {
      gsap.fromTo(
        ".menu-link",
        { yPercent: 110 },
        { yPercent: 0, duration: 1, ease: "expo.out", stagger: 0.06, delay: 0.35 },
      );
      window.__lenis?.stop();
    } else {
      window.__lenis?.start();
    }
  }, [open]);

  return (
    <>
      <header
        ref={root}
        className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-5 py-5 mix-blend-difference md:px-10"
      >
        <a href="#top" className="overflow-hidden" aria-label="Back to top">
          <span className="nav-in block font-medium tracking-tight">
            Alan Douglas<span className="text-ember">.</span>
          </span>
        </a>

        <div className="hidden overflow-hidden font-mono text-xs uppercase tracking-widest text-mute lg:block">
          <span className="nav-in flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ember opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-ember" />
            </span>
            Lagos {time}
          </span>
        </div>

        <nav className="hidden gap-8 text-sm md:flex">
          {items.map((i) => (
            <span key={i.href} className="overflow-hidden">
              <a href={i.href} className="nav-in u-link block">
                {i.label}
              </a>
            </span>
          ))}
        </nav>

        <button
          type="button"
          className="relative z-50 overflow-hidden text-sm md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="nav-in block">{open ? "Close" : "Menu"}</span>
        </button>
      </header>

      <div
        id="mobile-menu"
        className="menu-panel fixed inset-0 z-40 flex flex-col justify-between bg-ink-2 px-5 pb-10 pt-28 md:hidden"
        style={{ clipPath: "inset(0 0 100% 0)" }}
        aria-hidden={!open}
      >
        <ul className="space-y-2">
          {items.map((i, n) => (
            <li key={i.href} className="overflow-hidden">
              <a
                href={i.href}
                onClick={() => setOpen(false)}
                tabIndex={open ? 0 : -1}
                className="menu-link flex items-baseline gap-4 text-6xl font-medium tracking-tighter"
              >
                <span className="font-mono text-xs text-mute">0{n + 1}</span>
                {i.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex gap-6 text-sm text-mute">
          {profile.links.map((l) => (
            <Magnetic key={l.label}>
              <a href={l.href} tabIndex={open ? 0 : -1} target="_blank" rel="noreferrer">
                {l.label}
              </a>
            </Magnetic>
          ))}
        </div>
      </div>
    </>
  );
}
