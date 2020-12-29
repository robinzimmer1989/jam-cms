import React from 'react';
import { createGlobalStyle } from 'styled-components';

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
      {children}
      <Footer {...globalOptions?.footer} />
    </>
  );
};

const ThemeCss = createGlobalStyle`
  ${({ theme }) => theme.css}
`;

export default Layout;
