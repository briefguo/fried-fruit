import React from 'react'
import { Text } from 'flutter-ui'
import { Game } from '@/models/Game'
import { Localhost } from '@/helpers/Localhost'
import { NavLink } from '@/components/NavLink'
import { PageScaffold } from '@/components/PageScaffold'

const GamesPage: Page<{ games: Game[] }> = props => {
  return (
    <PageScaffold
      backgroundColor="#f6f7f8"
      child={
        <>
          {props.games.map(g => (
            <NavLink key={g.id} href={`${g.id}/`}>
              <Text fontSize={24}>{g.name}</Text>
            </NavLink>
          ))}
        </>
      }
    />
  )
}
GamesPage.title = '所有游戏'
GamesPage.getInitialProps = async ctx => {
  return {
    games: await Localhost.get('/api/v1/games/'),
  }
}
export default GamesPage
