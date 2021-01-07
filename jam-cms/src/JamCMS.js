import React from 'react';
import { ThemeProvider } from 'styled-components';

// import app components
import Loader from './components/Loader';
import { StoreProvider } from './store';

const Master = React.lazy(() => import('./components/Master'));

const JamCMS = (props) => {
  const { templates, theme, source, globalOptions, pageProps } = props;

  return (
    <React.Suspense fallback={<Loader />}>
      <ThemeProvider theme={theme || {}}>
        <StoreProvider source={source} globalOptions={globalOptions}>
          <Master theme={theme} templates={templates} pageProps={pageProps} />
        </StoreProvider>
      </ThemeProvider>
    </React.Suspense>
  );
};

export default JamCMS;
