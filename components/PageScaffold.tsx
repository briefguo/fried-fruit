import React from 'react'
import Portal from 'react-overlays/Portal'
import { createGlobalStyle, useTheme } from 'styled-components'

const isServer = typeof window === 'undefined'

interface PageScaffoldProps {
  child?: React.ReactChild
  className?: string
  children?: React.ReactChild[]
  footer?: React.ReactChild
  modal?: React.ReactChild
  portal?: React.ReactElement
  backgroundColor?: string
  contrastingColor?: string
  loading?: boolean
}

export const GlobalStyle = createGlobalStyle`
  body {
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
    color: ${(props: any) => props.contrastingColor};
    background: ${(props: any) => props.backgroundColor} !important;
    font-family: -apple-system,".SFNSText-Regular",BlinkMacSystemFont,"San Francisco","Roboto","Segoe UI","Oxygen","Ubuntu","Cantarell","Fira Sans","Droid Sans","Helvetica Neue","Helvetica","Lucida Grande",sans-serif;
  }
  a.nav-link {
    text-decoration:none;
  }
  textarea.form-control,
  input.form-control {
    border: 1px solid #ddd;
    padding: 12px 18px;
    background: #fff;
    border-radius: 4px;
    color: #555;
    outline: 0;
    box-shadow: inset 1px 2px 6px 1px #dedede;
  }
`

export const PageScaffold = (props: PageScaffoldProps) => {
  const theme = useTheme()
  let bodyChild
  if (!isServer) {
    bodyChild = document.createElement('div')
    document.body.appendChild(bodyChild)
  }

  if (props.loading) {
    return <>loading...</>
  }
  const contrastingColor =
    props.contrastingColor || theme.defaultContrastingColor
  const backgroundColor = props.backgroundColor || theme.defaultBodyBackground
  return (
    <>
      <div className={props.className}>{props.child || props.children}</div>
      {props.portal && <Portal container={bodyChild}>{props.portal}</Portal>}
      {props.footer}
      {props.modal}
      <GlobalStyle
        contrastingColor={contrastingColor}
        backgroundColor={backgroundColor}
      />
    </>
  )
}
