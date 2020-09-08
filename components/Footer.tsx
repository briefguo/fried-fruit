import React from 'react'
import { Text, Container } from 'flutter-ui'
import styled from 'styled-components'

import { Flex } from '@/components/Flex'
import { Space } from './Space'
import { Logo } from './Logo'
import { isDesktop, isMobile } from './Device'

const FooterContainer = styled(Container)`
  padding: 24px;
  .copyright-text,
  .powerby-text {
    font-size: 13px;
    font-weight: 300;
  }
  ${isDesktop} {
    ${Logo} {
      width: 250px;
    }
    .nextjs-svg {
      width: 100px;
      height: 50px;
    }
    .powerby-text {
      font-size: 24px;
    }
  }
  ${isMobile} {
    ${Logo} {
      width: 150px;
    }
    .powerby-text {
      font-size: 14px;
    }
    .copyright-text {
      font-size: 12px;
      line-height: 1.25;
    }
    .nextjs-svg {
      width: 50px;
      height: 40px;
    }
  }
`

export const Footer = () => {
  return (
    <FooterContainer
      child={
        <Flex gutter={8} justify="center" align="center" direction="column">
          <Logo />
          <Space align="center">
            <Text className="powerby-text">Power by</Text>
            <a href="https://nextjs.org/" target="_blank" rel="noreferrer">
              <svg className="nextjs-svg" aria-hidden="true">
                <use xlinkHref="#iconnextjs"></use>
              </svg>
            </a>
          </Space>
          <Text className="copyright-text">
            Copyright © 2020 briefguo. All rights reserved.
          </Text>
        </Flex>
      }
    />
  )
}

export default Footer
