import React, { useEffect } from 'react';
import { Router } from '@reach/router';

// import components
// @ts-expect-error ts-migrate(6142) FIXME: Module '../editor/PreviewEditor' was resolved to '... Remove this comment to see the full error message
import PreviewEditor from '../editor/PreviewEditor';
// @ts-expect-error ts-migrate(6142) FIXME: Module '../Loader' was resolved to '/Users/robinzi... Remove this comment to see the full error message
import Loader from '../Loader';

// @ts-expect-error ts-migrate(6142) FIXME: Module '../../store' was resolved to '/Users/robin... Remove this comment to see the full error message
import { useStore } from '../../store';
import { previewActions } from '../../actions';
import { getPreviewID } from '../../utils/auth';

const PreviewRouter = (props: any) => {
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
    // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    return <Loader />;
  }

  return (
    // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <Router>
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <PreviewEditor path={'*'} {...props} />
    </Router>
  );
};

export default PreviewRouter;
