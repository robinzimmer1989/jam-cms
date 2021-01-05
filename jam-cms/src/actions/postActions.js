import { postServices } from '../services';

export const addPost = async (
  { siteID, postTypeID, status, title, content, parentID },
  dispatch,
  config
) => {
  const result = await postServices.addPost(
    { siteID, postTypeID, status, title, content, parentID },
    dispatch,
    config
  );

  if (result) {
    dispatch({ type: `ADD_POST`, payload: { ...result, siteID } });
  }

  return result;
};

export const getPost = async ({ siteID, postID }, dispatch, config) => {
  const result = await postServices.getPost({ siteID, postID }, dispatch, config);

  if (result) {
    dispatch({
      type: `ADD_POST`,
      payload: { ...result, siteID },
    });

    dispatch({
      type: `ADD_EDITOR_POST`,
      payload: { ...result, siteID },
    });
  }

  return result;
};

export const updatePost = async (
  {
    siteID,
    id,
    slug,
    status,
    title,
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
  const result = await postServices.updatePost(
    {
      siteID,
      id,
      slug,
      status,
      title,
      content,
      seo,
      parentID,
      featuredImage,
      template,
      templateObject,
    },
    dispatch,
    config
  );

  if (result) {
    dispatch({ type: `ADD_POST`, payload: { ...result, siteID } });
  }
};

export const deletePost = async ({ siteID, id }, dispatch, config) => {
  const result = await postServices.deletePost({ siteID, id }, dispatch, config);

  if (result) {
    dispatch({ type: `DELETE_POST`, payload: { ...result, siteID } });
  }
};
