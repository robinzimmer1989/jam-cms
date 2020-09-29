import React from 'react'
import styled from 'styled-components'

// import app components

const Text = props => {
  const { text } = props

  return <Container>{text}</Container>
}

const Container = styled.div`
  padding: 30px;
`

export default Text
