/** @type {import('next').NextConfig} */
const nextConfig = {
  // Reduce noisy dev re-renders/cancellations
  reactStrictMode: false,
  output: 'export',
  trailingSlash: true,
  basePath: process.env.NEXT_BASE_PATH || '',
  assetPrefix: process.env.NEXT_BASE_PATH || '',
};

export default nextConfig;
