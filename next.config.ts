import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  allowedDevOrigins: ["local-origin.dev", "*.local-origin.dev"],
  images: {
    domains: ["gyubzdccsujeytmxkmgo.supabase.co"],
  },
};
export default nextConfig;
