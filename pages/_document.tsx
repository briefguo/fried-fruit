import React from 'react'
import Document, { Html, Head, Main, NextScript } from 'next/document'
import { ServerStyleSheet } from 'styled-components'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet()
    const originalRenderPage = ctx.renderPage

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: App => props => sheet.collectStyles(<App {...props} />),
        })

      const initialProps = await Document.getInitialProps(ctx)
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      }
    } finally {
      sheet.seal()
    }
  }

  render() {
    return (
      <Html>
        <meta
          name="viewport"
          content="initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no"
        />
        <Head />
        <body>
          <Main />
          <script src="//at.alicdn.com/t/font_2043271_ohf75noe0ds.js"></script>
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
