// import app components
import { db } from '.';

export const addTerm = async (
  { siteID, taxonomyID, id, title, slug, parentID, description },
  dispatch,
  config
) => {
  let result = await db(
    'createTerm',
    { siteID, taxonomyID, id, title, slug, parentID, description },
    dispatch,
    config
  );
  return result;
};

export const updateTerm = async (
  { siteID, taxonomyID, id, title, slug, parentID, description },
  dispatch,
  config
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
    },
    dispatch,
    config
  );

  return result;
};

export const deleteTerm = async ({ siteID, taxonomyID, id }, dispatch, config) => {
  let result = await db('deleteTerm', { siteID, taxonomyID, id }, dispatch, config);
  return result;
};
