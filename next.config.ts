import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    qualities: [100, 95, 90, 80, 85],
    remotePatterns: [
      new URL("https://r2.nextjsbase.com/**"),
      new URL("https://lh3.googleusercontent.com/**"),
      new URL("https://avatars.githubusercontent.com/**"),
      new URL("https://*.googleusercontent.com/**"),
    ],
  },
  allowedDevOrigins: ["192.168.*.*"],
  devIndicators: false,
  headers: () => [
    {
      source: "/(.*)",
      headers: [
        { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        { key: "Cross-Origin-Opener-Policy", value: "same-origin-allow-popups" },
        { key: "Cross-Origin-Resource-Policy", value: "same-site" },
        { key: "X-Frame-Options", value: "SAMEORIGIN" },
        { key: "X-Content-Type-Options", value: "nosniff" },
        { key: "X-Creator", value: "oviirup" },
      ],
    },
  ],
};

export default nextConfig;
