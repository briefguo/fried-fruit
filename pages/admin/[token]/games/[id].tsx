import React from 'react'
import { useRouter } from 'next/router'
import { Field, Form, Formik, FormikProps } from 'formik'

import { Game } from '@/models/Game'
import { Localhost } from '@/helpers/Localhost'
import { PageScaffold } from '@/components/PageScaffold'
import { Space } from '@/components/Space'
import { NavLink } from '@/components/NavLink'
import { Button } from '@/components/Button'
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
      <input onChange={e => handleUpload(e.target.files?.[0])} type="file" />
    </>
  )
}

interface CreateGamePageProps {
  game: Game
  isCreate: boolean
}

const CreateGamePage: Page<CreateGamePageProps> = props => {
  const router = useRouter()
  const token = router.query.token
  const handleSubmit = async values => {
    if (props.isCreate) {
      await Localhost.from(token).post(`/api/v1/games/`, values)
    } else {
      await Localhost.from(token).post(
        `/api/v1/games/${props.game.id}/`,
        values,
      )
    }
    router.replace(`/admin/${token}/games/`)
  }
  return (
    <PageScaffold
      child={
        <>
          <Formik
            initialValues={{ ...props.game }}
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
                  <Field name="name" placeholder="请输入名称" required />
                  <Field name="shortDescription" placeholder="短描述" />
                  <Field name="tags" as="select" multiple>
                    <option value="a">Option A</option>
                    <option value="b">Option B</option>
                    <option value="c">Option C</option>
                  </Field>
                  <Field name="cover" component={Upload} />
                  <Field
                    name="releaseDate"
                    type="date"
                    placeholder="发布时间"
                  />
                  <Field
                    style={{ width: '100%' }}
                    rows={10}
                    as="textarea"
                    name="description"
                    placeholder="长描述"
                  />
                </Space>
                <button type="submit">提交</button>
              </Form>
            )}
          </Formik>
        </>
      }
    />
  )
}

CreateGamePage.getInitialProps = async ctx => {
  let game: Game
  const isCreate = ctx.query.id === 'new'
  if (isCreate) {
    game = new Game()
  } else {
    game = await Localhost.get(`/api/v1/games/${ctx.query.id}/`)
  }
  return { game, isCreate }
}
CreateGamePage.Header = AdminHeader
export default CreateGamePage
