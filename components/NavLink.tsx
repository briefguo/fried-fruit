import React from 'react'
import Link from 'next/link'
import path from 'path'
import { useRouter } from 'next/router'
import cx from 'classnames'

interface NavLinkProps {
  href?: string
}

export const NavLink: React.SFC<NavLinkProps> = props => {
  const router = useRouter()
  const href = props.href.startsWith('/')
    ? props.href
    : `${path.join(router.asPath, props.href)}`
  const isActive = href === router.asPath
  return (
    <Link href={href} passHref>
      <a className={cx('nav-link', { 'is-active': isActive })}>
        {props.children}
      </a>
    </Link>
  )
}
