import { db } from '.';

export const addPost = async (
  { siteID, postTypeID, title, parentID }: any,
  dispatch: any,
  config: any
) => {
  let result = await db('createPost', { siteID, title, postTypeID, parentID }, dispatch, config);
  return result;
};

export const getPost = async ({ siteID, postID }: any, dispatch: any, config: any) => {
  let result = await db('getPost', { siteID, postID }, dispatch, config);
  return result;
};

export const updatePost = async (
  {
    siteID,
    id,
    postTypeID,
    title,
    slug,
    status,
    content,
    seo,
    parentID,
    taxonomies,
    featuredImage,
    template,
    templateObject,
  }: any,
  dispatch: any,
  config: any
) => {
  let result = await db(
    'updatePost',
    {
      siteID,
      id,
      postTypeID,
      title,
      slug,
      status,
      content: JSON.stringify(content),
      seo: JSON.stringify(seo),
      parentID,
      taxonomies: JSON.stringify(taxonomies),
      featuredImage: JSON.stringify(featuredImage),
      template,
      templateObject: JSON.stringify(templateObject),
    },
    dispatch,
    config
  );

  return result;
};

export const deletePost = async ({ siteID, id }: any, dispatch: any, config: any) => {
  let result = await db('deletePost', { siteID, id }, dispatch, config);
  return result;
};

export const emptyTrash = async ({ siteID, postTypeID }: any, dispatch: any, config: any) => {
  let result = await db('emptyTrash', { siteID, postTypeID }, dispatch, config);
  return result;
};

export const duplicatePost = async ({ siteID, id }: any, dispatch: any, config: any) => {
  let result = await db('duplicatePost', { siteID, id }, dispatch, config);
  return result;
};

export const reorderPosts = async ({ siteID, postIDs }: any, dispatch: any, config: any) => {
  let result = await db(
    'reorderPosts',
    { siteID, postIDs: JSON.stringify(postIDs) },
    dispatch,
    config
  );
  return result;
};

export const refreshPostLock = async ({ siteID, id }: any, dispatch: any, config: any) => {
  let result = await db('refreshPostLock', { siteID, id }, dispatch, config);
  return result;
};

export const removePostLock = async ({ siteID, id }: any, dispatch: any, config: any) => {
  let result = await db('removePostLock', { siteID, id }, dispatch, config);
  return result;
};

export const takeOverPost = async ({ siteID, id }: any, dispatch: any, config: any) => {
  let result = await db('takeOverPost', { siteID, id }, dispatch, config);
  return result;
};
