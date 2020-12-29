import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';

// import app components
import Edges from './Edges';
import { colors } from '../theme';

const Footer = (props) => {
  const { footerMenu } = props;

  return (
    <Container>
      <Edges size="lg">
        <Grid>
          {footerMenu && (
            <Nav>
              {footerMenu.map((o, i) => {
                return (
                  <NavItem key={i} to={o.url}>
                    {o.title}
                  </NavItem>
                );
              })}
            </Nav>
          )}
        </Grid>
      </Edges>
    </Container>
  );
};

const Container = styled.div`
  padding: 40px 0 60px;
  background: ${colors.primary};
  color: ${colors.primaryContrast};
`;

const Grid = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Nav = styled.nav`
  flex: 1;
  display: flex;
  flex-direction: column;
  margin: 0;
`;

const NavItem = styled(Link)`
  display: block;
  padding: 10px 0;
`;

export default Footer;
