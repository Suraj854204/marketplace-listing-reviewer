import type { NextConfig } from "next";

const isStaticExport = process.env.STATIC_EXPORT === "true";

const nextConfig: NextConfig = {
  images: { unoptimized: true },
  ...(isStaticExport && {
    output: "export",
    basePath: "/quicklist-ai",
  }),
};

export default nextConfig;
