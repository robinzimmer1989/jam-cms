import React from 'react';

// import app components
import AuthProvider from './components/AuthProvider';
import Loader from './components/Loader';
import { StoreProvider } from './store';

const Router = React.lazy(() => import('./components/router/Router'));

const JamCMS = (props) => {
  return (
    <React.Suspense fallback={<Loader />}>
      <StoreProvider {...props}>
        <AuthProvider>
          <Router pageContext={props?.pageContext} defaultComponent={props.children} />
        </AuthProvider>
      </StoreProvider>
    </React.Suspense>
  );
};

export default JamCMS;
