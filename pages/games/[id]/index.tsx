import { useRouter } from 'next/router'
import React from 'react'
import { Game } from '@/models/Game'
import { Localhost } from '@/helpers/Localhost'
import { PageScaffold } from '@/components/PageScaffold'

const GamePage: Page<{ game: Game }> = (props) => {
  const router = useRouter()
  return (
    <PageScaffold
      child={
        <>
          Game,{router.query.id}
          {JSON.stringify(props.game)}
        </>
      }
    />
  )
}

GamePage.title = '详情'

GamePage.getInitialProps = async (ctx) => {
  return {
    game: await Localhost.get(`/api/v1/games/${ctx.query.id}/`),
  }
}

export default GamePage
