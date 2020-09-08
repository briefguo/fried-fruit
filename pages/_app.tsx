import 'normalize.css'
import React from 'react'
import App from 'next/app'
import Head from 'next/head'
import Router from 'next/router'
import dynamic from 'next/dynamic'
import { ThemeProvider } from 'styled-components'

import { theme } from '@/theme/theme'

const DefaultHeader = dynamic(() => import('@/components/Header'))
const DefaultFooter = dynamic(() => import('@/components/Footer'))

function FriedFruit({ Component, pageProps }) {
  const title = Component.title ?? '无标题'
  return (
    <>
      <Head>
        <title>{title} ｜ 煎果</title>
      </Head>
      <ThemeProvider theme={theme}>
        {Component.Header ? <Component.Header /> : <DefaultHeader />}
        <Component {...pageProps} />
        {Component.Footer ? <Component.Footer /> : <DefaultFooter />}
      </ThemeProvider>
    </>
  )
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
FriedFruit.getInitialProps = async (appContext) => {
  if (appContext.router.pathname.startsWith('/admin')) {
    if (process.env.ADMIN_TOKEN !== appContext.router.query.token) {
      const res = appContext.ctx.res
      if (res) {
        res.writeHead(302, { Location: '/' })
        res.end()
      } else {
        Router.push('/')
      }
    }
  }

  // calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(appContext)

  return { ...appProps }
}

export default FriedFruit
