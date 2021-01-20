import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'gatsby';

// import app components
import Logo from '../icons/jamCMS.svg';
import Github from '../icons/github.svg';
import { colors } from '../theme';

const Header = (props) => {
  const { jamCMS, menu, breakpoint } = props;

  const [open, setOpen] = useState();

  return (
    <Container sidebar={jamCMS?.sidebar} breakpoint={breakpoint} open={open}>
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
              <ExternalNavItem
                href="https://github.com/robinzimmer1989/jam-cms"
                target="_blank"
                breakpoint={breakpoint}
              >
                <Github />
              </ExternalNavItem>
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
    </Container>
  );
};

const Container = styled.div`
  position: fixed;
  top: 0;
  left: ${({ sidebar }) => (sidebar ? '320px' : 0)};
  width: ${({ sidebar }) => (sidebar ? 'calc(100% - 320px)' : '100%')};
  z-index: 10;
  padding: 15px 20px;
  background: #fff;
  color: ${colors.primary};
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.02), 0 2px 2px rgba(0, 0, 0, 0.02),
    0 4px 4px rgba(0, 0, 0, 0.02), 0 6px 8px rgba(0, 0, 0, 0.02), 0 8px 16px rgba(0, 0, 0, 0.02);

  @media (min-width: ${({ breakpoint }) => breakpoint}px) {
    padding: 15px 40px;
  }

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
      fill: ${colors.primary};
    }
  }
`;

const Nav = styled.nav`
  @media (max-width: ${({ breakpoint }) => breakpoint - 1}px) {
    position: fixed;
    z-index: 100;
    right: -360px;
    top: 0;
    height: 100%;
    width: 360px;
    padding: 80px 30px;
    background: ${colors.primary};
    transform: ${({ open }) => (open ? 'translateX(-100%)' : 'translateX(0)')};
    transition: ease-in-out 0.2s all;
  }

  @media (min-width: ${({ breakpoint }) => breakpoint}px) {
    flex: 1;
    justify-content: flex-end;
    margin: 0;
  }
`;

const link = css`
  display: flex;
  align-items: center;
  text-decoration: none;
  color: ${colors.primary};
  background: ${colors.background};
  padding: 8px 16px;
  border-radius: 5px;
  font-size: 14px;

  &:hover {
    background: #d1d7e0;
  }

  @media (max-width: ${({ breakpoint }) => breakpoint - 1}px) {
    display: block;
    text-align: center;
    margin: 5px 0;
  }

  @media (min-width: ${({ breakpoint }) => breakpoint}px) {
    margin: 0 12px;
    transform: translateX(10px);
  }
`;

const NavItem = styled(Link)`
  ${link}
`;

const ExternalNavItem = styled.a`
  ${link}
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
        right: 20px;
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
    background: ${({ open }) => (open ? colors.primaryContrast : colors.primary)};
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
