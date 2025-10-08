import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // Allow builds to succeed while generated files (Prisma client, etc.) may trigger lint rules.
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
