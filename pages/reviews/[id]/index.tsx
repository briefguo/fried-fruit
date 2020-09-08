import { useRouter } from 'next/router'
import React from 'react'
import { Localhost } from '@/helpers/Localhost'
import { PageScaffold } from '@/components/PageScaffold'
import { Review } from '@/models/Review'

const ReviewPage: Page<{ review: Review }> = (props) => {
  const router = useRouter()
  return (
    <PageScaffold
      child={
        <>
          Post,{router.query.id}
          {JSON.stringify(props.review)}
        </>
      }
    />
  )
}

ReviewPage.title = '详情'

ReviewPage.getInitialProps = async (ctx) => {
  return {
    review: await Localhost.get(`/api/v1/reviews/${ctx.query.id}/`),
  }
}

export default ReviewPage
