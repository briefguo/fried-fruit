import React from 'react'
import { Field, Form, Formik, FormikProps } from 'formik'
import { useRouter } from 'next/router'

import { Localhost } from '@/helpers/Localhost'
import { PageScaffold } from '@/components/PageScaffold'
import { Post } from '@/models/Post'
import { Space } from '@/components/Space'
import { Content } from '@/components/Content'
import { Button } from '@/components/Button'
import { NavLink } from '@/components/NavLink'
import { HeaderContainer } from '@/components/Header'

const AdminHeader = () => {
  return (
    <HeaderContainer>
      <NavLink href={`../`}>
        <Button>Cancel</Button>
      </NavLink>
      <NavLink href={`new/`}>
        <Button data-theme="danger">Submit</Button>
      </NavLink>
    </HeaderContainer>
  )
}

const Upload = ({ field, form, ...props }) => {
  const handleUpload = async (file: File) => {
    const url = await Localhost.uploadFile(file)
    form.setFieldValue(field.name, url)
  }
  return (
    <>
      {field.value && <img width={100} src={field.value} alt="" />}
      <input
        accept="image/jpeg,image/png"
        onChange={e => handleUpload(e.target.files?.[0])}
        type="file"
      />
    </>
  )
}

interface CreatePostPageProps {
  post: Post
  isCreate: boolean
}

const CreatePostPage: Page<CreatePostPageProps> = props => {
  const router = useRouter()
  const token = router.query.token
  const handleSubmit = async values => {
    if (props.isCreate) {
      await Localhost.from(token).post(`/api/v1/posts/`, values)
    } else {
      await Localhost.from(token).post(
        `/api/v1/posts/${props.post.id}/`,
        values,
      )
    }
    router.replace(`/admin/${token}/posts/`)
  }
  return (
    <PageScaffold
      child={
        <>
          <Content padding="48px 0">
            <Formik
              initialValues={{ ...props.post }}
              onSubmit={(values, actions) => {
                setTimeout(() => {
                  handleSubmit(values)
                  actions.setSubmitting(false)
                }, 1000)
              }}
            >
              {(formik: FormikProps<any>) => (
                <Form>
                  <Space
                    gutter={24}
                    style={{ width: '100%' }}
                    align="stretch"
                    direction="vertical"
                  >
                    <Field
                      name="title"
                      className="form-control"
                      placeholder="请输入名称"
                      required
                    />
                    <Field
                      name="summary"
                      className="form-control"
                      placeholder="短描述"
                    />
                    <Field name="cover" component={Upload} />
                    <Field
                      rows={10}
                      as="textarea"
                      name="content"
                      className="form-control"
                      placeholder="长描述"
                    />
                  </Space>
                </Form>
              )}
            </Formik>
          </Content>
        </>
      }
    />
  )
}

CreatePostPage.getInitialProps = async ctx => {
  let post: Post
  const isCreate = ctx.query.id === 'new'
  if (isCreate) {
    post = new Post()
  } else {
    post = await Localhost.get(`/api/v1/posts/${ctx.query.id}/`)
  }
  return { post, isCreate }
}
CreatePostPage.Header = AdminHeader
export default CreatePostPage
