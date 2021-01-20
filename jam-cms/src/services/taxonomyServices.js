// import app components
import { db } from '.';

export const addTaxonomy = async ({ siteID, id, title, slug, postTypes }, dispatch, config) => {
  let result = await db(
    'createTaxonomy',
    { siteID, id, title, slug, postTypes: JSON.stringify(postTypes) },
    dispatch,
    config
  );
  return result;
};

export const updateTaxonomy = async ({ siteID, id, title, slug, postTypes }, dispatch, config) => {
  let result = await db(
    'updateTaxonomy',
    {
      id,
      siteID,
      title,
      slug,
      postTypes: JSON.stringify(postTypes),
    },
    dispatch,
    config
  );

  return result;
};

export const deleteTaxonomy = async ({ siteID, id }, dispatch, config) => {
  let result = await db('deleteTaxonomy', { siteID, id }, dispatch, config);
  return result;
};
