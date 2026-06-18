import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.optimizely.com",
      },
    ],
  },
};

export default nextConfig;
