import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'jhgjlennmeuftwcsiacf.supabase.co',
        port: '',
        pathname: '/**',
      },
      // Add other domains as needed
    ],
  },
};

export default nextConfig;
