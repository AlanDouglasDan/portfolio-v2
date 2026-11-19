"use client";

import { useRef } from "react";
import { gsap, SplitText, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { profile, stats } from "@/content/site";

export function About() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      // Statement lights up word by word as you scroll through it.
      const split = SplitText.create(".about-statement", { type: "words" });
      gsap.fromTo(
        split.words,
        { opacity: 0.12 },
        {
          opacity: 1,
          stagger: 0.1,
          ease: "none",
          scrollTrigger: { trigger: ".about-statement", start: "top 80%", end: "bottom 45%", scrub: true },
        },
      );

      // Counters.
      gsap.utils.toArray<HTMLElement>(".stat-num").forEach((el) => {
        const end = Number(el.dataset.value);
        const decimals = Number(el.dataset.decimals ?? 0);
        const obj = { v: 0 };
        gsap.to(obj, {
          v: end,
          duration: 2,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 90%", once: true },
          onUpdate: () => (el.textContent = obj.v.toFixed(decimals)),
        });
      });

      // Photo unmasks from the bottom, then drifts inside its frame.
      gsap.fromTo(
        ".about-photo",
        { clipPath: "inset(100% 0 0 0)" },
        {
          clipPath: "inset(0% 0 0 0)",
          duration: 1.6,
          ease: "expo.inOut",
          scrollTrigger: { trigger: ".about-photo", start: "top 85%" },
        },
      );
      gsap.fromTo(
        ".about-img",
        { yPercent: -15, scale: 1.15 },
        {
          yPercent: 0,
          scale: 1,
          ease: "none",
          scrollTrigger: { trigger: ".about-photo", start: "top bottom", end: "bottom top", scrub: true },
        },
      );

      gsap.from(".stat", {
        y: 60,
        opacity: 0,
        duration: 1.2,
        ease: "expo.out",
        stagger: 0.1,
        scrollTrigger: { trigger: ".stats", start: "top 85%" },
      });

      return () => split.revert();
    },
    { scope: root },
  );

  return (
    <section id="about" ref={root} className="relative px-5 py-28 md:px-10 md:py-44">
      <div className="mb-12 flex items-center gap-4 font-mono text-[11px] uppercase tracking-[0.2em] text-mute md:mb-20">
        <span className="text-ember">●</span> About
      </div>

      <p className="about-statement max-w-[22ch] text-4xl font-medium leading-[1.05] tracking-[-0.035em] sm:text-5xl md:text-7xl lg:text-[5.6vw]">
        I turn ambitious ideas into <span className="serif italic text-ember">reliable</span> products
        that people use every day and <span className="serif italic">trust with their money.</span>
      </p>

      <div className="mt-16 grid gap-10 md:mt-28 md:grid-cols-12">
        <figure className="about-photo group relative overflow-hidden rounded-2xl bg-ink-3 md:col-span-4 md:row-span-2">
          <div
            className="about-photo-inner aspect-[4/5] overflow-hidden"
            style={{ background: "radial-gradient(80% 60% at 50% 75%, rgba(255,106,61,0.35), transparent 70%)" }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element -- static export, image is pre-sized */}
            <img
              src={profile.photo}
              alt="Portrait of Alan Douglas"
              width={640}
              height={1152}
              loading="lazy"
              decoding="async"
              className="about-img h-[118%] w-full object-cover object-[50%_70%] grayscale-[35%] transition-[filter] duration-700 group-hover:grayscale-0"
            />
          </div>
          <figcaption className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full bg-black/40 px-3 py-1.5 font-mono text-[11px] uppercase tracking-widest text-paper backdrop-blur-md">
            <span className="h-1.5 w-1.5 rounded-full bg-ember" /> Lagos, NG
          </figcaption>
        </figure>
        <p className="text-lg leading-relaxed text-mute md:col-span-5 md:col-start-6 md:text-xl">
          {profile.statement}
        </p>
        <p className="text-lg leading-relaxed text-mute md:col-span-2 md:col-start-11 md:text-base">
          Founder of Suwe. CTO at Lisah. Previously Bitfinex, Jumia and Dopper.
        </p>
      </div>

      <div className="stats mt-20 grid grid-cols-2 border-t border-line md:mt-32 md:grid-cols-4">
        {stats.map((s, i) => (
          <div
            key={s.label}
            className={`stat border-line py-8 pr-4 md:py-12 ${i % 2 === 0 ? "border-r" : ""} md:border-r ${
              i === stats.length - 1 ? "md:border-r-0" : ""
            } ${i < 2 ? "border-b md:border-b-0" : ""} ${i % 2 ? "pl-4 md:pl-8" : "md:pl-8 md:first:pl-0"}`}
          >
            <div className="flex items-start text-6xl font-medium tracking-tighter tabular-nums md:text-8xl">
              <span className="stat-num" data-value={s.value} data-decimals={s.decimals ?? 0}>
                {s.decimals ? s.value.toFixed(s.decimals) : s.value}
              </span>
              <span className="ml-1 mt-2 text-2xl text-ember md:text-4xl">{s.suffix}</span>
            </div>
            <p className="mt-3 max-w-[18ch] text-sm text-mute">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
