import { navigate } from '@reach/router';

import { userServices } from '../services';
import { auth } from '../utils';
import getRoute from '../routes';

export const addUser = async ({ siteID, email, role }, dispatch) => {
  const result = await userServices.addUser({ siteID, email, role });

  if (result) {
    dispatch({ type: `ADD_USER`, payload: { siteID, ...result } });
  }

  return result;
};

export const getAuthUser = async ({}, dispatch) => {
  const result = await userServices.getAuthUser();

  if (result) {
    if (result.hasOwnProperty('success') && !result.success) {
      auth.logout(() => navigate(getRoute(`sign-in`)));
    } else {
      dispatch({ type: `ADD_AUTH_USER`, payload: result });
    }
  }

  return result;
};

export const getUser = async ({ siteID, id }, dispatch) => {
  const result = await userServices.getUser({ id });

  if (result) {
    dispatch({ type: `ADD_USER`, payload: { siteID, ...result } });
  }

  return result;
};

export const getUsers = async ({ siteID, page, limit }, dispatch) => {
  const result = await userServices.getUsers({ siteID, page, limit });

  if (result) {
    dispatch({ type: `ADD_USERS`, payload: { siteID, ...result } });
  }

  return result;
};

export const updateUser = async ({ siteID, id, role }, dispatch) => {
  const result = await userServices.updateUser({ siteID, id, role });

  if (result) {
    dispatch({ type: `ADD_USER`, payload: { siteID, ...result } });
  }
};

export const deleteUser = async ({ siteID, id }, dispatch) => {
  const result = await userServices.deleteUser({ siteID, id });

  if (result) {
    dispatch({ type: `DELETE_USER`, payload: { siteID, ...result } });
  }
};
