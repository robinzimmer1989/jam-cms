import React, { Fragment } from 'react';
import styled from 'styled-components';
import { Link, graphql } from 'gatsby';

// import app components
import Layout from '../../../../components/Layout';
import Edges from '../../../../components/Edges';
import Wysiwyg from '../../../../components/Wysiwyg';

const Template = (props) => {
  const {
    pageContext: { globalOptions },
    data: {
      wpPage: { acf, seo },
    },
  } = props;

  return (
    <Layout {...props} seo={seo}>
      <Edges size="lg">
        <SidebarContent>
          <Sidebar>
            {globalOptions?.sidebar?.sidebarmenu && (
              <Nav>
                {globalOptions.sidebar.sidebarmenu.map((o, i) => {
                  return (
                    <Fragment key={i}>
                      <NavItem key={i} to={o.url} activeClassName="active">
                        <span>{o.title}</span>
                      </NavItem>

                      {typeof window !== 'undefined' &&
                        window.location.pathname.includes('field-types') &&
                        o.children &&
                        o.children.map((p, j) => {
                          return (
                            <NavSubItem key={j} to={p.url} activeClassName="active">
                              <span>{p.title}</span>
                            </NavSubItem>
                          );
                        })}
                    </Fragment>
                  );
                })}
              </Nav>
            )}
          </Sidebar>
          <Content>
            {acf?.content?.title && <Headline>{acf.content.title}</Headline>}
            {acf?.content?.text && (
              <WysiwygContainer>
                <Wysiwyg>{acf.content.text}</Wysiwyg>
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
  background: ${({ theme }) => theme.colors.secondary};

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
      background: ${({ theme }) => theme.colors.secondary};
    }
  }
`;

const Nav = styled.nav`
  width: 100%;
`;

const NavItem = styled(Link)`
  display: block;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.primary};
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
      background: ${({ theme }) => theme.colors.primary};
      color: ${({ theme }) => theme.colors.primarycontrast};
    }
  }
`;

const NavSubItem = styled(Link)`
  display: block;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 5px;
  margin-left: 20px;

  span {
    display: inline-block;
    border-radius: 5px;
    padding: 2px 12px;
    transform: translateX(-16px);
    transition: ease all 0.2s;
  }

  &.active,
  &:hover {
    span {
      background: ${({ theme }) => theme.colors.primary};
      color: ${({ theme }) => theme.colors.primarycontrast};
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

export const Query = graphql`
  query PageDocumentation($id: String!) {
    wpPage(id: { eq: $id }) {
      id
      databaseId
      title
      seo {
        title
        metaDesc
        opengraphImage {
          sourceUrl
        }
      }
      acf {
        content {
          title
          text
        }
      }
    }
  }
`;

export default Template;
