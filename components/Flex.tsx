import React from 'react'
import { Property } from 'csstype'
import styled from 'styled-components'
import { Container } from 'flutter-ui'

export interface FlexProps {
  align?: Property.AlignItems
  gutter?: number
  justify?: Property.JustifyContent
  direction?: Property.FlexDirection
  wrap?: Property.FlexWrap
  expanded?: boolean
  inline?: boolean
  children?: any
  style?: React.CSSProperties
}

const calcContainerGutter = (props: FlexProps) => {
  if (!props.gutter) {
    return ''
  } else {
    if (props.direction === 'column') {
      return `-${props.gutter / 2}px 0`
    } else {
      return `0 -${props.gutter / 2}px`
    }
  }
}

const calcGutter = (props: FlexProps) => {
  if (!props.gutter) {
    return ''
  } else {
    if (props.direction === 'column') {
      return `${props.gutter / 2}px 0`
    } else {
      return `0 ${props.gutter / 2}px`
    }
  }
}

export const Flex = styled(Container)<FlexProps>`
  display: ${props => (props.inline ? 'inline-flex' : 'flex')};
  flex: ${props => (props.expanded ? '1 1' : null)};
  align-items: ${props => props.align};
  justify-content: ${props => props.justify};
  flex-direction: ${props => props.direction};
  flex-wrap: ${props => (props.wrap ? props.wrap : 'nowrap')};
  margin: ${calcContainerGutter};
  & > * {
    margin: ${calcGutter} !important;
  }
`

export const Center = styled(Flex)`
  justify-content: center;
  align-items: center;
`
