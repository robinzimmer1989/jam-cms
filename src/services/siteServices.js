import produce from 'immer';
import { get } from 'lodash';

// import app components
import { db } from '.';

export const getSites = async () => {
  let result = await db('getSites', {});

  if (result) {
    result = result.reduce((obj, item) => {
      obj[item.id] = item;
      return obj;
    }, {});
  }

  return result;
};

export const getSite = async ({ siteID }) => {
  let result = await db('getSite', { siteID });

  if (result) {
    result = transformSite(result);
  }

  return result;
};

export const addSite = async ({ title }) => {
  let result = await db('createSite', { title });

  if (result) {
    result = transformSite(result);
  }

  return result;
};

export const updateSite = async ({
  id,
  title,
  settings,
  frontPage,
  deploymentBuildHook,
  deploymentBadgeImage,
  deploymentBadgeLink,
  apiKey,
}) => {
  let result = await db('updateSite', {
    id,
    title,
    settings: JSON.stringify(settings),
    frontPage,
    deploymentBuildHook,
    deploymentBadgeImage,
    deploymentBadgeLink,
    apiKey,
  });

  if (result) {
    result = transformSite(result);
  }

  return result;
};

export const deleteSite = async ({ id }) => {
  let result = await db('deleteSite', { id });

  if (result) {
    result = transformSite(result);
  }

  return result;
};

const transformSite = (site) => {
  const nextSite = produce(site, (draft) => {
    // Convert posts and then post types to object structure
    if (get(draft, `postTypes.items`)) {
      draft.postTypes.items.map((o, i) => {
        if (get(o, `posts.items`)) {
          return (draft.postTypes.items[i].posts = draft.postTypes.items[i].posts.items.reduce(
            (ac, a) => ({
              ...ac,
              [a.id]: a,
            }),
            {}
          ));
        }

        return null;
      });

      draft.postTypes = draft.postTypes.items.reduce((ac, a) => ({ ...ac, [a.id]: a }), {});
    }

    // Convert forms to object structure
    if (get(draft, `forms.items`)) {
      draft.forms = draft.forms.items.reduce((ac, a) => ({ ...ac, [a.id]: a }), {});
    }
  });

  return nextSite;
};
