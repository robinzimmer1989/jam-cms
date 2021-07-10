import React from 'react';
import { Router } from '@reach/router';

// import components
// @ts-expect-error ts-migrate(6142) FIXME: Module '../editor/PrivateEditor' was resolved to '... Remove this comment to see the full error message
import PrivateEditor from '../editor/PrivateEditor';
// @ts-expect-error ts-migrate(6142) FIXME: Module '../../store' was resolved to '/Users/robin... Remove this comment to see the full error message
import { useStore } from '../../store';

const PrivateRouter = (props: any) => {
  const [{ config }] = useStore();

  // We don't need to load the PrivateEditor if page is published
  if (props?.pageContext?.status === 'publish') {
    return React.cloneElement(props?.defaultComponent, { source: config.source });
  }

  return (
    // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <Router>
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <PrivateEditor path={'*'} {...props} />
    </Router>
  );
};

export default PrivateRouter;
