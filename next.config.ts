import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/iron-oak-podcast",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
