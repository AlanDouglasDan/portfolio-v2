# Alan Douglas — Portfolio v2

Dark, editorial portfolio. Next.js 16 static export, Tailwind v4, GSAP (ScrollTrigger + SplitText), Lenis smooth scroll. Served by Cloudflare Workers as static assets — no server code, no adapter.

## Develop

```bash
npm install
npm run dev          # http://localhost:3000
```

All copy lives in [`content/site.ts`](content/site.ts).

## Deploy to Cloudflare

`npm run build` writes the static site to `./out`; [`wrangler.jsonc`](wrangler.jsonc) serves that folder.

**From your machine**

```bash
npx wrangler login   # once
npm run deploy       # build + wrangler deploy
npm run preview      # build + run the real Worker locally
```

**Git-connected (Workers Builds)** — Cloudflare dashboard → Workers & Pages → Create → Import a repository, then:

| Field | Value |
| --- | --- |
| Build command | `npm run build` |
| Deploy command | `npx wrangler deploy` |

Add a custom domain under the Worker → Settings → Domains & Routes.

## Motion

- Preloader counter → curtain reveal, then split-character hero intro
- Lenis inertial scroll synced to GSAP's ticker
- Pinned horizontal project gallery with parallax covers (vertical stack on mobile)
- Scroll-velocity marquee (speeds up, skews and reverses with scroll)
- Word-by-word scrubbed statement, count-up stats
- Sticky stacking capability cards
- Magnetic buttons, blend-mode cursor with contextual labels
- Everything is disabled under `prefers-reduced-motion`
