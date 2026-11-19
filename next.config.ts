import type { NextConfig } from "next";

// Fully static export: `next build` writes plain HTML/CSS/JS to ./out,
// which Cloudflare Workers serves as static assets (see wrangler.jsonc).
const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
