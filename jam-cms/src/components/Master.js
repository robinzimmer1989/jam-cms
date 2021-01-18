import React, { useEffect } from 'react';
import { Router } from '@reach/router';
import { Modal } from 'antd';

// import components
import Home from '../pages/Home';
import Profile from '../pages/Profile';
import PostEditor from '../pages/PostEditor';
import Dashboard from '../pages/Dashboard';
import Media from '../pages/Media';
import Collections from '../pages/Collections';
import Collection from '../pages/Collection';
import GeneralSettings from '../pages/GeneralSettings';
import Taxonomies from '../pages/Taxonomies';
import Taxonomy from '../pages/Taxonomy';
import Editors from '../pages/Editors';
import Options from '../pages/Options';

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
  ROUTE_SETTINGS_TAXONOMIES,
  ROUTE_EDITORS,
  ROUTE_OPTIONS,
  ROUTE_TAXONOMY,
} from '../routes';

const Master = (props) => {
  const { templates } = props;

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
    <>
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

        <PrivateRoute
          path={`${ROUTE_APP}${ROUTE_SITE}/:siteID${ROUTE_TAXONOMY}/:taxonomyID`}
          component={Taxonomy}
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

        {authUser?.capabilities?.manage_options && (
          <PrivateRoute
            path={`${ROUTE_APP}${ROUTE_SITE}/:siteID${ROUTE_SETTINGS_TAXONOMIES}`}
            component={Taxonomies}
          />
        )}

        {authUser?.capabilities?.list_users && (
          <PrivateRoute
            path={`${ROUTE_APP}${ROUTE_SITE}/:siteID${ROUTE_EDITORS}`}
            component={Editors}
          />
        )}

        <PrivateRoute path={'*'} component={PostEditor} templates={templates} />
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
