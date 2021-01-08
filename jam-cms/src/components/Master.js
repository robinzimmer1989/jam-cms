import React, { useEffect } from 'react';
import { Router } from '@reach/router';
import { Modal } from 'antd';

// import components
import Home from './appPages/Home';
import Profile from './appPages/Profile';
import PostEditor from './appPages/PostEditor';
import Dashboard from './appPages/Dashboard';
import Media from './appPages/Media';
import Collections from './appPages/Collections';
import Collection from './appPages/Collection';
import GeneralSettings from './appPages/GeneralSettings';
import Editors from './appPages/Editors';
import Options from './appPages/Options';

import Loader from './Loader';
import PrivateRoute from './PrivateRoute';

import { CmsStyles } from '../theme';
import { useStore } from '../store';
import { userActions, siteActions } from '../actions';
import { isLoggedIn } from '../utils/auth';
import {
  ROUTE_APP,
  ROUTE_PROFILE,
  ROUTE_SITE,
  ROUTE_MEDIA,
  ROUTE_COLLECTIONS,
  ROUTE_SETTINGS_GENERAL,
  ROUTE_SETTINGS_COLLECTIONS,
  ROUTE_EDITORS,
  ROUTE_OPTIONS,
} from '../routes';

const Master = (props) => {
  const { theme, templates, pageProps } = props;

  const [
    {
      config,
      globalOptions,
      authState: { authUser },
      appState: { dialog },
      cmsState: { sites, siteID },
    },
    dispatch,
  ] = useStore();

  const loggedIn = isLoggedIn(config);

  useEffect(() => {
    const loadUser = async () => {
      await userActions.getAuthUser({}, dispatch, config);
    };

    const loadSite = async () => {
      await siteActions.getSite({ siteID: 'default' }, dispatch, config);
    };

    loggedIn && loadUser();
    loggedIn && loadSite();
  }, [loggedIn]);

  if (!sites[siteID]) {
    return <Loader />;
  }

  return (
    <div id="jam-cms">
      <CmsStyles />

      <Router>
        <PrivateRoute path={`${ROUTE_APP}`} component={Home} />
        <PrivateRoute path={`${ROUTE_APP}${ROUTE_PROFILE}`} component={Profile} />
        <PrivateRoute path={`${ROUTE_APP}${ROUTE_SITE}/:siteID`} component={Dashboard} />
        <PrivateRoute path={`${ROUTE_APP}${ROUTE_SITE}/:siteID${ROUTE_MEDIA}`} component={Media} />
        <PrivateRoute
          path={`${ROUTE_APP}${ROUTE_SITE}/:siteID${ROUTE_COLLECTIONS}/:postTypeID`}
          component={Collection}
        />

        {globalOptions && globalOptions.filter((o) => !o.hide).length > 0 && (
          <PrivateRoute
            path={`${ROUTE_APP}${ROUTE_SITE}/:siteID${ROUTE_OPTIONS}`}
            component={Options}
          />
        )}

        {authUser?.capabilities?.manage_options && (
          <PrivateRoute
            path={`${ROUTE_APP}${ROUTE_SITE}/:siteID${ROUTE_SETTINGS_GENERAL}`}
            component={GeneralSettings}
          />
        )}

        {authUser?.capabilities?.manage_options && (
          <PrivateRoute
            path={`${ROUTE_APP}${ROUTE_SITE}/:siteID${ROUTE_SETTINGS_COLLECTIONS}`}
            component={Collections}
          />
        )}

        {authUser?.capabilities?.list_users && (
          <PrivateRoute
            path={`${ROUTE_APP}${ROUTE_SITE}/:siteID${ROUTE_EDITORS}`}
            component={Editors}
          />
        )}

        <PrivateRoute
          path={'*'}
          component={PostEditor}
          theme={theme}
          templates={templates}
          postTypeID={pageProps.pageContext.postTypeID}
          postID={pageProps.pageContext.id}
        />
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
    </div>
  );
};

export default Master;
