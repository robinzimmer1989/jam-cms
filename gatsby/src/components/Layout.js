import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';

// import app components
import Header from './Header';
import Footer from './Footer';
import Seo from './Seo';
import { theme } from '../theme';

const Layout = (props) => {
  const { jamCMS, pageContext, seo, children } = props;

  return (
    <>
      <Seo seo={seo} />
      <ThemeCss theme={theme} />

      {pageContext?.globalOptions?.header && (
        <Header jamCMS={jamCMS} {...pageContext?.globalOptions?.header} />
      )}
      <Content>{children}</Content>
      {pageContext?.globalOptions?.footer && <Footer {...pageContext?.globalOptions?.footer} />}
    </>
  );
};

const ThemeCss = createGlobalStyle`
  ${theme}
`;

const Content = styled.div`
  min-height: calc(100vh - 80px - 130px);
`;

export default Layout;
