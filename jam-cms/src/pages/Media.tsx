import React from 'react';

// import app components
// @ts-expect-error ts-migrate(6142) FIXME: Module '../components/CmsLayout' was resolved to '... Remove this comment to see the full error message
import CmsLayout from '../components/CmsLayout';
// @ts-expect-error ts-migrate(6142) FIXME: Module '../components/MediaLibrary' was resolved t... Remove this comment to see the full error message
import MediaLibrary from '../components/MediaLibrary';

const Media = () => {
  return (
    // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <CmsLayout pageTitle={`Media`}>
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <MediaLibrary />
    </CmsLayout>
  );
};

export default Media;
