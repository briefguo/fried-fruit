import React from 'react'
import { Property } from 'csstype'

import { Flex } from './Flex'
import { NavLink } from './NavLink'
import { Space } from './Space'
import { Button } from './Button'
import { Ink } from './Ink'
import { Content } from './Content'

interface HeaderContainerProps {
  justify?: Property.JustifyContent
}

export const HeaderContainer: React.SFC<HeaderContainerProps> = props => {
  return (
    <Ink>
      <Content>
        <Flex justify={props.justify ?? 'space-between'}>{props.children}</Flex>
      </Content>
    </Ink>
  )
}

export const Header = () => {
  return (
    <HeaderContainer>
      <Space gutter={24}>
        <NavLink href="/">
          <Button data-theme="ghost">Home</Button>
        </NavLink>
        <NavLink href="/posts/">
          <Button data-theme="ghost">Posts</Button>
        </NavLink>
      </Space>
      <NavLink href="/posts/1599287335058/">
        <Button data-theme="danger" type="button">
          About
        </Button>
      </NavLink>
    </HeaderContainer>
  )
}

export default Header
