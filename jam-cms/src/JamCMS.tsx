import React from 'react';

// import app components
import Loader from './components/Loader';
import { StoreProvider } from './store';

const Router = React.lazy(() => import('./components/router/Router'));

const JamCMS = (props: any) => {
  return (
    <React.Suspense fallback={<Loader />}>
      <StoreProvider {...props}>
        <Router pageContext={props?.pageContext} defaultComponent={props.children} />
      </StoreProvider>
    </React.Suspense>
  );
};

export default JamCMS;
