import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';

// import app components
import Edges from './Edges';
import Github from '../icons/github.svg';

const Footer = (props) => {
  const { footermenu } = props;

  return (
    <Container>
      <Edges size="lg">
        <Grid>
          {footermenu && footermenu.length > 0 && (
            <Nav>
              {footermenu.map((o, i) => {
                return (
                  <NavItem key={i} to={o.url}>
                    {o.title}
                  </NavItem>
                );
              })}
            </Nav>
          )}

          <ExternalNavItem href="https://github.com/robinzimmer1989/jam-cms" target="_blank">
            <Github />
          </ExternalNavItem>
        </Grid>
      </Edges>
    </Container>
  );
};

const Container = styled.div`
  padding: 40px 0 60px;
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.primarycontrast};
`;

const Grid = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const Nav = styled.nav`
  width: 100%;
  max-width: 300px;
  display: flex;
  flex-direction: column;
  margin: 0;
`;

const NavItem = styled(Link)`
  display: block;
  padding: 10px 0;
`;

const ExternalNavItem = styled.a`
  display: flex;
  align-items: center;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.primary};
  background: ${({ theme }) => theme.colors.background};
  padding: 8px 16px;
  border-radius: 5px;
  font-size: 14px;

  &:hover {
    background: #d1d7e0;
  }
`;

export default Footer;
