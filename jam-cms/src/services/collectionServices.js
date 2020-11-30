import produce from 'immer';
import { get } from 'lodash';

// import app components
import { db } from '.';

export const addCollection = async ({ siteID, title, slug }) => {
  let result = await db('createCollection', { siteID, title, slug });

  if (result) {
    result = transformCollection(result);
  }

  return result;
};

export const updateCollection = async ({ siteID, id, title, slug, template }) => {
  let result = await db('updateCollection', {
    id,
    siteID,
    title,
    slug,
    template: template ? JSON.stringify(template) : null,
  });

  if (result) {
    result = transformCollection(result);
  }

  return result;
};

export const deleteCollection = async ({ siteID, id }) => {
  let result = await db('deleteCollection', { siteID, id });

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
