import React, { useEffect, useState } from 'react';
import { Router } from '@reach/router';
import { Modal } from 'antd';

// import components
// @ts-expect-error ts-migrate(6142) FIXME: Module '../../pages/Home' was resolved to '/Users/... Remove this comment to see the full error message
import Home from '../../pages/Home';
// @ts-expect-error ts-migrate(6142) FIXME: Module '../../pages/Profile' was resolved to '/Use... Remove this comment to see the full error message
import Profile from '../../pages/Profile';
// @ts-expect-error ts-migrate(6142) FIXME: Module '../../pages/Dashboard' was resolved to '/U... Remove this comment to see the full error message
import Dashboard from '../../pages/Dashboard';
// @ts-expect-error ts-migrate(6142) FIXME: Module '../../pages/Media' was resolved to '/Users... Remove this comment to see the full error message
import Media from '../../pages/Media';
// @ts-expect-error ts-migrate(6142) FIXME: Module '../../pages/PostType' was resolved to '/Us... Remove this comment to see the full error message
import PostType from '../../pages/PostType';
// @ts-expect-error ts-migrate(6142) FIXME: Module '../../pages/GeneralSettings' was resolved ... Remove this comment to see the full error message
import GeneralSettings from '../../pages/GeneralSettings';
// @ts-expect-error ts-migrate(6142) FIXME: Module '../../pages/Taxonomy' was resolved to '/Us... Remove this comment to see the full error message
import Taxonomy from '../../pages/Taxonomy';
// @ts-expect-error ts-migrate(6142) FIXME: Module '../../pages/Users' was resolved to '/Users... Remove this comment to see the full error message
import Users from '../../pages/Users';
// @ts-expect-error ts-migrate(6142) FIXME: Module '../editor/AdminEditor' was resolved to '/U... Remove this comment to see the full error message
import AdminEditor from '../editor/AdminEditor';
// @ts-expect-error ts-migrate(6142) FIXME: Module '../Loader' was resolved to '/Users/robinzi... Remove this comment to see the full error message
import Loader from '../Loader';

import { CmsStyles } from '../../theme';
// @ts-expect-error ts-migrate(6142) FIXME: Module '../../store' was resolved to '/Users/robin... Remove this comment to see the full error message
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
    // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    return <Loader />;
  }

  return (
    // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <>
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <CmsStyles />

      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <Router>
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <Home path={`${ROUTE_APP}`} />
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <Profile path={`${ROUTE_APP}${ROUTE_PROFILE}`} />
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <Dashboard path={`${ROUTE_APP}${ROUTE_SITE}/:siteID`} />
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <Media path={`${ROUTE_APP}${ROUTE_SITE}/:siteID${ROUTE_MEDIA}`} />
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <PostType path={`${ROUTE_APP}${ROUTE_SITE}/:siteID${ROUTE_POST_TYPE}/:postTypeID`} />
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <Taxonomy path={`${ROUTE_APP}${ROUTE_SITE}/:siteID${ROUTE_TAXONOMY}/:taxonomyID`} />

        {authUser?.capabilities?.manage_options && (
          // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <GeneralSettings path={`${ROUTE_APP}${ROUTE_SITE}/:siteID${ROUTE_SETTINGS_GENERAL}`} />
        )}

        {authUser?.capabilities?.list_users && (
          // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <Users path={`${ROUTE_APP}${ROUTE_SITE}/:siteID${ROUTE_USERS}`} />
        )}

        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <AdminEditor path={'*'} {...props} />
      </Router>

      {dialog.open && (
        // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
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
