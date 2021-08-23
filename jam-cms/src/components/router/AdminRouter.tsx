import React from 'react';
import { Router } from '@reach/router';
import { Modal } from 'antd';

// import components
import Profile from '../../pages/Profile';
import Dashboard from '../../pages/Dashboard';
import Media from '../../pages/Media';
import PostType from '../../pages/PostType';
import Settings from '../../pages/Settings';
import Taxonomy from '../../pages/Taxonomy';
import Users from '../../pages/Users';
import AdminEditor from '../editor/AdminEditor';
import { CmsStyles } from '../../theme';
import { RootState, useAppSelector, useAppDispatch, uiActions } from '../../redux';

import {
  ROUTE_APP,
  ROUTE_PROFILE,
  ROUTE_MEDIA,
  ROUTE_POST_TYPE,
  ROUTE_SETTINGS_GENERAL,
  ROUTE_USERS,
  ROUTE_TAXONOMY,
} from '../../routes';

const AdminRouter = (props: any) => {
  const { fields } = props;

  const {
    ui: { dialog },
    auth: { user: authUser },
  } = useAppSelector((state: RootState) => state);

  const dispatch = useAppDispatch();

  return (
    <>
      <CmsStyles />

      <Router>
        <Profile path={`${ROUTE_APP}${ROUTE_PROFILE}`} fields={fields} />
        <Dashboard path={`${ROUTE_APP}`} fields={fields} />
        <Media path={`${ROUTE_APP}${ROUTE_MEDIA}`} fields={fields} />
        <PostType path={`${ROUTE_APP}${ROUTE_POST_TYPE}/:postTypeID`} fields={fields} />
        <Taxonomy path={`${ROUTE_APP}${ROUTE_TAXONOMY}/:taxonomyID`} fields={fields} />

        {authUser?.capabilities?.manage_options && (
          <Settings path={`${ROUTE_APP}${ROUTE_SETTINGS_GENERAL}`} fields={fields} />
        )}

        {authUser?.capabilities?.list_users && (
          <Users path={`${ROUTE_APP}${ROUTE_USERS}`} fields={fields} />
        )}

        <AdminEditor path={'*'} {...props} fields={fields} />
      </Router>

      {dialog.open && (
        <Modal
          transitionName="none"
          maskTransitionName="none"
          title={dialog.title}
          visible={dialog.open}
          onCancel={() => dispatch(uiActions.hideDialog())}
          destroyOnClose
          children={dialog.component}
          width={dialog.width}
          footer={null}
        />
      )}
    </>
  );
};

export default AdminRouter;
