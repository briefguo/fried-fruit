import React from 'react'
import { Text } from 'flutter-ui'
import styled from 'styled-components'

import { Post } from '@/models/Post'
import { Localhost } from '@/helpers/Localhost'
import { PageScaffold } from '@/components/PageScaffold'
import { Content } from '@/components/Content'

const PostArticle = styled.article`
  padding: 24px 0;
`

const PostPage: Page<{ post: Post }> = props => {
  const post = new Post(props.post)
  return (
    <PageScaffold
      child={
        <Content>
          <PostArticle>
            <p>
              <Text fontWeight={600} fontSize={32}>
                {post.title}
              </Text>
            </p>
            <Text color="#777" className="date" fontSize={14}>
              <span style={{ textDecoration: 'underline' }}>{post.author}</span>
              <span> create at {post.createFromNow},</span>
              <span> and update at {post.updateFromNow}</span>
            </Text>
            <p>
              <Text fontWeight={600} fontSize={18}>
                {post.summary}
              </Text>
            </p>
            <p>
              <Text fontSize={18} fontWeight={300} style={{ lineHeight: 1.5 }}>
                {post.content}
              </Text>
            </p>
          </PostArticle>
        </Content>
      }
    />
  )
}

PostPage.title = '详情'

PostPage.getInitialProps = async ctx => {
  return {
    post: await Localhost.get(`/api/v1/posts/${ctx.query.id}/`),
  }
}

export default PostPage
