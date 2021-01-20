import { taxonomyServices } from '../services';

export const addTaxonomy = async ({ siteID, id, title, slug, postTypes }, dispatch, config) => {
  const result = await taxonomyServices.addTaxonomy(
    { siteID, id, title, slug, postTypes },
    dispatch,
    config
  );

  if (result) {
    dispatch({ type: `ADD_TAXONOMY`, payload: { ...result, siteID } });
  }
  return result;
};

export const updateTaxonomy = async ({ siteID, id, title, slug, postTypes }, dispatch, config) => {
  const result = await taxonomyServices.updateTaxonomy(
    { siteID, id, title, slug, postTypes },
    dispatch,
    config
  );

  if (result) {
    dispatch({ type: `UPDATE_TAXONOMY`, payload: { ...result, siteID } });
  }

  return result;
};

export const deleteTaxonomy = async ({ siteID, id }, dispatch, config) => {
  const result = await taxonomyServices.deleteTaxonomy({ siteID, id }, dispatch, config);

  if (result) {
    dispatch({ type: `DELETE_TAXONOMY`, payload: { ...result, siteID } });
  }

  return result;
};
