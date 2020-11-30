import React from 'react'
import { createGlobalStyle } from 'styled-components'

import theme from './theme'
import blocks from './blocks'

const Template = (props) => {
  const {
    pageContext: { header, footer, post },
  } = props

  const Header = blocks?.header?.component
  const Footer = blocks?.footer?.component

  return (
    <>
      <ThemeCSS theme={theme} />
      <Header {...header} />
      {post.content.map(({ name, fields }, index) => {
        const Component = blocks?.[name]?.component
        return Component && <Component key={index} {...fields} />
      })}
      <Footer {...footer} />
    </>
  )
}

const ThemeCSS = createGlobalStyle`
  ${({ theme }) => theme.css}
`

export default Template
