import { set } from 'lodash';
import produce from 'immer';

import { postServices } from '../services';

export const addPost = async (
  { siteID, slug, postTypeID, status, title, content, parentID },
  dispatch,
  config
) => {
  const result = await postServices.addPost(
    { siteID, slug, postTypeID, status, title, content, parentID },
    dispatch,
    config
  );

  if (result) {
    dispatch({ type: `ADD_POST`, payload: result });
  }

  return result;
};

export const getPost = async ({ siteID, postID, blocks }, dispatch, config) => {
  const result = await postServices.getPost({ siteID, postID }, dispatch, config);

  if (result) {
    const nextResult = produce(result, (draft) => {
      draft.content.map((o, i) => {
        blocks?.[o?.id]?.label && set(draft.content, `${i}.label`, blocks[o.id].label);
      });

      return draft;
    });

    dispatch({
      type: `ADD_POST`,
      payload: nextResult,
    });
    dispatch({
      type: `ADD_EDITOR_POST`,
      payload: nextResult,
    });
  }

  return result;
};

export const updatePost = async (
  { siteID, id, slug, status, title, content, seoTitle, seoDescription, parentID, featuredImage },
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
      seoTitle,
      seoDescription,
      parentID,
      featuredImage,
    },
    dispatch,
    config
  );

  if (result) {
    dispatch({ type: `ADD_POST`, payload: result });
  }
};

export const deletePost = async ({ siteID, id }, dispatch, config) => {
  const result = await postServices.deletePost({ siteID, id }, dispatch, config);

  if (result) {
    dispatch({ type: `DELETE_POST`, payload: result });
  }
};
