import React from 'react';
import { Router } from '@reach/router';

// import components
import PreviewEditor from '../editor/PreviewEditor';
import Loader from '../Loader';

import { useStore } from '../../store';

const PreviewRouter = (props: any) => {
  const [
    {
      cmsState: { sites, siteID },
    },
  ] = useStore();

  // Wait until site is loaded
  if (!sites[siteID]) {
    return <Loader text="Load Website" />;
  }

  return (
    <Router>
      <PreviewEditor path={'*'} {...props} />
    </Router>
  );
};

export default PreviewRouter;
