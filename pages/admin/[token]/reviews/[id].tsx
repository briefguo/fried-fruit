import React from 'react'
import { Field, Form, Formik, FormikProps } from 'formik'
import { useRouter } from 'next/router'

import { Localhost } from '@/helpers/Localhost'
import { PageScaffold } from '@/components/PageScaffold'
import { Space } from '@/components/Space'
import { Review } from '@/models/Review'
import { Ink } from '@/components/Ink'
import { Content } from '@/components/Content'
import { Flex } from '@/components/Flex'
import { NavLink } from '@/components/NavLink'
import { Button } from '@/components/Button'

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
                <Button data-theme="danger">New A Post</Button>
              </NavLink>
            </Flex>
          }
        />
      }
    />
  )
}

interface CreatePostPageProps {
  review: Review
  isCreate: boolean
}

const CreateReviewPage: Page<CreatePostPageProps> = props => {
  const router = useRouter()
  const token = router.query.token
  const handleSubmit = async values => {
    if (props.isCreate) {
      await Localhost.from(token).post(`/api/v1/reviews/`, values)
    } else {
      await Localhost.from(token).post(
        `/api/v1/reviews/${props.review.id}/`,
        values,
      )
    }
    router.replace(`/admin/${token}/reviews/`)
  }
  return (
    <PageScaffold
      child={
        <>
          <>
            <Formik
              initialValues={{ ...props.review }}
              onSubmit={(values, actions) => {
                setTimeout(() => {
                  handleSubmit(values)
                  actions.setSubmitting(false)
                }, 1000)
              }}
            >
              {(formik: FormikProps<any>) => (
                <Form>
                  <Space direction="vertical">
                    <Field name="title" placeholder="请输入名称" required />
                    <Field name="summary" placeholder="短描述" />
                    <Field
                      style={{ width: '100%' }}
                      rows={10}
                      as="textarea"
                      name="content"
                      placeholder="长描述"
                    />
                  </Space>
                  <button type="submit">提交</button>
                </Form>
              )}
            </Formik>
          </>
        </>
      }
    />
  )
}

CreateReviewPage.getInitialProps = async ctx => {
  let review: Review
  const isCreate = ctx.query.id === 'new'
  if (isCreate) {
    review = new Review()
  } else {
    review = await Localhost.get(`/api/v1/reviews/${ctx.query.id}/`)
  }
  return { review: review, isCreate }
}

CreateReviewPage.Header = AdminHeader
export default CreateReviewPage
