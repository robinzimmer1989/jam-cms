import React, { useEffect } from 'react';
import { Router as ReachRouter } from '@reach/router';

// import app components
import Dashboard from './appPages/Dashboard';
import Media from './appPages/Media';
import Collections from './appPages/Collections';
import Collection from './appPages/Collection';
import PostEditor from './appPages/PostEditor';
import GeneralSettings from './appPages/GeneralSettings';
import Editors from './appPages/Editors';
import Options from './appPages/Options';
import FourOhFour from './appPages/FourOhFour';

import {
  ROUTE_MEDIA,
  ROUTE_COLLECTIONS,
  ROUTE_EDITOR,
  ROUTE_SETTINGS_GENERAL,
  ROUTE_SETTINGS_COLLECTIONS,
  ROUTE_EDITORS,
  ROUTE_OPTIONS,
} from '../routes';
import { siteActions } from '../actions';
import { useStore } from '../store';

const Router = (props) => {
  const { siteID = 'default', theme, templates } = props;

  const [
    {
      config,
      globalOptions,
      authState: { authUser },
      cmsState: { sites },
    },
    dispatch,
  ] = useStore();

  useEffect(() => {
    const loadSite = async () => {
      await siteActions.getSite({ siteID }, dispatch, config);
    };

    loadSite();
  }, [siteID]);

  if (!sites[siteID]) {
    return null;
  }

  return (
    <>
      <ReachRouter>
        <Dashboard path="/" />
        <Media path={`${ROUTE_MEDIA}`} />
        <Collection path={`${ROUTE_COLLECTIONS}/:postTypeID`} />
        <PostEditor
          path={`${ROUTE_COLLECTIONS}/:postTypeID${ROUTE_EDITOR}/:postID`}
          theme={theme}
          templates={templates}
        />

        {globalOptions && globalOptions.filter((o) => !o.hide).length > 0 && (
          <Options path={`${ROUTE_OPTIONS}`} />
        )}

        {authUser?.capabilities?.manage_options && (
          <GeneralSettings path={ROUTE_SETTINGS_GENERAL} />
        )}
        {authUser?.capabilities?.manage_options && (
          <Collections path={ROUTE_SETTINGS_COLLECTIONS} />
        )}
        {authUser?.capabilities?.list_users && <Editors path={ROUTE_EDITORS} />}

        <FourOhFour path="*" />
      </ReachRouter>
    </>
  );
};

export default Router;
