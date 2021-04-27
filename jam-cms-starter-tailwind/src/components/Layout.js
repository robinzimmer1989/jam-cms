import React from 'react';

// import app components
import Header from './header/Header';
import Footer from './footer/Footer';
import Seo from './Seo';

const Layout = (props) => {
  const { jamCMS, pageContext, seo, children } = props;

  return (
    <>
      <Seo seo={seo} />

      <Header jamCMS={jamCMS} {...pageContext?.globalOptions?.header} />

      {children}

      <Footer {...pageContext?.globalOptions?.footer} />
    </>
  );
};

export default Layout;
