import { collectionServices } from '../services';

export const addCollection = async ({ siteID, title, slug }, dispatch) => {
  const result = await collectionServices.addCollection({ siteID, title, slug });

  if (result) {
    dispatch({
      type: `ADD_COLLECTION`,
      payload: result,
    });
  }
  return result;
};

export const updateCollection = async ({ siteID, id, title, slug, template }, dispatch) => {
  const result = await collectionServices.updateCollection({ siteID, id, title, slug, template });

  if (result) {
    dispatch({
      type: `UPDATE_COLLECTION`,
      payload: result,
    });
  }
  return result;
};

export const deleteCollection = async ({ siteID, id }, dispatch) => {
  const result = await collectionServices.deleteCollection({ siteID, id });

  if (result) {
    dispatch({
      type: `DELETE_COLLECTION`,
      payload: result,
    });
  }
  return result;
};
