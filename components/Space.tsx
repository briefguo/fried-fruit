import React from 'react'
import { Property } from 'csstype'
import { Flex } from './Flex'

interface SpaceProps {
  direction?: 'vertical' | 'horizen'
  children: React.ReactChild[]
  align?: Property.AlignItems
  gutter?: number
  className?: string
  style?: React.CSSProperties
}

export const Space: React.SFC<SpaceProps> = props => {
  const gutter = props.gutter || 12
  let flexDirection
  if (props.direction === 'vertical') {
    flexDirection = 'column'
  } else {
    flexDirection = 'row'
  }
  return (
    <Flex
      className={props.className}
      inline
      gutter={gutter}
      align={props.align}
      direction={flexDirection}
      style={props.style}
    >
      {props.children}
    </Flex>
  )
}
