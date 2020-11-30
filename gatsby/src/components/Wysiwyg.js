import React from 'react'
import styled from 'styled-components'
import Parser from 'html-react-parser'

const Wysiwyg = (props) => {
  const { children } = props

  return (
    <Container>
      {children && Parser(children)}
      <div className="clear" />
    </Container>
  )
}

const Container = styled.div`
  *:first-child {
    margin-top: 0;
  }

  *:nth-last-child(2) {
    margin-bottom: 0;
  }

  p {
    margin-bottom: 20px;
  }

  img {
    margin-bottom: 20px;

    &.alignleft {
      float: left;
      margin-right: 20px;
    }

    &.alignright {
      float: right;
      margin-left: 20px;
    }
  }

  .clear {
    clear: both;
  }
`

export default Wysiwyg
