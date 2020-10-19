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
      label: 'Logo',
    },
    {
      id: 'mainMenu',
      type: 'menu',
      placeholder: '',
      label: 'Menu',
    },
  ],
  style: {},
}

const Header = props => {
  const { image, mainMenu, ...rest } = props

  return (
    <Container {...rest}>
      <Edges sixe="lg">
        <Grid>
          <Logo to={`/`}>
            <Image image={image} />
          </Logo>

          {mainMenu && (
            <Navigation>
              {mainMenu.map((o, i) => {
                return (
                  <MenuItem key={i} to={o.slug} className="menu__item">
                    {o.title}
                  </MenuItem>
                )
              })}
            </Navigation>
          )}
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
  display: flex;
  align-items: center;
  height: 100%;

  img {
    height: 40px;
    width: auto;
  }
`

const Navigation = styled.ul`
  flex: 1;
  display: flex;
  justify-content: flex-end;
  margin: 0;
`

const MenuItem = styled.li`
  margin: 0 10px;
  text-decoration: none;
  transform: translateX(10px);
`

export default Header
