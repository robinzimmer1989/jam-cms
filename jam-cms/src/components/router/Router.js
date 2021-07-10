import React from 'react';

// import external css files
import 'minireset.css';
import 'antd/dist/antd.css';
import 'jodit/build/jodit.min.css';

// import components
import Admin from './Admin';
import Preview from './Preview';
import Private from './Private';

import { useStore } from '../../store';
import { getPreviewID } from '../../utils/auth';

const Router = (props) => {
  const [
    {
      authState: { authUser },
    },
  ] = useStore();

  const previewID = getPreviewID();

  if (previewID) {
    return <Preview {...props} />;
  } else if (authUser?.capabilities?.edit_posts) {
    return <Admin {...props} />;
  } else if (authUser?.capabilities?.read) {
    return <Private {...props} />;
  } else {
    return null;
  }
};

export default Router;
