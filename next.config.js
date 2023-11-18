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
  publicRuntimeConfig: {
    GOOGlE_AD_ID: process.env.GOOGlE_AD_ID || '',
    GOOGlE_AD_SLOT: process.env.GOOGlE_AD_SLOT || '',
    GOOGlE_AD_SLOT_TEST: process.env.GOOGlE_AD_SLOT_TEST || '',
    GOOGLE_AD_LAYOUT_TEST: process.env.GOOGLE_AD_LAYOUT_TEST || '',
  },
};

module.exports = withPWA(nextConfig);
