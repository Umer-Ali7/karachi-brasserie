import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [80],
    deviceSizes: [320, 375, 430, 640, 768, 1024, 1280, 1440, 1920],
  },
};

export default nextConfig;
