import React from 'react'
import { Button } from '@material-ui/core'
import styled from 'styled-components'

// import app components

const Menu = props => {
  const { label, onClick, value } = props

  return (
    <Container>
      <Button children={label} onClick={onClick} />
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  align-items: center;
`

export default Menu
