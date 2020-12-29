import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'gatsby';

// import app components
import Edges from './Edges';
import Logo from '../icons/jamCMS.svg';
import { colors } from '../theme';

const Header = (props) => {
  const { menu, breakpoint } = props;

  const [open, setOpen] = useState();

  return (
    <Container breakpoint={breakpoint} open={open}>
      <Edges size="lg" style={{ height: '100%' }}>
        <Grid>
          <LogoContainer to={`/`}>
            <Logo />
          </LogoContainer>

          {menu && (
            <>
              <Nav className="navigation" breakpoint={breakpoint} open={open}>
                {menu.map((o, i) => {
                  return (
                    <NavItem key={i} to={o.url} breakpoint={breakpoint}>
                      {o.title}
                    </NavItem>
                  );
                })}
              </Nav>

              <Hamburger
                className="hamburger"
                open={open}
                onClick={() => setOpen(!open)}
                breakpoint={breakpoint}
              >
                <div />
                <div />
                <div />
              </Hamburger>
            </>
          )}
        </Grid>
      </Edges>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 80px;
  background: ${colors.primary};
  color: ${colors.primaryContrast};

  .navigation {
    @media (min-width: ${({ breakpoint }) => breakpoint}px) {
      display: flex;
    }
  }

  .hamburger {
    @media (min-width: ${({ breakpoint }) => breakpoint}px) {
      display: none;
    }
  }
`;

const Grid = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  padding: 5px 0;
`;

const LogoContainer = styled(Link)`
  display: flex;
  align-items: center;
  height: 100%;

  svg {
    height: 40px;
    width: auto;

    path {
      fill: #fff;
    }
  }
`;

const Nav = styled.nav`
  @media (max-width: ${({ breakpoint }) => breakpoint - 1}px) {
    position: fixed;
    z-index: 100;
    right: 0;
    top: 0;
    height: 100%;
    width: 100%;
    max-width: 360px;
    padding: 80px 30px;
    background: ${colors.primary};
    transform: ${({ open }) => (open ? 'translateX(0)' : 'translateX(100%)')};
    transition: ease-in-out 0.2s all;
  }

  @media (min-width: ${({ breakpoint }) => breakpoint}px) {
    flex: 1;
    justify-content: flex-end;
    margin: 0;
  }
`;

const NavItem = styled(Link)`
  text-decoration: none;
  color: ${colors.primaryContrast};

  @media (max-width: ${({ breakpoint }) => breakpoint - 1}px) {
    display: block;
    margin: 10px 0;
  }

  @media (min-width: ${({ breakpoint }) => breakpoint}px) {
    margin: 0 20px;
    transform: translateX(10px);
  }
`;

const Hamburger = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 2rem;
  height: 2rem;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 10;

  @media (max-width: ${({ breakpoint }) => breakpoint - 1}px) {
    ${({ open }) =>
      open &&
      css`
        position: fixed;
        right: 5%;
        top: 20px;
        z-index: 101;
      `}
  }

  &:focus {
    outline: none;
  }

  div {
    width: 2rem;
    height: 0.25rem;
    background: ${colors.primaryContrast};
    border-radius: 10px;
    transition: all 0.3s linear;
    position: relative;
    transform-origin: 1px;

    :first-child {
      transform: ${({ open }) => (open ? 'rotate(45deg)' : 'rotate(0)')};
    }

    :nth-child(2) {
      opacity: ${({ open }) => (open ? '0' : '1')};
      transform: ${({ open }) => (open ? 'translateX(-20px)' : 'translateX(0)')};
    }

    :nth-child(3) {
      transform: ${({ open }) => (open ? 'rotate(-45deg)' : 'rotate(0)')};
    }
  }
`;

export default Header;
