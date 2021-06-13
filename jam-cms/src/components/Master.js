import React, { useEffect, useState } from 'react';
import { Router } from '@reach/router';
import { Modal } from 'antd';

// import components
import Home from '../pages/Home';
import Profile from '../pages/Profile';
import PostEditor from '../pages/PostEditor';
import Dashboard from '../pages/Dashboard';
import Media from '../pages/Media';
import PostType from '../pages/PostType';
import GeneralSettings from '../pages/GeneralSettings';
import Taxonomy from '../pages/Taxonomy';
import Users from '../pages/Users';

import Loader from './Loader';
import PrivateRoute from './PrivateRoute';

import { CmsStyles } from '../theme';
import { useStore } from '../store';
import { authActions, userActions, siteActions, previewActions } from '../actions';
import { isPreview } from '../utils/auth';
import {
  ROUTE_APP,
  ROUTE_PROFILE,
  ROUTE_SITE,
  ROUTE_MEDIA,
  ROUTE_POST_TYPE,
  ROUTE_SETTINGS_GENERAL,
  ROUTE_USERS,
  ROUTE_TAXONOMY,
} from '../routes';

const Master = (props) => {
  const { defaultComponent } = props;

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

  const previewID = isPreview();

  // timers for refresh token and site updates
  const [refreshTimer, setRefreshTimer] = useState(0);
  const [updatesTimer, setUpdatesTimer] = useState(0);

  useEffect(() => {
    // activate timer for refresh token
    const refreshID = setInterval(() => {
      setRefreshTimer((time) => time + 1);
    }, 45000); // 45 seconds

    // activate timer for site updates
    const updatesID = setInterval(() => {
      setUpdatesTimer((time) => time + 1);
    }, 10000); // 10 seconds

    // Clear both timers
    return () => {
      clearInterval(refreshID);
      clearInterval(updatesID);
    };
  }, []);

  useEffect(() => {
    const loadUser = async () => {
      await userActions.getAuthUser({}, dispatch, config);
    };

    loadUser();
  }, []);

  useEffect(() => {
    const loadSite = async () => {
      if (previewID) {
        await previewActions.getSitePreview({ siteID: config.siteID, previewID }, dispatch, config);
      } else {
        const result = await siteActions.getSite({ siteID: config.siteID }, dispatch, config);

        if (result) {
          dispatch({ type: 'ADD_SITE', payload: result });

          if (!siteHasChanged) {
            // Silently update site in editor if there are no changes
            dispatch({ type: 'ADD_EDITOR_SITE', payload: result });
          }
        }
      }
    };

    loadSite();
  }, [updatesTimer, previewID]);

  useEffect(() => {
    const refreshToken = async () => {
      await authActions.refreshToken({}, dispatch, config);
    };

    if (refreshTimer > 0) {
      refreshToken();
    }
  }, [refreshTimer]);

  if (!sites[siteID]) {
    return <Loader />;
  }

  return (
    <>
      <CmsStyles />

      <Router>
        <PrivateRoute path={`${ROUTE_APP}`} component={Home} />

        <PrivateRoute path={`${ROUTE_APP}${ROUTE_PROFILE}`} component={Profile} />

        <PrivateRoute path={`${ROUTE_APP}${ROUTE_SITE}/:siteID`} component={Dashboard} />

        <PrivateRoute path={`${ROUTE_APP}${ROUTE_SITE}/:siteID${ROUTE_MEDIA}`} component={Media} />

        <PrivateRoute
          path={`${ROUTE_APP}${ROUTE_SITE}/:siteID${ROUTE_POST_TYPE}/:postTypeID`}
          component={PostType}
        />

        <PrivateRoute
          path={`${ROUTE_APP}${ROUTE_SITE}/:siteID${ROUTE_TAXONOMY}/:taxonomyID`}
          component={Taxonomy}
        />

        {authUser?.capabilities?.manage_options && (
          <PrivateRoute
            path={`${ROUTE_APP}${ROUTE_SITE}/:siteID${ROUTE_SETTINGS_GENERAL}`}
            component={GeneralSettings}
          />
        )}

        {authUser?.capabilities?.list_users && (
          <PrivateRoute
            path={`${ROUTE_APP}${ROUTE_SITE}/:siteID${ROUTE_USERS}`}
            component={Users}
          />
        )}

        <PrivateRoute path={'*'} component={PostEditor} defaultComponent={defaultComponent} />
      </Router>

      {dialog.open && (
        <Modal
          transitionName="none"
          maskTransitionName="none"
          title={dialog.title}
          visible={true}
          onCancel={() => dispatch({ type: 'CLOSE_DIALOG' })}
          children={dialog.component}
          width={dialog.width}
          footer={null}
        />
      )}
    </>
  );
};

export default Master;
