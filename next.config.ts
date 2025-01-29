import type { NextConfig } from "next";
import nextTranslate from "next-translate";

const nextConfig: NextConfig = {
  reactStrictMode: true,
};

export default nextTranslate(nextConfig);
