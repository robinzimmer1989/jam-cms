import React from 'react';
import Helmet from 'react-helmet';

// import app components
import Header from './header/Header';
import Footer from './footer/Footer';
import Seo from './Seo';

const Layout = (props) => {
  const { jamCMS, pageContext, seo, children } = props;

  const colors = pageContext?.globalOptions?.colors;

  return (
    <>
      <Seo seo={seo} />

      <Helmet>
        <style>
          {`
            .bg-primary {
              background-color: ${colors?.primary};
            }

            .bg-primary-contrast {
              background-color: ${colors?.primarycontrast};
            }

            .text-primary {
              color: ${colors?.primary};
            }

            .text-primary-contrast {
              color: ${colors?.primarycontrast};
            }

            .bg-secondary {
              background-color: ${colors?.secondary};
            }

            .bg-secondary-contrast {
              background-color: ${colors?.secondarycontrast};
            }

            .text-secondary {
              color: ${colors?.secondary};
            }

            .text-secondary-contrast {
              color: ${colors?.secondarycontrast};
            }

            .bg-background {
              background-color: ${colors?.background};
            }
          `}
        </style>
      </Helmet>

      <Header jamCMS={jamCMS} {...pageContext?.globalOptions?.header} />

      {children}

      <Footer {...pageContext?.globalOptions?.footer} />
    </>
  );
};

export default Layout;
