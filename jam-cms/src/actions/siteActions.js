import { navigate } from '@reach/router';

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
  { id, title, settings, frontPage, deployment, apiKey },
  dispatch,
  config
) => {
  const result = await siteServices.updateSite(
    {
      id,
      title,
      settings,
      frontPage,
      deployment,
      apiKey,
    },
    dispatch,
    config
  );

  if (result) {
    dispatch({ type: `ADD_SITE`, payload: result });
    dispatch({ type: `ADD_EDITOR_SITE`, payload: result });
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

export const getSite = async ({ siteID }, dispatch, config) => {
  const result = await siteServices.getSite({ siteID }, dispatch, config);

  if (result) {
    dispatch({ type: `ADD_SITE`, payload: result });
  }

  return result;
};

export const deploySite = async ({ id }, dispatch, config) => {
  const result = await siteServices.deploySite({ id }, dispatch, config);

  if (result) {
    dispatch({ type: 'ADD_SITE', payload: result });
  }

  return result;
};
