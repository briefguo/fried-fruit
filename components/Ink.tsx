import styled from 'styled-components'
import { isMobile } from './Device'
import { Button } from './Button'
import { Container } from 'flutter-ui'

export const Ink = styled(Container)`
  padding: 24px 0 56px;
  background: url('https://oss.briefguo.com/assets/ink-bg.png') no-repeat;
  background-position: bottom;
  background-size: cover;
  color: #fff;
  ${isMobile} {
    padding: 12px 0 48px;
    background-position: right bottom;
    background-size: auto 150%;
    ${Button} {
      padding: 9px 18px;
    }
  }
`
