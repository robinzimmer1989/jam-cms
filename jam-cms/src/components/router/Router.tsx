import React from 'react';
import { Redirect } from '@reach/router';

// import external css files
import '../../styles/antd.css';
import '../../styles/jodit.min.css';

// import components
import AdminRouter from './AdminRouter';
import PreviewRouter from './PreviewRouter';
import PrivateRouter from './PrivateRouter';

import useAuth from '../../hooks/useAuth';
import useSite from '../../hooks/useSite';
import { useStore } from '../../store';
import { getPreviewID, getUser } from '../../utils/auth';

const Router = (props: any) => {
  const [
    {
      authState: { authUser },
    },
  ] = useStore();

  // Get 'capabilities' information from local storage to avoid unnecessary waiting to fetch authUser.
  // Technically, someone could manipulate those values manually, but the API call for site or post afterwards would fail anyway.
  const storageUser = getUser();

  useAuth();
  useSite();

  if (getPreviewID()) {
    return <PreviewRouter {...props} />;
  } else if (authUser?.capabilities?.edit_posts || storageUser?.capabilities?.edit_posts) {
    return <AdminRouter {...props} />;
  } else if (authUser?.capabilities?.read || storageUser?.capabilities?.read) {
    return <PrivateRouter {...props} />;
  } else {
    return <Redirect to="/jam-cms" noThrow />;
  }
};

export default Router;
