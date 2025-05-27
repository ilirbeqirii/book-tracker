import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    remotePatterns: [new URL('https://covers.openlibrary.org/b/isbn/**')],
  },
};

export default nextConfig;
