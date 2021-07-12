import { previewServices } from '../services';

export const getSitePreview = async ({ siteID, previewID }: any, dispatch: any, config: any) => {
  const result = await previewServices.getSitePreview({ siteID, previewID }, dispatch, config);

  if (result) {
    dispatch({ type: `ADD_SITE`, payload: result });
  }

  return result;
};

export const getPostPreview = async ({ siteID, previewID }: any, dispatch: any, config: any) => {
  const result = await previewServices.getPostPreview({ siteID, previewID }, dispatch, config);

  if (result) {
    dispatch({ type: `ADD_EDITOR_POST`, payload: result });
  }

  return result;
};

export const generatePreviewLink = async (
  { siteID, postID, expiryDate }: any,
  dispatch: any,
  config: any
) => {
  const result = await previewServices.generatePreviewLink(
    { siteID, postID, expiryDate },
    dispatch,
    config
  );

  return result;
};
