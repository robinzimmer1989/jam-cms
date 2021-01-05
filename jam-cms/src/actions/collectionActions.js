import { collectionServices } from '../services';

export const addCollection = async ({ siteID, id, title, slug }, dispatch, config) => {
  const result = await collectionServices.addCollection(
    { siteID, id, title, slug },
    dispatch,
    config
  );
  const formattedResult = { ...result, siteID };

  if (result) {
    dispatch({
      type: `ADD_COLLECTION`,
      payload: formattedResult,
    });
  }
  return formattedResult;
};

export const updateCollection = async ({ siteID, id, title, slug }, dispatch, config) => {
  const result = await collectionServices.updateCollection(
    { siteID, id, title, slug },
    dispatch,
    config
  );
  const formattedResult = { ...result, siteID };

  if (result) {
    dispatch({
      type: `UPDATE_COLLECTION`,
      payload: formattedResult,
    });
  }
  return formattedResult;
};

export const deleteCollection = async ({ siteID, id }, dispatch, config) => {
  const result = await collectionServices.deleteCollection({ siteID, id }, dispatch, config);
  const formattedResult = { ...result, siteID };

  if (result) {
    dispatch({
      type: `DELETE_COLLECTION`,
      payload: formattedResult,
    });
  }
  return formattedResult;
};
