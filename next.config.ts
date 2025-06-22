import { createRequire } from 'module';
import type { NextConfig } from 'next';

const require = createRequire(import.meta.url);
const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
});

const nextConfig: NextConfig = {
  experimental: {
    esmExternals: true,
  },
  compiler: {
    styledComponents: true,
  },
};

export default withPWA(nextConfig);
