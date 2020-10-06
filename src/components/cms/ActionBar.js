import React from 'react'
import styled from 'styled-components'

const ActionBar = props => {
  const { children } = props

  return <Container>{children}</Container>
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 30px 0;
`

export default ActionBar
