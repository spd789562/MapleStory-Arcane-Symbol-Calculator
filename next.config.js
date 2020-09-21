const { nextI18NextRewrites } = require('next-i18next/rewrites')
const withSass = require('@zeit/next-sass')
const withLess = require('@zeit/next-less')
const withCSS = require('@zeit/next-css')
const withPWA = require('next-pwa')
const path = require('path')

const isProd = process.env.NODE_ENV === 'production'

const localeSubpaths = {
  en: 'en',
  zh_tw: 'zh_tw',
  zh_cn: 'zh_cn',
}

// fix: prevents error when .less files are required by node
if (typeof require !== 'undefined') {
  require.extensions['.less'] = (file) => {}
}

module.exports = withPWA({
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
        webpack(config, options) {
          if (!options.isServer && config.mode === 'development') {
            const { I18NextHMRPlugin } = require('i18next-hmr/plugin')
            config.plugins.push(
              new I18NextHMRPlugin({
                localesDir: path.resolve(__dirname, 'public/static/locales'),
              })
            )
          }

          return config
        },
      })
    ),
  }),
  rewrites: async () => nextI18NextRewrites(localeSubpaths),
  publicRuntimeConfig: {
    GOOGlE_AD_ID: process.env.GOOGlE_AD_ID || '',
    GOOGlE_AD_SLOT: process.env.GOOGlE_AD_SLOT || '',
    GOOGlE_AD_SLOT_TEST: process.env.GOOGlE_AD_SLOT_TEST || '',
    GOOGLE_AD_LAYOUT_TEST: process.env.GOOGLE_AD_LAYOUT_TEST || '',
    GOOGlE_ANALYTICS_ID: process.env.GOOGlE_ANALYTICS_ID || '',
    localeSubpaths,
  },
})
