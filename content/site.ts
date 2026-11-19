/**
 * All copy lives here. Sourced from Alan's résumé (alan-portfolio/content/resume.md)
 * and the product repos on disk. Edit this file to change what the site says.
 * House style: no em-dashes in anything a visitor can read.
 */

export const profile = {
  name: "Alan Douglas",
  first: "Alan",
  last: "Douglas",
  role: "Software Engineer & Founder",
  location: "Lagos, Nigeria",
  timezone: "Africa/Lagos",
  email: "aland6209@gmail.com",
  available: "Open to new roles, contracts & collaborations",
  intro:
    "I design and build products end to end: mobile apps, web platforms, and the backend and payment systems that hold them together.",
  statement:
    "Six years shipping mobile apps, platforms and payment infrastructure for teams in Nigeria, the UK, the Netherlands and the Gulf. I can own the architecture, lead the team, and still write and review the code.",
  photo: "/alan.webp",
  links: [
    { label: "GitHub", href: "https://github.com/AlanDouglasDan" },
    { label: "LinkedIn", href: "https://linkedin.com/in/alandouglasdan" },
    { label: "Email", href: "mailto:aland6209@gmail.com" },
  ],
} as const;

export const stats = [
  { value: 6, suffix: "+", label: "Years shipping production systems" },
  { value: 15, suffix: "+", label: "Mobile apps built for iOS & Android" },
  { value: 4.7, suffix: "★", label: "Average store rating on lead apps", decimals: 1 },
  { value: 50, suffix: "%", label: "Infra cost cut at Gemma AI" },
];

export const marquee = [
  "React Native",
  "Expo",
  "Next.js",
  "TypeScript",
  "Node.js",
  "NestJS",
  "Fastify",
  "PostgreSQL",
  "Payments",
  "Realtime",
  "Cloudflare",
  "Stripe",
  "Paystack",
];

export type Project = {
  slug: string;
  name: string;
  year: string;
  role: string;
  tagline: string;
  description: string;
  tags: string[];
  url?: string;
  /** Two colours for the generative cover. */
  palette: [string, string];
  glyph: string;
};

export const projects: Project[] = [
  {
    slug: "suwe",
    name: "Suwe",
    year: "2026",
    role: "Founder · Full stack",
    tagline: "Hyperlocal errands, done by people nearby.",
    description:
      "A marketplace where you post an errand, nearby runners bid, and you pay into escrow and watch them move on a live map. Mobile app, merchant and admin dashboards, realtime backend.",
    tags: ["Expo", "Fastify", "Postgres", "Socket.io", "Paystack escrow"],
    url: "https://thesuwe.com",
    palette: ["#ff6a4d", "#3a140c"],
    glyph: "S",
  },
  {
    slug: "lisah",
    name: "Lisah",
    year: "2026",
    role: "Chief Technology Officer",
    tagline: "Wealth without borders.",
    description:
      "A digital asset vault: fiat banking, crypto custody and stock investing in one app. I own architecture, governance, hiring and production reliability.",
    tags: ["NestJS", "Prisma", "BullMQ", "React Native", "Crypto custody"],
    url: "https://uselisah.com",
    palette: ["#c9b37e", "#1d1a12"],
    glyph: "L",
  },
  {
    slug: "bitfinex",
    name: "Bitfinex",
    year: "2023",
    role: "Mobile Engineer, Digital Assets",
    tagline: "Crypto trading in your pocket.",
    description:
      "A cryptocurrency trading and wallet app on high-throughput exchange APIs, built around precise balances and irreversible transfers. Engagement up 30% and revenue up 13% in six months.",
    tags: ["React Native", "Wallets", "Exchange APIs", "CI/CD", "Docker"],
    url: "https://www.bitfinex.com",
    palette: ["#16b157", "#06200f"],
    glyph: "B",
  },
  {
    slug: "payhankey",
    name: "Payhankey",
    year: "2026",
    role: "Mobile Engineer",
    tagline: "The social app where every post can earn.",
    description:
      "A social network with a feed, stories and short videos where creators earn from their posts, plus referrals, leaderboards and in-app voice and video calls.",
    tags: ["Expo Router", "React 19", "TanStack Query", "WebRTC"],
    url: "https://payhankey.com",
    palette: ["#ffb547", "#2b1a05"],
    glyph: "P",
  },
  {
    slug: "freebyz",
    name: "Freebyz",
    year: "2026",
    role: "Mobile Engineer",
    tagline: "Earn from tasks that take two minutes.",
    description:
      "A micro-task marketplace: complete quick tasks, run campaigns, refer friends and find remote jobs, with earnings paid out in local currency.",
    tags: ["Expo", "React Native", "Redux Toolkit", "Google Sign-In"],
    url: "https://freebyz.com",
    palette: ["#5aa9ff", "#071a30"],
    glyph: "F",
  },
  {
    slug: "bookd",
    name: "Book-d",
    year: "2024",
    role: "Lead Engineer, Ledger",
    tagline: "Bookings and payments for UK stylists.",
    description:
      "Two React Native apps rated 4.7+ and a cryptographically signed, append-only value ledger where every balance is derived from immutable history.",
    tags: ["React Native", "Express", "MongoDB", "Stripe", "Ledger"],
    url: "https://book-d.co.uk",
    palette: ["#ff8fb1", "#2b0f19"],
    glyph: "B",
  },
];

export const capabilities = [
  {
    no: "01",
    title: "Mobile products",
    body: "Cross-platform apps in React Native and Expo, from the first commit to the App Store and Play Store. Realtime maps, calls, biometrics and offline-first state.",
    items: ["Expo & bare RN", "Live tracking", "Video & voice", "Store releases"],
  },
  {
    no: "02",
    title: "Platform & backend",
    body: "TypeScript services on NestJS and Fastify over Postgres and Redis, queues with BullMQ, and edge deploys on Cloudflare, measured against real latency targets.",
    items: ["Postgres & Prisma", "Queues & events", "Observability", "Cloudflare & GCP"],
  },
  {
    no: "03",
    title: "Payments & fintech",
    body: "Wallets, ledgers and payout rails on Stripe, Paystack and Flutterwave. Idempotent money-moving APIs, webhook verification and reconciliation that keeps the numbers honest.",
    items: ["Escrow & split payments", "Wallets & ledgers", "KYC flows", "Reconciliation"],
  },
  {
    no: "04",
    title: "Engineering leadership",
    body: "Hiring loops, code-review standards, CI gates and incident practice. Turning business goals into phased roadmaps with costs people can actually plan around.",
    items: ["Hiring & interviews", "Architecture review", "Governance", "Roadmaps & costing"],
  },
];

export const experience = [
  { company: "Lisah Technologies", role: "Chief Technology Officer", period: "Now", place: "Remote · NG" },
  { company: "Gemma AI", role: "Senior Engineer, Payments & Platform", period: "2025–Now", place: "Remote · Dubai" },
  { company: "Nexpass", role: "Backend & Payments Engineer", period: "2025", place: "Remote · NG" },
  { company: "Book-d", role: "Lead Engineer, Ledger & Platform", period: "2024–2025", place: "Remote · UK" },
  { company: "Bitfinex", role: "Mobile Engineer, Digital Assets", period: "2023–2024", place: "Remote · UK" },
  { company: "Dopper", role: "Full Stack Engineer", period: "2022–2023", place: "Remote · NL" },
  { company: "Jumia Group", role: "Software Engineer", period: "2021–2022", place: "Remote · NG" },
  { company: "Lifeeremit", role: "MERN Engineer, Remittance", period: "2020–2021", place: "Remote · NG" },
];
