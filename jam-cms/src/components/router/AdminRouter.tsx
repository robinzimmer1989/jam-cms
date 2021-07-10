import React, { useEffect, useState } from 'react';
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
import { siteActions } from '../../actions';
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
  // @ts-expect-error ts-migrate(2461) FIXME: Type '{}' is not an array type.
  const [
    {
      config,
      authState: { authUser },
      appState: { dialog },
      cmsState: { sites, siteID },
      editorState: { siteHasChanged },
    },
    dispatch,
  ] = useStore();

  // timer for refresh token and site updates
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    const intervalID = setInterval(() => {
      setTimer((time) => time + 1);
    }, 10000); // 10 seconds

    // Clear timer
    return () => {
      clearInterval(intervalID);
    };
  }, []);

  useEffect(() => {
    const loadSite = async () => {
      await siteActions.getSite({ siteID: config.siteID, siteHasChanged }, dispatch, config);
    };

    loadSite();
  }, [timer]);

  // Wait until site is loaded
  if (!sites[siteID]) {
    return <Loader />;
  }

  return (
    <>
      <CmsStyles />

      <Router>
        {/* @ts-expect-error ts-migrate(2322) FIXME: Type '{ path: string; }' is not assignable to type... Remove this comment to see the full error message */}
        <Home path={`${ROUTE_APP}`} />
        {/* @ts-expect-error ts-migrate(2322) FIXME: Type '{ path: string; }' is not assignable to type... Remove this comment to see the full error message */}
        <Profile path={`${ROUTE_APP}${ROUTE_PROFILE}`} />
        {/* @ts-expect-error ts-migrate(2322) FIXME: Type '{ path: string; }' is not assignable to type... Remove this comment to see the full error message */}
        <Dashboard path={`${ROUTE_APP}${ROUTE_SITE}/:siteID`} />
        {/* @ts-expect-error ts-migrate(2322) FIXME: Type '{ path: string; }' is not assignable to type... Remove this comment to see the full error message */}
        <Media path={`${ROUTE_APP}${ROUTE_SITE}/:siteID${ROUTE_MEDIA}`} />
        <PostType path={`${ROUTE_APP}${ROUTE_SITE}/:siteID${ROUTE_POST_TYPE}/:postTypeID`} />
        <Taxonomy path={`${ROUTE_APP}${ROUTE_SITE}/:siteID${ROUTE_TAXONOMY}/:taxonomyID`} />

        {authUser?.capabilities?.manage_options && (
          // @ts-expect-error ts-migrate(2322) FIXME: Type '{ path: string; }' is not assignable to type... Remove this comment to see the full error message
          <GeneralSettings path={`${ROUTE_APP}${ROUTE_SITE}/:siteID${ROUTE_SETTINGS_GENERAL}`} />
        )}

        {authUser?.capabilities?.list_users && (
          // @ts-expect-error ts-migrate(2322) FIXME: Type '{ path: string; }' is not assignable to type... Remove this comment to see the full error message
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
