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
    dispatch({ type: `ADD_POST`, payload: { ...result, siteID } });
    dispatch({ type: `ADD_EDITOR_POST`, payload: { ...result, siteID } });
  }

  return result;
};

export const updatePost = async (
  {
    siteID,
    id,
    postTypeID,
    slug,
    status,
    title,
    content,
    seo,
    parentID,
    taxonomies,
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
      postTypeID,
      slug,
      status,
      title,
      content,
      seo,
      parentID,
      taxonomies,
      featuredImage,
      template,
      templateObject,
    },
    dispatch,
    config
  );

  if (result) {
    dispatch({ type: `ADD_POST`, payload: { ...result, siteID } });
    dispatch({ type: `ADD_EDITOR_POST`, payload: { ...result, siteID } });
  }

  return result;
};

export const deletePost = async ({ siteID, id }, dispatch, config) => {
  const result = await postServices.deletePost({ siteID, id }, dispatch, config);

  if (result) {
    dispatch({ type: `DELETE_POST`, payload: { ...result, siteID } });
  }

  return result;
};

export const duplicatePost = async ({ siteID, id }, dispatch, config) => {
  const result = await postServices.duplicatePost({ siteID, id }, dispatch, config);

  if (result) {
    dispatch({ type: `ADD_POST`, payload: { ...result, siteID } });
  }

  return result;
};

export const reorderPosts = async ({ siteID, postType, posts }, dispatch, config) => {
  const postIDs = posts.reduce(
    (ac, a) => ({
      ...ac,
      [a.id]: a.order,
    }),
    {}
  );

  // We're not gonna wait until the function is completed to give the user an instant feedback
  postServices.reorderPosts({ siteID, postIDs }, dispatch, config);

  dispatch({
    type: 'UPDATE_COLLECTION',
    payload: {
      siteID,
      ...postType,
      posts: posts.reduce(
        (ac, a) => ({
          ...ac,
          [a.id]: a,
        }),
        {}
      ),
    },
  });
};
