import React from 'react';

// import external css files
import 'minireset.css';
import 'antd/dist/antd.css';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import 'draft-js/dist/Draft.css';

// import app components
import Loader from './components/Loader';
import { StoreProvider } from './store';

const Master = React.lazy(() => import('./components/Master'));

const JamCMS = (props) => {
  const { templates, source, globalOptions, settings, children: defaultComponent } = props;

  return (
    <React.Suspense fallback={<Loader />}>
      <StoreProvider source={source} globalOptions={globalOptions} settings={settings}>
        <Master templates={templates} defaultComponent={defaultComponent} />
      </StoreProvider>
    </React.Suspense>
  );
};

export default JamCMS;
