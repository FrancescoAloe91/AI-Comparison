import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Local dev only: nested / odd workspace paths. On Vercel (VERCEL=1) use defaults.
  ...(process.env.VERCEL
    ? {}
    : {
        turbopack: {
          root: path.resolve(process.cwd()),
        },
      }),
};

export default nextConfig;
