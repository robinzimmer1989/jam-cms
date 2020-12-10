import { db } from '.';

export const addForm = async ({ siteID, title }, dispatch, config) => {
  let result = await db('createForm', { siteID, title }, dispatch, config);
  return result;
};

export const updateForm = async ({ siteID, id, title, content }, dispatch, config) => {
  let result = await db(
    'updateForm',
    {
      siteID,
      id,
      title,
      content: content ? JSON.stringify(content) : null,
    },
    dispatch,
    config
  );

  return result;
};

export const getForm = async ({ siteID, id }, dispatch, config) => {
  let result = await db('getPost', { siteID, id }, dispatch, config);
  return result;
};

export const deleteForm = async ({ siteID, id }, dispatch, config) => {
  let result = await db('deleteForm', { siteID, id }, dispatch, config);
  return result;
};
