import type { NextConfig } from 'next';

const staticExport = process.env.SITE_STATIC_EXPORT === '1';
const nextConfig: NextConfig = {
  ...(staticExport ? { output: 'export' } : {}),
  // Render at root, then host beneath the GitHub project path. Native links and
  // photos use site-url.ts; the framework asset prefix covers JS and CSS.
  // This avoids the pinned Vinext exporter's unprefixed prerender requests.
  assetPrefix: process.env.NEXT_PUBLIC_BASE_PATH || '',
};

export default nextConfig;
