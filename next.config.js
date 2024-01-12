const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const withPWA = require('@ducanh2912/next-pwa').default({
  dest: 'public',
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
});

/** @type {import("next").NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  /* conver old i18n path to new: zh_tw -> zh-tw */
  redirects: async () => {
    return [
      {
        source: '/zh_tw',
        destination: '/',
        permanent: true,
      },
      {
        source: '/zh_cn',
        destination: '/',
        permanent: true,
      },
    ];
  }
};

module.exports = withPWA(withBundleAnalyzer(nextConfig));
