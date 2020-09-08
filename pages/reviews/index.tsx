import React from 'react'
import { Text } from 'flutter-ui'

import { Localhost } from '@/helpers/Localhost'
import { NavLink } from '@/components/NavLink'
import { PageScaffold } from '@/components/PageScaffold'
import { Review } from '@/models/Review'

const ReviewsPage: Page<{ reviews: Review[] }> = props => {
  return (
    <PageScaffold
      backgroundColor="#f6f7f8"
      child={
        <>
          {props.reviews.map(g => (
            <NavLink key={g.id} href={`${g.id}/`}>
              <Text fontSize={24}>{g.title}</Text>
            </NavLink>
          ))}
        </>
      }
    />
  )
}
ReviewsPage.title = '所有评测'
ReviewsPage.getInitialProps = async ctx => {
  return {
    reviews: await Localhost.get('/api/v1/reviews/'),
  }
}
export default ReviewsPage
