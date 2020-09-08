import React from 'react'
import { useRouter } from 'next/router'

import { Localhost } from '@/helpers/Localhost'
import { NavLink } from '@/components/NavLink'
import { PageScaffold } from '@/components/PageScaffold'
import { Review } from '@/models/Review'
import { Ink } from '@/components/Ink'
import { Content } from '@/components/Content'
import { Flex } from '@/components/Flex'
import { Button } from '@/components/Button'
import { Text } from 'flutter-ui'

const AdminHeader = () => {
  return (
    <Ink
      child={
        <Content
          child={
            <Flex justify="space-between">
              <NavLink href={`../`}>
                <Button>Cancel</Button>
              </NavLink>
              <NavLink href={`new/`}>
                <Button data-theme="danger">New A Reviews</Button>
              </NavLink>
            </Flex>
          }
        />
      }
    />
  )
}

const AdminReviewsPage: Page<{ reviews: Review[] }> = props => {
  const router = useRouter()
  const token = router.query.token
  const handleDelete = async (id: string) => {
    const isOk = await confirm('你确定要删除吗')
    if (isOk) {
      await Localhost.from(token).delete(`/api/v1/reviews/${id}/`)
      router.reload()
    }
  }
  return (
    <PageScaffold
      backgroundColor="#f6f7f8"
      child={
        <>
          <Content>
            {props.reviews.length === 0 && <Text>暂无数据</Text>}
            {props.reviews.map(g => (
              <div key={g.id}>
                <span>{g.title}</span>
                <span>{g.summary}</span>
                <NavLink href={`${g.id}/`}>修改</NavLink>
                <button onClick={() => handleDelete(g.id)}>删除</button>
              </div>
            ))}
          </Content>
        </>
      }
    />
  )
}

AdminReviewsPage.getInitialProps = async ctx => {
  return {
    reviews: await Localhost.get('/api/v1/reviews/'),
  }
}
AdminReviewsPage.Header = AdminHeader
export default AdminReviewsPage
