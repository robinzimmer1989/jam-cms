import React from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'

// import app components
import Edges from '../Edges'
import Logo from '../../icons/logo.svg'

export const fields = {
  name: 'header',
  label: 'Header',
  fields: [
    {
      id: 'menu',
      type: 'menu',
      label: 'Menu',
    },
    {
      id: 'breakpoint',
      type: 'number',
      label: 'Breakpoint',
      defaultValue: 960,
    },
  ],
}

const Header = (props) => {
  const { menu, breakpoint } = props

  return (
    <Container breakpoint={breakpoint}>
      <Edges size="lg" style={{ height: '100%' }}>
        <Grid>
          <LogoContainer to={`/`}>
            <Logo />
          </LogoContainer>

          {menu && (
            <>
              <Navigation className="navigation">
                {menu.map((o, i) => {
                  return (
                    <MenuItem key={i} to={o.slug}>
                      {o.title}
                    </MenuItem>
                  )
                })}
              </Navigation>

              <Hamburger className="hamburger">Ham</Hamburger>
            </>
          )}
        </Grid>
      </Edges>
    </Container>
  )
}

const Container = styled.div`
  height: 80px;
  background: #fff;
  color: #333;

  .navigation {
    display: none;

    @media (min-width: ${({ breakpoint }) => breakpoint}px) {
      display: flex;
    }
  }

  .hamburger {
    @media (min-width: ${({ breakpoint }) => breakpoint}px) {
      display: none;
    }
  }
`

const Grid = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  padding: 5px 0;
`

const LogoContainer = styled(Link)`
  display: flex;
  align-items: center;
  height: 100%;

  img {
    height: 60px;
    width: auto;
  }
`

const Navigation = styled.ul`
  display: none;
  flex: 1;
  justify-content: flex-end;
  margin: 0;
`

const Hamburger = styled.div``

const MenuItem = styled.li`
  margin: 0 10px;
  text-decoration: none;
  transform: translateX(10px);
`

export default Header
