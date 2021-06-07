import { db } from '.';

export const addUser = async ({ siteID, email, role }, dispatch, config) => {
  let result = await db('createUser', { siteID, email, role }, dispatch, config);
  return result;
};

export const getAuthUser = async ({}, dispatch, config) => {
  let result = await db('getAuthUser', {}, dispatch, config);
  return result;
};

export const getUser = async ({ siteID, id }, dispatch, config) => {
  let result = await db('getUser', { siteID, id }, dispatch, config);
  return result;
};

export const getUsers = async ({ siteID, page, limit }, dispatch, config) => {
  let result = await db('getUsers', { siteID, page, limit }, dispatch, config);
  return result;
};

export const updateUser = async ({ siteID, id, role }, dispatch, config) => {
  let result = await db('updateUser', { siteID, id, role }, dispatch, config);

  return result;
};

export const deleteUser = async ({ siteID, id }, dispatch, config) => {
  let result = await db('deleteUser', { siteID, id }, dispatch, config);
  return result;
};
