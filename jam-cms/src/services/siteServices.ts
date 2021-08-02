// import app components
import { db } from '.';
import { formatSite } from '../utils';

export const getSites = async ({}, dispatch: any, config: any) => {
  let result = await db('getSites', {}, dispatch, config);

  if (result) {
    result = result.reduce((obj: any, item: any) => {
      obj[item.id] = item;
      return obj;
    }, {});
  }

  return result;
};

export const getSite = async ({ siteID }: any, dispatch: any, config: any) => {
  let result = await db('getSite', { siteID }, dispatch, config);

  if (result) {
    result = formatSite(result);
  }
  return result;
};

export const addSite = async ({ title }: any, dispatch: any, config: any) => {
  let result = await db('createSite', { title }, dispatch, config);

  if (result) {
    result = formatSite(result);
  }

  return result;
};

export const updateSite = async (
  {
    id,
    themeOptions,
    frontPage,
    deployment,
    title,
    siteUrl,
    googleMapsApi,
    apiKey,
    editorOptions,
    language,
  }: any,
  dispatch: any,
  config: any
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
      editorOptions: JSON.stringify(editorOptions),
      language,
    },
    dispatch,
    config
  );

  if (result) {
    result = formatSite(result);
  }

  return result;
};

export const deleteSite = async ({ id }: any, dispatch: any, config: any) => {
  let result = await db('deleteSite', { id }, dispatch, config);

  if (result) {
    result = formatSite(result);
  }

  return result;
};

export const deploySite = async ({ id }: any, dispatch: any, config: any) => {
  let result = await db('deploySite', { id }, dispatch, config);

  if (result) {
    result = formatSite(result);
  }

  return result;
};

export const syncFields = async ({ fields, apiKey }: any, dispatch: any, config: any) => {
  let result = await db('syncFields', { fields: JSON.stringify(fields), apiKey }, dispatch, config);

  if (result) {
    result = formatSite(result);
  }

  return result;
};

export const getUnpublishedChanges = async ({ siteID }: any, dispatch: any, config: any) => {
  const result = await db('getUnpublishedChanges', { siteID }, dispatch, config);
  return result;
};
