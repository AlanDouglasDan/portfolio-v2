import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { SmoothScroll } from "@/components/smooth-scroll";
import { Preloader } from "@/components/preloader";
import { Cursor } from "@/components/cursor";
import "./globals.css";

const title = "Alan Douglas | Software Engineer & Founder";
const description =
  "Alan Douglas designs and builds products end to end: mobile apps, web platforms and the backend and payment systems behind them. CTO at Lisah, founder of Suwe.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description, type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable} is-loading`}>
      <body>
        <SmoothScroll />
        <Preloader />
        <Cursor />
        {children}
        <div className="grain" aria-hidden />
      </body>
    </html>
  );
}
