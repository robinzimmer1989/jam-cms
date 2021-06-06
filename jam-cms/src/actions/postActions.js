import { postServices } from '../services';

export const addPost = async (args, dispatch, config) => {
  const result = await postServices.addPost(args, dispatch, config);

  if (result) {
    dispatch({ type: `ADD_POST`, payload: { ...result, siteID: args.siteID } });
  }

  return result;
};

export const getPost = async (args, dispatch, config) => {
  const result = await postServices.getPost(args, dispatch, config);
  return result;
};

export const updatePost = async (args, dispatch, config) => {
  const result = await postServices.updatePost(args, dispatch, config);

  if (result) {
    dispatch({ type: `ADD_POST`, payload: { ...result, siteID: args.siteID } });
    dispatch({ type: `ADD_EDITOR_POST`, payload: { ...result, siteID: args.siteID } });
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

export const emptyTrash = async (args, dispatch, config) => {
  const result = await postServices.emptyTrash(args, dispatch, config);

  if (result) {
    dispatch({ type: `DELETE_POSTS`, payload: { posts: result, siteID: args.siteID } });
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

export const refreshPostLock = async (args, dispatch, config) => {
  const result = await postServices.refreshPostLock(args, dispatch, config);
  return result;
};

export const removePostLock = async (args, dispatch, config) => {
  const result = await postServices.removePostLock(args, dispatch, config);
  return result;
};
