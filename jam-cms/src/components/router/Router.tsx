import React from 'react';

// import external css files
import 'minireset.css';
import 'antd/dist/antd.css';
import 'jodit/build/jodit.min.css';

// import components
// @ts-expect-error ts-migrate(6142) FIXME: Module './AdminRouter' was resolved to '/Users/rob... Remove this comment to see the full error message
import AdminRouter from './AdminRouter';
// @ts-expect-error ts-migrate(6142) FIXME: Module './PreviewRouter' was resolved to '/Users/r... Remove this comment to see the full error message
import PreviewRouter from './PreviewRouter';
// @ts-expect-error ts-migrate(6142) FIXME: Module './PrivateRouter' was resolved to '/Users/r... Remove this comment to see the full error message
import PrivateRouter from './PrivateRouter';

// @ts-expect-error ts-migrate(6142) FIXME: Module '../../store' was resolved to '/Users/robin... Remove this comment to see the full error message
import { useStore } from '../../store';
import { getPreviewID } from '../../utils/auth';

const Router = (props: any) => {
  const [
    {
      authState: { authUser },
    },
  ] = useStore();

  const previewID = getPreviewID();

  if (previewID) {
    // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    return <PreviewRouter {...props} />;
  } else if (authUser?.capabilities?.edit_posts) {
    // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    return <AdminRouter {...props} />;
  } else if (authUser?.capabilities?.read) {
    // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    return <PrivateRouter {...props} />;
  } else {
    return null;
  }
};

export default Router;
