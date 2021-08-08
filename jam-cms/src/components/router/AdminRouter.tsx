import React from 'react';
import { Router } from '@reach/router';
import { Modal } from 'antd';

// import components
import Home from '../../pages/Home';
import Profile from '../../pages/Profile';
import Dashboard from '../../pages/Dashboard';
import Media from '../../pages/Media';
import PostType from '../../pages/PostType';
import GeneralSettings from '../../pages/GeneralSettings';
import Taxonomy from '../../pages/Taxonomy';
import Users from '../../pages/Users';
import AdminEditor from '../editor/AdminEditor';
import Loader from '../Loader';

import { CmsStyles } from '../../theme';
import { useStore } from '../../store';

import {
  ROUTE_APP,
  ROUTE_PROFILE,
  ROUTE_SITE,
  ROUTE_MEDIA,
  ROUTE_POST_TYPE,
  ROUTE_SETTINGS_GENERAL,
  ROUTE_USERS,
  ROUTE_TAXONOMY,
} from '../../routes';

const AdminRouter = (props: any) => {
  const [
    {
      config,
      authState: { authUser },
      appState: { dialog },
      cmsState: { sites, siteID },
    },
    dispatch,
  ] = useStore();

  return (
    <>
      <CmsStyles />

      <Router>
        {!!config.multisite && <Home path={`${ROUTE_APP}`} />}

        <Profile path={`${ROUTE_APP}${ROUTE_PROFILE}`} />
        <Dashboard path={`${ROUTE_APP}${ROUTE_SITE}/:siteID`} />
        <Media path={`${ROUTE_APP}${ROUTE_SITE}/:siteID${ROUTE_MEDIA}`} />
        <PostType path={`${ROUTE_APP}${ROUTE_SITE}/:siteID${ROUTE_POST_TYPE}/:postTypeID`} />
        <Taxonomy path={`${ROUTE_APP}${ROUTE_SITE}/:siteID${ROUTE_TAXONOMY}/:taxonomyID`} />

        {authUser?.capabilities?.manage_options && (
          <GeneralSettings path={`${ROUTE_APP}${ROUTE_SITE}/:siteID${ROUTE_SETTINGS_GENERAL}`} />
        )}

        {authUser?.capabilities?.list_users && (
          <Users path={`${ROUTE_APP}${ROUTE_SITE}/:siteID${ROUTE_USERS}`} />
        )}

        <AdminEditor path={'*'} {...props} />
      </Router>

      {dialog.open && (
        <Modal
          transitionName="none"
          maskTransitionName="none"
          title={dialog.title}
          visible={true}
          onCancel={() => dispatch({ type: 'CLOSE_DIALOG' })}
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
