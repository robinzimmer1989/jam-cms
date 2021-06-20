import { userServices } from '../services';
import { authActions } from '../actions';

export const addUser = async ({ siteID, email, role }, dispatch, config) => {
  const result = await userServices.addUser({ siteID, email, role }, dispatch, config);
  return result;
};

export const getAuthUser = async ({}, dispatch, config) => {
  const result = await userServices.getAuthUser({}, dispatch, config);

  if (result) {
    if (result.hasOwnProperty('success') && !result.success) {
      authActions.signOut({}, dispatch, config);
    } else {
      dispatch({ type: `ADD_AUTH_USER`, payload: result });
    }
  }

  return result;
};

export const getUser = async ({ siteID, id }, dispatch, config) => {
  const result = await userServices.getUser({ siteID, id }, dispatch, config);
  return result;
};

export const getUsers = async ({ siteID, page, limit }, dispatch, config) => {
  const result = await userServices.getUsers({ siteID, page, limit }, dispatch, config);
  return result;
};

export const updateUser = async ({ siteID, id, role }, dispatch, config) => {
  const result = await userServices.updateUser({ siteID, id, role }, dispatch, config);
  return result;
};

export const deleteUser = async ({ siteID, id }, dispatch, config) => {
  const result = await userServices.deleteUser({ siteID, id }, dispatch, config);
  return result;
};
