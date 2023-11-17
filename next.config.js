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
        source: '/:locale(zh_tw|zh_cn)',
        destination: '/:locale(zh-tw|zh-cn)',
        permanent: true,
      },
    ];
  },
};

module.exports = withPWA(nextConfig);
