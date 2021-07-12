import { mediaServices } from '../services';

export const uploadMediaItem = async ({ siteID, file }: any, dispatch: any, config: any) => {
  const result = await mediaServices.addMediaItem({ siteID, file }, dispatch, config);
  return result;
};

export const getMediaItems = async (
  { siteID, page, limit, search, allow }: any,
  dispatch: any,
  config: any
) => {
  const result = await mediaServices.getMediaItems(
    { siteID, page, limit, search, allow },
    dispatch,
    config
  );
  return result;
};

export const updateMediaItem = async ({ siteID, id, altText }: any, dispatch: any, config: any) => {
  const result = await mediaServices.updateMediaItem({ siteID, id, altText }, dispatch, config);
  return result;
};

export const deleteMediaItem = async ({ siteID, id }: any, dispatch: any, config: any) => {
  const result = await mediaServices.deleteMediaItem({ siteID, id }, dispatch, config);
  return result;
};
