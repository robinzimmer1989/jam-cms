import { mediaServices } from '../services';

export const uploadMediaItem = async ({ siteID, file }, dispatch, config) => {
  const result = await mediaServices.addMediaItem({ siteID, file }, dispatch, config);

  if (result) {
    dispatch({ type: `ADD_MEDIA_ITEM`, payload: { ...result, siteID } });
  }

  return { ...result, siteID };
};

export const getMediaItems = async ({ siteID, page, limit }, dispatch, config) => {
  const result = await mediaServices.getMediaItems({ siteID, page, limit }, dispatch, config);

  if (result) {
    dispatch({ type: `ADD_MEDIA_ITEMS`, payload: { siteID, ...result } });
  }

  return { ...result, siteID };
};

export const updateMediaItem = async ({ siteID, id, altText }, dispatch, config) => {
  const result = await mediaServices.updateMediaItem({ siteID, id, altText }, dispatch, config);

  if (result) {
    dispatch({ type: `ADD_MEDIA_ITEM`, payload: { ...result, siteID } });
  }

  return { ...result, siteID };
};

export const deleteMediaItem = async ({ siteID, id }, dispatch, config) => {
  const result = await mediaServices.deleteMediaItem({ siteID, id }, dispatch, config);

  if (result) {
    dispatch({ type: `DELETE_MEDIA_ITEM`, payload: { siteID, id } });
  }

  return { ...result, siteID };
};
