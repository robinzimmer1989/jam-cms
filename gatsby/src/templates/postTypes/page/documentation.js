import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';

// import app components
import Layout from '../../../components/Layout';
import Edges from '../../../components/Edges';
import Wysiwyg from '../../../components/Wysiwyg';

import { colors } from '../../../theme';

const Template = (props) => {
  const {
    pageContext: { content, globalOptions },
  } = props;

  return (
    <Layout {...props}>
      <Edges size="lg">
        <SidebarContent>
          <Sidebar>
            {globalOptions?.sidebar?.sidebarmenu && (
              <Nav>
                {globalOptions.sidebar.sidebarmenu.map((o, i) => {
                  return (
                    <NavItem key={i} to={o.url} activeClassName="active">
                      <span>{o.title}</span>
                    </NavItem>
                  );
                })}
              </Nav>
            )}
          </Sidebar>
          <Content>
            {content?.content?.title && <Headline>{content.content.title}</Headline>}
            {content?.content?.text && (
              <WysiwygContainer>
                <Wysiwyg>{content.content.text}</Wysiwyg>
              </WysiwygContainer>
            )}
          </Content>
        </SidebarContent>
      </Edges>
    </Layout>
  );
};

const SidebarContent = styled.div`
  display: flex;
  flex-wrap: wrap;
  min-height: 300px;
`;

const Sidebar = styled.div`
  position: relative;
  width: 100%;
  padding: 30px;
  background: ${colors.secondary};

  @media (min-width: 768px) {
    width: 250px;
    min-height: calc(100vh - 80px - 130px);
    padding: 40px 0 40px 0;
    border-right: 1px solid #eee;

    &:before {
      content: '';
      position: absolute;
      right: 100%;
      top: 0;
      width: 50vw;
      height: 100%;
      background: ${colors.secondary};
    }
  }
`;

const Nav = styled.nav`
  width: 100%;
`;

const NavItem = styled(Link)`
  display: block;
  text-decoration: none;
  color: ${colors.primary};
  margin-bottom: 12px;

  span {
    display: inline-block;
    border-radius: 5px;
    padding: 8px 16px;
    transform: translateX(-16px);
    transition: ease all 0.2s;
  }

  &.active,
  &:hover {
    span {
      background: ${colors.primary};
      color: ${colors.primaryContrast};
    }
  }
`;

const Content = styled.div`
  width: 100%;

  @media (min-width: 768px) {
    width: calc(100% - 250px);
  }
`;

const Headline = styled.h1`
  padding: 30px 10px;
  border-bottom: 1px solid #eee;

  @media (min-width: 768px) {
    padding: 40px;
  }
`;

const WysiwygContainer = styled.div`
  padding: 20px 10px 40px;

  @media (min-width: 768px) {
    padding: 40px 40px 100px;
  }
`;

export default Template;
