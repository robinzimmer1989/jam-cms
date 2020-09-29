import React from 'react'
import styled from 'styled-components'

// import app components
import Image from '../Image'

const Banner = props => {
  const {
    image: { storageKey },
  } = props

  return (
    <Container>
      <Image storageKey={storageKey} />
    </Container>
  )
}

const Container = styled.div`
  padding: 30px;
`

export default Banner
