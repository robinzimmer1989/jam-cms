import { navigate } from '@reach/router';
import { set } from 'lodash';
import produce from 'immer';

import { siteServices } from '../services';
import getRoute from '../routes';

export const addSite = async ({ title, ownerID }, dispatch, config) => {
  const result = await siteServices.addSite({ title, ownerID }, dispatch, config);

  if (result) {
    dispatch({ type: `ADD_SITE`, payload: result });
    navigate(getRoute(`dashboard`, { siteID: result.id }));
  }

  return result;
};

export const updateSite = async (
  {
    id,
    title,
    settings,
    frontPage,
    deploymentBuildHook,
    deploymentBadgeImage,
    deploymentBadgeLink,
    apiKey,
  },
  dispatch,
  config
) => {
  const result = await siteServices.updateSite(
    {
      id,
      title,
      settings,
      frontPage,
      deploymentBuildHook,
      deploymentBadgeImage,
      deploymentBadgeLink,
      apiKey,
    },
    dispatch,
    config
  );

  if (result) {
    dispatch({ type: `ADD_SITE`, payload: result });
    dispatch({ type: `ADD_EDITOR_SITE`, payload: result });
    dispatch({ type: `SET_HAS_CHANGED`, payload: false });
  }

  return result;
};

export const deleteSite = async ({ id }, dispatch, config) => {
  const result = await siteServices.deleteSite({ id }, dispatch, config);

  if (result) {
    dispatch({ type: `DELETE_SITE`, payload: result });
  }

  return result;
};

export const getSites = async (args, dispatch, config) => {
  const result = await siteServices.getSites(args, dispatch, config);

  if (result) {
    dispatch({ type: `ADD_SITES`, payload: result });
  }

  return result;
};

export const getSite = async ({ siteID, blocks }, dispatch, config) => {
  let result = await siteServices.getSite({ siteID }, dispatch, config);

  if (result) {
    const nextResult = produce(result, (draft) => {
      set(draft, `settings.header.label`, blocks.header.label);
      set(draft, `settings.footer.label`, blocks.footer.label);
      return draft;
    });

    dispatch({ type: `ADD_SITE`, payload: nextResult });
  }

  return result;
};

export const addSiteToEditor = ({ site }, dispatch) => {
  dispatch({
    type: `ADD_EDITOR_SITE`,
    payload: site,
  });
};
