import React from 'react';
import { ThemeProvider } from 'styled-components';

// import external css files
import 'minireset.css';
import 'antd/dist/antd.css';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import 'draft-js-image-plugin/lib/plugin.css';
import 'draft-js/dist/Draft.css';

// import app components
import Loader from './components/Loader';
import { StoreProvider } from './store';
import { CmsStyles } from './theme';

const Master = React.lazy(() => import('./components/Master'));

const App = (props) => {
  const { templates, theme, config, globalOptions } = props;

  return (
    <>
      {typeof window !== 'undefined' && (
        <React.Suspense fallback={<Loader />}>
          <ThemeProvider theme={theme || {}}>
            <CmsStyles />
            <StoreProvider config={config} globalOptions={globalOptions}>
              <Master theme={theme} templates={templates} />
            </StoreProvider>
          </ThemeProvider>
        </React.Suspense>
      )}
    </>
  );
};

export default App;
