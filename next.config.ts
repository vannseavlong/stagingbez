import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // If your images are hosted on your own server or CDN
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // or your domain, e.g., "yourdomain.com"
      },
    ],
    // Disable Next.js runtime image optimization to avoid on-the-fly
    // re-processing that may cause images to be re-requested during
    // frequent layout/size changes (like a drag slider).
    // If you rely on Next's optimization in production, consider
    // enabling it only for build-time/production pipelines or ensure
    // your CDN caches optimized images aggressively.
    unoptimized: false,
    // Provide explicit device and image sizes so Next generates stable
    // srcsets and avoids unnecessary reflows or re-fetches.
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ["image/avif", "image/webp"],
  },
  reactStrictMode: true,
  poweredByHeader: false,
};

export default nextConfig;
