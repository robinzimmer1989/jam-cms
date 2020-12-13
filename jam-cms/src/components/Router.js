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

import {
  ROUTE_MEDIA,
  ROUTE_COLLECTIONS,
  ROUTE_EDITOR,
  ROUTE_SETTINGS_GENERAL,
  ROUTE_SETTINGS_COLLECTIONS,
  ROUTE_SITE_EDITORS,
} from '../routes';
import { siteActions } from '../actions';
import { useStore } from '../store';

const Router = (props) => {
  const { siteID = 'default', theme, blocks } = props;

  const [
    {
      config,
      authState: { authUser },
      cmsState: { sites },
    },
    dispatch,
  ] = useStore();

  useEffect(() => {
    const loadSite = async () => {
      await siteActions.getSite({ siteID, blocks }, dispatch, config);
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
          blocks={blocks}
        />
        {authUser?.capabilities?.manage_options && (
          <GeneralSettings path={ROUTE_SETTINGS_GENERAL} />
        )}
        {authUser?.capabilities?.manage_options && (
          <Collections path={ROUTE_SETTINGS_COLLECTIONS} />
        )}
        {authUser?.capabilities?.list_users && <Editors path={ROUTE_SITE_EDITORS} />}
      </ReachRouter>
    </>
  );
};

export default Router;
