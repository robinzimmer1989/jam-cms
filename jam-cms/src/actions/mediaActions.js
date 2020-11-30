import { mediaServices } from '../services';

export const uploadMediaItem = async ({ siteID, file }, dispatch) => {
  const result = await mediaServices.addMediaItem({ siteID, file });

  if (result) {
    dispatch({ type: `ADD_MEDIA_ITEM`, payload: result });
  }

  return result;
};

export const getMediaItems = async ({ siteID, page, limit }, dispatch) => {
  const result = await mediaServices.getMediaItems({ siteID, page, limit });

  if (result) {
    dispatch({ type: `ADD_MEDIA_ITEMS`, payload: { siteID, ...result } });
  }

  return result;
};

export const updateMediaItem = async ({ siteID, id, altText }, dispatch) => {
  const result = await mediaServices.updateMediaItem({ siteID, id, altText });

  if (result) {
    dispatch({ type: `ADD_MEDIA_ITEM`, payload: result });
  }

  return result;
};

export const deleteMediaItem = async ({ siteID, id }, dispatch) => {
  const result = await mediaServices.deleteMediaItem({ siteID, id });

  if (result) {
    dispatch({ type: `DELETE_MEDIA_ITEM`, payload: { siteID, id } });
  }

  return result;
};
