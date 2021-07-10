import produce from 'immer';
import { get } from 'lodash';

// import app components
import { db } from '.';

export const addCollection = async ({
  siteID,
  id,
  title,
  slug
}: any, dispatch: any, config: any) => {
  let result = await db('createCollection', { siteID, id, title, slug }, dispatch, config);

  if (result) {
    result = transformCollection(result);
  }

  return result;
};

export const updateCollection = async ({
  siteID,
  id,
  title,
  slug
}: any, dispatch: any, config: any) => {
  let result = await db(
    'updateCollection',
    {
      id,
      siteID,
      title,
      slug,
    },
    dispatch,
    config
  );

  if (result) {
    result = transformCollection(result);
  }

  return result;
};

export const deleteCollection = async ({
  siteID,
  id
}: any, dispatch: any, config: any) => {
  let result = await db('deleteCollection', { siteID, id }, dispatch, config);

  if (result) {
    result = transformCollection(result);
  }

  return result;
};

const transformCollection = (collection: any) => {
  const nextCollection = produce(collection, (draft: any) => {
    if (get(draft, `posts.items`)) {
      draft.posts = draft.posts.items.reduce(
        // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'ac' implicitly has an 'any' type.
        (ac, a) => ({
          ...ac,
          [a.id]: a
        }),
        {}
      );
    }

    return draft;
  });

  return nextCollection;
};
