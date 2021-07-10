import React from 'react';

// import app components
// @ts-expect-error ts-migrate(6142) FIXME: Module './components/AuthProvider' was resolved to... Remove this comment to see the full error message
import AuthProvider from './components/AuthProvider';
// @ts-expect-error ts-migrate(6142) FIXME: Module './components/Loader' was resolved to '/Use... Remove this comment to see the full error message
import Loader from './components/Loader';
// @ts-expect-error ts-migrate(6142) FIXME: Module './store' was resolved to '/Users/robinzimm... Remove this comment to see the full error message
import { StoreProvider } from './store';

// @ts-expect-error ts-migrate(6142) FIXME: Module './components/router/Router' was resolved t... Remove this comment to see the full error message
const Router = React.lazy(() => import('./components/router/Router'));

const JamCMS = (props: any) => {
  return (
    // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <React.Suspense fallback={<Loader />}>
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <StoreProvider {...props}>
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <AuthProvider>
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <Router pageContext={props?.pageContext} defaultComponent={props.children} />
        </AuthProvider>
      </StoreProvider>
    </React.Suspense>
  );
};

export default JamCMS;
