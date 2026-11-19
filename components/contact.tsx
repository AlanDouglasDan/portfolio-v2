"use client";

import { useRef, useState } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { profile } from "@/content/site";
import { Magnetic } from "./magnetic";

export function Contact() {
  const root = useRef<HTMLElement>(null);
  const [copied, setCopied] = useState(false);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      // Content rises from beneath the previous section, like a curtain lifting.
      gsap.from(".ct-inner", {
        yPercent: -35,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top bottom", end: "top top", scrub: true },
      });
      gsap.fromTo(
        ".ct-big",
        { xPercent: 12 },
        {
          xPercent: -12,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom bottom", scrub: true },
        },
      );
    },
    { scope: root },
  );

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  return (
    <section id="contact" ref={root} className="relative overflow-hidden bg-ink-2">
      <div className="ct-inner flex min-h-svh flex-col justify-between px-5 pb-8 pt-28 md:px-10 md:pb-10">
        <div className="flex items-center gap-4 font-mono text-[11px] uppercase tracking-[0.2em] text-mute">
          <span className="text-ember">●</span> Contact
        </div>

        <div className="my-16">
          <p className="ct-big whitespace-nowrap text-[18vw] font-medium leading-[0.85] tracking-[-0.06em] will-change-transform">
            Let&rsquo;s build <span className="serif italic text-ember">something</span>
          </p>

          <div className="mt-12 flex flex-col items-start gap-10 md:mt-16 md:flex-row md:items-center md:justify-between">
            <p className="max-w-[34ch] text-lg text-mute md:text-xl">
              Building a product, hiring an engineering lead, or need an app shipped properly?
              Say hello.
            </p>
            <div className="flex items-center gap-4">
              <Magnetic strength={0.4}>
                <a
                  href={`mailto:${profile.email}`}
                  data-cursor="Write"
                  className="group relative flex h-36 w-36 items-center justify-center overflow-hidden rounded-full bg-ember text-ink md:h-44 md:w-44"
                >
                  <span className="absolute inset-0 translate-y-full rounded-full bg-paper transition-transform duration-700 ease-[var(--ease-expo)] group-hover:translate-y-0" />
                  <span className="relative text-sm font-medium uppercase tracking-widest">Get in touch</span>
                </a>
              </Magnetic>
              <button
                type="button"
                onClick={copy}
                className="rounded-full border border-line px-5 py-3 text-sm transition-colors duration-500 hover:border-paper"
              >
                {copied ? "Copied ✓" : "Copy email"}
              </button>
            </div>
          </div>
        </div>

        <footer className="grid gap-6 border-t border-line pt-6 text-sm text-mute md:grid-cols-12">
          <div className="md:col-span-4">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em]">Email</p>
            <a href={`mailto:${profile.email}`} className="u-link mt-2 inline-block text-paper">
              {profile.email}
            </a>
          </div>
          <div className="md:col-span-4">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em]">Elsewhere</p>
            <div className="mt-2 flex gap-5">
              {profile.links
                .filter((l) => l.label !== "Email")
                .map((l) => (
                  <a key={l.label} href={l.href} target="_blank" rel="noreferrer" className="u-link text-paper">
                    {l.label}
                  </a>
                ))}
            </div>
          </div>
          <div className="flex items-end justify-between md:col-span-4">
            <p>© {new Date().getFullYear()} Alan Douglas</p>
            <a href="#top" className="u-link text-paper">
              Back to top ↑
            </a>
          </div>
        </footer>
      </div>
    </section>
  );
}
