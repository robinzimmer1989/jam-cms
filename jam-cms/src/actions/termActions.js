import { termServices } from '../services';

export const addTerm = async (
  { siteID, taxonomyID, id, title, slug, parentID, description },
  dispatch,
  config
) => {
  const result = await termServices.addTerm(
    { siteID, taxonomyID, id, title, slug, parentID, description },
    dispatch,
    config
  );

  if (result) {
    dispatch({ type: `ADD_TERM`, payload: { ...result, taxonomyID, siteID } });
  }
  return result;
};

export const updateTerm = async (
  { siteID, taxonomyID, id, title, slug, parentID, description },
  dispatch,
  config
) => {
  const result = await termServices.updateTerm(
    { siteID, taxonomyID, id, title, slug, parentID, description },
    dispatch,
    config
  );

  if (result) {
    dispatch({ type: `UPDATE_TERM`, payload: { ...result, taxonomyID, siteID } });
  }

  return result;
};

export const deleteTerm = async ({ siteID, taxonomyID, id }, dispatch, config) => {
  const result = await termServices.deleteTerm({ siteID, taxonomyID, id }, dispatch, config);

  if (result) {
    dispatch({ type: `DELETE_TERM`, payload: { ...result, taxonomyID, siteID } });
  }

  return result;
};
