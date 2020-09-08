import React from 'react'
import { useRouter } from 'next/router'

import { Localhost } from '@/helpers/Localhost'
import { Post } from '@/models/Post'
import { NavLink } from '@/components/NavLink'
import { PageScaffold } from '@/components/PageScaffold'
import { Content } from '@/components/Content'
import { Space } from '@/components/Space'
import { Flex, Center } from '@/components/Flex'
import { Text } from 'flutter-ui'
import { Button } from '@/components/Button'
import { HeaderContainer } from '@/components/Header'

const AdminHeader = () => {
  return (
    <HeaderContainer>
      <NavLink href={`../`}>
        <Button>Cancel</Button>
      </NavLink>
      <NavLink href={`new/`}>
        <Button data-theme="danger">New A Post</Button>
      </NavLink>
    </HeaderContainer>
  )
}

const AdminPostsPage: Page<{ posts: Post[] }> = props => {
  const router = useRouter()
  const token = router.query.token
  const handleDelete = async (id: string) => {
    const isOk = await confirm('你确定要删除吗')
    if (isOk) {
      await Localhost.from(token).delete(`/api/v1/posts/${id}/`)
      router.reload()
    }
  }
  return (
    <PageScaffold
      backgroundColor="#f6f7f8"
      child={
        <>
          <Content padding="24px 0">
            <Center>{props.posts.length === 0 && <Text>暂无数据</Text>}</Center>
            <Space gutter={24} direction="vertical" align="stretch">
              {props.posts.map(g => (
                <Flex
                  gutter={48}
                  justify="space-between"
                  key={g.id}
                  align="center"
                  style={{
                    backgroundColor: '#fff',
                    borderRadius: 4,
                    padding: 24,
                  }}
                >
                  <Space>
                    <img width={100} src={g.cover} alt="" />
                    <Space direction="vertical">
                      <Text fontWeight="bold" fontSize={20}>
                        {g.title}
                      </Text>
                      <span>{g.summary}</span>
                      <span>{g.updateFromNow}</span>
                    </Space>
                  </Space>
                  <Space className="action" align="center">
                    <NavLink href={`${g.id}/`}>
                      <Button>Edit</Button>
                    </NavLink>
                    <Button
                      data-theme="danger"
                      onClick={() => handleDelete(g.id)}
                    >
                      Delete
                    </Button>
                  </Space>
                </Flex>
              ))}
            </Space>
          </Content>
        </>
      }
    />
  )
}

AdminPostsPage.getInitialProps = async ctx => {
  return {
    posts: await Localhost.get('/api/v1/posts/').then(posts =>
      posts.map(p => new Post(p)),
    ),
  }
}
AdminPostsPage.Header = AdminHeader
export default AdminPostsPage
