import { collectionServices } from '../services';

export const addCollection = async ({ siteID, id, title, slug }, dispatch, config) => {
  const result = await collectionServices.addCollection(
    { siteID, id, title, slug },
    dispatch,
    config
  );

  if (result) {
    dispatch({
      type: `ADD_COLLECTION`,
      payload: result,
    });
  }
  return result;
};

export const updateCollection = async ({ siteID, id, title, slug }, dispatch, config) => {
  const result = await collectionServices.updateCollection(
    { siteID, id, title, slug },
    dispatch,
    config
  );

  if (result) {
    dispatch({
      type: `UPDATE_COLLECTION`,
      payload: result,
    });
  }
  return result;
};

export const deleteCollection = async ({ siteID, id }, dispatch, config) => {
  const result = await collectionServices.deleteCollection({ siteID, id }, dispatch, config);

  if (result) {
    dispatch({
      type: `DELETE_COLLECTION`,
      payload: result,
    });
  }
  return result;
};
