// import app components
import { db } from '.';

export const addTerm = async (
  { siteID, taxonomyID, id, title, slug, parentID, description, language }: any,
  dispatch: any,
  config: any
) => {
  let result = await db(
    'createTerm',
    { siteID, taxonomyID, id, title, slug, parentID, description, language },
    dispatch,
    config
  );
  return result;
};

export const updateTerm = async (
  { siteID, taxonomyID, id, title, slug, parentID, description, language }: any,
  dispatch: any,
  config: any
) => {
  let result = await db(
    'updateTerm',
    {
      siteID,
      taxonomyID,
      id,
      title,
      slug,
      parentID,
      description,
      language,
    },
    dispatch,
    config
  );

  return result;
};

export const deleteTerm = async ({ siteID, taxonomyID, id }: any, dispatch: any, config: any) => {
  let result = await db('deleteTerm', { siteID, taxonomyID, id }, dispatch, config);
  return result;
};
