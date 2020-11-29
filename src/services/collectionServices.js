import { db } from '.';

export const addCollection = async ({ siteID, title, slug }) => {
  let result = await db('createCollection', { siteID, title, slug });

  if (result) {
    result.posts = [];
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
  return result;
};

export const deleteCollection = async ({ siteID, id }) => {
  let result = await db('deleteCollection', { siteID, id });
  return result;
};
