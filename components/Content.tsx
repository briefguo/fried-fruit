import styled from 'styled-components'
import { Container } from 'flutter-ui'
import { isMobile, isDesktop } from './Device'

export const Content = styled(Container)`
  ${isDesktop} {
    margin: 0 auto;
    width: 768px;
  }
  ${isMobile} {
    margin: 0 24px;
  }
`
