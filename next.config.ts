import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export: the whole site ships as plain HTML in `out/`,
  // deployable on Netlify, Vercel, or a plain cPanel host.
  output: "export",
  // Required under `output: "export"` — no server means no on-demand
  // image optimisation. Assets are pre-sized at build time instead.
  images: { unoptimized: true },
  // Emits `/about/index.html` rather than `/about.html`, which is what
  // static hosts without rewrite rules expect.
  trailingSlash: true,
  reactCompiler: true,
};

export default nextConfig;
