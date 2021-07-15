import React from 'react';

// import external css files
import 'minireset.css';
import 'antd/dist/antd.min.css';
import 'jodit/build/jodit.min.css';

// import components
import AdminRouter from './AdminRouter';
import PreviewRouter from './PreviewRouter';
import PrivateRouter from './PrivateRouter';
import Loader from '../Loader';

import useAuth from '../../hooks/useAuth';
import useSite from '../../hooks/useSite';
import { useStore } from '../../store';
import { getPreviewID } from '../../utils/auth';

const Router = (props: any) => {
  const [
    {
      authState: { authUser },
    },
  ] = useStore();

  useAuth();
  useSite();

  const previewID = getPreviewID();

  if (previewID) {
    return <PreviewRouter {...props} />;
  } else if (authUser?.capabilities?.edit_posts) {
    return <AdminRouter {...props} />;
  } else if (authUser?.capabilities?.read) {
    return <PrivateRouter {...props} />;
  } else {
    return <Loader />;
  }
};

export default Router;
