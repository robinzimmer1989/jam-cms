import produce from 'immer';
import { get } from 'lodash';

// import app components
import { db } from '.';

export const addCollection = async ({ siteID, title, slug }, dispatch, config) => {
  let result = await db('createCollection', { siteID, title, slug }, dispatch, config);

  if (result) {
    result = transformCollection(result);
  }

  return result;
};

export const updateCollection = async ({ siteID, id, title, slug, template }, dispatch, config) => {
  let result = await db(
    'updateCollection',
    {
      id,
      siteID,
      title,
      slug,
      template: template ? JSON.stringify(template) : null,
    },
    dispatch,
    config
  );

  if (result) {
    result = transformCollection(result);
  }

  return result;
};

export const deleteCollection = async ({ siteID, id }, dispatch, config) => {
  let result = await db('deleteCollection', { siteID, id }, dispatch, config);

  if (result) {
    result = transformCollection(result);
  }

  return result;
};

const transformCollection = (collection) => {
  const nextCollection = produce(collection, (draft) => {
    if (get(draft, `posts.items`)) {
      draft.posts = draft.posts.items.reduce(
        (ac, a) => ({
          ...ac,
          [a.id]: a,
        }),
        {}
      );
    }

    return draft;
  });

  return nextCollection;
};
