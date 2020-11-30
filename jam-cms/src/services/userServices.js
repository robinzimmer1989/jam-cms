import { db } from '.';

export const addUser = async ({ siteID, email, role }) => {
  let result = await db('createUser', { siteID, email, role });
  return result;
};

export const getAuthUser = async () => {
  let result = await db('getAuthUser', {});
  return result;
};

export const getUser = async ({ id }) => {
  let result = await db('getUser', { id });
  return result;
};

export const getUsers = async ({ siteID, page, limit }) => {
  let result = await db('getUsers', { siteID, page, limit });
  return result;
};

export const updateUser = async ({ siteID, id, role }) => {
  let result = await db('updateUser', { siteID, id, role });

  return result;
};

export const deleteUser = async ({ siteID, id }) => {
  let result = await db('deleteUser', { siteID, id });
  return result;
};
