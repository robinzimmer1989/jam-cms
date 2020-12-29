import { db } from '.';

export const addPost = async ({ siteID, slug, postTypeID, title, parentID }, dispatch, config) => {
  let result = await db(
    'createPost',
    { siteID, title, slug, postTypeID, parentID },
    dispatch,
    config
  );
  return result;
};

export const getPost = async ({ siteID, postID }, dispatch, config) => {
  let result = await db('getPost', { siteID, postID }, dispatch, config);
  return result;
};

export const updatePost = async (
  {
    siteID,
    id,
    title,
    slug,
    status,
    content,
    seo,
    parentID,
    featuredImage,
    template,
    templateObject,
  },
  dispatch,
  config
) => {
  let result = await db(
    'updatePost',
    {
      siteID,
      id,
      title,
      slug,
      status,
      content: JSON.stringify(content),
      seo: JSON.stringify(seo),
      parentID,
      featuredImage: JSON.stringify(featuredImage),
      template,
      templateObject: JSON.stringify(templateObject),
    },
    dispatch,
    config
  );

  return result;
};

export const deletePost = async ({ siteID, id }, dispatch, config) => {
  let result = await db('deletePost', { siteID, id }, dispatch, config);
  return result;
};
