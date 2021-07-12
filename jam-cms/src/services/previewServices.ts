import { db } from '.';
import { formatSite } from '../utils';

export const getSitePreview = async ({ siteID, previewID }: any, dispatch: any, config: any) => {
  let result = await db('getSitePreview', { siteID, previewID }, dispatch, config);

  if (result) {
    result = formatSite(result);
  }

  return result;
};

export const getPostPreview = async ({ siteID, previewID }: any, dispatch: any, config: any) => {
  const result = await db('getPostPreview', { siteID, previewID }, dispatch, config);
  return result;
};

export const generatePreviewLink = async (
  { siteID, postID, expiryDate }: any,
  dispatch: any,
  config: any
) => {
  const result = await db('getPreviewLink', { siteID, postID, expiryDate }, dispatch, config);
  return result;
};
