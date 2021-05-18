import produce from 'immer';
import { get } from 'lodash';

// import app components
import { db } from '.';

export const getSites = async ({}, dispatch, config) => {
  let result = await db('getSites', {}, dispatch, config);

  if (result) {
    result = result.reduce((obj, item) => {
      obj[item.id] = item;
      return obj;
    }, {});
  }

  return result;
};

export const getSite = async ({ siteID }, dispatch, config) => {
  let result = await db('getSite', { siteID }, dispatch, config);

  if (result) {
    result = transformSite(result);
  }

  return result;
};

export const addSite = async ({ title }, dispatch, config) => {
  let result = await db('createSite', { title }, dispatch, config);

  if (result) {
    result = transformSite(result);
  }

  return result;
};

export const updateSite = async (
  { id, themeOptions, frontPage, deployment, title, siteUrl, googleMapsApi, apiKey },
  dispatch,
  config
) => {
  let result = await db(
    'updateSite',
    {
      id,
      title,
      frontPage,
      siteUrl,
      googleMapsApi,
      apiKey,
      themeOptions: JSON.stringify(themeOptions),
      deployment: JSON.stringify(deployment),
    },
    dispatch,
    config
  );

  if (result) {
    result = transformSite(result);
  }

  return result;
};

export const deleteSite = async ({ id }, dispatch, config) => {
  let result = await db('deleteSite', { id }, dispatch, config);

  if (result) {
    result = transformSite(result);
  }

  return result;
};

export const deploySite = async ({ id }, dispatch, config) => {
  let result = await db('deploySite', { id }, dispatch, config);

  if (result) {
    result = transformSite(result);
  }

  return result;
};

export const syncFields = async ({ fields, apiKey }, dispatch, config) => {
  let result = await db('syncFields', { fields: JSON.stringify(fields), apiKey }, dispatch, config);

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

    // Convert taxonomies to object structure
    if (get(draft, `taxonomies.items`)) {
      draft.taxonomies = draft.taxonomies.items.reduce((ac, a) => ({ ...ac, [a.id]: a }), {});
    }

    // Convert forms to object structure
    if (get(draft, `forms.items`)) {
      draft.forms = draft.forms.items.reduce((ac, a) => ({ ...ac, [a.id]: a }), {});
    }
  });

  return nextSite;
};
