import React from 'react'
import { useRouter } from 'next/router'

import { Game } from '@/models/Game'
import { Localhost } from '@/helpers/Localhost'
import { NavLink } from '@/components/NavLink'
import { PageScaffold } from '@/components/PageScaffold'
import { Content } from '@/components/Content'
import { Button } from '@/components/Button'
import { HeaderContainer } from '@/components/Header'

const AdminHeader = () => {
  return (
    <HeaderContainer>
      <NavLink href={`../`}>
        <Button>Cancel</Button>
      </NavLink>
      <NavLink href={`new/`}>
        <Button data-theme="danger">New A Game</Button>
      </NavLink>
    </HeaderContainer>
  )
}

const AdminGamesPage: Page<{ games: Game[] }> = props => {
  const router = useRouter()
  const token = router.query.token
  const handleDelete = async (id: string) => {
    const isOk = await confirm('你确定要删除吗')
    if (isOk) {
      await Localhost.from(token).delete(`/api/v1/games/${id}/`)
      router.reload()
    }
  }
  return (
    <PageScaffold
      backgroundColor="#f6f7f8"
      child={
        <Content>
          {props.games.map(g => (
            <div key={g.id}>
              <img width={100} src={g.cover} alt="" />
              <span>{g.name}</span>
              <span>{g.shortDescription}</span>
              <NavLink href={`${g.id}/`}>修改</NavLink>
              <button onClick={() => handleDelete(g.id)}>删除</button>
            </div>
          ))}
        </Content>
      }
    />
  )
}

AdminGamesPage.getInitialProps = async ctx => {
  return {
    games: await Localhost.get('/api/v1/games/'),
  }
}
AdminGamesPage.Header = AdminHeader
export default AdminGamesPage
