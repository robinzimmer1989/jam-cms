import React from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'

// import app components
import Edges from 'components/Edges'
import Image from 'components/Image'

export const fields = {
  name: 'Header',
  fields: [
    {
      id: 'image',
      type: 'image',
      placeholder: '',
      label: 'Add Logo',
      value: '',
    },
    {
      id: 'header-menu',
      type: 'menu',
      placeholder: '',
      label: 'Edit Menu',
      value: '',
    },
  ],
  style: {},
}

const Header = props => {
  const { image, ...rest } = props

  return (
    <Container {...rest}>
      <Edges sixe="lg">
        <Grid>
          <Logo to={`/`}>{image?.storageKey && <Image storageKey={image.storageKey} />}</Logo>

          <Navigation>Menu</Navigation>
        </Grid>
      </Edges>
    </Container>
  )
}

const Container = styled.div`
  background: #fff;
`

const Grid = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 64px;
  padding: 5px 0;
`

const Logo = styled(Link)`
  display: block;
  height: 100%;

  img {
    max-width: 100%;
    max-height: 100%;
  }
`

const Navigation = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
`

export default Header
