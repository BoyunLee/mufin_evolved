import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {
    esmExternals: true,
  },
  compiler: {
    styledComponents: true,
  },
};

export default nextConfig;
