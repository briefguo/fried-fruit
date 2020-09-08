import React from 'react'
import { PageScaffold } from '@/components/PageScaffold'
import { Content } from '@/components/Content'
import { NavLink } from '@/components/NavLink'
import { useRouter } from 'next/router'
import { Space } from '@/components/Space'
import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import { HeaderContainer } from '@/components/Header'

const Header = () => {
  const router = useRouter()
  const handleSubmit = e => {
    e.preventDefault()
    const formdata = new FormData(e.target)
    const obj = { q: '' }
    formdata.forEach((value, key) => (obj[key] = value))
    router.replace(`/search/?q=${obj.q}`)
  }
  return (
    <HeaderContainer justify="center">
      <form action="/search" onSubmit={handleSubmit}>
        <Space>
          <div
            style={{
              background: '#fff',
              borderRadius: '4px',
            }}
          >
            <svg
              width={18}
              height={18}
              style={{
                paddingLeft: 18,
                verticalAlign: 'middle',
              }}
              fill="#333"
              aria-hidden="true"
            >
              <use xlinkHref="#icon-search"></use>
            </svg>
            <Input defaultValue={router.query.q} name="q" type="text" />
          </div>
          <Button data-theme="danger" type="submit">
            Search
          </Button>
          <NavLink href="/">
            <Button>Cancel</Button>
          </NavLink>
        </Space>
      </form>
    </HeaderContainer>
  )
}

const SearchPage: Page = () => (
  <PageScaffold
    backgroundColor="#f6f7f8"
    child={
      <>
        <Content>
          no result
          <span>no result</span>
        </Content>
      </>
    }
  />
)
SearchPage.title = '搜索'
SearchPage.Header = Header
export default SearchPage
