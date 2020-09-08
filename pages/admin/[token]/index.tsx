import React from 'react'
import { PageScaffold } from '@/components/PageScaffold'
import { Content } from '@/components/Content'
import { NavLink } from '@/components/NavLink'
import { Space } from '@/components/Space'
import { Button } from '@/components/Button'
import { HeaderContainer } from '@/components/Header'

const AdminIndexPage: Page = () => {
  return (
    <PageScaffold
      backgroundColor="#f6f7f8"
      child={
        <>
          <Content padding="24px 0">
            <Space gutter={24}>
              <NavLink href={`/admin/${process.env.ADMIN_TOKEN}/posts/`}>
                <Button>Posts</Button>
              </NavLink>
              <NavLink href={`/admin/${process.env.ADMIN_TOKEN}/reviews/`}>
                <Button>Reviews</Button>
              </NavLink>
              <NavLink href={`/admin/${process.env.ADMIN_TOKEN}/games/`}>
                <Button>Games</Button>
              </NavLink>
            </Space>
          </Content>
        </>
      }
    />
  )
}

AdminIndexPage.Header = () => {
  return (
    <HeaderContainer>
      <NavLink href={`/`}>
        <Button data-theme="danger">Exit</Button>
      </NavLink>
    </HeaderContainer>
  )
}

export default AdminIndexPage
