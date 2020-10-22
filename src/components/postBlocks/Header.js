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
      id: 'height',
      type: 'number',
      label: 'Height',
      defaultValue: 80,
      min: 60,
      max: 200,
      step: 2,
    },
    {
      id: 'logo',
      type: 'image',
      label: 'Logo',
    },
    {
      id: 'logoHeight',
      type: 'number',
      label: 'Logo Height',
      defaultValue: 40,
      min: 20,
      max: 100,
      step: 2,
    },
    {
      id: 'mainMenu',
      type: 'menu',
      label: 'Menu',
    },
  ],
}

const Header = props => {
  const { height = 80, logo, logoHeight = 40, mainMenu, ...rest } = props

  return (
    <Container {...rest} height={height}>
      <Edges size="lg" style={{ height: '100%' }}>
        <Grid>
          <Logo to={`/`} height={logoHeight}>
            <Image image={logo} />
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
  height: ${({ height }) => height}px;
  background: ${({ theme }) => theme.colors.header};
  color: ${({ theme }) => theme.colors.headerText};
`

const Grid = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  padding: 5px 0;
`

const Logo = styled(({ height, ...rest }) => <Link {...rest} />)`
  display: flex;
  align-items: center;
  height: 100%;

  img {
    height: ${({ height }) => height}px;
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
