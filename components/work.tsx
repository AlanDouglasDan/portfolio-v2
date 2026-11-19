"use client";

import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { projects, type Project } from "@/content/site";

function Cover({ p, i }: { p: Project; i: number }) {
  const [a, b] = p.palette;
  return (
    <div
      className="cover relative aspect-[4/3] overflow-hidden rounded-2xl md:aspect-auto md:h-full"
      style={{ background: b }}
    >
      <div className="absolute inset-0 transition-transform duration-[1.4s] ease-[var(--ease-expo)] group-hover:scale-[1.06]">
      <div
        className="cover-art absolute inset-[-10%]"
        style={{
          background: `radial-gradient(120% 90% at 85% 10%, ${a} 0%, transparent 55%),
                       radial-gradient(90% 70% at 0% 100%, ${a}55 0%, transparent 60%),
                       ${b}`,
        }}
      />
      </div>
      {/* Fine rule grid for texture */}
      <div
        className="absolute inset-0 opacity-25"
        style={{
          backgroundImage: `linear-gradient(${a}22 1px, transparent 1px), linear-gradient(90deg, ${a}22 1px, transparent 1px)`,
          backgroundSize: "48px 48px",
        }}
      />
      <span
        className="cover-glyph serif absolute -bottom-[0.18em] right-[0.06em] text-[clamp(10rem,24vw,26rem)] italic leading-none transition-transform duration-[1.4s] ease-[var(--ease-expo)] group-hover:-translate-y-4"
        style={{ color: a, mixBlendMode: "screen" }}
      >
        {p.glyph}
      </span>
      <div className="absolute left-5 top-5 flex gap-2 md:left-7 md:top-7">
        <span className="rounded-full bg-black/30 px-3 py-1 font-mono text-[11px] uppercase tracking-widest text-paper backdrop-blur-md">
          {String(i + 1).padStart(2, "0")}
        </span>
        <span className="rounded-full bg-black/30 px-3 py-1 font-mono text-[11px] uppercase tracking-widest text-paper backdrop-blur-md">
          {p.year}
        </span>
      </div>
      <p className="absolute bottom-6 left-5 max-w-[16ch] text-2xl font-medium leading-tight tracking-tight text-paper md:bottom-8 md:left-7 md:text-4xl">
        {p.tagline}
      </p>
    </div>
  );
}

function Card({ p, i }: { p: Project; i: number }) {
  const Inner = (
    <>
      <div className="md:h-[48vh]">
        <Cover p={p} i={i} />
      </div>
      <div className="mt-6 grid gap-4 md:grid-cols-[1fr_auto]">
        <div>
          <h3 className="flex items-baseline gap-3 text-3xl font-medium tracking-tight md:text-4xl">
            {p.name}
            {p.url && (
              <span className="text-xl text-ember transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1">
                ↗
              </span>
            )}
          </h3>
          <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.2em] text-mute">{p.role}</p>
        </div>
        <p className="max-w-md text-sm leading-relaxed text-mute md:max-w-[34ch]">{p.description}</p>
      </div>
      <ul className="mt-5 flex flex-wrap gap-2">
        {p.tags.map((t) => (
          <li key={t} className="rounded-full border border-line px-3 py-1 text-xs text-mute">
            {t}
          </li>
        ))}
      </ul>
    </>
  );

  return (
    <article className="work-card group w-full shrink-0 md:w-[min(62vw,960px)]">
      {p.url ? (
        <a href={p.url} target="_blank" rel="noreferrer" data-cursor="Visit" className="block">
          {Inner}
        </a>
      ) : (
        <div data-cursor="Private">{Inner}</div>
      )}
    </article>
  );
}

export function Work() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const mm = gsap.matchMedia();

      gsap.from(".work-title-line", {
        yPercent: 110,
        duration: 1.4,
        ease: "expo.out",
        stagger: 0.08,
        scrollTrigger: { trigger: ".work-title", start: "top 80%" },
      });

      // Desktop: pin the section and translate the track sideways.
      mm.add("(min-width: 768px)", () => {
        const distance = () => track.current!.scrollWidth - window.innerWidth;
        const tween = gsap.to(track.current, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: ".work-pin",
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });

        gsap.to(".work-progress", {
          scaleX: 1,
          ease: "none",
          scrollTrigger: { trigger: ".work-pin", start: "top top", end: () => `+=${distance()}`, scrub: true },
        });

        // Covers drift against the scroll for depth.
        gsap.utils.toArray<HTMLElement>(".cover-art").forEach((el) => {
          gsap.fromTo(
            el,
            { xPercent: -6 },
            {
              xPercent: 6,
              ease: "none",
              scrollTrigger: {
                trigger: el.closest(".work-card"),
                containerAnimation: tween,
                start: "left right",
                end: "right left",
                scrub: true,
              },
            },
          );
        });
      });

      // Mobile: each card rises in.
      mm.add("(max-width: 767px)", () => {
        gsap.utils.toArray<HTMLElement>(".work-card").forEach((el) =>
          gsap.from(el, {
            y: 80,
            opacity: 0,
            duration: 1.2,
            ease: "expo.out",
            scrollTrigger: { trigger: el, start: "top 88%" },
          }),
        );
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section id="work" ref={root} className="relative z-10 bg-ink">
      <div className="work-pin md:flex md:h-svh md:flex-col md:justify-center md:overflow-hidden">
        <div className="work-title flex items-end justify-between px-5 pt-28 md:px-10 md:pt-0">
          <h2 className="text-6xl font-medium leading-[0.9] tracking-[-0.05em] md:text-[5.5vw]">
            <span className="line-mask">
              <span className="work-title-line block">Selected</span>
            </span>
            <span className="line-mask">
              <span className="work-title-line serif block italic text-ember">work</span>
            </span>
          </h2>
          <p className="hidden max-w-[28ch] pb-3 text-sm text-mute md:block">
            Products I&rsquo;ve founded, led or helped build, from errand marketplaces to crypto
            exchanges.
          </p>
        </div>

        <div
          ref={track}
          className="mt-12 flex flex-col gap-20 px-5 pb-24 will-change-transform md:mt-[3vh] md:flex-row md:gap-[5vw] md:px-10 md:pb-0"
        >
          {projects.map((p, i) => (
            <Card key={p.slug} p={p} i={i} />
          ))}
        </div>

        <div className="absolute inset-x-10 bottom-8 hidden h-px bg-line md:block">
          <div className="work-progress h-full origin-left scale-x-0 bg-ember" />
        </div>
      </div>
    </section>
  );
}
