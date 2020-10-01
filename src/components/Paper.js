import React from 'react'
import styled from 'styled-components'

const Paper = props => {
  const { children, ...rest } = props
  return <Container {...rest}>{children}</Container>
}

const Container = styled.div`
  padding: 20px;
  border-radius: 10px;
  background: #fff;
  box-shadow: 0 8px 15px rgba(29, 46, 83, 0.07);
`

export default Paper
