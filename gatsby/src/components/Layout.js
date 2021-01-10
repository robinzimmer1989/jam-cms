import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';

// import app components
import Header from './Header';
import Footer from './Footer';
import Seo from './Seo';
import { theme } from '../theme';

const Layout = (props) => {
  const { globalOptions, post, children } = props;

  return (
    <>
      <Seo {...post} />
      <ThemeCss theme={theme} />
      <Header {...globalOptions?.header} />
      <Content>{children}</Content>
      <Footer {...globalOptions?.footer} />
    </>
  );
};

const ThemeCss = createGlobalStyle`
  ${({ theme }) => theme.css}
`;

const Content = styled.div`
  min-height: calc(100vh - 80px - 130px);
`;

export default Layout;
