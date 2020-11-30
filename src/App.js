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
  const { theme, blocks } = props;

  return (
    <>
      <CmsStyles />
      <ThemeProvider theme={theme || {}}>
        <StoreProvider>
          {typeof window !== 'undefined' && (
            <React.Suspense fallback={<Loader />}>
              <Master theme={theme} blocks={blocks} />
            </React.Suspense>
          )}
        </StoreProvider>
      </ThemeProvider>
    </>
  );
};

export default App;
