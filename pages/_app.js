import Head from 'next/head'
import '../styles/antd.less'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>秘法符文計算機</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
        <meta name="description" content="計算楓之谷秘法符文完成日期" />
        <meta
          name="keywords"
          content="秘法符文計算機,arc計算機,arc,秘法符文,Arcane Symbol Calculator,Arcane Symbol,Arcane SymbolPower"
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:description"
          content="計算楓之谷秘法符文完成日期及所需楓幣"
        />
        <meta
          property="og:url"
          content="https://maplestory-arcane-symbol-calculator.vercel.app/"
        />
        <meta property="og:locale" content="zh_tw" />
        <meta property="og:site_name" content="秘法符文計算機" />
        <meta property="og:title" content="秘法符文計算機" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+TC&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
