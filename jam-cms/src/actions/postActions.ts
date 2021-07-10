import { postServices } from '../services';

export const addPost = async (args: any, dispatch: any, config: any) => {
  const result = await postServices.addPost(args, dispatch, config);

  if (result) {
    dispatch({ type: `ADD_POST`, payload: { ...result, siteID: args.siteID } });
  }

  return result;
};

export const getPost = async (args: any, dispatch: any, config: any) => {
  const result = await postServices.getPost(args, dispatch, config);
  return result;
};

export const updatePost = async (args: any, dispatch: any, config: any) => {
  const result = await postServices.updatePost(args, dispatch, config);

  if (result) {
    dispatch({ type: `ADD_POST`, payload: { ...result, siteID: args.siteID } });
    dispatch({ type: `ADD_EDITOR_POST`, payload: { ...result, siteID: args.siteID } });
  }

  return result;
};

export const deletePost = async ({
  siteID,
  id
}: any, dispatch: any, config: any) => {
  const result = await postServices.deletePost({ siteID, id }, dispatch, config);

  if (result) {
    dispatch({ type: `DELETE_POST`, payload: { ...result, siteID } });
  }

  return result;
};

export const emptyTrash = async (args: any, dispatch: any, config: any) => {
  const result = await postServices.emptyTrash(args, dispatch, config);

  if (result) {
    dispatch({ type: `DELETE_POSTS`, payload: { posts: result, siteID: args.siteID } });
  }

  return result;
};

export const duplicatePost = async ({
  siteID,
  id
}: any, dispatch: any, config: any) => {
  const result = await postServices.duplicatePost({ siteID, id }, dispatch, config);

  if (result) {
    dispatch({ type: `ADD_POST`, payload: { ...result, siteID } });
  }

  return result;
};

export const reorderPosts = async ({
  siteID,
  postType,
  posts
}: any, dispatch: any, config: any) => {
  const postIDs = posts.reduce(
    // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'ac' implicitly has an 'any' type.
    (ac, a) => ({
      ...ac,
      [a.id]: a.order
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
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'ac' implicitly has an 'any' type.
        (ac, a) => ({
          ...ac,
          [a.id]: a
        }),
        {}
      ),
    },
  });
};

export const refreshPostLock = async (args: any, dispatch: any, config: any) => {
  const result = await postServices.refreshPostLock(args, dispatch, config);

  // If the property locked is set in the result, it means someone took over the post and we need to disable editing for the current user
  if (result?.locked?.id) {
    dispatch({ type: 'ADD_POST', payload: { ...result, siteID: args.siteID } });
    dispatch({ type: 'ADD_EDITOR_POST', payload: { ...result, siteID: args.siteID } });
  }

  return result;
};

export const removePostLock = async (args: any, dispatch: any, config: any) => {
  const result = await postServices.removePostLock(args, dispatch, config);
  return result;
};

export const takeOverPost = async (args: any, dispatch: any, config: any) => {
  const result = await postServices.takeOverPost(args, dispatch, config);

  if (result) {
    dispatch({ type: 'CLOSE_DIALOG' });
    dispatch({ type: 'ADD_POST', payload: { ...result, siteID: args.siteID } });
    dispatch({ type: 'ADD_EDITOR_POST', payload: { ...result, siteID: args.siteID } });
  }

  return result;
};
