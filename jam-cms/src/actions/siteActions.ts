import { navigate } from '@reach/router';

// import app components
import { siteServices } from '../services';
import getRoute from '../routes';

export const addSite = async ({ title }: any, dispatch: any, config: any) => {
  const result = await siteServices.addSite({ title }, dispatch, config);

  if (result) {
    dispatch({ type: 'ADD_SITE', payload: result });
    navigate(getRoute('dashboard', { siteID: result.id }));
  }

  return result;
};

export const updateSite = async (args: any, dispatch: any, config: any) => {
  const result = await siteServices.updateSite(args, dispatch, config);

  if (result) {
    dispatch({ type: 'ADD_SITE', payload: result });
    dispatch({ type: 'ADD_EDITOR_SITE', payload: result });
  }

  return result;
};

export const deleteSite = async ({ id }: any, dispatch: any, config: any) => {
  const result = await siteServices.deleteSite({ id }, dispatch, config);

  if (result) {
    dispatch({ type: `DELETE_SITE`, payload: result });
  }

  return result;
};

export const getSites = async (args: any, dispatch: any, config: any) => {
  const result = await siteServices.getSites(args, dispatch, config);

  if (result) {
    dispatch({ type: 'ADD_SITES', payload: result });
  }

  return result;
};

export const getSite = async ({ siteID, siteHasChanged }: any, dispatch: any, config: any) => {
  const result = await siteServices.getSite({ siteID }, dispatch, config);

  if (result) {
    dispatch({ type: 'ADD_SITE', payload: result });

    if (!siteHasChanged) {
      // Silently update site in editor if there are no changes
      dispatch({ type: 'ADD_EDITOR_SITE', payload: result });
    }
  }

  return result;
};

export const deploySite = async ({ id }: any, dispatch: any, config: any) => {
  const result = await siteServices.deploySite({ id }, dispatch, config);

  if (result) {
    dispatch({ type: 'ADD_SITE', payload: result });
  }

  return result;
};

export const syncFields = async ({ fields, apiKey }: any, dispatch: any, config: any) => {
  const result = await siteServices.syncFields({ fields, apiKey }, dispatch, config);

  if (result) {
    dispatch({ type: 'ADD_SITE', payload: result });
  }

  return result;
};

export const getUnpublishedChanges = async ({ siteID }: any, dispatch: any, config: any) => {
  const result = await siteServices.getUnpublishedChanges({ siteID }, dispatch, config);
  return result;
};
