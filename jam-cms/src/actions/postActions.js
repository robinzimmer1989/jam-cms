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
  const formattedResult = { ...result, siteID };

  if (result) {
    dispatch({ type: `ADD_POST`, payload: formattedResult });
  }

  return formattedResult;
};

export const getPost = async ({ siteID, postID }, dispatch, config) => {
  const result = await postServices.getPost({ siteID, postID }, dispatch, config);
  const formattedResult = { ...result, siteID };

  if (result) {
    dispatch({ type: `ADD_POST`, payload: formattedResult });
    dispatch({ type: `ADD_EDITOR_POST`, payload: formattedResult });
  }

  return formattedResult;
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
  const formattedResult = { ...result, siteID };

  if (result) {
    dispatch({ type: `ADD_POST`, payload: formattedResult });
    dispatch({ type: `ADD_EDITOR_POST`, payload: formattedResult });
  }

  return formattedResult;
};

export const deletePost = async ({ siteID, id }, dispatch, config) => {
  const result = await postServices.deletePost({ siteID, id }, dispatch, config);
  const formattedResult = { ...result, siteID };

  if (result) {
    dispatch({ type: `DELETE_POST`, payload: formattedResult });
  }

  return formattedResult;
};
