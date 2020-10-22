import React from 'react'
import styled from 'styled-components'
import draftToHtml from 'draftjs-to-html'
import Parser from 'html-react-parser'

const Wysiwyg = props => {
  const { children } = props

  return <Container>{children && Parser(draftToHtml(children))}</Container>
}

const Container = styled.div``

export default Wysiwyg
