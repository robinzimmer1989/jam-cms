import { db } from '.';

export const getLanguages = async ({}: any, dispatch: any, config: any) => {
  let result = await db('getLanguages', {}, dispatch, config);
  return result;
};

export const addLanguage = async (
  { siteID, name, slug, locale }: any,
  dispatch: any,
  config: any
) => {
  let result = await db('addLanguage', { siteID, name, slug, locale }, dispatch, config);
  return result;
};

export const updateLanguage = async (
  { siteID, id, name, slug, locale }: any,
  dispatch: any,
  config: any
) => {
  let result = await db('updateLanguage', { siteID, id, name, slug, locale }, dispatch, config);
  return result;
};

export const deleteLanguage = async ({ siteID, id }: any, dispatch: any, config: any) => {
  let result = await db('deleteLanguage', { siteID, id }, dispatch, config);
  return result;
};

export const updateSettings = async (
  { siteID, defaultLanguage, postTypes, taxonomies }: any,
  dispatch: any,
  config: any
) => {
  let result = await db(
    'updateLanguageSettings',
    {
      siteID,
      defaultLanguage,
      postTypes: JSON.stringify(postTypes),
      taxonomies: JSON.stringify(taxonomies),
    },
    dispatch,
    config
  );
  return result;
};

export const translatePost = async ({ siteID, id, language }: any, dispatch: any, config: any) => {
  let result = await db('translatePost', { siteID, id, language }, dispatch, config);
  return result;
};

export const translateTerm = async ({ siteID, id, language }: any, dispatch: any, config: any) => {
  let result = await db('translateTerm', { siteID, id, language }, dispatch, config);
  return result;
};
