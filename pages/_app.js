import Head from 'next/head'
import '../styles/globals.css'
import '../styles/antd.less'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>秘法符文計算機</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
