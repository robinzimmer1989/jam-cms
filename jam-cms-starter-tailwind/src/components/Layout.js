import React from 'react';
import Helmet from 'react-helmet';

// import app components
import Header from './header/Header';
import Footer from './footer/Footer';

const Layout = (props) => {
  const { pageContext, children } = props;

  const colors = pageContext?.themeOptions?.colors;

  return (
    <>
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

      <Header language={pageContext?.language} {...pageContext?.themeOptions?.header} />

      {children}

      <Footer language={pageContext?.language} {...pageContext?.themeOptions?.footer} />
    </>
  );
};

export default Layout;
