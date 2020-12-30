import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';

// import app components
import Layout from '../../components/Layout';
import Edges from '../../components/Edges';
import Wysiwyg from '../../components/Wysiwyg';

import { colors } from '../../theme';

const Template = (props) => {
  const {
    pageContext: { content, globalOptions },
  } = props;

  return (
    <Layout {...props.pageContext}>
      <Edges size="lg">
        <SidebarContent>
          <Sidebar>
            {globalOptions?.sidebarmenu && (
              <Nav>
                {globalOptions.sidebarmenu.map((o, i) => {
                  return (
                    <NavItem key={i} to={o.url}>
                      {o.title}
                    </NavItem>
                  );
                })}
              </Nav>
            )}
          </Sidebar>
          <Content>
            {content?.title && <Headline>{content.title}</Headline>}
            {content?.text && (
              <WysiwygContainer>
                <Wysiwyg>{content.text}</Wysiwyg>
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
  width: 100%;
  padding: 30px;

  @media (min-width: 768px) {
    width: 250px;
    padding: 40px 40px 40px 0;
    border-right: 1px solid #eee;
  }
`;

const Nav = styled.nav`
  width: 100%;
`;

const NavItem = styled(Link)`
  display: block;
  padding: 10px 0;
  text-decoration: none;
  color: ${colors.primary};
`;

const Content = styled.div`
  width: 100%;

  @media (min-width: 768px) {
    width: calc(100% - 250px);
  }
`;

const Headline = styled.h1`
  padding: 40px;
  border-bottom: 1px solid #eee;
`;

const WysiwygContainer = styled.div`
  padding: 40px 40px 100px;
`;

export default Template;

export const PageDocumentationTemplate = {
  id: 'documentation',
  label: 'Documentation',
  postTypeID: 'page',
  component: Template,
  fields: [
    {
      id: 'header',
      global: true,
    },
    {
      id: 'sidebarmenu',
      global: true,
    },
    {
      id: 'title',
      label: 'Title',
      type: 'text',
    },
    {
      id: 'text',
      label: 'Text',
      type: 'wysiwyg',
    },
  ],
};
