import NextI18Next from 'next-i18next'
import path from 'path'

module.exports = new NextI18Next({
  defaultNS: 'index',
  defaultLanguage: 'zh_tw',
  otherLanguages: ['en'],
  localePath: path.resolve('./public/static/locales'),
})
