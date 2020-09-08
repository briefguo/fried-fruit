import { NextPage } from 'next'

declare global {
  type Page<T = any> = NextPage<T> & {
    title?: string
    Header?: React.ComponentType<P>
    Footer?: React.ComponentType<P>
  }
}
