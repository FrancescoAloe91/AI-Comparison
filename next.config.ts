import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Fix: monorepo / nested path inference — keep Turbopack root at this app (where next lives)
  turbopack: {
    root: path.resolve(process.cwd()),
  },
};

export default nextConfig;
