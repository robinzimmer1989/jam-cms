import React, { useEffect } from 'react';
import { Router } from '@reach/router';

// import components
import PostEditor from '../../pages/PostEditor';
import Loader from '../Loader';

import { useStore } from '../../store';
import { previewActions } from '../../actions';
import { getPreviewID } from '../../utils/auth';

const Preview = (props) => {
  const [
    {
      config,
      cmsState: { sites, siteID },
    },
    dispatch,
  ] = useStore();

  const previewID = getPreviewID();

  useEffect(() => {
    const loadPreview = async () => {
      await previewActions.getSitePreview({ siteID: config.siteID, previewID }, dispatch, config);
    };

    if (previewID) {
      loadPreview();
    }
  }, [previewID]);

  // Wait until site is loaded
  if (!sites[siteID]) {
    return <Loader />;
  }

  return (
    <Router>
      <PostEditor path={'*'} {...props} />
    </Router>
  );
};

export default Preview;
