import { mediaServices } from '../services';

export const uploadMediaItem = async ({ siteID, file }, dispatch, config) => {
  const result = await mediaServices.addMediaItem({ siteID, file }, dispatch, config);
  const formattedResult = { ...result, siteID };

  if (result) {
    dispatch({ type: `ADD_MEDIA_ITEM`, payload: formattedResult });
  }

  return formattedResult;
};

export const getMediaItems = async ({ siteID, page, limit }, dispatch, config) => {
  const result = await mediaServices.getMediaItems({ siteID, page, limit }, dispatch, config);
  const formattedResult = { ...result, siteID };

  if (result) {
    dispatch({ type: `ADD_MEDIA_ITEMS`, payload: formattedResult });
  }

  return formattedResult;
};

export const updateMediaItem = async ({ siteID, id, altText }, dispatch, config) => {
  const result = await mediaServices.updateMediaItem({ siteID, id, altText }, dispatch, config);
  const formattedResult = { ...result, siteID };

  if (result) {
    dispatch({ type: `ADD_MEDIA_ITEM`, payload: formattedResult });
  }

  return formattedResult;
};

export const deleteMediaItem = async ({ siteID, id }, dispatch, config) => {
  const result = await mediaServices.deleteMediaItem({ siteID, id }, dispatch, config);
  const formattedResult = { ...result, siteID };

  if (result) {
    dispatch({ type: `DELETE_MEDIA_ITEM`, payload: formattedResult });
  }

  return formattedResult;
};
