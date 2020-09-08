import React from 'react'
import { Text, Container } from 'flutter-ui'

import { Post } from '@/models/Post'
import { Localhost } from '@/helpers/Localhost'
import { NavLink } from '@/components/NavLink'
import { PageScaffold } from '@/components/PageScaffold'
import { Content } from '@/components/Content'
import { Space } from '@/components/Space'
import { AsyncMainColor } from '@/components/AsyncMainColor'
import { Flex } from '@/components/Flex'

interface PostCardProps {
  source?: Post
}

const PostCard: React.SFC<PostCardProps> = props => {
  const g = props.source
  return (
    <NavLink key={g.id} href={`${g.id}/`}>
      <AsyncMainColor ossUrl={g.cover}>
        {color => (
          <Container
            borderRadius={4}
            padding={24}
            overflow="hidden"
            backgroundColor={color}
          >
            <Flex gutter={24} justify="space-between">
              <Space direction="vertical">
                <Text color="#fff" fontSize={24} fontWeight="bolder">
                  {g.title}
                </Text>
                <Text color="#fff" fontSize={14} fontWeight="bold">
                  {g.summary}
                </Text>
                <Text fontSize={14}>Update at {g.updateFromNow}</Text>
              </Space>
              <img
                style={{ backgroundColor: '#fff' }}
                height={120}
                src={g.cover}
                alt=""
              />
            </Flex>
          </Container>
        )}
      </AsyncMainColor>
    </NavLink>
  )
}

const PostsPage: Page<{ posts: Post[] }> = props => {
  return (
    <PageScaffold
      backgroundColor="#f6f7f8"
      child={
        <>
          <Content padding="24px 0">
            <Space gutter={24} direction="vertical">
              {props.posts.map(g => (
                <PostCard key={g.id}></PostCard>
              ))}
            </Space>
          </Content>
        </>
      }
    />
  )
}

PostsPage.title = '所有文章'
PostsPage.getInitialProps = async ctx => {
  return {
    posts: await Localhost.get('/api/v1/posts/').then(posts =>
      posts.map(p => new Post(p)),
    ),
  }
}
export default PostsPage
