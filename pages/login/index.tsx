import React from 'react'
import { Text } from 'flutter-ui'
import { Ink } from '@/components/Ink'
import { Center } from '@/components/Flex'
import { Button } from '@/components/Button'
import { PageScaffold } from '@/components/PageScaffold'

const Login: Page = () => {
  return (
    <PageScaffold
      child={
        <>
          <Center>
            <Text fontSize={36}>敬请期待</Text>
          </Center>
        </>
      }
    />
  )
}

Login.Header = () => {
  return (
    <Ink
      child={
        <Center>
          <Text fontSize={24}>还没有账户？</Text>
          <Button data-theme="danger">注册</Button>
        </Center>
      }
    />
  )
}
Login.Footer = () => null

export default Login
