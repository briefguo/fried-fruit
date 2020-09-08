import React, { useEffect, useState } from 'react'

interface AsyncMainColorProps {
  ossUrl?: string
  children: (color: string) => React.ReactElement
}

export const AsyncMainColor = (props: AsyncMainColorProps) => {
  const [color, setColor] = useState('')
  useEffect(() => {
    fetch(props.ossUrl + '?x-oss-process=image/average-hue')
      .then(res => res.json())
      .then(({ RGB }) => `#${RGB.slice(2)}`)
      .then(setColor)
  }, [props.ossUrl])
  return <>{props.children(color)}</>
}
