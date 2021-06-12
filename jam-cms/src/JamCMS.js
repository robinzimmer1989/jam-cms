import React from 'react';

// import external css files
import 'minireset.css';
import 'antd/dist/antd.css';
import 'jodit/build/jodit.min.css';

// import app components
import Loader from './components/Loader';
import { StoreProvider } from './store';

const Master = React.lazy(() => import('./components/Master'));

const JamCMS = (props) => {
  return (
    <React.Suspense fallback={<Loader />}>
      <StoreProvider {...props}>
        <Master defaultComponent={props.children} />
      </StoreProvider>
    </React.Suspense>
  );
};

export default JamCMS;
