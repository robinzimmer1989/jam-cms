import React, { useEffect } from 'react';

// import external css files
import '../../styles/antd.min.css';
import '../../styles/jodit.min.css';

// import components
import AdminRouter from './AdminRouter';
import PreviewRouter from './PreviewRouter';
import PrivateRouter from './PrivateRouter';
import Loader from '../Loader';

import useAuth from '../../hooks/useAuth';
import useSite from '../../hooks/useSite';

import { getPreviewID } from '../../utils/auth';
import { setConfig } from '../../redux/slices/cmsSlice';
import { RootState, useAppSelector, useAppDispatch } from '../../redux';

const Router = (props: any) => {
  const { config } = props;

  const {
    auth: { user: authUser },
  } = useAppSelector((state: RootState) => state);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setConfig(config));
  }, []);

  useAuth();
  useSite();

  if (getPreviewID()) {
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
