import { db } from '.';

export const addUser = async (
  { siteID, email, role, sendEmail }: any,
  dispatch: any,
  config: any
) => {
  let result = await db('createUser', { siteID, email, role, sendEmail }, dispatch, config);
  return result;
};

export const getAuthUser = async ({}, dispatch: any, config: any) => {
  let result = await db('getAuthUser', {}, dispatch, config);
  return result;
};

export const getUser = async ({ siteID, id }: any, dispatch: any, config: any) => {
  let result = await db('getUser', { siteID, id }, dispatch, config);
  return result;
};

export const getUsers = async ({ siteID, page, limit }: any, dispatch: any, config: any) => {
  let result = await db('getUsers', { siteID, page, limit }, dispatch, config);
  return result;
};

export const updateUser = async ({ siteID, id, role }: any, dispatch: any, config: any) => {
  let result = await db('updateUser', { siteID, id, role }, dispatch, config);

  return result;
};

export const deleteUser = async ({ siteID, id }: any, dispatch: any, config: any) => {
  let result = await db('deleteUser', { siteID, id }, dispatch, config);
  return result;
};
