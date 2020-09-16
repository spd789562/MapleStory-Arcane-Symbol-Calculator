const withSass = require('@zeit/next-sass')
const withLess = require('@zeit/next-less')
const withCSS = require('@zeit/next-css')

const isProd = process.env.NODE_ENV === 'production'

// fix: prevents error when .less files are required by node
if (typeof require !== 'undefined') {
  require.extensions['.less'] = (file) => {}
}

module.exports = {
  ...withCSS({
    cssModules: true,
    cssLoaderOptions: {
      importLoaders: 1,
      localIdentName: '[local]___[hash:base64:5]',
    },
    ...withLess(
      withSass({
        lessLoaderOptions: {
          javascriptEnabled: true,
        },
      })
    ),
  }),
  publicRuntimeConfig: {
    GOOGlE_AD_ID: process.env.GOOGlE_AD_ID || '',
    GOOGlE_AD_SLOT: process.env.GOOGlE_AD_SLOT || '',
    GOOGlE_AD_SLOT_TEST: process.env.GOOGlE_AD_SLOT_TEST || '',
    GOOGLE_AD_LAYOUT_TEST: process.env.GOOGLE_AD_LAYOUT_TEST || '',
    GOOGlE_ANALYTICS_ID: process.env.GOOGlE_ANALYTICS_ID || '',
  },
}
