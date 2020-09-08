import React from 'react'
import { Text } from 'flutter-ui'
import { PageScaffold } from '@/components/PageScaffold'
import { Center } from '@/components/Flex'

const IndexPage: Page = () => (
  <PageScaffold
    backgroundColor="#f6f7f8"
    child={
      <Center>
        <Text fontSize={36}></Text>
      </Center>
    }
  />
)

IndexPage.title = '首页'

export default IndexPage
